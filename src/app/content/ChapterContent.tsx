/* eslint-disable react-hooks/exhaustive-deps */
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
import TechStack from "./TechStack";
import { motion } from "framer-motion";

const chapterInfo = {
  "Chapter I: The Early Days": {
    title: "Getting Started with JavaScript & Fullstack",
    description:
      "Projects I built during my time at Ironhack — where I explored the fundamentals of frontend and backend development.",
    projects: projects["Chapter I: The Early Days"],
  },
  "Chapter II: Architecting My Own Path": {
    title: "Independent & Internship Work",
    description:
      "From solo side projects to real-world internship experience — a journey of applied learning.",
    projects: projects["Chapter II: Architecting My Own Path"],
  },
  "Chapter III: The Workshop of Reality": {
    title: "Professional Contributions",
    description:
      "Production-ready systems developed during my first professional roles — focused on collaboration, scalability, and user experience.",
    projects: projects["Chapter III: The Workshop Of Reality"],
  },
} as const;

export const chapters: { [K in Chapter]: React.ReactNode } = {
  Prologue: <Prologue />,
  "Chapter I: The Early Days": null,
  "Chapter II: Architecting My Own Path": null,
  "Chapter III: The Workshop of Reality": null,
  "The Correspondence Chamber": <Contact />,
  "Glossary of Tools": <TechStack />,
  "Author's Note": <AboutMe />,
};

interface ChapterContentProps {
  chapter: keyof typeof chapters;
}

export const ChapterContent = memo(({ chapter }: ChapterContentProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".chapter-scroll-container");

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [chapter]);

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
    const isMobile = window.innerWidth < 768;
    const animationDuration = isMobile ? 400 : 800;

    setTimeout(() => {
      setSelectedProject(project);
      setIsFlipping(false);
    }, animationDuration);
  };

  const handleBackToProjects = () => {
    setIsFlipping(true);
    const isMobile = window.innerWidth < 768;
    const animationDuration = isMobile ? 400 : 800;

    setTimeout(() => {
      setSelectedProject(null);
      setIsFlipping(false);
    }, animationDuration);
  };

  const chapterData = chapterInfo[chapter as keyof typeof chapterInfo];

  if (!chapterData) {
    return <div className="prose max-w-none">{chapters[chapter]}</div>;
  }

  return (
    <div className="prose max-w-none">
      {!selectedProject ? (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(event: any, info: { offset: { x: number } }) => {
            if (info.offset.x > 50) {
            } else if (
              info.offset.x < -50 &&
              chapterData.projects &&
              chapterData.projects.length > 0
            ) {
              handleProjectSelect(chapterData.projects[0]);
            }
          }}
        >
          <ProjectDetails
            chapterTitle={chapterData.title}
            chapterDescription={chapterData.description}
            projects={chapterData.projects || []}
            selectedProject={selectedProject}
            setSelectedProject={handleProjectSelect}
            onBackToProjects={handleBackToProjects}
            isFlipping={isFlipping}
          />
        </motion.div>
      ) : (
        <ProjectDetails
          chapterTitle={chapterData.title}
          chapterDescription={chapterData.description}
          projects={chapterData.projects || []}
          selectedProject={selectedProject}
          setSelectedProject={handleProjectSelect}
          onBackToProjects={handleBackToProjects}
          isFlipping={isFlipping}
        />
      )}
    </div>
  );
});
