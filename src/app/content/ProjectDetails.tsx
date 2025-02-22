"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
          <h1 className="text-center">{chapterTitle}</h1>
          <h2 className="text-center">{chapterDescription}</h2>

          <div className="flex flex-col space-y-8">
            {projects?.map((proj) => (
              <div
                key={proj.title}
                className="flex items-center space-x-6 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="relative w-40 h-40 bg-book-paper  flex items-center justify-center p-2">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    width={100}
                    height={100}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{proj.title}</h3>
                  <p className="italic text-gray-600 leading-tight">
                    {proj.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-12 max-w-2xl mx-auto text-book-dark relative">
          <button
            onClick={onBackToProjects}
            className="absolute -top-2 right-4 text-book-muted italic text-lg flex items-center gap-2 hover:no-underline focus-within:outline-none "
          >
            ⬅ Back to Projects
          </button>

          <div className="text-center mt-4">
            <h1 className="text-3xl font-serif font-bold ">
              {selectedProject.title}
            </h1>
            <h6 className="italic mt-3 text-lg text-center text-grey-400 ">
              {selectedProject.description}
            </h6>
          </div>

          {selectedProject.image && (
            <div className="flex justify-center mt-6">
              <div className="w-40 h-40 border flex items-center justify-center p-2">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={160}
                  height={160}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold mb-2">Tech Stack:</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-lg italic font-serif cursor-pointer 
                        hover:scale-110 hover:text-book-accent transition-transform duration-300 ease-in-out
                        active:scale-95"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-6">
            <a
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch the video or interact with the project"
              aria-label={`View live demo of ${selectedProject.title}`}
              className="relative px-5 py-2 text-lg italic font-serif cursor-pointer 
              transition-all duration-500 ease-in-out 
              hover:text-book-accent hover:shadow-[0_0_15px_var(--color-accent)] no-underline"
            >
              {" "}
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
              className="relative px-5 py-2 text-lg italic font-serif cursor-pointer 
              transition-all duration-500 ease-in-out 
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
