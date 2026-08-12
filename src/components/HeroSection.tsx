import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { t } = useLanguage();
  const { scrollToSection } = useScrollToSection();

  return (
    <section className="relative min-h-0 flex items-start lg:items-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-hero-mobile relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 1, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Full Stack Engineer & HealthTech Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight max-w-xl sm:max-w-2xl text-balance"
            >
              {t("hero.headline")}
            </motion.h1>

            {/* Subheadline - LCP element: visible immediately, no opacity fade */}
            <p
              id="hero-lcp-subheadline"
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg sm:max-w-xl leading-relaxed text-balance"
            >
              {t("hero.subheadline")}
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("#contact")}
                className="glass shadow-premium-lg"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("#services")}
                className="glass border border-white/20 shadow-premium-lg text-primary"
              >
                {t("hero.cta.secondary")}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 pt-8 border-t border-border/70"
            >
              <div className="glass rounded-2xl px-4 py-3 shadow-sm border border-white/30">
                <div className="font-display text-3xl font-bold text-primary">
                  5+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.years")}
                </div>
              </div>
              <div className="glass rounded-2xl px-4 py-3 shadow-sm border border-white/30">
                <div className="font-display text-3xl font-bold text-primary">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.projects")}
                </div>
              </div>
              <div className="glass rounded-2xl px-4 py-3 shadow-sm border border-white/30">
                <div className="font-display text-3xl font-bold text-primary">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("hero.stats.satisfaction")}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[2/1] lg:aspect-[4/5] w-full lg:max-w-md lg:mx-auto overflow-hidden">
              {/* Portrait frame with premium styling */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted rounded-3xl overflow-hidden shadow-premium-xl">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                {/* Abstract code visualization - glassmorphism */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <div className="relative w-full max-w-xl h-full flex items-center justify-center">
                    <div className="absolute inset-4 rounded-[30px] bg-gradient-to-br from-primary/25 via-background/40 to-accent/10 blur-3xl" />
                    <div className="absolute inset-3 rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_24px_120px_-60px_rgba(0,0,0,0.75)]" />

                    <div
                      className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 w-full z-10"
                      style={{ perspective: "1200px" }}
                    >
                      <motion.div
                        initial={{ opacity: 1, y: 1, rotateX: 0, rotateY: -2 }}
                        animate={{
                          opacity: 1,
                          y: [1, -2, 1],
                          rotateX: [0, 0.5, 0],
                          rotateY: [-2, -3, -2],
                        }}
                        transition={{
                          delay: 0.2,
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ transform: "translateZ(26px) rotateY(-8deg)" }}
                        className="group rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 shadow-[0_12px_60px_-30px_rgba(0,0,0,0.8)]"
                      >
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-primary/80">
                          <span>Patient hooks</span>
                          <span className="text-accent">live</span>
                        </div>
                        <div className="mt-3 space-y-2 font-mono text-xs text-muted-foreground">
                          <div className="flex items-center gap-2 text-foreground">
                            <span className="text-primary">const</span>
                            <span> {`{ healthData, isLoading }`} </span>
                            <span className="text-primary">=</span>
                            <span className="text-accent">usePatientData</span>
                            <span>
                              ({"{"} key: "care-plan" {"}"})
                            </span>
                          </div>
                          <div className="pl-2 border-l border-white/10">
                            <span className="text-primary">
                              useNutrientCalculator
                            </span>
                            <span>{`(() => syncMacros(healthData), [healthData])`}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full px-2 py-1 text-[10px] bg-primary/10 text-primary">
                              DietTech
                            </span>
                            <span className="text-foreground/80">
                              grid-cols-12 • gap-6
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 1, y: 1.5, rotateX: 0, rotateY: 2 }}
                        animate={{
                          opacity: 1,
                          y: [1.5, -3, 1.5],
                          rotateX: [0, -0.5, 0],
                          rotateY: [2, 3, 2],
                        }}
                        transition={{
                          delay: 0.3,
                          duration: 6.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ transform: "translateZ(18px) rotateY(10deg)" }}
                        className="relative rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 shadow-[0_12px_60px_-30px_rgba(0,0,0,0.8)] sm:-mt-6"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-primary/80">
                          <Sparkles className="w-3 h-3" />
                          <span>Clinic dashboard</span>
                        </div>
                        <div className="mt-3 space-y-2 font-mono text-xs text-muted-foreground">
                          <div className="flex items-center gap-2 text-foreground">
                            <span className="text-accent">return</span>
                            <span>{`(<section className="glass grid md:grid-cols-2">)`}</span>
                          </div>
                          <div className="pl-3 border-l border-white/10 space-y-1">
                            <span className="block text-foreground/90">
                              {`<PatientCard variant="wellness" className="hover:-translate-y-0.5">`}
                            </span>
                            <span className="block text-primary/90">
                              {`<div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">`}
                            </span>
                            <span className="block">{`</div>`}</span>
                          </div>
                        </div>
                        <div className="absolute -right-3 -bottom-3 rounded-xl bg-primary/15 text-[11px] text-primary px-3 py-1.5 border border-primary/30 shadow-lg">
                          3D Glass UI
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 1, y: 1, rotateX: 0 }}
                        animate={{
                          opacity: 1,
                          y: [1, -2, 1],
                          rotateX: [0, 0.75, 0],
                        }}
                        transition={{
                          delay: 0.4,
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ transform: "translateZ(32px)" }}
                        className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 shadow-[0_16px_80px_-40px_rgba(0,0,0,0.7)]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-primary/80">
                          <span>SEO pulse</span>
                          <div className="flex items-center gap-2 text-foreground/80">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <span>+128% organic</span>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {[72, 88, 94].map((value, idx) => (
                            <div key={value} className="space-y-1">
                              <div className="text-xs text-muted-foreground">
                                {["CTR", "CLS", "Pagespeed"][idx]}
                              </div>
                              <div className="h-20 rounded-xl bg-white/5 border border-white/5 flex items-end justify-center overflow-hidden">
                                <div
                                  className="w-10 rounded-t-lg bg-gradient-to-t from-primary/50 via-primary/70 to-accent/80"
                                  style={{ height: `${value}%` }}
                                />
                              </div>
                              <div className="text-center text-xs font-semibold text-foreground">
                                {value}%
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary border border-primary/20">
                            <Bot className="w-3 h-3" />
                            AI health-content insights
                          </span>
                          <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-accent border border-accent/20">
                            <ArrowRight className="w-3 h-3" />
                            +12.4 avg. position
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating chips */}
                    <motion.div
                      animate={{ y: [0, -2, 0], x: [0, 1, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-6 left-8 rounded-full bg-background/60 border border-white/10 backdrop-blur-xl px-3 py-1.5 text-xs text-muted-foreground shadow-lg"
                    >
                      HealthTech • Glass
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 3, 0], x: [0, -1, 0] }}
                      transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-6 right-8 rounded-full bg-primary/15 border border-primary/20 text-primary px-3 py-1.5 text-xs shadow-lg"
                    >
                      Patient-ready UX
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-2xl backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
