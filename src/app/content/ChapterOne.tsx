// /* eslint-disable react/jsx-no-undef */
// /* eslint-disable @next/next/no-img-element */
// // src/app/content/ChapterOne.tsx
// import { projects } from "../data/projects";

// export default function ChapterOne() {
//   return (
//     <div className="prose max-w-none">
//       <h1 className="font-serif text-4xl mb-2 text-book-dark">First Steps</h1>
//       <h2 className="font-serif italic text-xl mb-6 text-book-muted">
//         The journey begins with small yet meaningful projects.
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {projects["Chapter I: First Steps"].map((proj) => (
//           <div key={proj.title} className="cursor-pointer text-center">
//             <img
//               src={proj.image}
//               alt={proj.title}
//               className="w-full rounded-lg shadow-md"
//             />
//             <p className="mt-2 text-lg font-semibold">{proj.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";

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
    <div className="p-6">
      <button
        onClick={closeProject}
        className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded"
      >
        ⬅ Back
      </button>
      <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
      <p className="italic text-gray-600">{selectedProject.description}</p>
      <img
        src={selectedProject.image}
        alt={selectedProject.title}
        width={200}
        height={200}
        className="rounded-lg shadow-md my-4 justify-center"
      />
      <h3 className="text-lg font-semibold">Tech Stack:</h3>
      <div className="flex gap-2">
        {selectedProject.techStack.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <a
          href={selectedProject.demo}
          target="_blank"
          className="text-black-600 hover:underline"
        >
          🔗 Live Demo
        </a>
        <a
          href={selectedProject.repo}
          target="_blank"
          className="text-black-600 hover:underline"
        >
          📦 GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default ChapterOne;
