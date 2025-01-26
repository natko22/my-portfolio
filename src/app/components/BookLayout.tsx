/* eslint-disable react/display-name */
"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useBookState } from "../hooks/useBookState";
import { BookCover } from "./BookCover";
import { TableOfContents } from "./TableOfContents";
import { ChapterContent } from "./ChapterContent";
import { ClosingPage } from "./ClosingPage";

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const BookLayout: React.FC<BookLayoutProps> = memo(() => {
  const {
    isOpen,
    setIsOpen,
    isClosing,
    currentChapter,
    setCurrentChapter,
    handleClose,
    handleClosingComplete,
  } = useBookState();

  return (
    <div className="min-h-screen bg-book-bg flex items-center justify-center">
      <div className="relative w-[80rem] h-[50rem] -mt-16 filter drop-shadow-2xl">
        <BookCover isOpen={isOpen} onOpen={() => setIsOpen(true)} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          className={`absolute top-0 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          <div className="flex gap-1 h-full">
            {isClosing ? (
              <ClosingPage
                isClosing={isClosing}
                onAnimationComplete={handleClosingComplete}
              >
                <TableOfContents
                  currentChapter={currentChapter}
                  onChapterSelect={setCurrentChapter}
                  onClose={handleClose}
                />
              </ClosingPage>
            ) : (
              <div className="w-[50%] book-page toc p-12 rounded-l-lg h-full relative">
                <TableOfContents
                  currentChapter={currentChapter}
                  onChapterSelect={setCurrentChapter}
                  onClose={handleClose}
                />
              </div>
            )}

            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10" />
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
                    <ChapterContent chapter={currentChapter} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default BookLayout;
