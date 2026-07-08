import { useLanguage } from "@/contexts/LanguageContext";
import { getHomePath } from "@/lib/i18n";
import { Navigate } from "react-router-dom";

const PortfolioPage = () => {
  const { language } = useLanguage();

  // Temporarily hidden: portfolio section is disabled for now.
  return <Navigate to={getHomePath(language)} replace />;
};

export default PortfolioPage;
