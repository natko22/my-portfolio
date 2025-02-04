/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const text = `Every journey begins with a single step—or in this case, a single line of code. This book tells the story of my adventures in the world of web development, where each chapter represents a milestone in my growth as a developer.`;
const authorText = "— The Author";

const writingVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.18, duration: 0.3, ease: "easeInOut" },
  }),
};

const PEN_SIZE = 50;

const Prologue = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [startAuthorAnimation, setStartAuthorAnimation] = useState(false);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [authorLetterIndex, setAuthorLetterIndex] = useState(0);

  const [isMainTextComplete, setIsMainTextComplete] = useState(false);
  const [isAuthorComplete, setIsAuthorComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLSpanElement>(null);

  //  Start text animation after delay
  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  //function for text animations
  const animateText = (
    textLength: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    onComplete: () => void
  ) => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < textLength - 1) return prev + 1;
        clearInterval(interval);
        onComplete();
        return prev;
      });
    }, 180);
    return interval;
  };

  useEffect(() => {
    if (!startAnimation) return;
    const interval = animateText(text.length, setCurrentLetterIndex, () => {
      setIsMainTextComplete(true);
      setStartAuthorAnimation(true);
    });
    return () => clearInterval(interval);
  }, [startAnimation]);

  useEffect(() => {
    if (!startAuthorAnimation) return;
    const interval = animateText(
      authorText.length,
      setAuthorLetterIndex,
      () => {
        setIsAuthorComplete(true);
      }
    );
    return () => clearInterval(interval);
  }, [startAuthorAnimation]);

  //  function to update pen position
  const updatePenPosition = (
    letters: HTMLCollectionOf<HTMLSpanElement>,
    index: number
  ) => {
    if (!letters || !letters[index] || !containerRef.current) return;

    const rect = letters[index].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setPenPosition({
      x: rect.left - containerRect.left + rect.width,
      y: rect.top - containerRect.top - 60,
    });
  };

  useEffect(() => {
    if (!containerRef.current || isMainTextComplete) return;
    updatePenPosition(
      containerRef.current.getElementsByTagName("span"),
      currentLetterIndex
    );
  }, [currentLetterIndex, isMainTextComplete]);

  useEffect(() => {
    if (!authorRef.current) return;
    updatePenPosition(
      authorRef.current.parentElement?.getElementsByTagName("span")!,
      authorLetterIndex
    );
  }, [authorLetterIndex]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-center text-3xl font-bold mb-4">Prologue</h1>
      <h2 className="text-center text-lg italic mb-12">
        Every journey has a beginning, and this is mine.
      </h2>

      <div
        ref={containerRef}
        className="relative mt-12 text-2xl font-handwritten leading-relaxed"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={writingVariants}
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            custom={index}
          >
            {char}
          </motion.span>
        ))}

        <div className="mt-6 text-right text-gray-600 text-xl">
          {authorText.split("").map((char, index) => (
            <motion.span
              key={index}
              ref={index === 0 ? authorRef : null}
              variants={writingVariants}
              initial="hidden"
              animate={startAuthorAnimation ? "visible" : "hidden"}
              custom={index}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {currentLetterIndex > 1 &&
          penPosition.x !== 0 &&
          penPosition.y !== 0 && (
            <motion.div
              className="absolute w-10 h-12 pointer-events-none"
              style={{ left: `${penPosition.x}px`, top: `${penPosition.y}px` }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: 1,
                rotate: [-1, 1, -1],
                y: [-1, 1, -1],
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
              }}
            >
              <Image
                src="/quill-pen.png"
                alt="Writing Pen"
                width={PEN_SIZE}
                height={PEN_SIZE}
                className="w-full h-full"
              />
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default Prologue;
