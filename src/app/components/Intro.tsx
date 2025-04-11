export default function Intro() {
  return (
    <section
      className="intro flex flex-col justify-center items-center text-center px-8  md:px-12 space-y-4 md:space-y-2 mt-6 sm:mt-6 md:mt-4  h-[14vh] "
      aria-label="Intro section"
    >
      {/* Title */}
      <h1 className="text-book-accent-dark text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 sm:mt-6 lg:mt-8 whitespace-normal sm:px-4 py-2">
        Lines of Code, Chapters of Creativity
      </h1>

      <p className="w-full text-center max-w-2xl italic text-book-accent-dark text-base sm:text-lg md:text-xl mx-auto mt-2">
        Where logic meets creativity, a new world unfolds
      </p>
    </section>
  );
}
