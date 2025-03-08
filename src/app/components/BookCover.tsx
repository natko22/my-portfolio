/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

interface BookCoverProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const BookCover = memo(({ isOpen, onOpen }: BookCoverProps) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        rotateY: hydrated && isOpen ? -80 : 0,
        opacity: hydrated && isOpen ? 0 : 1,
        width: isOpen ? "0%" : "50%",
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "transform, opacity, width" }}
      className="absolute left-1/4 top-44 md:top-0 bg-book-dark text-book-light p-6 md:p-12 md:mt-10 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-[300px] md:h-[700px] lg:h-[800px] z-20 group w-[90%] sm:w-[75%] md:w-[50%] max-w-[600px]"
      onClick={onOpen}
    >
      <div className="relative px-12 py-8 text-center max-w-md shadow-inner border border-book-accent rounded-lg">
        <div className="absolute inset-0 border-4 border-book-accent rounded-lg shadow-lg opacity-70"></div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 bg-book-dark text-book-accent font-serif italic">
          From Theology To Technology
        </div>
        <h1 className="relative z-10 text-2xl sm:text-3xl md:text-4xl tracking-wide text-book-accent-light mt-6 text-center">
          Anastasia Tsapanidou Kornilaki
        </h1>
        <h2 className="relative z-10 text-md sm:text-lg md:text-xl font-body text-book-accent-light italic mt-2">
          Full-Stack Developer
        </h2>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1 left-5 text-book-accent text-3xl">✾</div>
      <div className="absolute top-1 right-4 text-book-accent text-3xl">✾</div>
      <div className="absolute bottom-1 left-5 text-book-accent text-3xl">
        ✾
      </div>
      <div className="absolute bottom-1 right-4 text-book-accent text-3xl">
        ✾
      </div>

      {/* Book Design Elements */}
      <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-l from-transparent via-[var(--color-accent)] to-[var(--color-primary-dark)] opacity-70 rounded-l-lg"></div>
      <div className="absolute top-0 right-0 h-full w-[6px] bg-gradient-to-r from-transparent via-white to-white opacity-20 rounded"></div>
      <div className="absolute top-0 right-[2px] h-full w-[3px] bg-white opacity-45 rounded"></div>
      <div className="absolute top-0 right-[3px] h-full w-[2px] bg-white opacity-30 rounded"></div>
      <div className="absolute top-0 right-[4px] h-full w-[2px] bg-white opacity-20 rounded"></div>
      <div className="absolute top-0 right-[5px] h-full w-[1px] bg-white opacity-15 rounded"></div>
    </motion.div>
  );
});

export default BookCover;
