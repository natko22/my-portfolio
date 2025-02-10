/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
"use client";

import { memo, useState, useEffect } from "react";
import AboutMe from "./AboutMe";
import { projects } from "../data/projects";
import { Chapter } from "../types";
import Contact from "./Contact";
import Prologue from "./Prologue";
import ProjectDetails from "./ProjectDetails";

const chapterInfo = {
  "Chapter I: Tales of Creation": {
    title: "First Steps",
    description: "The journey begins with small yet meaningful projects.",
    projects: projects["Chapter I: First Steps"],
  },
  "Chapter II: Architecting My Own Path": {
    title: "Expanding Horizons",
    description: "Building on experience with more complex projects.",
    projects: projects["Chapter II: Expanding Horizons"],
  },
  "Chapter III: The Workshop of Reality": {
    title: "Real-World Applications",
    description: "Professional projects and industry experience.",
    projects: projects["Chapter III: The Workshop Of Reality"],
  },
} as const;

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
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setIsFlipping(true);
      setTimeout(() => {
        setSelectedProject(null);
        setIsFlipping(false);
      }, 800);
    }
  }, [chapter]);

  const handleProjectSelect = (project: any) => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsFlipping(false);
    }, 800);
  };

  const handleBackToProjects = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsFlipping(false);
    }, 800);
  };

  const chapterData = chapterInfo[chapter as keyof typeof chapterInfo];

  if (!chapterData) {
    return <div className="prose max-w-none">{chapters[chapter]}</div>;
  }

  return (
    <div className="prose max-w-none">
      <ProjectDetails
        chapterTitle={chapterData.title}
        chapterDescription={chapterData.description}
        projects={chapterData.projects || []}
        selectedProject={selectedProject}
        setSelectedProject={handleProjectSelect}
        onBackToProjects={handleBackToProjects}
        isFlipping={isFlipping}
      />
    </div>
  );
});
