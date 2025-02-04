/* eslint-disable react/jsx-no-undef */
import React from "react";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold font-cormorant">
        Connect & Collaborate
      </h1>
      <h2 className="text-lg italic font-librebaskerville">
        A brief pause to say hello or spark a new collaboration.
      </h2>
      <p className="text-lg font-gentiumbookplus max-w-xl">
        I’d love to hear from you—whether it’s about potential projects, career
        opportunities, or simply saying hello.
      </p>

      {/* Email Button */}
      <a
        href="mailto:naatssakorn@gmail.com"
        className=" inline-flex items-center px-6 py-3 text-lg font-semibold
        border-2 border-book-dark rounded-md shadow-lg transition-all duration-300 no-underline space-x-2 mt-24 mb-16
        hover:-translate-y-1 hover:shadow-xl"
      >
        <Mail className="w-5 h-5 text-book-dark" />
        <span>Send a Letter</span>
      </a>

      {/* Social Links*/}
      <div className="mt-20 flex space-x-6">
        <a
          href="https://www.linkedin.com/in/anastasia-natassa-tsapanidou-kornilaki-a2b052191/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-12 py-2 text-white bg-book-accent rounded-md shadow-md 
          transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-1 no-underline space-x-2"
        >
          <SiLinkedin className="w-5 h-5 text-white" />
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/natko22"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-12 py-2 text-white bg-book-accent rounded-md shadow-md 
          transition-all duration-200 hover:scale-105 hover:shadow-lg hover:-translate-y-1 no-underline space-x-2"
        >
          <SiGithub className="w-5 h-5 text-white" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
