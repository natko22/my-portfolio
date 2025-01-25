"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AboutMe from "./AboutMe";

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

// Separate component for the closing page animation
const ClosingPage: React.FC<{
  isClosing: boolean;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}> = ({ isClosing, onAnimationComplete, children }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        rotateY: isClosing ? 160 : 0,
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
};

const BookLayout: React.FC<BookLayoutProps> = ({}) => {
  // Enhanced state management for animations
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentChapter, setCurrentChapter] =
    useState<keyof typeof chapters>("Introduction");

  // Handlers for the closing animation sequence
  const handleClose = () => {
    setIsClosing(true);
  };

  const handleClosingComplete = () => {
    setIsClosing(false);
    setIsOpen(false);
  };

  // Chapter content definitions
  const chapters = {
    Introduction: (
      <>
        <h1 className="font-serif text-4xl mb-8 text-book-dark">
          Introduction
        </h1>
        <p className="text-book-dark leading-relaxed text-lg">
          Welcome to my portfolio! Here is an overview of what to expect.
        </p>
      </>
    ),
    Projects: (
      <>
        <h1 className="font-serif text-4xl mb-8 text-book-dark">Projects</h1>
        <p className="text-book-dark leading-relaxed text-lg">
          Explore my projects, featuring detailed descriptions and links.
        </p>
      </>
    ),
    Contact: (
      <>
        <h1 className="font-serif text-4xl mb-8 text-book-dark">Contact</h1>
        <p className="text-book-dark leading-relaxed text-lg">
          Reach out to me via email or connect on LinkedIn.
        </p>
      </>
    ),
    AboutMe: <AboutMe />,
  };

  // Left page content component
  const LeftPageContent = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10"></div>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        <div className="px-8 pt-24 pb-24 min-h-full">
          <div className="flex flex-col h-full">
            <h2 className="font-serif text-2xl mb-8 text-book-dark text-left">
              Table of Contents
            </h2>
            <div className="space-y-6">
              {Object.keys(chapters).map((chapter) => (
                <button
                  key={chapter}
                  className={`w-full text-left p-4 rounded transition-colors ${
                    currentChapter === chapter
                      ? "bg-book-accent-light text-book-dark font-bold"
                      : "hover:bg-book-accent-light"
                  }`}
                  onClick={() =>
                    setCurrentChapter(chapter as keyof typeof chapters)
                  }
                >
                  {chapter}
                </button>
              ))}
            </div>
            <div className="relative">
              <div
                onClick={handleClose}
                className="absolute -right-6 -top-[40rem] cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 pb-2 -mt-6"
              >
                <div className="relative">
                  <div className="w-24 h-80 bg-book-accent rounded-t-lg shadow-lg relative overflow-hidden flex items-center justify-center">
                    <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-book-light font-serif text-base whitespace-nowrap rotate-90">
                      Close Book
                    </p>
                  </div>
                  <div className="w-24 h-6 bg-book-accent-light rounded-b-lg shadow-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-book-bg flex items-center justify-center">
      <div className="relative w-[80rem] h-[50rem] -mt-16 filter drop-shadow-2xl">
        {/* Closed Book State */}
        <motion.div
          initial={false}
          animate={{
            rotateY: isOpen ? -100 : 0,
            opacity: isOpen ? 0 : 1,
            width: isOpen ? "0%" : "50%",
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            opacity: {
              duration: 0.4,
              ease: "easeInOut",
            },
            width: {
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            },
            rotateY: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="absolute left-1/4 bg-book-dark text-book-light p-12 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-full z-20 group"
          onClick={() => setIsOpen(true)}
        >
          <div className="border border-book-accent p-16 rounded">
            {/* Book cover decorations */}
            <div className="absolute top-1 left-1">
              <div className="absolute -top-px -left-px w-16 h-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
                <div className="absolute top-0 left-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-book-accent opacity-60 transform -translate-x-[1px] -translate-y-[1px]"></div>
                <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-book-accent-light opacity-40"></div>
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-book-accent-light opacity-30"></div>
              </div>
            </div>
            {/* Additional corner decorations */}
            <div className="absolute top-1 right-1">
              <div className="absolute -top-px -right-px w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
                <div className="absolute top-0 right-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-book-accent opacity-60 transform translate-x-[1px] -translate-y-[1px]"></div>

                <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-book-accent-light opacity-40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-book-accent-light opacity-30"></div>
              </div>
            </div>
            {/* Bottom left corner decoration - with matching dual colors */}
            <div className="absolute bottom-1 left-1">
              <div className="absolute -bottom-px -left-px w-16 h-16 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
                <div className="absolute bottom-0 left-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-book-accent opacity-60 transform -translate-x-[1px] translate-y-[1px]"></div>

                <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-book-accent-light opacity-40"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-book-accent-light opacity-30"></div>
              </div>
            </div>{" "}
            <h1 className="font-serif text-2xl mb-6 tracking-wide">
              Anastasia (Natassa) Tsapanidou Kornilaki
            </h1>
            <h2 className="font-body text-2xl mb-8 text-book-accent-light italic text-center">
              Full-Stack Developer
            </h2>
            {/* Page flip effect */}
            <div className="absolute bottom-0 right-0">
              <div className="absolute bottom-0 right-0 w-24 h-24">
                <div className="absolute inset-0 bg-book-accent-light transform rotate-6 origin-bottom-right transition-transform duration-300 group-hover:rotate-12">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black opacity-10"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-5 transform origin-bottom-right transition-all duration-300 group-hover:opacity-10"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-black opacity-0 transform origin-bottom-right transition-all duration-500 ease-in-out group-hover/book:opacity-10"></div>
            </div>
          </div>
        </motion.div>

        {/* Open Book State */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: "easeOut",
          }}
          className={`absolute top-0 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          <div className="flex gap-1 h-full">
            {/* Animated closing page */}
            {isClosing ? (
              <ClosingPage
                isClosing={isClosing}
                onAnimationComplete={handleClosingComplete}
              >
                <LeftPageContent />
              </ClosingPage>
            ) : (
              <div className="w-[50%] book-page toc p-12 rounded-l-lg h-full relative">
                <LeftPageContent />
              </div>
            )}

            {/* Right page content */}
            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10"></div>
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
                    <div className="prose max-w-none">
                      {chapters[currentChapter]}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookLayout;
