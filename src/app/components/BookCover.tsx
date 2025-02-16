/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { memo } from "react";

interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const BookCover = memo(({ isOpen, onOpen }: BookCoverProps) => (
  <motion.div
    initial={false}
    animate={{
      rotateY: isOpen ? -80 : 0,
      opacity: isOpen ? 0 : 1,
      width: isOpen ? "0%" : "50%",
    }}
    transition={{
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.4, ease: "easeInOut" },
      width: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
      rotateY: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }}
    className="absolute left-1/4 bg-book-dark text-book-light p-6 md:p-12 md:mt-10 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-full  sm:h-[600px] md:h-[700px] lg:h-[800px] z-20 group w-[90%] sm:w-[75%] md:w-[50%] max-w-[600px] "
    onClick={onOpen}
  >
    {/* <div className="relative px-12 py-8 text-center max-w-md shadow-inner border border-book-accent rounded-lg">
      <div className="absolute inset-0 border-2 border-book-accent rounded-lg"></div>
      <h1 className="relative z-10 text-3xl md:text-5xl font-serif tracking-wide leading-tight text-book-accent-light">
        Anastasia Tsapanidou Kornilaki
      </h1>
      <h2 className="relative z-10 text-lg md:text-xl font-body text-book-accent-light italic mt-2">
        Full-Stack Developer
      </h2>
    </div> */}

    <div className="relative px-12 py-8 text-center max-w-md shadow-inner border border-book-accent rounded-lg">
      {" "}
      <div className="absolute inset-0 border-4 border-book-accent rounded-lg shadow-lg opacity-70"></div>
      <div className="absolute -top-2 sm:-top-2 left-1/2 transform -translate-x-1/2 px-2 sm:px-4 bg-book-dark text-book-accent font-serif text-sm sm:text-base md:text-lg lg:text-xl italic">
        From Theology To Technology
      </div>
      {/* Author Name */}
      <h1 className="relative z-10 text-2xl sm:text-3xl md:text-4xl tracking-wide text-book-accent-light mt-6 text-center">
        Anastasia Tsapanidou Kornilaki
      </h1>
      <h2 className="relative z-10 text-md sm:text-lg md:text-xl font-body text-book-accent-light italic mt-2 whitespace-nowrap">
        Full-Stack Developer
      </h2>
    </div>
    {/* Top Left Corner */}
    <div className="absolute top-1 left-5 text-book-accent text-3xl">✾</div>
    {/* Top Right Corner */}
    <div className="absolute top-1 right-4 text-book-accent text-3xl">✾</div>
    {/* Bottom Left Corner */}
    <div className="absolute bottom-1 left-5 text-book-accent text-3xl">✾</div>
    {/* Bottom Right Corner */}
    <div className="absolute bottom-1 right-4 text-book-accent text-3xl">✾</div>

    {/* 📖 Left Side - Book Spine */}
    <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-l from-transparent via-[var(--color-accent)] to-[var(--color-primary-dark)] opacity-70 rounded-l-lg"></div>

    {/* 📄 Right Side - Page Edges (Fixed Full Height) */}
    <div className="absolute top-0 right-0 h-full w-[6px] bg-gradient-to-r from-transparent via-white to-white opacity-20 rounded"></div>
    <div className="absolute top-0 right-[2px] h-full w-[3px] bg-white opacity-45 rounded"></div>
    <div className="absolute top-0 right-[3px] h-full w-[2px] bg-white opacity-30 rounded"></div>
    <div className="absolute top-0 right-[4px] h-full w-[2px] bg-white opacity-20 rounded"></div>
    <div className="absolute top-0 right-[5px] h-full w-[1px] bg-white opacity-15 rounded"></div>
  </motion.div>
));
