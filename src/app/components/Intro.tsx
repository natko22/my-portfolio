export default function Intro() {
  return (
    <section className="intro flex flex-col justify-center items-center text-center px-6 md:px-12 space-y-6 md:space-y-4 mt-16 md:mt-20 h-[12vh] md:h-[14vh] ">
      {/* Title */}
      <h1 className="text-book-accent-dark text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Turning Pages, Writing Code
        {/* Lines of Code, Chapters of Creativity */}
      </h1>

      <p className="w-full text-center max-w-2xl italic text-book-accent-dark text-lg sm:text-xl md:text-2xl mx-auto">
        {/* Code is my ink, design is my story—turn the page and explore. */}
        {/* Code is my ink, imagination is my framework—turn the page and explore. */}
        Where logic meets creativity, a new world unfolds
      </p>
    </section>
  );
}
