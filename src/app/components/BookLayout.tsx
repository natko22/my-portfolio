"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AboutMe from "./AboutMe";

interface BookLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentChapter, setCurrentChapter] =
    useState<keyof typeof chapters>("Introduction");

  const handleClose = () => {
    setIsOpen(false);
  };

  // Define the chapters and their content
  const chapters = {
    Introduction: (
      <>
        <h1 className="font-serif text-4xl mb-8 text-book-dark">
          Introduction
        </h1>
        <p className="text-book-dark leading-relaxed text-lg">
          Welcome to my portfolio! Here’s an overview of what to expect.
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

  return (
    <div className="min-h-screen bg-book-bg flex items-center justify-center  ">
      <div className="relative w-full max-w-3xl h-[50rem] -mt-16">
        {/* Closed Book State */}
        <motion.div
          initial={false}
          animate={{
            rotateY: isOpen ? -180 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.8 }}
          className="w-full  bg-book-dark text-book-light p-12 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-full z-20 "
          onClick={() => setIsOpen(true)}
        >
          <div className="border border-book-accent p-16 rounded">
            <h1 className="font-serif text-2xl mb-6 tracking-wide">
              Anastasia Tsapanidou Kornilaki
            </h1>
            <h2 className="font-body text-2xl mb-8 text-book-accent-light italic">
              Full-Stack Developer
            </h2>
            <button className="bg-book-accent text-book-light px-8 py-3 rounded-lg transition-colors duration-300 hover:bg-book-accent-light hover:text-book-dark">
              Open Portfolio
            </button>
          </div>
        </motion.div>

        {/* Open Book State */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`absolute top-0 left-0 w-full h-full ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          } z-10`}
        >
          <div className="flex gap-1 h-full">
            {/* Left Page (Table of Contents) */}
            <div className="w-[50%] book-page toc p-8 rounded-l-lg flex flex-col h-full">
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
                    } // Update the current chapter
                  >
                    {chapter}
                  </button>
                ))}
              </div>

              {/* Close Book Button */}
              <div className="mt-auto pt-6 border-t border-book-accent-light">
                <button
                  onClick={handleClose}
                  className="w-full text-center p-4 rounded bg-book-accent text-book-light hover:bg-book-accent-light hover:text-book-dark transition-colors"
                >
                  Close Book
                </button>
              </div>
            </div>

            {/* Right Page (Dynamic Content Section) */}
            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full overflow-y-auto no-scrollbar">
              <div className="prose max-w-none">{chapters[currentChapter]}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookLayout;
