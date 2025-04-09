/* eslint-disable react/display-name */
"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface ClosingPageProps {
  isClosing: boolean;
  onAnimationComplete: () => void; // Callback when the animation completes
  children: React.ReactNode; // Nested content inside the closing page
}

// Memoized component to prevent unnecessary re-renders
export const ClosingPage = memo(
  ({ isClosing, onAnimationComplete, children }: ClosingPageProps) => {
    return (
      <motion.div
        role="presentation"
        aria-hidden="true"
        initial={false} // Prevents Framer Motion from using initial values on mount
        animate={{
          rotateY: isClosing ? -180 : 0, // Rotates the page to simulate a book closing
          x: isClosing ? "43%" : "0%", // Moves the page slightly to align closing motion
          scale: isClosing ? 0.95 : 1, // Add subtle scale effect
          opacity: isClosing ? 0.9 : 1, // Slight opacity change

          zIndex: 15, // Ensures it overlays other elements when closing
        }}
        transition={{
          duration: 0.8, // Controls the overall animation speed
          ease: [0.16, 1, 0.3, 1], // Custom easing curve for fluid motion
          x: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1], // Smooth translation effect
          },
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        onAnimationComplete={onAnimationComplete} // Triggers callback once animation ends
        style={{
          position: "absolute", // Keeps it properly aligned within the book layout
          width: "50%",
          height: "100%",
          transformOrigin: "left", // Ensures rotation happens from the left side
          backgroundColor: "var(--book-bg)",
          borderRadius: "0 8px 8px 0",
          boxShadow: isClosing
            ? "2px 0 20px rgba(0,0,0,0.15)" // Stronger shadow when closing
            : "2px 0 10px rgba(0,0,0,0.1)", // Lighter shadow when open
          background: isClosing
            ? "linear-gradient(to right, var(--book-bg) 0%, var(--book-bg) 95%, rgba(0,0,0,0.05) 100%)"
            : "var(--book-bg)",
          perspective: "1000px",
        }}
        className="book-page toc p-12"
      >
        {children} {/* Renders the content inside the closing page */}
      </motion.div>
    );
  }
);
