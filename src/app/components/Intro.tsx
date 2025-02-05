export default function Intro() {
  return (
    <section className="intro flex flex-col justify-center items-center text-center px-6 md:px-12">
      {/* Title */}
      <h1 className="mt-8 text-book-accent-dark">
        Turning Pages, Writing Code
        {/* Lines of Code, Chapters of Creativity */}
      </h1>

      {/* Subtitle - Fixed Alignment, Width, and Spacing */}
      <p className="w-full max-w-2xl mt-4 italic text-book-accent-dark text-center mx-auto">
        {/* Code is my ink, design is my story—turn the page and explore. */}
        {/* Code is my ink, imagination is my framework—turn the page and explore. */}
        Where logic meets creativity, a new world unfolds
      </p>
    </section>
  );
}
