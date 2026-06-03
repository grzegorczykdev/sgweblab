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
      {seo.robots && <meta name="robots" content={seo.robots} />}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.image} />
      <meta
        property="og:locale"
        content={seo.lang === "pl" ? "pl_PL" : "en_US"}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <link rel="alternate" hrefLang="pl" href={seo.alternates.pl} />
      <link rel="alternate" hrefLang="en" href={seo.alternates.en} />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={seo.alternates.xDefault}
      />
    </Helmet>
  );
};

export default SeoManager;
