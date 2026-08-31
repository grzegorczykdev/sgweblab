import {
  buildLocalizedPath,
  getPrivacyPath,
  isPrivacyPathSegment,
  parseLocalizedPath,
} from "@/lib/i18n";
import { projects } from "@/data/projects";
import type {
  Language,
  Project,
  ProjectFilterCategory,
} from "@/types/project";

export const BASE_URL = "https://sgweblab.com";

/** Max image height/width before capping to a 16:10 frame (taller images are centered). */
export const PROJECT_MEDIA_MAX_ASPECT = 10 / 16;

export const shouldCapProjectMediaImage = (
  naturalWidth: number,
  naturalHeight: number,
): boolean =>
  naturalWidth > 0 && naturalHeight / naturalWidth > PROJECT_MEDIA_MAX_ASPECT;

export const findProjectBySlug = (
  lang: Language,
  slug: string,
): Project | undefined =>
  projects.find((project) => project.slug[lang] === slug);

export const getProjectPath = (lang: Language, project: Project): string =>
  buildLocalizedPath(["portfolio", project.slug[lang]], lang);

export const getProjectUrl = (lang: Language, project: Project): string =>
  `${BASE_URL}${getProjectPath(lang, project)}`;

export const getProjectAlternateUrls = (
  project: Project,
): { pl: string; en: string; xDefault: string } => ({
  pl: getProjectUrl("pl", project),
  en: getProjectUrl("en", project),
  xDefault: getProjectUrl("en", project),
});

export const getProjectCoverImage = (project: Project): string =>
  project.images[0];

export const getImageAlt = (project: Project, lang: Language): string =>
  lang === "pl"
    ? `Mockup projektu: ${project.content[lang].title}`
    : `Project mockup: ${project.content[lang].title}`;

export const filterProjects = (
  category: ProjectFilterCategory,
): Project[] =>
  category === "all"
    ? projects
    : projects.filter((project) => project.category === category);

export const getEquivalentPath = (
  pathname: string,
  targetLang: Language,
): string => {
  const { lang, segments } = parseLocalizedPath(pathname);
  const sourceLang = lang ?? targetLang;

  if (segments[0] === "portfolio" && segments[1]) {
    const project = findProjectBySlug(sourceLang, segments[1]);
    if (project) {
      return getProjectPath(targetLang, project);
    }
  }

  if (segments[0] === "portfolio") {
    return buildLocalizedPath(["portfolio"], targetLang);
  }

  if (isPrivacyPathSegment(segments[0])) {
    return getPrivacyPath(targetLang);
  }

  return buildLocalizedPath([], targetLang);
};
