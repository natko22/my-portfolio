export default function AboutMe() {
  return (
    <section
      className="max-w-3xl mx-auto -mt-8 px-4 sm:px-8 md:px-10 lg:px-12"
      aria-labelledby="about-heading"
    >
      <h1
        id="about-heading"
        className="text-center mt-8 font-bold mb-2 text-book-dark 
text-2xl
xxxs:text-2xl 
xxs:text-2xl
sm:text-3xl 
small-md:text-3xl 
md:text-4xl 
lg:text-3xl"
      >
        The Author Behind the Code
      </h1>
      <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-book-accent">
        Welcome! I’m Anastasia Tsapanidou Kornilaki, a web developer with a
        passion for both technology and design. My journey started in a
        completely different field — Theology. Though my studies were
        theoretical,i was always drawn to problem-solving. Long before I knew
        anything about web development, I found myself inspecting web pages,
        fascinated by how they were built and how they worked.
      </p>
      <p>
        That curiosity ultimately led me to web development. It wasn’t an
        immediate transition, but over time, I realized that web development
        gave me the perfect outlet to build and create — a way to turn my ideas
        into something real and impactful.
      </p>
      <p>
        Web development is ever-changing, and I’m committed to continuous
        learning. This portfolio reflects that journey — each project has taught
        me valuable lessons and has contributed to my growth as a developer.
        Every chapter brings new challenges, and with each one, I continue to
        learn, adapt, and evolve.
      </p>
      <p className="italic border-l-4 border-book-accent-light pl-4 py-1">
        Thank you for stepping into my world of code and creativity. I hope you
        will find inspiration in these pages as I continue to write my story,
        one keystroke at a time.
      </p>

      {/* Signature/call to action */}
      <footer className="mt-10 text-right mr-8 font-serif italic text-book-accent-dark">
        ~ Anastasia
      </footer>
    </section>
  );
}
