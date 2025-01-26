export type Chapter = "Introduction" | "Projects" | "Contact" | "AboutMe";

export interface ChapterData {
  chapters: {
    [K in Chapter]: React.ReactNode;
  };
}

export interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
