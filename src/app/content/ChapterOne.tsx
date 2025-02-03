import React from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demo: string;
  repo: string;
}

interface ChapterOneProps {
  selectedProject: Project;
  closeProject: () => void;
}

const ChapterOne: React.FC<ChapterOneProps> = ({
  selectedProject,
  closeProject,
}) => {
  return (
    <div className="p-12 max-w-2xl mx-auto text-book-dark relative">
      {/* Back Button  */}
      <button
        onClick={closeProject}
        className="absolute top-4 right-4 text-book-muted italic text-lg flex items-center gap-2 hover:no-underline"
      >
        ⬅ Back to Projects
      </button>

      {/* Title & Subtitle */}
      <div className="text-center mt-12">
        <h1 className="text-4xl font-serif font-bold">
          {selectedProject.title}
        </h1>
        <p className="italic text-book-muted mt-3 text-lg text-center">
          {selectedProject.description}
        </p>
      </div>

      {/* Centered Image Matching Project List */}
      {selectedProject.image && (
        <div className="flex justify-center mt-6">
          <div className="w-40 h-40 border border-gray-300 rounded-md flex items-center justify-center p-2">
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Tech Stack in a Row */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-bold mb-2">Tech Stack:</h3>
        <div className="flex justify-center gap-2 flex-wrap">
          {selectedProject.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg text-lg italic font-serif shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links Section with Elegant Styling */}
      <div className="mt-6 flex justify-center gap-6">
        <a
          href={selectedProject.demo}
          target="_blank"
          className="text-book-dark no-underline hover:text-book-accent transition"
        >
          🔗 Live Demo
        </a>
        <a
          href={selectedProject.repo}
          target="_blank"
          className="text-book-dark no-underline hover:text-book-accent transition"
        >
          📦 GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default ChapterOne;
