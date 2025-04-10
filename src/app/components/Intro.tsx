export default function Intro() {
  return (
    <section
      className="intro flex flex-col justify-center items-center text-center px-8  md:px-12 space-y-4 md:space-y-2 mt-6 sm:mt-6 md:mt-4  h-[14vh] "
      aria-label="Intro section"
    >
      {/* Title */}
      <h1 className="text-book-accent-dark text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 whitespace-nowrap">
        Turning Pages, Writing Code
        {/* Lines of Code, Chapters of Creativity */}
      </h1>

      <p className="w-full text-center max-w-2xl italic text-book-accent-dark text-base sm:text-lg md:text-xl mx-auto mt-2">
        {/* Code is my ink, design is my story—turn the page and explore. */}
        {/* Code is my ink, imagination is my framework—turn the page and explore. */}
        Where logic meets creativity, a new world unfolds
      </p>
    </section>
  );
}
