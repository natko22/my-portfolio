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
      className="relative mx-auto mt-36 xxs:mt-32 xs:mt-32 sm:mt-36 md:mt-16 lg:mt-24 bg-book-dark text-book-light p-3 xxs:p-3 xs:p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-[200px] xxxs:h-[200px] xxs:h-[250px] xs:h-[300px] sm:h-[400px] md:h-[70vh] lg:h-[65vh] z-20 group w-[95%] xxs:w-[90%] xs:w-[96%] sm:w-[40%] md:w-[45%] lg:w-[50%] max-w-[450px] mobile:max-w-[320px] overflow-hidden"
      onClick={onOpen}
    >
      {" "}
      <div className="relative px-0 xxs:px-0 xs:px-4 sm:px-8 md:px-12 py-2 xxxs:py-2.5 xxs:py-3 xs:py-4 sm:py-6 md:py-8 text-center max-w-md shadow-inner border-4 border-book-accent rounded-lg">
        {" "}
        <div className="absolute -top-1.5 xxs:-top-1.5 xs:-top-2 sm:-top-2 md:-top-2.5 left-1/2 transform -translate-x-1/2 px-1 xxs:px-1.5 xs:px-2 sm:px-2 md:px-3 text-[6px]  xxxxs:text-[5px] xxs:text-[7px] xs:text-[9px] sm:text-xs md:text-sm lg:text-base bg-book-dark text-book-accent font-serif italic">
          From Theology To Technology
        </div>
        {/* Main title - preventing excessive line breaks on mobile */}
        <h1 className="relative z-10 text-[8px] xxs:text-[9px] xs:text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl tracking-wide text-book-accent-light mt-2 xxs:mt-2.5 xs:mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-center max-w-[90%] mx-auto">
          <span className="block">Anastasia Tsapanidou Kornilaki</span>
        </h1>
        {/* Subtitle - smaller on mobile */}
        <h6 className="relative z-10 text-[7px] xxs:text-[8px] xs:text-xs transform scale-75 origin-center xxs:scale-75 xs:scale-80 sm:text-xs sm:scale-100 md:text-sm lg:text-base font-body text-book-accent-light italic mt-0 xxs:mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 whitespace-nowrap">
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
  );
});

export default BookCover;
