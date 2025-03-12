"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface Project {
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  techStack: string[];
  demo: string;
  repo: string;
}

interface ProjectDetailsProps {
  chapterTitle: string;
  chapterDescription: string;
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  onBackToProjects: () => void;
  isFlipping: boolean;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  chapterTitle,
  chapterDescription,
  projects,
  selectedProject,
  setSelectedProject,
  onBackToProjects,
  isFlipping,
}) => {
  const contentVariants = {
    flipping: {
      rotateY: 180,
      x: -100,
      y: -20,
      opacity: 0.5,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    normal: {
      rotateY: 0,
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="normal"
      animate={isFlipping ? "flipping" : "normal"}
      variants={contentVariants}
      className="relative"
      style={{
        transformOrigin: "left center",
        perspective: "1200px",
      }}
    >
      {!selectedProject ? (
        <>
          <div className="w-full mb-6">
            <h1 className="text-center text-xl xxxs:text-lg xxs:text-xl sm:text-1xl md:text-2xl lg:text-3xl font-serif font-bold mb-2 text-book-dark">
              {chapterTitle}
            </h1>
            <h2 className="text-center text-sm xxxs:text-base xxs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-body text-book-muted">
              {chapterDescription}
            </h2>
          </div>
          <div className="flex flex-col space-y-8">
            {projects?.map((proj) => (
              <div
                key={proj.title}
                className="flex items-center space-y-0 space-x-4 cursor-pointer transition-transform transform hover:scale-105 p-2"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="relative mt-12 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-book-paper flex items-center justify-center p-2 flex-shrink-0 self-center">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    width={80}
                    height={80}
                    className="object-contain w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 text-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                    {proj.title}
                  </h3>
                  <p className="italic text-gray-600 leading-tight text-xs sm:text-sm  lg:text-lg">
                    {proj.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-4 sm:p-12 max-w-2xl mx-auto text-book-dark relative">
          <button
            onClick={onBackToProjects}
            className="w-full mt-8 md:w-auto text-center md:text-left italic text-xs md:text-base text-book-muted mb-4 md:absolute md:-top-2 md:right-4 hover:no-underline focus:outline-none relative z-30"
          >
            <span className="flex items-center justify-center md:justify-start gap-1 md:gap-2">
              <ArrowLeft size={16} className="md:w-5 md:h-5" /> Back to Projects
            </span>
          </button>

          <div className="text-center mt-2 sm:mt-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold">
              {selectedProject.title}
            </h1>
            <h6 className="italic mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-center text-grey-400">
              {selectedProject.description}
            </h6>
          </div>

          {selectedProject.image && (
            <div className="flex justify-center mt-4 sm:mt-6">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 border flex items-center justify-center p-2">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className="mt-3 sm:mt-6 text-center">
            <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
              Tech Stack:
            </h3>
            <div className="flex justify-center gap-1 sm:gap-2 flex-wrap leading-none">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm lg:text-base italic font-serif cursor-pointer 
                        hover:scale-110 hover:text-book-accent transition-transform duration-300 ease-in-out
                        active:scale-95"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-6">
            <a
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch the video or interact with the project"
              aria-label={`View live demo of ${selectedProject.title}`}
              className="px-2 xs:px-3 sm:px-5 py-1 xs:py-2 text-xs xs:text-sm sm:text-base lg:text-lg italic font-serif cursor-pointer 
              transition-all duration-500 ease-in-out whitespace-nowrap
              hover:text-book-accent hover:shadow-[0_0_15px_var(--color-accent)] no-underline"
            >
              {selectedProject.demo.includes("youtube.com")
                ? "🎥 Watch the Tome"
                : "📜 Read the Scroll"}
            </a>
            <a
              href={selectedProject.repo}
              target="_blank"
              rel="noopener noreferrer"
              title={`Explore the source code for ${selectedProject.title} on GitHub`}
              aria-label={`View GitHub repository for ${selectedProject.title}`}
              className="px-2 xs:px-3 sm:px-5 py-1 xs:py-2 text-xs xs:text-sm sm:text-base lg:text-lg italic font-serif cursor-pointer 
              transition-all duration-500 ease-in-out whitespace-nowrap
              hover:text-book-accent hover:shadow-[0_0_15px_var(--color-accent)] no-underline"
            >
              📖 Open the Codex
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectDetails;
