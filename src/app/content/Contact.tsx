/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { Mail } from "lucide-react";
import "../styles/globals.css";

const Contact = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-0">
      <h1 className="text-3xl sm:text-4xl font-bold font-cormorant">
        Connect & Collaborate
      </h1>

      <h2 className="text-base sm:text-lg italic font-librebaskerville">
        A brief pause to say hello or spark a new collaboration.
      </h2>

      <p className="text-base sm:text-lg text-center font-gentiumbookplus max-w-xs sm:max-w-md md:max-w-xl">
        I'd love to hear from you—whether it's about potential projects, career
        opportunities, or simply saying hello.
      </p>

      {/* Email Button */}
      <a
        href="mailto:naatssakorn@gmail.com"
        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 
        text-base sm:text-lg font-semibold
        border-2 border-book-dark rounded-md shadow-lg transition-all duration-300 
        no-underline space-x-2 mt-12 sm:mt-16 md:mt-24 mb-8 sm:mb-12 md:mb-16
        hover:-translate-y-1 hover:shadow-xl
        active:bg-book-dark active:text-white"
      >
        <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-book-dark" />
        <span>Send a Letter</span>
      </a>

      {/* Social Links */}
      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <a
          href="https://www.linkedin.com/in/anastasia-natassa-tsapanidou-kornilaki-a2b052191/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-6 sm:px-8 md:px-12 py-2 
          text-white bg-book-accent rounded-md shadow-md transition-all duration-200 
          no-underline space-x-2
          hover:scale-105 hover:shadow-lg hover:-translate-y-1
          active:bg-opacity-80 active:shadow-inner"
        >
          <SiLinkedin className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/natko22"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-6 sm:px-8 md:px-12 py-2 
          text-white bg-book-accent rounded-md shadow-md transition-all duration-200 
          no-underline space-x-2
          hover:scale-105 hover:shadow-lg hover:-translate-y-1
          active:bg-opacity-80 active:shadow-inner"
        >
          <SiGithub className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
