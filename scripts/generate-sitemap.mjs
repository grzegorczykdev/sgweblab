import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { projects } from "../src/data/projects.ts";

const BASE_URL = "https://sgweblab.com";
const today = new Date().toISOString().slice(0, 10);

const homePaths = ["/pl", "/en"];
const portfolioPaths = ["/portfolio/pl", "/portfolio/en"];

const projectEntries = projects.flatMap((project) => {
  const pl = `/portfolio/${project.slug.pl}/pl`;
  const en = `/portfolio/${project.slug.en}/en`;
  return [pl, en];
});

const urls = [...new Set([...homePaths, ...portfolioPaths, ...projectEntries])];

const buildAlternates = (path) => {
  if (path === "/pl" || path === "/en") {
    return {
      pl: `${BASE_URL}/pl`,
      en: `${BASE_URL}/en`,
      xDefault: `${BASE_URL}/en`,
    };
  }

  if (path === "/portfolio/pl" || path === "/portfolio/en") {
    return {
      pl: `${BASE_URL}/portfolio/pl`,
      en: `${BASE_URL}/portfolio/en`,
      xDefault: `${BASE_URL}/portfolio/en`,
    };
  }

  const match = path.match(/^\/portfolio\/(.+)\/(pl|en)$/);
  if (match) {
    const [, slug, lang] = match;
    const project = projects.find((item) => item.slug[lang] === slug);
    if (project) {
      return {
        pl: `${BASE_URL}/portfolio/${project.slug.pl}/pl`,
        en: `${BASE_URL}/portfolio/${project.slug.en}/en`,
        xDefault: `${BASE_URL}/portfolio/${project.slug.en}/en`,
      };
    }
  }

  return {
    pl: `${BASE_URL}/pl`,
    en: `${BASE_URL}/en`,
    xDefault: `${BASE_URL}/en`,
  };
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((path) => {
    const alternates = buildAlternates(path);
    const isHome = path === "/pl" || path === "/en";
    return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${isHome ? "1.0" : "0.8"}</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="${alternates.pl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.xDefault}"/>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(process.cwd(), "public/sitemap.xml"), xml, "utf8");
console.log(`Sitemap generated: ${urls.length} URLs`);
