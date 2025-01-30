import { useState } from "react";
import { Chapter } from "../types";

export const useBookState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter>("Prologue");

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
