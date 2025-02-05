import { useState } from "react";
import { Chapter } from "../types";

export const useBookState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter>("Prologue");
  const [mountKey, setMountKey] = useState(0);

  const handleClose = () => setIsClosing(true);
  const handleClosingComplete = () => {
    setIsClosing(false);
    setIsOpen(false);
    setMountKey((prev) => prev + 1);
  };

  return {
    isOpen,
    setIsOpen,
    isClosing,
    currentChapter,
    setCurrentChapter,
    handleClose,
    handleClosingComplete,
    mountKey,
  };
};
