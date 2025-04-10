"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ChevronLeft, ArrowBigRight } from "lucide-react";

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
      label: "📖 Read the Code",
      title: `Explore the source code for ${project.title} on GitHub`,
    };
  } else {
    return {
      isAvailable: false,
      label: " Private Repository",
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
      style={{
        transformOrigin: "left center",
        perspective: isMobile ? "none" : "1200px",
      }}
    >
      {!selectedProject ? (
        <>
          <section className="w-full mb-6" aria-labelledby="chapter-title">
            <h1
              id="chapter-title"
              className=" text-center font-bold mb-2 text-book-dark 
    text-2xl
    xxxs:text-2xl 
    xxs:text-2xl
    sm:text-3xl 
    small-md:text-3xl 
    md:text-3xl 
    lg:text-3xl lg:px-12"
            >
              {chapterTitle}
            </h1>

            <h4 className="text-center text-book-accent text-xs sm:text-sm md:text-base lg:text-sm font-body leading-tight px-4 md:px-12">
              {chapterDescription}
            </h4>
          </section>

          <div className="flex flex-col space-y-8 px-2 sm:px-4 md:px-14  lg:px-12">
            {projects?.map((proj) => (
              <div
                key={proj.title}
                className="flex items-center space-y-0 space-x-4 cursor-pointer transition-transform transform lg:hover:scale-105 p-2 "
                onClick={() => setSelectedProject(proj)}
              >
                <div className=" relative mt-8 sm:mt-8 md:mt-14 lg:mt-16 flex-shrink-0 self-center shadow-md">
                  {/* Hanging String */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-3 border-l-4 border-book-accent-light"></div>

                  {/* Outer Square Frame*/}
                  <div className="border-[3px] bg-[#e9e9e9] border-book-accent-light rounded-sm aspect-square w-20 h-20 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 flex items-center justify-center">
                    {/* Inner Frame */}
                    <div className="bg-[#e9e9e9] border-[2px] p-1 border-book-accent-light rounded-sm aspect-square w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-26 lg:h-26 flex items-center justify-center">
                      <Image
                        src={proj.image}
                        alt={`${proj.title} project preview image`}
                        width={80}
                        height={80}
                        className=" object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col max-[899px]:items-start items-center max-[899px]:text-left text-center">
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-semibold max-w-full">
                    {proj.title}
                  </h3>

                  <div className="w-full flex items-center justify-between mt-1">
                    <h6 className="mobile:text-left text-center italic text-gray-600 text-xs sm:text-sm md:text-base leading-tight max-w-[85%]">
                      {proj.shortDescription}
                    </h6>
                    <span className="hidden belowTablet:inline-flex items-center justify-center bg-book-accent-light text-book-dark p-[5px] rounded-sm shadow-sm active:translate-y-[1px] active:shadow-inner ml-2 -mt-4">
                      <ArrowBigRight size={18} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          className="p-4 sm:p-12 max-w-2xl mx-auto text-book-dark relative mobile-safe-container"
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
            className="hidden md:flex items-center gap-1 
  text-xs md:text-sm text-book-dark 
  bg-book-accent-light px-2.5 py-1 rounded shadow-md 
  hover:bg-book-accent hover:text-book-light 
  active:translate-y-[1px] active:shadow-inner
  transition-all duration-200
  absolute top-0 right-2 md:right-3 lg:right-4 z-30 focus:outline-none focus:ring-0
"
            aria-label="Back to Project List"
          >
            <span className="font-medium">Back to Projects</span>
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

          <div className="text-center mt-1 sm:mt-2">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold">
              {selectedProject.title}
            </h1>

            <h6
              className="italic text-gray-600 mt-1 sm:mt-2 
    text-xs sm:text-sm lg:text-base 
    leading-snug sm:leading-normal 
    max-w-[92%] sm:max-w-[85%] mx-auto text-center"
            >
              {selectedProject.description}
            </h6>
          </div>

          {selectedProject.image && (
            <div className="flex justify-center mt-8 sm:mt-6">
              <div
                className="w-28 h-28 
    sm:w-32 sm:h-32 
    md:w-36 md:h-36 
    lg:w-52 lg:h-52 
    flex items-center justify-center p-1 
    transition-transform duration-300 ease-in-out 
    lg:hover:-translate-y-[2px] lg:hover:rotate-[0.3deg]"
              >
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full transition-all duration-300"
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
                  className="px-1 sm:px-3 md:px-2 py-1 text-xs sm:text-sm lg:text-base italic font-serif
    transition-colors duration-300 ease-in-out
    lg:hover:text-book-accent"
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
                ? "🎥 Watch Demo"
                : "📜 Explore Project"}
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
