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
    <section
      aria-label="Interactive book cover"
      className="flex flex-col items-center justify-start 
      -mt-4 sm:mt-0 
      pt-4 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-24 
      h-[calc(90vh-5rem)] min-h-[400px]"
    >
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
        className="relative bg-book-dark text-book-light p-3 sm:p-6 md:p-8 
        rounded-lg shadow-2xl flex flex-col items-center justify-center 
        cursor-pointer
        h-[350px] xxs:h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[580px]
        w-[80%] xxs:w-[70%] sm:w-[60%] md:w-[40%] tablet:w-[45%] lg:w-[30%] xl:w-[25%] 
        min-w-[280px] max-w-[420px] overflow-hidden
        aspect-[3/4.2] sm:aspect-[3/4.5]
        mx-auto"
        role="button"
        aria-label="Open the book to explore portfolio"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onOpen();
          }
        }}
        onClick={onOpen}
      >
        <div className="relative px-0 xxs:px-0 xs:px-4 sm:px-8 md:px-12 py-2 xxxs:py-2.5 xxs:py-3 xs:py-4 sm:py-6 md:py-8 text-center max-w-md shadow-inner border-4 border-book-accent rounded-lg">
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 
                  px-1 sm:px-2 md:px-3 
          text-book-accent-light italic text-[8px] sm:text-xs md:text-sm bg-book-dark "
          >
            From Theology To Technology
          </div>

          <h1
            className="relative z-10 text-sm sm:text-base md:text-xl lg:text-2xl 
  tracking-wide text-book-accent-light mt-3 sm:mt-4 md:mt-6 
  text-center max-w-[95%] mx-auto font-bold"
          >
            <span className="block">Anastasia Tsapanidou Kornilaki</span>
          </h1>

          <h6
            className="relative z-10 text-xs sm:text-sm md:text-base 
  font-body font-medium text-book-accent-light italic mt-1 sm:mt-2 
  drop-shadow-sm sm:drop-shadow md:drop-shadow-md"
          >
            Full-Stack Developer
          </h6>
        </div>

        {/* Decorative Elements - adjusted positioning */}
        <div className="absolute top-2 left-3 sm:left-4 md:left-5 text-book-accent text-xl sm:text-2xl md:text-3xl">
          ✾
        </div>
        <div className="absolute top-2 right-3 sm:right-4 md:right-5 text-book-accent text-xl sm:text-2xl md:text-3xl">
          ✾
        </div>
        <div className="absolute bottom-2 left-3 sm:left-4 md:left-5 text-book-accent text-xl sm:text-2xl md:text-3xl">
          ✾
        </div>
        <div className="absolute bottom-2 right-3 sm:right-4 md:right-5 text-book-accent text-xl sm:text-2xl md:text-3xl">
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
    </section>
  );
});

export default BookCover;
