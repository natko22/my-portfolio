/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  X,
  ScrollText,
  ArrowLeft,
  LayoutGrid,
  List,
  BookOpen,
  BookOpenCheck,
  BookOpenText,
  ListTree,
  NotebookTabs,
  NotebookIcon,
  NotebookTextIcon,
} from "lucide-react";

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
  onBookStateChange?: (isOpen: boolean) => void;
}

const BookLayout: React.FC<BookLayoutProps> = memo(
  ({ className = "", onBookStateChange }) => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    const [showToc, setShowToc] = useState(true);
    const {
      isOpen,
      setIsOpen,
      isClosing,
      setIsClosing,
      currentChapter,
      setCurrentChapter,
      handleClose,
      handleClosingComplete,
      mountKey,
    } = useBookState();

    // Notify parent component of book state changes
    useEffect(() => {
      if (onBookStateChange) {
        onBookStateChange(isOpen);
      }
    }, [isOpen, onBookStateChange]);

    const useSinglePageView = windowWidth !== null && windowWidth < 900;

    //  detects if the user is viewing from LinkedIn's browser
    const isLinkedInBrowser = useCallback(() => {
      if (typeof window === "undefined") return false;

      // This is an approximation - LinkedIn may use different indicators
      const userAgent = navigator.userAgent.toLowerCase();
      return (
        userAgent.includes("linkedin") ||
        // Also check for referrer
        (document.referrer &&
          document.referrer.toLowerCase().includes("linkedin"))
      );
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);

        if (isLinkedInBrowser()) {
          document.documentElement.classList.add("linkedin-view");
        } else {
          document.documentElement.classList.remove("linkedin-view");
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isLinkedInBrowser]);

    const bookHeightClass =
      isOpen && windowWidth !== null
        ? windowWidth < 375 // xxxs to xxs
          ? "h-[62vh]" // Ultra small screens
          : windowWidth < 640 // xxs to sm
          ? "h-[75vh]" // Small screens
          : windowWidth < 768 // sm to md
          ? "h-[80vh]" // Medium-small screens
          : windowWidth < 900 // md to tablet
          ? "h-[78vh]" // Medium screens
          : windowWidth < 1024 // tablet to lg
          ? "h-[80vh]" // Medium-large screens
          : "h-[82vh]" // Large screens
        : "h-[75vh] xxs:h-[70vh] sm:h-[80vh] lg:h-[85vh]";

    // New useEffect to fix mobile animation issues
    useEffect(() => {
      // Reset any problematic states when toggling between views
      if (useSinglePageView && isClosing) {
        const timer = setTimeout(() => {
          setIsClosing(false);
          setIsOpen(false);
          setShowToc(true);
        }, 600);

        return () => clearTimeout(timer);
      }
    }, [useSinglePageView, isClosing, setIsClosing, setIsOpen]);

    // Prevents hydration errors & ensures `isOpen` is initialized before calling `getRotateY()`
    const getRotateY = useCallback(() => {
      if (windowWidth === null) return 10;
      return isOpen ? 0 : windowWidth > 900 ? 10 : 5;
    }, [windowWidth, isOpen]);

    // Function to toggle between TOC and content on mobile
    const toggleView = useCallback(() => {
      if (useSinglePageView) {
        setShowToc((prev) => !prev);
      }
    }, [useSinglePageView]);

    // When a chapter is selected on mobile, automatically show the content
    const handleChapterSelect = useCallback(
      (chapter: string) => {
        setCurrentChapter(chapter as Chapter);
        if (useSinglePageView) {
          setShowToc(false);
        }
      },
      [useSinglePageView, setCurrentChapter]
    );

    //  function to handle mobile close button
    const handleMobileClose = useCallback(() => {
      // First set closing state to trigger fade animation
      setIsClosing(true);

      // Ensure animation completes and book actually closes
      setTimeout(() => {
        handleClosingComplete();
      }, 500);
    }, [setIsClosing, handleClosingComplete]);

    return (
      <main
        role="main"
        className={`flex flex-col items-center justify-start w-full overflow-hidden p-4 pt-8 sm:p-6 md:p-8 lg:p-2 min-h-screen ${className}`}
      >
        <div className="fixed inset-0 -z-10">
          <Image
            src="/linear-bg.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div
          className={`relative w-full max-w-[80rem] 
            ${bookHeightClass}
            min-h-[500px] mt-2 xxxs:mt-3 xxs:mt-3 sm:mt-2 md:mt-0
            filter drop-shadow-2xl px-2 xxxs:px-3 xxs:px-4 sm:px-6 md:px-8 mb-6 ${
              useSinglePageView && isOpen ? "mb-16" : "mb-8"
            } transition-all duration-300`}
        >
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
            } z-10 max-h-full overflow-visible perspective-1000`}
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            {useSinglePageView ? (
              // Mobile layout - single page with toggle
              <div className="flex flex-col h-full">
                <motion.div
                  className="w-full book-page rounded-lg h-full max-h-full md:max-h-none relative bg-book-light flex-1 shadow-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isClosing ? 0 : 1,
                    backgroundColor: isClosing
                      ? "rgba(255, 255, 255, 0)"
                      : "var(--color-primary-light)",
                  }}
                  onAnimationComplete={() => {
                    if (isClosing) {
                      handleClosingComplete();
                    }
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundImage: 'url("/textured-canvas-surface.webp")',
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-book-bg to-transparent z-10 pointer-events-none" />

                  {/*  (TOC + Close) */}
                  <div className="pointer-events-none">
                    <div
                      style={{
                        position: "fixed",
                        bottom: "2.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        WebkitTransform: "translateX(-50%)",
                        willChange: "transform",
                        zIndex: 9999,
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                        WebkitPerspective: 1000,
                      }}
                      className="flex gap-4 pointer-events-auto"
                    >
                      {showToc ? (
                        <button
                          onClick={handleMobileClose}
                          className="w-12 h-12 flex items-center justify-center  
                            bg-book-accent-light rounded-full shadow-md 
                            active:scale-95 hover:bg-book-accent-dark transition"
                          aria-label="Close Book"
                        >
                          <X size={22} />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={toggleView}
                            className="w-12 h-12 flex items-center justify-center 
                              bg-book-accent-light rounded-full shadow-md 
                              active:scale-95 hover:bg-book-accent-dark transition"
                            aria-label="Table of Contents"
                          >
                            <List size={22} />
                          </button>
                          <button
                            onClick={handleMobileClose}
                            className="w-12 h-12 flex items-center justify-center 
                              bg-book-accent-light rounded-full shadow-md 
                              active:scale-95 hover:bg-book-accent-dark transition"
                            aria-label="Close Book"
                          >
                            <X size={22} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {showToc ? (
                    <div className="p-2 h-full relative overflow-y-auto no-scrollbar z-[10] pb-24">
                      <TableOfContents
                        currentChapter={currentChapter}
                        onChapterSelect={handleChapterSelect}
                        onClose={handleMobileClose}
                        isMobile={true}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 overflow-y-auto no-scrollbar chapter-scroll-container">
                        <div className="px-4 pt-2 pb-24 min-h-full mt-12">
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
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-book-bg to-transparent z-50 pointer-events-none" />
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
                    {" "}
                    {/* Top Fade Effect on Left Page */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10 pointer-events-none" />
                    <TableOfContents
                      currentChapter={currentChapter}
                      onChapterSelect={(chapter) =>
                        setCurrentChapter(chapter as Chapter)
                      }
                      onClose={handleClose}
                    />
                    {/* Bottom Fade Effect on Left Page */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10 pointer-events-none" />
                  </div>
                )}

                <div className="w-[50%] book-page content p-8 md:p-12 rounded-r-lg h-full relative">
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Page Fade Effects */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10 pointer-events-none" />
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
        {/* Author Credit */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="fixed bottom-4 left-0 right-0 text-xs text-center text-black italic font-serif tracking-wide opacity-70 z-[5] pointer-events-none"
          >
            <span className="block text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold text-black/70 italic tracking-tight mt-4 px-2">
              ✧ Designed & Developed by Anastasia Tsapanidou Kornilaki ✧
            </span>
          </motion.div>
        )}
      </main>
    );
  }
);

export default BookLayout;
