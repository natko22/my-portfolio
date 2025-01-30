export type Chapter =
  | "Prologue"
  | "Chapter I: Tales of Creation"
  | "Chapter II: The Correspondence Chamber"
  | "Chapter III: Author's Note";

export interface ChapterData {
  chapters: {
    [K in Chapter]: React.ReactNode;
  };
}

export interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
