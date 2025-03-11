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

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const BookLayout: React.FC<BookLayoutProps> = memo(() => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [showToc, setShowToc] = useState(true);
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

  // Determine if we're on mobile
  const isMobile = windowWidth !== null && windowWidth < 768;

  // Prevents hydration errors & ensures `isOpen` is initialized before calling `getRotateY()`
  const getRotateY = useCallback(() => {
    if (windowWidth === null) return 10;
    return isOpen ? 0 : windowWidth > 768 ? 10 : 5;
  }, [windowWidth, isOpen]);

  // Function to toggle between TOC and content on mobile
  const toggleView = useCallback(() => {
    if (isMobile) {
      setShowToc((prev) => !prev);
    }
  }, [isMobile]);

  // When a chapter is selected on mobile, automatically show the content
  const handleChapterSelect = useCallback(
    (chapter: string) => {
      setCurrentChapter(chapter as Chapter);
      if (isMobile) {
        setShowToc(false);
      }
    },
    [isMobile, setCurrentChapter]
  );

  return (
    <div className="flex items-center justify-center w-full overflow-hidden p-4 sm:p-6 md:p-8 lg:p-2 ">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/linear-bg.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative w-full max-w-[80rem] h-[80vh] xxxs:h-[82vh] xxs:h-[85vh] sm:h-[88vh] md:h-[42rem] lg:h-[45rem] xl:h-[48rem] 2xl:h-[50rem] filter drop-shadow-2xl px-2 xxxs:px-3 xxs:px-4 sm:px-6 md:px-8">
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
          className={`absolute top-0 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          {isMobile ? (
            // Mobile layout - single page with toggle
            <div className="flex flex-col h-full">
              <motion.div
                className="w-full book-page rounded-lg h-full relative overflow-hidden bg-book-light flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--color-primary-light)",
                  backgroundImage: 'url("/textured-canvas-surface.webp")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "multiply",
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {showToc ? (
                  <div className="p-6 h-full relative" style={{ zIndex: 10 }}>
                    <div className="flex justify-between items-center mb-6 ">
                      <button
                        onClick={toggleView}
                        className="text-book-dark px-4 py-2 rounded bg-book-accent-light hover:bg-book-accent transition-colors"
                      >
                        View Chapter
                      </button>
                      <button
                        onClick={handleClose}
                        className="text-book-dark px-4 py-2 rounded bg-book-accent-light hover:bg-book-accent transition-colors"
                      >
                        Close Book
                      </button>
                    </div>
                    <TableOfContents
                      currentChapter={currentChapter}
                      onChapterSelect={handleChapterSelect}
                      onClose={handleClose}
                      isMobile={true}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Page Fade Effects */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-book-bg to-transparent z-10" />
                    <div className="absolute inset-0 overflow-y-auto no-scrollbar chapter-scroll-container">
                      <div className="flex justify-between items-center px-4 pt-4 pb-2 sticky top-0 z-20 bg-book-bg bg-opacity-90">
                        <button
                          onClick={toggleView}
                          className="text-book-dark px-4 py-2 rounded bg-book-accent-light hover:bg-book-accent transition-colors"
                        >
                          Table of Contents
                        </button>
                        <button
                          onClick={handleClose}
                          className="text-book-dark px-4 py-2 rounded bg-book-accent-light hover:bg-book-accent transition-colors"
                        >
                          Close Book
                        </button>
                      </div>
                      <div className="px-4 pt-2 pb-16 min-h-full">
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
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-book-bg to-transparent z-10 pointer-events-none" />
                  </div>
                )}
              </motion.div>
            </div>
          ) : (
            // Desktop layout - two pages side by side
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
                    isMobile={false}
                  />
                </ClosingPage>
              ) : (
                <div className="w-[50%] book-page toc p-8 md:p-12 rounded-l-lg h-full relative">
                  <TableOfContents
                    currentChapter={currentChapter}
                    onChapterSelect={(chapter) =>
                      setCurrentChapter(chapter as Chapter)
                    }
                    onClose={handleClose}
                  />
                </div>
              )}

              <div className="w-[50%] book-page content p-8 md:p-12 rounded-r-lg h-full relative">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Page Fade Effects */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10" />
                  <div className="absolute inset-0 overflow-y-auto no-scrollbar chapter-scroll-container">
                    <div className="px-4 pt-16 pb-16 min-h-full">
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
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
});

export default BookLayout;
