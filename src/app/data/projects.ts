export const projects = Object.freeze({
  "Chapter I: The Early Days": [
    {
      title: "Bouncing Ball",
      shortDescription:
        "A one-button arcade game where you time your jumps to dodge obstacles.",
      description: `My first project at Ironhack, inspired by "Kula World." Tap the spacebar to make the ball jump and avoid incoming obstacles while collecting items to score points.`,
      image: "/bouncing-ball.webp",
      techStack: ["JavaScript", "p5.js", "Web Audio API", "Canvas API"],
      demo: "https://bouncing-ball-22.netlify.app/",
      repo: "https://github.com/natko22/natko22.github.io-bouncing-ball",
    },
    {
      title: "Galaxia",
      shortDescription:
        "A space exploration app that lets users browse NASA images and contribute their own.",
      description: `Galaxia is a web app that allows users to explore stunning space images using NASA's API. Browse galleries of the Sun, Moon, Venus, and Mars Curiosity, save favorites, and contribute your own space-related photos.`,
      image: "/galaxia-logo.webp",
      techStack: [
        "MongoDB",
        "Express",
        "JavaScript",
        "Handlebars.js",
        "NASA API",
        "CSS",
      ],
      demo: "https://galaxia-kqgy.onrender.com/",
      repo: "https://github.com/natko22/galaxia",
    },
    {
      title: "Petopia",
      shortDescription:
        "A MERN-based platform connecting pet owners with trusted pet sitters.",
      description: `A full-stack web app where users can find pet sitters, manage bookings, leave reviews, and save favorites. Features include Google authentication, availability management, and a seamless booking system.`,
      image: "/dog-logo.webp",
      techStack: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "JWT",
        "Google Auth",
        "Cloudinary",
        "React Calendar",
        "CSS",
      ],
      demo: "https://petopia-petopia.netlify.app/",
      repo: "https://github.com/natko22/pet-project-frontend",
    },
  ],

  "Chapter II: Architecting My Own Path": [
    {
      title: "Makeup Artist Portfolio",
      shortDescription:
        "A portfolio website showcasing a makeup artist's work.",
      description: `This project is a professional portfolio for a talented makeup artist, built with React.js and featuring a LightGallery-powered interactive gallery. The site is fully responsive and deployed on Netlify.`,
      image: "/m-port.webp",
      techStack: ["React.js", "LightGallery", "CSS", "Netlify"],
      demo: "https://mantokamari.com/",
      repo: "https://github.com/natko22/m-portofolio",
    },
    {
      title: "Vrep Education",
      shortDescription:
        "A school management platform designed to handle academic performance.",
      description: `During my internship at MPC, I contributed to the development of VREP, an all-in-one school management platform. I worked on multiple pages, leveraging TypeScript, React, and Ant Design to build clean, efficient, and user-friendly interfaces. My work focused on enhancing the platform’s usability and performance, ensuring a seamless experience for students, teachers, and administrators.`,
      image: "/vrep.webp",
      techStack: ["TypeScript", "React", "Ant Design"],
      demo: "https://www.vrepeducation.com/",
      repo: "",
    },
    {
      title: "Cosmo Chat",
      shortDescription:
        "A real-time AI-powered chat application using OpenAI API.",
      description: `At Radical AI, I developed Cosmo Chat, a real-time messaging app using WebSocket for live communication and OpenAI API for AI-powered responses.`,
      image: "/cosmo-chat.webp",
      techStack: ["React", "Material UI", "WebSocket", "OpenAI API"],
      demo: "https://www.youtube.com/watch?v=bIrMB4OiIMU",
      repo: "https://github.com/natko22/cosmo-chat-ui",
    },
  ],

  "Chapter III: The Workshop Of Reality": [
    {
      title: "KorrekturKumpel Website",
      shortDescription:
        "Redesigned  the company’s main website to improve performance, consistency, and storytelling.",
      description: `As a front-end developer, I helped redesign and extend KorrekturKumpel’s primary  website — a platform promoting their AI-powered academic tool. The site is built with Astro and React, focusing on performance and modern design.
I enhanced the landing experience with smooth CSS animations, built new pages including “About Us,” and optimized layout consistency, responsiveness, and visual hierarchy across devices.  `,
      image: "/kk-website-2.webp",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Astro",
        "CSS Animations",
      ],
      demo: "https://korrekturkumpel.de/",
      repo: "",
    },
    {
      title: "KorrekturKumpel App",
      shortDescription:
        "Developed key features for the company’s main AI-based  application.",
      description: `KorrekturKumpel is an AI-powered platform that helps teachers correct student work faster. It can digitize handwritten answers, suggest grading criteria, and generate personalized feedback, making the correction process more efficient.

I worked on building key parts of the interface using Vue 3 and Nuxt.js — including secure account pages, layout components, and responsive designs. The app uses Supabase for authentication and real-time features.
 `,
      image: "/kk-app.webp",
      techStack: ["Nuxt.js", "Vue 3", "Supabase", "Tailwind CSS"],
      demo: "https://app.korrekturkumpel.de/login/",
      repo: "",
    },
  ],
});
