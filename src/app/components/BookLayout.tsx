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
  // State management for book open/close and chapter selection
  const [isOpen, setIsOpen] = useState(false);
  const [currentChapter, setCurrentChapter] =
    useState<keyof typeof chapters>("Introduction");

  // Handler for closing the book
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

  return (
    <div className="min-h-screen bg-book-bg flex items-center justify-center">
      <div className="relative w-full max-w-3xl h-[50rem] -mt-16 filter drop-shadow-2xl">
        {" "}
        {/* Closed Book State */}
        <motion.div
          initial={false}
          animate={{
            rotateY: isOpen ? -180 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.8 }}
          className="w-full bg-book-dark text-book-light p-12 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-full z-20"
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
            <div className="w-[50%] book-page toc p-12 rounded-l-lg h-full relative">
              {/* Content container with fade effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Top fade effect */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10"></div>

                {/* Scrollable content area */}
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
                    {/* Table of Contents Content */}
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
                              setCurrentChapter(
                                chapter as keyof typeof chapters
                              )
                            }
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
                  </div>
                </div>

                {/* Bottom fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10"></div>
              </div>
            </div>

            {/* Right Page (Dynamic Content Section) */}
            <div className="w-[50%] book-page content p-12 rounded-r-lg h-full relative">
              {/* Content container with fade effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Top fade effect */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10"></div>

                {/* Scrollable content area */}
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                  <div className="px-8 pt-24 pb-24 min-h-full">
                    <div className="prose max-w-none">
                      {chapters[currentChapter]}
                    </div>
                  </div>
                </div>

                {/* Bottom fade effect */}
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
