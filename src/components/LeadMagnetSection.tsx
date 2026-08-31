import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import ContactFormField from "@/components/ContactFormField";
import { getPrivacyPath } from "@/lib/i18n";
import { z } from "zod";
import { Link } from "react-router-dom";

const RATE_LIMIT_KEY = "sgweblab_form_hits";
const RATE_LIMIT_MAX = 2;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const CONTACT_EMAIL = "hello@sgweblab.com";

type ButtonState = "default" | "loading" | "success";

interface RateLimitData {
  firstSubmitAt: number;
  count: number;
}

const getRateLimitData = (): RateLimitData | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    return raw ? (JSON.parse(raw) as RateLimitData) : null;
  } catch {
    return null;
  }
};

const isRateLimited = (): boolean => {
  const data = getRateLimitData();
  if (!data || data.count === 0) return false;
  if (Date.now() - data.firstSubmitAt > RATE_LIMIT_WINDOW_MS) return false;
  return data.count >= RATE_LIMIT_MAX;
};

const recordFormSubmission = (): void => {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const data = getRateLimitData();
  const isWindowExpired =
    !data || now - data.firstSubmitAt > RATE_LIMIT_WINDOW_MS;
  const next: RateLimitData = isWindowExpired
    ? { firstSubmitAt: now, count: 1 }
    : { firstSubmitAt: data!.firstSubmitAt, count: data!.count + 1 };
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

const LeadMagnetSection = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [buttonState, setButtonState] = useState<ButtonState>("default");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showShake, setShowShake] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [showRateLimitMessage, setShowRateLimitMessage] = useState(false);

  useEffect(() => {
    setRateLimited(isRateLimited());
  }, []);

  // Load reCAPTCHA only when form section is in view (perf: defers ~200ms JS until needed)
  useEffect(() => {
    if (!isInView) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.google.com/recaptcha/api.js"]',
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        /* already removed */
      }
    };
  }, [isInView]);

  // Reset to default after 4s success; clear form fields only
  useEffect(() => {
    if (buttonState !== "success") return;
    const id = setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setButtonState("default");
    }, 4000);
    return () => clearTimeout(id);
  }, [buttonState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (rateLimited && name === "message") {
      setShowRateLimitMessage(true);
    }
  };

  const handleMessageFocus = () => {
    if (rateLimited) setShowRateLimitMessage(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRateLimited()) {
      setRateLimited(true);
      return;
    }

    setButtonState("loading");
    setSubmitError(null);

    try {
      formSchema.parse(formData);

      const form = e.target as HTMLFormElement;
      const netlifyForm = new FormData(form);
      netlifyForm.set("form-name", "contact"); // ensure consistency

      // Include reCAPTCHA token and any new hidden fields Netlify injects.
      const body = new URLSearchParams(
        Array.from(netlifyForm.entries()).map(([key, value]) => [
          key,
          String(value),
        ]),
      ).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setButtonState("success");
      recordFormSubmission();
      const data = getRateLimitData();
      if (data && data.count >= RATE_LIMIT_MAX) {
        setRateLimited(true);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setShowShake(true);
        setTimeout(() => setShowShake(false), 400);
        const newErrors: Record<string, string> = {};
        const errorKey = (
          path: string,
          code: string,
          validation?: string,
        ): string => {
          if (path === "name" && code === "too_small")
            return "lead.errors.nameRequired";
          if (path === "name" && code === "too_big")
            return "lead.errors.nameTooLong";
          if (path === "email" && validation === "email")
            return "lead.errors.emailInvalid";
          if (path === "email" && code === "too_big")
            return "lead.errors.emailTooLong";
          if (path === "message" && code === "too_small")
            return "lead.errors.messageTooShort";
          if (path === "message" && code === "too_big")
            return "lead.errors.messageTooLong";
          return "lead.errors.messageTooShort";
        };
        error.errors.forEach((err) => {
          const path = err.path[0] as string | undefined;
          if (path) {
            const key = errorKey(
              path,
              err.code,
              (err as { validation?: string }).validation,
            );
            newErrors[path] = t(key);
          }
        });
        setErrors(newErrors);
      } else {
        setSubmitError(t("lead.error"));
      }
      setButtonState("default");
    }
  };

  return (
    <section
      id="contact"
      className="section-padding pt-6 md:pt-8 pb-6 md:pb-8 bg-primary"
      ref={ref}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass bg-card/80 rounded-3xl p-8 md:p-12 shadow-premium-xl border border-white/30"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-semibold">
                {t("lead.badge")}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
                {t("lead.heading")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("lead.subtitle.highlight")}</strong>
                {t("lead.subtitle.rest")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>{t("lead.body.highlight")}</strong>
                {t("lead.body.rest")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("lead.custom")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("lead.emailOrFormPrefix")}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent font-medium hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                {t("lead.emailOrFormSuffix")}
              </p>
            </div>

            {/* Right - Form */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 glass rounded-2xl p-4 md:p-6 border border-white/20 shadow-premium-lg bg-white/5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden" aria-hidden="true">
                <label className="text-xs text-muted-foreground">
                  Don’t fill this out if you are human:
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    className="mt-1 block w-full bg-transparent text-xs"
                    autoComplete="off"
                  />
                </label>
              </div>
              <ContactFormField
                labelKey="lead.name"
                id="name"
                error={errors.name}
                showShake={showShake}
              >
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  className={`transition-colors duration-200 ${errors.name ? "border-destructive" : ""}`}
                />
              </ContactFormField>

              <ContactFormField
                labelKey="lead.email"
                id="email"
                error={errors.email}
                showShake={showShake}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={255}
                  className={`transition-colors duration-200 ${errors.email ? "border-destructive" : ""}`}
                />
              </ContactFormField>

              <ContactFormField
                labelKey="lead.messageLabel"
                id="message"
                error={errors.message}
                showShake={showShake}
                hint={
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {formData.message.length} / 2000
                  </p>
                }
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleMessageFocus}
                  maxLength={2000}
                  className={`w-full rounded-md border bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none transition-colors duration-200 ${
                    errors.message ? "border-destructive" : "border-border"
                  }`}
                  rows={4}
                />
              </ContactFormField>

              <motion.button
                type="submit"
                disabled={
                  buttonState === "loading" ||
                  buttonState === "success" ||
                  rateLimited
                }
                transition={{ duration: 0.3 }}
                className={`w-full mt-4 min-h-[3rem] rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 outline-none ${
                  rateLimited ? "opacity-60 cursor-not-allowed" : ""
                } ${
                  buttonState === "success"
                    ? "bg-emerald-500/90 text-white border border-emerald-400/40 shadow-[0_4px_14px_rgba(16,185,129,0.25)]"
                    : "bg-gradient-to-r from-accent to-amber-200/90 text-accent-foreground shadow-premium-lg hover:shadow-premium-xl"
                }`}
              >
                {buttonState === "default" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("lead.submit")}
                  </motion.span>
                )}
                {buttonState === "loading" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 border-[2px] border-accent-foreground/70 border-t-transparent rounded-full animate-spin"
                  />
                )}
                {buttonState === "success" && (
                  <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                    />
                  </motion.svg>
                )}
              </motion.button>
              <p className="text-xs text-muted-foreground text-center">
                {t("lead.privacyNotePrefix")}
                <Link
                  to={getPrivacyPath(language)}
                  className="text-accent font-medium underline underline-offset-2 hover:no-underline"
                >
                  {t("lead.privacyNoteLink")}
                </Link>
                {t("lead.privacyNoteSuffix")}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {t("lead.antiSpamNote")}
              </p>
              <div
                data-netlify-recaptcha="true"
                className="flex justify-center"
              />
              {rateLimited && showRateLimitMessage && (
                <p className="text-xs text-destructive text-center">
                  {t("lead.rateLimitExceeded")}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium underline hover:no-underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
              {submitError && !rateLimited && (
                <p className="text-xs text-destructive text-center">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
