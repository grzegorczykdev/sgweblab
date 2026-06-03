import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { resolveSeo } from "@/lib/seo";

const SeoManager = () => {
  const { pathname } = useLocation();
  const seo = resolveSeo(pathname);

  return (
    <Helmet htmlAttributes={{ lang: seo.lang }}>
      <link rel="canonical" href={seo.canonical} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:locale" content={seo.lang === "pl" ? "pl_PL" : "en_US"} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <link rel="alternate" hrefLang="pl" href={seo.alternates.pl} />
      <link rel="alternate" hrefLang="en" href={seo.alternates.en} />
      <link rel="alternate" hrefLang="x-default" href={seo.alternates.xDefault} />
    </Helmet>
  );
};

export default SeoManager;
