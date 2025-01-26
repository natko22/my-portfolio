import { useState } from "react";
import { chapters } from "../components/ChapterContent";

export const useBookState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentChapter, setCurrentChapter] =
    useState<keyof typeof chapters>("Introduction");

  const handleClose = () => setIsClosing(true);
  const handleClosingComplete = () => {
    setIsClosing(false);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    isClosing,
    currentChapter,
    setCurrentChapter,
    handleClose,
    handleClosingComplete,
  };
};
