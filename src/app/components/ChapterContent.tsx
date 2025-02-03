/* eslint-disable react/display-name */
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <h1 className="font-serif text-4xl mb-2 text-book-dark">
                First Steps
              </h1>
              <h2 className="font-serif italic text-xl mb-6 text-book-muted">
                The journey begins with small yet meaningful projects.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 place-items-center">
                {projects["Chapter I: First Steps"]?.map((proj) => (
                  <div
                    key={proj.title}
                    className="flex flex-col items-center text-center cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => openProject(proj)}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      width={200}
                      height={200}
                      className="rounded-lg shadow-lg"
                    />
                    <p className="mt-3 text-lg font-semibold">{proj.title}</p>
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
