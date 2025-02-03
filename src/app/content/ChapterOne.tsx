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
