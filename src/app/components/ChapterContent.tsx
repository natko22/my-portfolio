/* eslint-disable react/display-name */
import { memo } from "react";
import AboutMe from "./AboutMe";

export const chapters = {
  Introduction: (
    <>
      <h1 className="font-serif text-4xl mb-8 text-book-dark">Introduction</h1>
      <p className="text-book-dark leading-relaxed text-lg">
        Welcome to my portfolio! Here is an overview of what to expect.
      </p>
    </>
  ),
  Projects: (
    <>
      <h1 className="font-serif text-4xl mb-8 text-book-dark">Projects</h1>
      <p className="text-book-dark leading-relaxed text-lg">
        Explore my projects, featuring detailed descriptions and links.
      </p>
    </>
  ),
  Contact: (
    <>
      <h1 className="font-serif text-4xl mb-8 text-book-dark">Contact</h1>
      <p className="text-book-dark leading-relaxed text-lg">
        Reach out to me via email or connect on LinkedIn.
      </p>
    </>
  ),
  AboutMe: <AboutMe />,
};

interface ChapterContentProps {
  chapter: keyof typeof chapters;
}

export const ChapterContent = memo(({ chapter }: ChapterContentProps) => (
  <div className="prose max-w-none">{chapters[chapter]}</div>
));
