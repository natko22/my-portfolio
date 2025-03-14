"use client";

import { useState, useEffect } from "react";
import BookLayout from "./components/BookLayout";
import Intro from "./components/Intro";

export default function Home() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isMediumOrMobile, setIsMediumOrMobile] = useState(false);

  // Function to check screen size - specifically for medium and mobile screens
  const checkScreenSize = () => {
    // Hide intro on screens smaller than 768px (lg breakpoint)
    setIsMediumOrMobile(window.innerWidth < 768);
  };

  // Listen for book open state changes from BookLayout
  const handleBookStateChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsBookOpen(open);
  };

  // Check screen size on mount and when window resizes
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Show intro when book is closed OR we're on a large screen (desktop)
  const showIntro = !isBookOpen || !isMediumOrMobile;

  return (
    <>
      {showIntro && <Intro />}
      <BookLayout
        className={`${showIntro ? "-mt-18" : "mt-4"}`}
        onBookStateChange={handleBookStateChange}
      />
    </>
  );
}
