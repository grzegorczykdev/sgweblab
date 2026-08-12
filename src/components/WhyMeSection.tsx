import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Target, TrendingUp, Cpu, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyMeSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Code2,
      titleKey: 'whyme.quality.title',
      descriptionKey: 'whyme.quality.description',
      skills: ['Custom builds', 'Performance', 'Security', 'Accessibility'],
    },
    {
      icon: Target,
      titleKey: 'whyme.strategy.title',
      descriptionKey: 'whyme.strategy.description',
      skills: ['SEO architecture', 'Content structure', 'Core Web Vitals', 'UX focus'],
    },
    {
      icon: TrendingUp,
      titleKey: 'whyme.seo_ai.title',
      descriptionKey: 'whyme.seo_ai.description',
      skills: [
        'whyme.seo_ai.skill1',
        'whyme.seo_ai.skill2',
        'whyme.seo_ai.skill3',
        'whyme.seo_ai.skill4',
      ],
    },
    {
      icon: Cpu,
      titleKey: 'whyme.modern_ai.title',
      descriptionKey: 'whyme.modern_ai.description',
      skills: [
        'whyme.modern_ai.skill1',
        'whyme.modern_ai.skill2',
        'whyme.modern_ai.skill3',
        'whyme.modern_ai.skill4',
      ],
    },
    {
      icon: Users,
      titleKey: 'whyme.partnership.title',
      descriptionKey: 'whyme.partnership.description',
      skills: ['Workshops', 'Onboarding', 'Docs', 'Support'],
    },
  ];

  const combinedFeature = {
    icon: Code2,
    titleKey: 'whyme.combined.title',
    descriptionKey: 'whyme.combined.description',
  skills: [
    'whyme.combined.skill1',
    'whyme.combined.skill2',
    'whyme.combined.skill3',
    'whyme.combined.skill4',
  ],
  };

  const secondaryFeatures = [features[2], features[3]];
  const partnershipFeature = features[4];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const EFFECT_KEYS: Record<string, string> = {
    'whyme.strategy.title': 'whyme.strategy.effect',
    'whyme.seo_ai.title': 'whyme.seo_ai.effect',
    'whyme.modern_ai.title': 'whyme.strategy.effect',
  };

  return (
    <section
      id="about"
      className="section-padding bg-secondary/30"
      ref={ref}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
          {t('whyme.header')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4">
            {t('whyme.title')}
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            {t('whyme.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        {/* Three-up grid with combined first card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {/* Combined card */}
          <motion.div variants={itemVariants} className="bento-item group glass h-full flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/25 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <combinedFeature.icon className="w-9 h-9 text-accent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-primary mb-4 leading-tight">
              {t(combinedFeature.titleKey)}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              {t(combinedFeature.descriptionKey)}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-primary">{t('whyme.effect.label')}:</span> {t('whyme.quality.effect')}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {combinedFeature.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium glass border border-white/30 text-muted-foreground rounded-full"
                >
                  {t(skill)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Remaining feature cards */}
          {secondaryFeatures.map((feature, index) => {
            const isLast = index === secondaryFeatures.length - 1;
            return (
              <motion.div
                key={feature.titleKey}
                variants={itemVariants}
                className={`bento-item group glass h-full flex flex-col ${
                  isLast ? 'md:col-span-2 xl:col-span-1' : ''
                }`}
              >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t(feature.descriptionKey)}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <span className="font-semibold text-primary">{t('whyme.effect.label')}:</span>{' '}
                {t(EFFECT_KEYS[feature.titleKey] ?? 'whyme.strategy.effect')}
              </p>

              {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {feature.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium glass border border-white/30 text-muted-foreground rounded-full"
                    >
                      {t(skill)}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-10"
        >
          <div className="cta-banner rounded-[24px] overflow-hidden">
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between">
              <div className="flex-1 space-y-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">
                  <Users className="w-4 h-4" />
                  {t(partnershipFeature.titleKey)}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                  {t('whyme.cta.banner.title')}
                </h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                  {t('whyme.cta.banner.body')}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button
                  asChild
                  variant="accent"
                  size="lg"
                  className="glow-button px-7 py-3 text-base md:text-lg rounded-xl inline-flex items-center gap-2 justify-center"
                >
                  <a href="#contact" className="flex items-center gap-2">
                    {t('whyme.cta.button')}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <span className="text-sm text-white/70">{t('whyme.cta.banner.note')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMeSection;
