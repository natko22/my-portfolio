/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useBookState } from "../hooks/useBookState";

// Define text constants
const text = `Welcome to my story. Like every developer, my path has been shaped by each line of code I've written and every challenge I've faced. This is a glimpse into my journey — where every project is a new chapter and every experience adds a page to the book of my growth as a web developer.`;
const authorText = "— The Author";

const PEN_SIZE = 50;

// Define types for timers and intervals
type TimerRef = number | null;
type IntervalRef = number | null;

const Prologue = () => {
  // State declarations
  const [startAnimation, setStartAnimation] = useState(false);
  const [startAuthorAnimation, setStartAuthorAnimation] = useState(false);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [authorLetterIndex, setAuthorLetterIndex] = useState(-1);
  const [isMainTextComplete, setIsMainTextComplete] = useState(false);
  const [isAuthorComplete, setIsAuthorComplete] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Track if the book was recently closed (for resetting animation)
  const [wasRecentlyClosed, setWasRecentlyClosed] = useState(false);

  // Access book state if available, but make component work even if not
  let isBookOpen = true;
  let isBookClosing = false;

  try {
    // Access book state directly - but don't fail if it's not available
    const bookState = useBookState();
    isBookOpen = bookState?.isOpen ?? true;
    isBookClosing = bookState?.isClosing ?? false;
  } catch (error) {
    // If useBookState hook isn't available, default to assuming book is open
    console.log("Book state not available, assuming book is open");
  }

  // Refs with proper typing and initialization
  const containerRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLSpanElement>(null);

  // Initialize timer refs with null
  const animationTimer = useRef<TimerRef>(null);
  const mainTextInterval = useRef<IntervalRef>(null);
  const authorTextInterval = useRef<IntervalRef>(null);

  // Track if we need to reset next time book opens
  const needsResetRef = useRef(false);

  // Track previous book state to detect changes
  const prevIsOpenRef = useRef(isBookOpen);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (animationTimer.current) {
      window.clearTimeout(animationTimer.current);
      animationTimer.current = null;
    }

    if (mainTextInterval.current) {
      window.clearInterval(mainTextInterval.current);
      mainTextInterval.current = null;
    }

    if (authorTextInterval.current) {
      window.clearInterval(authorTextInterval.current);
      authorTextInterval.current = null;
    }
  }, []);

  // Complete reset of the animation
  const resetAnimation = useCallback(() => {
    clearAllTimers();

    // Reset all state
    setStartAnimation(false);
    setStartAuthorAnimation(false);
    setPenPosition({ x: 0, y: 0 });
    setCurrentLetterIndex(-1);
    setAuthorLetterIndex(-1);
    setIsMainTextComplete(false);
    setIsAuthorComplete(false);
    setHasInitialized(false);

    animationTimer.current = window.setTimeout(() => {
      setHasInitialized(true);
      setStartAnimation(true);
    }, 1200);

    // Clear the reset flag
    needsResetRef.current = false;
  }, [clearAllTimers]);

  // Initialize animation on mount with proper delay
  useEffect(() => {
    // Add a check to see if we're coming from the book cover
    const isFirstOpen = sessionStorage.getItem("book-first-open") !== "false";

    if (isFirstOpen) {
      // First time opening from cover - add extra delay for book opening animation
      sessionStorage.setItem("book-first-open", "false");
      animationTimer.current = window.setTimeout(() => {
        resetAnimation();
      }, 800); // Extra delay for first open
    } else {
      // Normal navigation from menu - start immediately without extra delays
      clearAllTimers();
      setHasInitialized(true);
      setStartAnimation(true);
    }

    // Clean up on unmount
    return () => {
      clearAllTimers();
    };
  }, []); // Only run on mount

  // Watch for book state changes
  useEffect(() => {
    // If book was just closed, mark that we need to reset next time
    if (prevIsOpenRef.current && !isBookOpen) {
      needsResetRef.current = true;
      clearAllTimers();
      setWasRecentlyClosed(true);
      // Reset the first-open flag when book closes
      sessionStorage.setItem("book-first-open", "true");
    }

    // If book just opened and needs reset, do it
    if (!prevIsOpenRef.current && isBookOpen && needsResetRef.current) {
      resetAnimation();
      setWasRecentlyClosed(false);
    }

    // Update previous state
    prevIsOpenRef.current = isBookOpen;
  }, [isBookOpen, isBookClosing, resetAnimation, clearAllTimers]);

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, mark for reset
        needsResetRef.current = true;
      } else if (needsResetRef.current && hasInitialized) {
        // Tab is visible again and needs reset
        resetAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetAnimation, hasInitialized]);

  // Main text animation - synchronized with pen
  useEffect(() => {
    if (!startAnimation || !hasInitialized) return;

    // Clear any existing interval
    if (mainTextInterval.current) {
      window.clearInterval(mainTextInterval.current);
    }

    // Start the writing animation
    const interval = window.setInterval(() => {
      if (isBookClosing) {
        clearInterval(interval);
        return;
      }

      setCurrentLetterIndex((prev) => {
        if (prev < text.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsMainTextComplete(true);
          setStartAuthorAnimation(true);
          return prev;
        }
      });
    }, 180);

    mainTextInterval.current = interval;

    return () => {
      if (mainTextInterval.current) {
        window.clearInterval(mainTextInterval.current);
      }
    };
  }, [startAnimation, hasInitialized, isBookClosing]);

  // Author text animation
  useEffect(() => {
    if (!startAuthorAnimation || !hasInitialized) return;

    // Clear any existing interval
    if (authorTextInterval.current) {
      window.clearInterval(authorTextInterval.current);
    }

    const interval = window.setInterval(() => {
      if (isBookClosing) {
        clearInterval(interval);
        return;
      }

      setAuthorLetterIndex((prev) => {
        if (prev < authorText.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsAuthorComplete(true);
          return prev;
        }
      });
    }, 180);

    authorTextInterval.current = interval;

    return () => {
      if (authorTextInterval.current) {
        window.clearInterval(authorTextInterval.current);
      }
    };
  }, [startAuthorAnimation, hasInitialized, isBookClosing]);

  // Update pen position function
  const updatePenPosition = useCallback(
    (letters: HTMLCollectionOf<HTMLSpanElement>, index: number) => {
      if (!letters || index < 0 || !letters[index] || !containerRef.current)
        return;

      const rect = letters[index].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setPenPosition({
        x: rect.left - containerRect.left + rect.width,
        y: rect.top - containerRect.top - 60,
      });
    },
    []
  );

  // Update pen position for main text
  useEffect(() => {
    if (!containerRef.current || !hasInitialized || currentLetterIndex < 0)
      return;

    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      const letters = containerRef.current!.getElementsByClassName("main-text");
      if (letters.length > 0) {
        // Keep pen at last letter position when complete
        const targetIndex = isMainTextComplete
          ? text.length - 1
          : currentLetterIndex;
        updatePenPosition(
          letters as HTMLCollectionOf<HTMLSpanElement>,
          targetIndex
        );
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [
    currentLetterIndex,
    isMainTextComplete,
    hasInitialized,
    updatePenPosition,
  ]);

  // Update pen position for author text
  useEffect(() => {
    if (
      !authorRef.current ||
      !startAuthorAnimation ||
      !hasInitialized ||
      authorLetterIndex < 0
    )
      return;

    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      const letters = document.getElementsByClassName("author-text");
      if (letters.length > 0) {
        // Keep pen at last letter position when complete
        const targetIndex = isAuthorComplete
          ? authorText.length - 1
          : authorLetterIndex;
        updatePenPosition(
          letters as HTMLCollectionOf<HTMLSpanElement>,
          targetIndex
        );
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [
    authorLetterIndex,
    startAuthorAnimation,
    hasInitialized,
    isAuthorComplete,
    updatePenPosition,
  ]);

  // Check if on a new page load or book was closed/reopened
  useEffect(() => {
    // Force reset if needed on page load
    const needsInitialReset = sessionStorage.getItem("needs-animation-reset");
    if (needsInitialReset === "true" || wasRecentlyClosed) {
      resetAnimation();
      sessionStorage.removeItem("needs-animation-reset");
    }

    // Set flag for next page load
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("needs-animation-reset", "true");
      sessionStorage.setItem("book-first-open", "true");
    });
  }, [resetAnimation, wasRecentlyClosed]);

  // Show pen when writing or after completion (keeps pen visible)
  const showPen =
    hasInitialized &&
    !isBookClosing &&
    (currentLetterIndex >= 0 || authorLetterIndex >= 0) &&
    penPosition.x !== 0 &&
    penPosition.y !== 0;

  return (
    <div className="max-w-2xl mx-auto p-2">
      <h1
        className="text-center font-bold mb-2 text-book-dark 
text-2xl
xxxs:text-2xl 
xxs:text-2xl
sm:text-3xl 
small-md:text-3xl 
md:text-4xl 
lg:text-3xl"
      >
        {" "}
        Prologue
      </h1>
      <h2 className="text-book-accent text-center text-sm xxxs:text-base xxs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-body ">
        Every journey has a beginning, and this is mine.
      </h2>

      <div
        ref={containerRef}
        className="relative mt-12 text-xl xxxs:text-md xxs:text-lg sm:text-xl md:text-1xl lg:text-1xl font-handwritten leading-relaxed lg:px-4"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={`text-${index}`}
            className="main-text"
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                startAnimation && hasInitialized && index <= currentLetterIndex
                  ? 1
                  : 0,
            }}
            transition={{ duration: 0.1 }}
          >
            {char}
          </motion.span>
        ))}

        <div className="mt-6 text-left sm:mt-2 md:mt-4 text-gray-600 text-xl">
          {authorText.split("").map((char, index) => (
            <motion.span
              key={`author-${index}`}
              ref={index === 0 ? authorRef : null}
              className="author-text"
              initial={{ opacity: 0 }}
              animate={{
                opacity:
                  startAuthorAnimation &&
                  hasInitialized &&
                  index <= authorLetterIndex
                    ? 1
                    : 0,
              }}
              transition={{ duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {showPen && (
          <motion.div
            className="absolute w-10 h-12 pointer-events-none"
            style={{ left: `${penPosition.x}px`, top: `${penPosition.y}px` }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: [-1, 1, -1],
              y: [-1, 1, -1],
            }}
            transition={{
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
            }}
          >
            <Image
              src="/quill-pen.webp"
              alt="Writing Pen"
              width={PEN_SIZE}
              height={PEN_SIZE}
              className="w-full h-full"
              priority
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Prologue;
