export type Language = "pl" | "en";

export type ProjectCategory = "websites" | "systems";

export type Localized<T> = {
  pl: T;
  en: T;
};

/** From 1 to 3 image paths. See media spec in src/data/projects.ts (file header). */
export type ProjectImages =
  | [string]
  | [string, string]
  | [string, string, string];

export interface ProjectContent {
  title: string;
  /** Omit or leave empty to hide the client line on the project page. */
  clientName?: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface Project {
  id: string;
  category: ProjectCategory;
  techStack: string[];
  /** WebP/JPG paths in public/portfolio/. Spec: src/data/projects.ts (file header). */
  images: ProjectImages;
  /** Optional looped demo: MP4/WebM 16:9, 1280×720, 5-15 s, no audio, ~500 KB-1.5 MB. */
  video?: string;
  slug: Localized<string>;
  seo: {
    title: Localized<string>;
    description: Localized<string>;
  };
  content: Localized<ProjectContent>;
  /** Default: true. Set to false to hide the portfolio disclaimer on this project only. */
  showDisclaimer?: boolean;
}

export type ProjectFilterCategory = ProjectCategory | "all";
