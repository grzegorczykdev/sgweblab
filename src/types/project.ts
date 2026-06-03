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
  /** Short elevator pitch - read-aloud summary shown at the top of the project page. */
  summary?: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface ProjectMediaFrame {
  /** CSS aspect ratio, e.g. "16/7" (30% shorter than the default 16/10 frame). */
  aspectRatio: string;
  objectFit?: "cover" | "contain";
}

export interface Project {
  id: string;
  category: ProjectCategory;
  techStack: string[];
  /** WebP/JPG paths in public/portfolio/. Spec: src/data/projects.ts (file header). */
  images: ProjectImages;
  /** Optional looped demo: MP4/WebM 16:9, 1280×720, 5-15 s, no audio, ~500 KB-1.5 MB. */
  video?: string;
  /** Architecture diagram (full width, object-contain). */
  architectureImage?: string;
  /** Fixed aspect frame for images - fills without letterboxing bars. */
  mediaFrame?: ProjectMediaFrame;
  slug: Localized<string>;
  seo: {
    title: Localized<string>;
    description: Localized<string>;
  };
  content: Localized<ProjectContent>;
  /** Optional link to the project's public source repository. */
  githubUrl?: string;
  /** Optional link to a live deployed demo. */
  liveDemoUrl?: string;
  /** Default: true. Set to false to hide the portfolio disclaimer on this project only. */
  showDisclaimer?: boolean;
}

export type ProjectFilterCategory = ProjectCategory | "all";
