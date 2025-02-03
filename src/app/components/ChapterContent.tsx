/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react";
import AboutMe from "./AboutMe";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import ChapterOne from "../content/ChapterOne";
import { Chapter } from "../types";

export const chapters: { [K in Chapter]: React.ReactNode } = {
  Prologue: (
    <>
      <h1 className="font-serif text-4xl mb-2 text-book-dark">Prologue</h1>
      <h2 className="font-serif italic text-xl mb-6 text-book-muted">
        Every journey has a beginning, and this is mine.
      </h2>
      <p className="text-book-dark leading-relaxed text-lg">
        Welcome to my portfolio! Within these digital pages, you’ll find the
        essence of my journey—projects, passions, and the story of how I fell in
        love with web development.
      </p>
    </>
  ),
  "Chapter I: Tales of Creation": null,
  "Chapter II: The Correspondence Chamber": (
    <>
      <h1 className="font-serif text-4xl mb-2 text-book-dark">
        Connect & Collaborate
      </h1>
      <h2 className="font-serif italic text-xl mb-6 text-book-muted">
        A brief pause to say hello or spark a new collaboration.
      </h2>
      <p className="text-book-dark leading-relaxed text-lg">
        I’d love to hear from you—whether it’s about potential projects, career
        opportunities, or simply saying hello. Email or LinkedIn works best!
      </p>
    </>
  ),
  "Chapter III: Author's Note": <AboutMe />,
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
              <h1 className="font-serif text-4xl mb-2 text-book-dark">
                First Steps
              </h1>
              <h2 className="font-serif italic text-xl mb-6 text-book-muted">
                The journey begins with small yet meaningful projects.
              </h2>

              {/* Project List with Book-Themed Styling */}
              <div className="flex flex-col space-y-8">
                {projects["Chapter I: First Steps"]?.map((proj) => (
                  <div
                    key={proj.title}
                    className="flex items-center space-x-6 cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => openProject(proj)}
                  >
                    {/* Project Image with a Book-Like Frame */}
                    <div className="relative w-40 h-40 bg-book-paper border flex items-center justify-center p-2">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-contain scale-75"
                      />
                    </div>

                    {/* Project Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-book-dark">
                        {proj.title}
                      </h3>
                      <p className="text-gray-600 italic">{proj.description}</p>
                    </div>
                  </div>
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
