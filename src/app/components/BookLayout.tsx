/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/display-name */
"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useBookState } from "../hooks/useBookState";
import { BookCover } from "./BookCover";
import { TableOfContents } from "./TableOfContents";
import { ClosingPage } from "./ClosingPage";
import { ChapterContent, chapters } from "../content/ChapterContent";
import { Chapter } from "@/app/types/index";

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

// Memoized component to prevent unnecessary re-renders
const BookLayout: React.FC<BookLayoutProps> = memo(() => {
  // Extracts state management functions from the custom hook
  const {
    isOpen,
    setIsOpen,
    isClosing,
    currentChapter,
    setCurrentChapter,
    handleClose,
    handleClosingComplete,
    mountKey,
  } = useBookState();

  return (
    <div className="  flex items-center justify-center mt-12 ">
      {/* Container for the entire book layout */}
      <Image
        src="/linear-bg.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10 "
      />

      <div className="relative w-full max-w-[80rem] h-[90vh] md:h-[50rem] -mt-16 filter drop-shadow-2xl px-4 sm:px-8">
        {/* Book cover component - opens the book when clicked */}
        <BookCover isOpen={isOpen} onOpen={() => setIsOpen(true)} />

        {/* Animated book content wrapper */}
        <motion.div
          key={mountKey}
          initial={{ opacity: 0, scale: 0.95, rotateY: 10 }} // Initially hidden
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.95,
            rotateY: isOpen ? 0 : window.innerWidth > 768 ? 10 : 5,
          }} // Fade in/out based on `isOpen`
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className={`absolute top-6 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          {/* Book content layout */}
          <div className="flex gap-1 h-full">
            {/* Handles book closing animation */}
            {isClosing ? (
              <ClosingPage
                key={`closing-${mountKey}`}
                isClosing={isClosing}
                onAnimationComplete={handleClosingComplete}
              >
                <TableOfContents
                  currentChapter={currentChapter}
                  onChapterSelect={(chapter) =>
                    setCurrentChapter(chapter as Chapter)
                  }
                  onClose={handleClose}
                />
              </ClosingPage>
            ) : (
              // Table of Contents section (Left Page)
              <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
                <TableOfContents
                  currentChapter={currentChapter}
                  onChapterSelect={(chapter) =>
                    setCurrentChapter(chapter as Chapter)
                  }
                  onClose={handleClose}
                />
              </div>
            )}

            {/* Chapter Content section (Right Page) */}
            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
              <div className="absolute inset-0 overflow-hidden">
                {/* Top gradient for smooth content fade-in */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10" />

                {/* Scrollable content area */}
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
                    {/* Conditionally renders chapter content */}
                    {currentChapter in chapters ? (
                      <ChapterContent
                        key={`chapter-content-${mountKey}`}
                        chapter={currentChapter as Chapter}
                      />
                    ) : (
                      <p className="text-center text-red-500">
                        Chapter not found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom gradient for smooth content fade-out */}
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
