/* eslint-disable react/display-name */
"use client";

import { memo } from "react";
import { Chapter } from "@/app/types/index";
import { chapters } from "../content/ChapterContent";

interface TOCProps {
  currentChapter: Chapter;
  onChapterSelect: (chapter: Chapter) => void;
  onClose: () => void;
  isMobile?: boolean;
}

export const TableOfContents = memo(
  ({
    currentChapter,
    onChapterSelect,
    onClose,
    isMobile = false,
  }: TOCProps) => {
    const handleChapterSelect = (chapter: Chapter) => {
      if (isMobile || chapter !== currentChapter) {
        onChapterSelect(chapter);
      }
    };

    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar">
          <div
            className={`px-4 xxxs:px-5 xxs:px-6 sm:px-8 md:px-10 lg:px-12 ${
              isMobile
                ? "pt-10 pb-10"
                : "pt-12 md:pt-16 xxxs:pt-16 xxs:pt-18 sm:pt-20 md:pt-22 pb-12 md:pb-16 xxxs:pb-16 xxs:pb-18 sm:pb-20 md:pb-22"
            } min-h-full`}
          >
            <div className="flex flex-col h-full">
              {/* Title - visible on all screens, as it was originally */}
              <h1 className="text-2xl mb-6 md:mb-8 text-book-dark text-left">
                Table of Contents
              </h1>

              <div
                className={`flex flex-col h-full ${
                  isMobile ? "pt-4" : "pt-8 md:pt-22"
                }`}
              >
                <div className="space-y-3 md:space-y-4">
                  {(Object.keys(chapters) as Array<keyof typeof chapters>).map(
                    (chapter) => (
                      <button
                        key={chapter}
                        className={`w-full text-left p-3 md:p-4 rounded 
                          ${!isMobile ? "transition-colors" : ""} 
                          text-base 
                          mobile:text-sm 
                          sm:text-lg
                          ${
                            currentChapter === chapter
                              ? "bg-book-accent-light text-book-dark font-bold"
                              : isMobile
                              ? ""
                              : "hover:bg-book-accent-light"
                          }`}
                        onClick={() => handleChapterSelect(chapter as Chapter)}
                      >
                        {chapter}
                      </button>
                    )
                  )}
                </div>
              </div>
              {!isMobile && (
                <div className="relative">
                  <div
                    onClick={onClose}
                    className="absolute -right-6 -top-[36rem] xxxs:-top-[38rem] xxs:-top-[40rem] sm:-top-[42rem] md:-top-[53rem] tablet:-top-[55rem] lg:-top-[46rem] xl:-top-[48rem] cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 z-50"
                  >
                    <div className="relative">
                      {/* Main bookmark body with box-shadow for depth */}
                      <div
                        className="w-24 h-60 bg-book-accent rounded-t-lg relative overflow-hidden flex items-center justify-center shadow-lg"
                        style={{
                          boxShadow:
                            "2px 4px 8px rgba(0,0,0,0.3), -1px 2px 4px rgba(0,0,0,0.2)",
                          transform: "perspective(500px) rotateY(2deg)",
                        }}
                      >
                        <h2 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-book-light font-serif text-base font-bold whitespace-nowrap rotate-120">
                          Close Book
                        </h2>
                      </div>

                      {/* Bottom part with shadow */}
                      <div
                        className="w-24 h-6 bg-book-accent rounded-b-lg shadow-inner"
                        style={{
                          boxShadow:
                            "inset 0px -2px 5px rgba(0,0,0,0.2), 2px 4px 6px rgba(0,0,0,0.2)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TableOfContents;
