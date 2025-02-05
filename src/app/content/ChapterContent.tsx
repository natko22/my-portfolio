/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import AboutMe from "./AboutMe";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import ChapterOne from "./ChapterOne";
import { Chapter } from "../types";
import Contact from "./Contact";
import Prologue from "./Prologue";

export const chapters: { [K in Chapter]: React.ReactNode } = {
  Prologue: <Prologue />,
  "Chapter I: Tales of Creation": null,
  "Chapter II: Architecting My Own Path": null,
  "Chapter III: The Workshop of Reality": null,
  "The Correspondence Chamber": <Contact />,
  "Author's Note": <AboutMe />,
};

interface ChapterContentProps {
  chapter: keyof typeof chapters;
}

export const ChapterContent = memo(({ chapter }: ChapterContentProps) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Handles project selection with a flip effect
  const openProject = (project: any) => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsFlipping(false);
    }, 800);
  };

  const closeProject = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className="prose max-w-none">
      {chapter === "Chapter I: Tales of Creation" ? (
        <motion.div
          initial={{ rotateY: 0, x: 0, y: 0, opacity: 1 }}
          animate={
            isFlipping
              ? { rotateY: 180, x: -100, y: -20, opacity: 0.5 }
              : { rotateY: 0, x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
          style={{
            transformOrigin: "left center",
            perspective: "1200px",
          }}
        >
          {!selectedProject ? (
            <>
              {/* Title */}
              <h1 className="text-center">First Steps</h1>
              <h2 className="text-center">
                The journey begins with small yet meaningful projects.
              </h2>

              {/* Project List with Book-Themed Styling */}
              <div className="flex flex-col space-y-8">
                {projects["Chapter I: First Steps"]?.map((proj) => (
                  <h2
                    key={proj.title}
                    className="flex items-center space-x-6 cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => openProject(proj)}
                  >
                    {/* Project Image with a Book-Like Frame */}
                    <div className="relative w-40 h-40 bg-book-paper border flex items-center justify-center p-2">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>

                    {/* Project Details */}
                    <div className="flex-1">
                      <h3 className="text-1xl font-semibold">{proj.title}</h3>
                      <p className=" italic text-gray-600">
                        {proj.shortDescription}
                      </p>
                    </div>
                  </h2>
                ))}
              </div>
            </>
          ) : (
            <ChapterOne
              selectedProject={selectedProject}
              closeProject={closeProject}
            />
          )}
        </motion.div>
      ) : (
        chapters[chapter]
      )}
    </div>
  );
});
