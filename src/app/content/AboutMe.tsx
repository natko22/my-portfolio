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
lg:text-4xl"
      >
        The Author Behind the Code
      </h1>
      <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-book-accent">
        Welcome to my story in code , where every project is a new chapter and
        every line of code weaves a narrative of creativity and problem-solving.
        My name is Natassa, and I am a developer who finds inspiration in
        storytelling—both in books and in the digital experiences I create.
      </p>
      <p>
        With a background in Theology, my journey into tech was an unexpected
        plot twist—a leap into a world of logic, design, and endless discovery.
        What started as a simple curiosity became a passion for building
        meaningful, intuitive experiences on the web.
      </p>
      <p>
        As an avid book lover, I approach development the same way I approach a
        great novel—with curiosity, patience, and a love for the details. Every
        problem is a puzzle to be unraveled, every project a story waiting to be
        told. Whether it is designing seamless interfaces, weaving together
        APIs, or collaborating with others, my goal is to craft solutions that
        are as engaging as a well-written page.
      </p>
      <p className="italic border-l-4 border-book-accent-light pl-4 py-1">
        Thank you for stepping into my world of code and creativity. I hope you
        will find inspiration in these pages as I continue to write my story,
        one keystroke at a time.
      </p>

      {/* Signature/call to action */}
      <footer className="mt-10 text-right mr-8 font-serif italic text-book-accent-dark">
        ~ Natassa
      </footer>
    </section>
  );
}
