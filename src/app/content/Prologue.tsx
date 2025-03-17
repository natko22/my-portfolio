/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useBookState } from "../hooks/useBookState";

// Define text constants
const text = `Every journey begins with a single step—or in this case, a single line of code. This book tells the story of my adventures in the world of web development, where each chapter represents a milestone in my growth as a developer.`;
const authorText = "— The Author";

// Animation variants for the text
const writingVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.18, duration: 0.3, ease: "easeInOut" },
  }),
};

const PEN_SIZE = 50;

// Define types for  timers and intervals
type TimerRef = number | null;
type IntervalRef = number | null;

const Prologue = () => {
  // State declarations
  const [startAnimation, setStartAnimation] = useState(false);
  const [startAuthorAnimation, setStartAuthorAnimation] = useState(false);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [authorLetterIndex, setAuthorLetterIndex] = useState(0);
  const [isMainTextComplete, setIsMainTextComplete] = useState(false);
  const [isAuthorComplete, setIsAuthorComplete] = useState(false);

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
    setCurrentLetterIndex(0);
    setAuthorLetterIndex(0);
    setIsMainTextComplete(false);
    setIsAuthorComplete(false);

    // Start animation after a delay
    animationTimer.current = window.setTimeout(() => {
      setStartAnimation(true);
    }, 500);

    // Clear the reset flag
    needsResetRef.current = false;
  }, [clearAllTimers]);

  // Text animation function
  const animateText = useCallback(
    (
      textLength: number,
      setIndex: React.Dispatch<React.SetStateAction<number>>,
      onComplete: () => void,
      intervalRef: React.RefObject<IntervalRef>
    ) => {
      // Clear any existing interval
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      // Create new interval
      const interval = window.setInterval(() => {
        // If book is closing, pause the animation but don't reset
        if (isBookClosing) {
          clearInterval(interval);
          return;
        }

        setIndex((prev) => {
          if (prev < textLength - 1) return prev + 1;

          // Clear interval when complete
          window.clearInterval(interval);
          onComplete();
          return prev;
        });
      }, 180);

      // Store the interval ID
      intervalRef.current = interval;
    },
    [isBookClosing]
  );

  // Initialize animation on mount
  useEffect(() => {
    // Initial animation setup
    resetAnimation();

    // Clean up on unmount
    return () => {
      clearAllTimers();
    };
  }, [resetAnimation, clearAllTimers]);

  // Watch for book state changes
  useEffect(() => {
    // If book was just closed, mark that we need to reset next time
    if (prevIsOpenRef.current && !isBookOpen) {
      needsResetRef.current = true;
      clearAllTimers();
      setWasRecentlyClosed(true);
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
      } else if (needsResetRef.current) {
        // Tab is visible again and needs reset
        resetAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetAnimation]);

  // Main text animation
  useEffect(() => {
    if (!startAnimation) return;

    animateText(
      text.length,
      setCurrentLetterIndex,
      () => {
        setIsMainTextComplete(true);
        setStartAuthorAnimation(true);
      },
      mainTextInterval
    );

    return () => {
      if (mainTextInterval.current) {
        window.clearInterval(mainTextInterval.current);
      }
    };
  }, [startAnimation, animateText]);

  // Author text animation
  useEffect(() => {
    if (!startAuthorAnimation) return;

    animateText(
      authorText.length,
      setAuthorLetterIndex,
      () => {
        setIsAuthorComplete(true);
      },
      authorTextInterval
    );

    return () => {
      if (authorTextInterval.current) {
        window.clearInterval(authorTextInterval.current);
      }
    };
  }, [startAuthorAnimation, animateText]);

  // Update pen position function
  const updatePenPosition = useCallback(
    (letters: HTMLCollectionOf<HTMLSpanElement>, index: number) => {
      if (!letters || !letters[index] || !containerRef.current) return;

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
    if (!containerRef.current || isMainTextComplete) return;
    const letters = containerRef.current.getElementsByTagName("span");
    updatePenPosition(letters, currentLetterIndex);
  }, [currentLetterIndex, isMainTextComplete, updatePenPosition]);

  // Update pen position for author text
  useEffect(() => {
    if (!authorRef.current || !startAuthorAnimation) return;
    const letters =
      authorRef.current.parentElement?.getElementsByTagName("span");
    if (letters) {
      updatePenPosition(letters, authorLetterIndex);
    }
  }, [authorLetterIndex, startAuthorAnimation, updatePenPosition]);

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
    });
  }, [resetAnimation, wasRecentlyClosed]);

  // Show pen only if not closing
  const showPen =
    !isBookClosing &&
    currentLetterIndex > 1 &&
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
lg:text-4xl"
      >
        {" "}
        Prologue
      </h1>
      <h2 className=" text-center text-sm xxxs:text-base xxs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-body ">
        Every journey has a beginning, and this is mine.
      </h2>

      <div
        ref={containerRef}
        className="relative mt-12 text-xl xxxs:text-md xxs:text-lg sm:text-xl md:text-1xl lg:text-2xl font-handwritten leading-relaxed"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={`text-${index}`}
            variants={writingVariants}
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            custom={index}
          >
            {char}
          </motion.span>
        ))}

        <div className="mt-6 text-right text-gray-600 text-xl">
          {authorText.split("").map((char, index) => (
            <motion.span
              key={`author-${index}`}
              ref={index === 0 ? authorRef : null}
              variants={writingVariants}
              initial="hidden"
              animate={startAuthorAnimation ? "visible" : "hidden"}
              custom={index}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {showPen && (
          <motion.div
            className="absolute w-10 h-12 pointer-events-none"
            style={{ left: `${penPosition.x}px`, top: `${penPosition.y}px` }}
            initial={{ opacity: 1 }}
            animate={{
              opacity: 1,
              rotate: [-1, 1, -1],
              y: [-1, 1, -1],
            }}
            transition={{
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
