import React from "react";

const TechStack: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center text-center max-w-3xl mx-auto px-8 "
      role="region"
      aria-labelledby="techstack-title"
    >
      {/* Title */}
      <h1
        className="text-center font-bold mb-2 text-book-dark 
text-2xl
xxxs:text-2xl 
xxs:text-2xl
sm:text-3xl 
small-md:text-3xl 
md:text-4xl 
lg:text-4xl"
        id="techstack-title"
      >
        {" "}
        My Digital Lexicon
      </h1>
      <h2 className=" text-center text-sm xxxs:text-base xxs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-body ">
        {" "}
        A collection of tools that bring my stories to life.
      </h2>
      <p className="text-base sm:text-lg font-gentiumbookplus max-w-xl text-gray-700 mt-2 text-center">
        A writer breathes life into stories with ink and parchment; a developer
        crafts digital experiences with code and creativity.
      </p>

      {/* Tech Stack Section */}
      <div className="mt-8 flex flex-col w-full max-w-2xl">
        {[
          {
            category: "📜 The Foundations of the Script",
            stack: [
              {
                name: "HTML",
                description: "The parchment upon which the web is written.",
              },
              {
                name: "CSS",
                description:
                  "The ink that breathes beauty into the written web.",
              },
              {
                name: "JavaScript",
                description:
                  "The enchanted spellbook that brings static pages to life.",
              },
              {
                name: "TypeScript",
                description:
                  "A refined dialect of JavaScript, ensuring clarity and precision.",
              },
            ],
          },
          {
            category: "🏛 The Architecture of the Web",
            stack: [
              {
                name: "React",
                description: "A library of reusable story components.",
              },
              {
                name: "Next.js",
                description:
                  "A roadmap guiding React applications through server-side realms.",
              },
              {
                name: "Vue.js",
                description: "A framework of clarity and simplicity.",
              },
              { name: "Nuxt.js", description: "The trusted guide for Vue." },
              {
                name: "Astro",
                description:
                  "A celestial guide for crafting ultra-fast web experiences.",
              },
              {
                name: "Node.js",
                description:
                  "The powerful engine that breathes life into the server-side of the web.",
              },
              {
                name: "Express.js",
                description: "The swift courier of server-side requests.",
              },
            ],
          },
          {
            category: "🎨 The Codex of Styles",
            stack: [
              {
                name: "Tailwind CSS",
                description: "The master artisan of utility-first styling.",
              },
              {
                name: "Sass",
                description: "The enchanted loom of structured beauty.",
              },
              {
                name: "Material UI",
                description: "A collection of prewritten design patterns.",
              },
            ],
          },
          {
            category: "📚 The Scrolls of Data",
            stack: [
              {
                name: "MongoDB",
                description: "A vast library where stories are stored.",
              },
              {
                name: "GraphQL",
                description:
                  "The wise scribe that fetches only the knowledge requested.",
              },
              {
                name: "Supabase",
                description:
                  "A spellbook containing authentication, storage, and database magic.",
              },
            ],
          },
          {
            category: "⚒️ The Tools of the Trade",
            stack: [
              {
                name: "Git",
                description:
                  "The ancient book of history, recording every version of a project's tale.",
              },
            ],
          },
        ].map((section, index) => (
          <div key={index} className="relative z-10 w-full text-left mt-8">
            {/* Section Title*/}
            <h3 className="text-lg sm:text-xl font-bold text-center border-b-2 pb-2 border-[var(--color-accent-light)]">
              {section.category}
            </h3>

            {/* Tech Stack Items */}
            <div className="mt-4 space-y-3 sm:space-y-2">
              {section.stack.map((tech, subIndex) => (
                <div
                  key={subIndex}
                  className="group relative flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-3 cursor-pointer transition-all duration-500 ease-in-out hover:text-book-accent p-2 sm:p-0"
                >
                  {/*  Hover Line */}
                  <span className="absolute inset-0 w-full bg-[var(--color-accent-light)] opacity-0 group-hover:opacity-30 focus-visible:opacity-30  transition-opacity duration-500 rounded-md"></span>
                  <span className="font-bold italic sm:min-w-[140px]">
                    {tech.name}:
                  </span>
                  <span className="text-gray-700">{tech.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
