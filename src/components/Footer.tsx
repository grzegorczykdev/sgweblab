import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPrivacyPath } from "@/lib/i18n";

const Footer = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/grzegorczyksylwia/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:hello@sgweblab.com", label: "Email" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sgweblab_com/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container-custom">
        <div className="glass bg-primary/15 border-white/20 rounded-2xl p-6 md:p-8 shadow-premium-lg flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + Social Links */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="font-display text-2xl font-bold"
              >
                <span className="text-accent">SG</span>
                WebLab<span className="text-accent">.</span>
              </motion.div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <nav aria-label={t("footer.legalNav")}>
              <Link
                to={getPrivacyPath(language)}
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline-offset-4 hover:underline transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </nav>
          </div>

          {/* Copyright */}
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {currentYear} Sylwia Grzegorczyk. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
