export type Chapter =
  | "Prologue"
  | "Chapter I: Tales of Creation"
  | "Chapter II: Architecting My Own Path"
  | "Chapter III: The Workshop of Reality"
  | "The Correspondence Chamber"
  | "Author's Note";

export interface ChapterData {
  chapters: {
    [K in Chapter]: React.ReactNode;
  };
}

export interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
