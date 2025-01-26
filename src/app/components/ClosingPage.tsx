/* eslint-disable react/display-name */
"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface ClosingPageProps {
  isClosing: boolean;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}

export const ClosingPage = memo(
  ({ isClosing, onAnimationComplete, children }: ClosingPageProps) => {
    return (
      <motion.div
        initial={false}
        animate={{
          rotateY: isClosing ? 100 : 0,
          x: isClosing ? "43%" : "0%",
          zIndex: 15,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          x: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
          },
        }}
        onAnimationComplete={onAnimationComplete}
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
          transformOrigin: "left",
          backgroundColor: "var(--book-bg)",
          borderRadius: "0 8px 8px 0",
          boxShadow: isClosing
            ? "2px 0 20px rgba(0,0,0,0.15)"
            : "2px 0 10px rgba(0,0,0,0.1)",
          background: isClosing
            ? "linear-gradient(to right, var(--book-bg) 0%, var(--book-bg) 95%, rgba(0,0,0,0.05) 100%)"
            : "var(--book-bg)",
        }}
        className="book-page toc p-12"
      >
        {children}
      </motion.div>
    );
  }
);
