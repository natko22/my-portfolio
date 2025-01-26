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
    className="absolute left-1/4 bg-book-dark text-book-light p-12 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer h-full z-20 group"
    onClick={onOpen}
  >
    <div className="border border-book-accent p-16 rounded">
      <h1 className="font-serif text-2xl mb-6 tracking-wide">
        Anastasia (Natassa) Tsapanidou Kornilaki
      </h1>
      <h2 className="font-body text-2xl mb-8 text-book-accent-light italic text-center">
        Full-Stack Developer
      </h2>
      {/* Book cover decorations */}
      <div className="absolute top-1 left-1">
        <div className="absolute -top-px -left-px w-16 h-16 overflow-hidden">
          <div className="absolute top-0 left-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
          <div className="absolute top-0 left-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-book-accent opacity-60 transform -translate-x-[1px] -translate-y-[1px]"></div>
          <div className="absolute top-1 left-1 w-8 h-8 border-t border-l border-book-accent-light opacity-40"></div>
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-book-accent-light opacity-30"></div>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <div className="absolute -top-px -right-px w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
          <div className="absolute top-0 right-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-book-accent opacity-60 transform translate-x-[1px] -translate-y-[1px]"></div>

          <div className="absolute top-1 right-1 w-8 h-8 border-t border-r border-book-accent-light opacity-40"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-book-accent-light opacity-30"></div>
        </div>
      </div>
      {/* Bottom Left Corner */}
      <div className="absolute bottom-1 left-1">
        <div className="absolute -bottom-px -left-px w-16 h-16 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
          <div className="absolute bottom-0 left-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-book-accent opacity-60 transform -translate-x-[1px] translate-y-[1px]"></div>
          <div className="absolute bottom-1 left-1 w-8 h-8 border-b border-l border-book-accent-light opacity-40"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-book-accent-light opacity-30"></div>
        </div>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-1 right-1">
        <div className="absolute -bottom-px -right-px w-16 h-16 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-book-accent opacity-80"></div>
          <div className="absolute bottom-0 right-0 h-[1px] w-16 bg-book-accent opacity-80"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-book-accent opacity-60 transform translate-x-[1px] translate-y-[1px]"></div>
          <div className="absolute bottom-1 right-1 w-8 h-8 border-b border-r border-book-accent-light opacity-40"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-book-accent-light opacity-30"></div>
        </div>
      </div>
    </div>
  </motion.div>
));
