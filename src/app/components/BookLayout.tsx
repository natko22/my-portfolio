/* eslint-disable react/display-name */
"use client";

import { memo, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useBookState } from "../hooks/useBookState";
import { TableOfContents } from "./TableOfContents";
import { ClosingPage } from "./ClosingPage";
import { ChapterContent, chapters } from "../content/ChapterContent";
import { Chapter } from "@/app/types/index";
import BookCover from "./BookCover";

//  Import `BookCover` dynamically

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const BookLayout: React.FC<BookLayoutProps> = memo(() => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Prevents hydration errors & ensures `isOpen` is initialized before calling `getRotateY()`
  const getRotateY = useCallback(() => {
    if (windowWidth === null) return 10;
    return isOpen ? 0 : windowWidth > 768 ? 10 : 5;
  }, [windowWidth, isOpen]);

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/linear-bg.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative w-full max-w-[80rem] h-[90vh] md:h-[50rem] -mt-16 filter drop-shadow-2xl px-4 sm:px-8">
        <BookCover isOpen={isOpen} onOpen={() => setIsOpen(true)} />

        <motion.div
          key={mountKey}
          initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.95,
            rotateY: getRotateY(),
          }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className={`absolute top-6 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          <div className="flex gap-1 h-full">
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

            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
              <div className="absolute inset-0 overflow-hidden">
                {/*Page Fade Effects */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10" />
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
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
