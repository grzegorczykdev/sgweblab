import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";
import { getEquivalentPath } from "@/lib/portfolio";
import { getHomePath, getPortfolioPath, persistLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavItem = {
  key: string;
  href: string;
  type: "section" | "page";
};

const sectionNavItems: NavItem[] = [
  { key: "nav.about", href: "#about", type: "section" },
  { key: "nav.services", href: "#services", type: "section" },
  { key: "nav.contact", href: "#contact", type: "section" },
];

const portfolioNavItem: NavItem = {
  key: "nav.portfolio",
  href: "/portfolio",
  type: "page",
};

const sectionLinkClass =
  "text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group rounded-full px-3 py-1.5 glass";

const portfolioLinkClass =
  "text-sm font-medium text-muted-foreground hover:text-accent transition-colors relative group rounded-full px-3 py-1.5 glass";

// Temporarily hide portfolio while the section is disabled.
const SHOW_PORTFOLIO = false;

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToSection, scrollToTop } = useScrollToSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPortfolioActive = location.pathname.includes("/portfolio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (item: NavItem) => {
    if (item.type === "page") {
      navigate(getPortfolioPath(language));
      closeMobileMenu();
      return;
    }

    const homePath = getHomePath(language);
    if (location.pathname !== homePath) {
      navigate(`${homePath}${item.href}`);
      closeMobileMenu();
      return;
    }

    scrollToSection(item.href, closeMobileMenu);
  };

  const handleLanguageChange = (targetLang: "pl" | "en") => {
    const normalized = targetLang === "pl" ? "pl" : "en";
    setLanguage(normalized);
    persistLanguage(normalized);
    const mappedPath = getEquivalentPath(location.pathname, normalized);
    navigate(`${mappedPath}${location.search}${location.hash}`);
  };

  const renderSectionLink = (item: NavItem, variant: "desktop" | "mobile") => (
    <motion.button
      type="button"
      key={item.key}
      onClick={() => handleNavClick(item)}
      className={cn(
        variant === "desktop"
          ? sectionLinkClass
          : "text-left text-base font-medium text-primary py-2",
      )}
      whileHover={variant === "desktop" ? { y: -2 } : undefined}
    >
      {t(item.key)}
      {variant === "desktop" && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      )}
    </motion.button>
  );

  const renderPortfolioLink = (variant: "desktop" | "mobile") => (
    <motion.button
      type="button"
      onClick={() => handleNavClick(portfolioNavItem)}
      className={cn(
        variant === "desktop"
          ? portfolioLinkClass
          : "text-left text-base font-medium text-muted-foreground hover:text-accent py-2 transition-colors",
        isPortfolioActive && "text-accent",
      )}
      whileHover={variant === "desktop" ? { y: -2 } : undefined}
    >
      {t(portfolioNavItem.key)}
      {variant === "desktop" && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
      )}
    </motion.button>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-premium-lg"
          : "bg-background/70 backdrop-blur-xl border-b border-border/30"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.button
            type="button"
            className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const homePath = getHomePath(language);
              if (location.pathname === homePath && !location.hash) {
                scrollToTop();
                return;
              }
              navigate(homePath);
            }}
          >
            <span className="text-accent">SG</span>WebLab
            <span className="text-accent">.</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {sectionNavItems.map((item) => renderSectionLink(item, "desktop"))}
            </div>
            {SHOW_PORTFOLIO && (
              <>
                <span
                  className="h-4 w-px bg-border/50 shrink-0"
                  aria-hidden="true"
                />
                {renderPortfolioLink("desktop")}
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle
              language={language}
              onLanguageChange={handleLanguageChange}
              variant="desktop"
            />
            <Button
              variant="hero"
              size="sm"
              onClick={() => handleNavClick(sectionNavItems[2])}
            >
              {t("nav.cta.contact")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? t("nav.menu.close") : t("nav.menu.open")
            }
            className="md:hidden p-2 text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {sectionNavItems.map((item) => renderSectionLink(item, "mobile"))}

              {SHOW_PORTFOLIO && (
                <div
                  className="border-t border-border/30 pt-3 mt-0.5"
                  role="separator"
                >
                  {renderPortfolioLink("mobile")}
                </div>
              )}

              <LanguageToggle
                language={language}
                onLanguageChange={handleLanguageChange}
                variant="mobile"
              />

              <Button
                variant="hero"
                className="w-full mt-2"
                onClick={() => handleNavClick(sectionNavItems[2])}
              >
                {t("nav.cta.contact")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
