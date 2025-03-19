"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ChevronLeft } from "lucide-react";

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

// Helper function to determine if repo link should be shown
const getRepoDisplay = (project: Project) => {
  if (project.repo) {
    return {
      isAvailable: true,
      url: project.repo,
      label: "📖 Open the Codex",
      title: `Explore the source code for ${project.title} on GitHub`,
    };
  } else {
    return {
      isAvailable: false,
      label: " Private Codex",
      title: "This code is part of a private repository",
    };
  }
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  chapterTitle,
  chapterDescription,
  projects,
  selectedProject,
  setSelectedProject,
  onBackToProjects,
  isFlipping,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const contentVariants = {
    flipping: isMobile
      ? {
          x: -30,
          opacity: 0.2,
          transition: { duration: 0.4, ease: "easeInOut" },
        }
      : {
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
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: "easeInOut",
      },
    },
  };

  const swipeThreshold = 50;

  return (
    <motion.div
      initial="normal"
      animate={isFlipping ? "flipping" : "normal"}
      variants={contentVariants}
      className="relative"
      style={{
        transformOrigin: "left center",
        perspective: isMobile ? "none" : "1200px",
      }}
    >
      {!selectedProject ? (
        <>
          <div className="w-full mb-6">
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
              {chapterTitle}
            </h1>

            <h2 className=" text-center text-sm xxxs:text-base xxs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-body ">
              {chapterDescription}
            </h2>
          </div>
          <div className="flex flex-col space-y-8">
            {projects?.map((proj) => (
              <div
                key={proj.title}
                className="flex items-center space-y-0 space-x-4 cursor-pointer transition-transform transform lg:hover:scale-105 p-2"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="relative mt-2 sm:mt-4 md:mt-6 lg:mt-8 flex-shrink-0 self-center shadow-md">
                  {/* Hanging String */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-3 border-l-2 border-book-accent-light"></div>

                  {/* Outer Square Frame*/}
                  <div className="border-[3px] border-book-accent-light rounded-sm aspect-square w-20 h-20 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 flex items-center justify-center">
                    {/* Inner Frame */}
                    <div className="border-[2px] p-1 border-book-accent-light rounded-sm aspect-square w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 flex items-center justify-center">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center w-full mx-auto justify-center ">
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-semibold mx-auto max-w-full text-center mr-8 ">
                    {proj.title}
                  </h3>
                  <p className="italic text-gray-600 leading-tight text-sm md:text-base lg:text-lg text-left px-1">
                    {proj.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          className="p-4 sm:p-12 max-w-2xl mx-auto text-book-dark relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(event, info) => {
            if (info.offset.x > swipeThreshold) {
              onBackToProjects();
            }
          }}
        >
          {/* Desktop back button */}
          <button
            onClick={onBackToProjects}
            className="hidden md:flex mt-8 md:w-auto text-center md:text-left italic text-xs md:text-base text-book-muted mb-4 md:absolute md:-top-2 md:right-4 hover:no-underline focus:outline-none relative z-30"
          >
            <span className="flex items-center justify-center md:justify-start gap-1 md:gap-2">
              <ArrowLeft size={16} className="md:w-5 md:h-5" /> Back to Projects
            </span>
          </button>

          {/* Mobile floating action button */}
          <div className="md:hidden absolute top-0 left-4 z-[100]">
            <button
              onClick={onBackToProjects}
              className="w-6 h-6 flex items-center justify-center 
    bg-book-accent-light rounded-full shadow-md 
    active:scale-95 hover:bg-book-accent-dark transition"
              aria-label="Back to Projects"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="text-center mt-2 sm:mt-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {selectedProject.title}
            </h1>
            <h6 className="italic mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base lg:text-lg text-center text-grey-400 max-w-full sm:max-w-[90%] md:max-w-[85%] mx-auto leading-relaxed">
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
                  className="px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm lg:text-base italic font-serif
                  transition-all duration-300 ease-in-out
                  lg:hover:text-book-accent lg:hover:font-bold"
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
              lg:hover:text-book-accent lg:hover:shadow-[0_0_15px_var(--color-accent)] no-underline"
            >
              {selectedProject.demo.includes("youtube.com")
                ? "🎥 Watch the Tome"
                : "📜 Read the Scroll"}
            </a>
            {getRepoDisplay(selectedProject).isAvailable ? (
              <a
                href={getRepoDisplay(selectedProject).url}
                target="_blank"
                rel="noopener noreferrer"
                title={getRepoDisplay(selectedProject).title}
                aria-label={`View GitHub repository for ${selectedProject.title}`}
                className="px-2 xs:px-3 sm:px-5 py-1 xs:py-2 text-xs xs:text-sm sm:text-base lg:text-lg italic font-serif cursor-pointer 
                transition-all duration-500 ease-in-out whitespace-nowrap
                lg:hover:text-book-accent lg:hover:shadow-[0_0_15px_var(--color-accent)] no-underline"
              >
                {getRepoDisplay(selectedProject).label}
              </a>
            ) : (
              <span
                title={getRepoDisplay(selectedProject).title}
                className="px-2 xs:px-3 sm:px-5 py-1 xs:py-2 text-xs xs:text-sm sm:text-base lg:text-lg italic font-serif
                whitespace-nowrap opacity-70 flex items-center justify-center gap-1"
              >
                <Lock size={14} className="inline-block" />{" "}
                {getRepoDisplay(selectedProject).label}
              </span>
            )}
          </div>

          <div className="pb-20 md:pb-0"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectDetails;
