/* eslint-disable react/display-name */
import { memo } from "react";
import AboutMe from "./AboutMe";

interface ChapterContentProps {
  chapter: keyof typeof chapters; // Ensures only valid chapter keys can be passed
}

// Memoized component to optimize rendering performance
export const ChapterContent = memo(({ chapter }: ChapterContentProps) => (
  <div className="prose max-w-none">{chapters[chapter]}</div> // Dynamically renders the selected chapter content
));

// Defines the content structure of the book, mapping chapter titles to JSX content
export const chapters = {
  Prologue: (
    <>
      {/* Chapter title and introduction */}
      <h1 className="font-serif text-4xl mb-2 text-book-dark">Prologue</h1>
      <h2 className="font-serif italic text-xl mb-6 text-book-muted">
        In which I invite you into my world of code and creativity
      </h2>
      <p className="text-book-dark leading-relaxed text-lg">
        Welcome to my portfolio! Within these digital pages, you’ll find the
        essence of my journey—projects, passions, and the story of how I fell in
        love with web development.
      </p>
    </>
  ),
  "Chapter I: Tales of Creation": (
    <>
      {/* Chapter I - Showcasing projects and creative works */}
      <h1 className="font-serif text-4xl mb-2 text-book-dark">
        Chapter I: Tales of Creation
      </h1>
      <h2 className="font-serif italic text-xl mb-6 text-book-muted">
        Where projects are penned and innovations take shape
      </h2>
      <p className="text-book-dark leading-relaxed text-lg">
        Explore my projects—each one a crafted story of design, problem-solving,
        and creativity. Click through for detailed descriptions, links, and the
        lessons learned along the way.
      </p>
    </>
  ),
  "Chapter II: The Correspondence Chamber": (
    <>
      {/* Chapter II - Contact and networking information */}
      <h1 className="font-serif text-4xl mb-2 text-book-dark">
        Chapter II: Connect & Collaborate
      </h1>
      <h2 className="font-serif italic text-xl mb-6 text-book-muted">
        A brief pause to say hello or spark a new collaboration
      </h2>
      <p className="text-book-dark leading-relaxed text-lg">
        I’d love to hear from you—whether it’s about potential projects, career
        opportunities, or simply saying hello. Email or LinkedIn works best!
      </p>
    </>
  ),
  "Chapter III: Author's Note": <AboutMe />, // Renders the AboutMe component as the final chapter
};
