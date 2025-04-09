export type Chapter =
  | "Prologue"
  | "Chapter I: The Early Days"
  | "Chapter II: Architecting My Own Path"
  | "Chapter III: The Workshop of Reality"
  | "The Correspondence Chamber"
  | "Glossary of Tools"
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
