import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SeoManager from "@/components/SeoManager";
import LocalizedRedirect from "@/components/LocalizedRedirect";
import NotFound from "@/pages/NotFound";
import LangLayout from "@/layouts/LangLayout";
import HomePage from "@/pages/HomePage";
import PortfolioPage from "@/pages/PortfolioPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import PrivacyPage from "@/pages/PrivacyPage";

const App = () => (
  <TooltipProvider>
    <HelmetProvider>
      <Toaster />
      <BrowserRouter>
        <SeoManager />
        <Routes>
          <Route element={<LangLayout />}>
            <Route path="portfolio/:slug/:lang" element={<ProjectDetailPage />} />
            <Route path="portfolio/:lang" element={<PortfolioPage />} />
            <Route path="polityka-prywatnosci/:lang" element={<PrivacyPage />} />
            <Route path="privacy-policy/:lang" element={<PrivacyPage />} />
            <Route path=":lang" element={<HomePage />} />
          </Route>

          <Route path="portfolio/:slug" element={<LocalizedRedirect />} />
          <Route path="portfolio" element={<LocalizedRedirect />} />
          <Route index element={<LocalizedRedirect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </TooltipProvider>
);

export default App;
