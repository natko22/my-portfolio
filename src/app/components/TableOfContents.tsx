/* eslint-disable react/display-name */
"use client";

import { memo } from "react";
import { Chapter } from "@/app/types/index";
import { chapters } from "../content/ChapterContent";

interface TOCProps {
  currentChapter: Chapter;
  onChapterSelect: (chapter: Chapter) => void;
  onClose: () => void;
}

export const TableOfContents = memo(
  ({ currentChapter, onChapterSelect, onClose }: TOCProps) => {
    const handleChapterSelect = (chapter: Chapter) => {
      if (chapter !== currentChapter) {
        onChapterSelect(chapter);
      }
    };

    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-book-bg to-transparent z-10"></div>

        <div className="absolute inset-0 overflow-y-auto no-scrollbar">
          <div className="px-8 pt-24 pb-24 min-h-full">
            <div className="flex flex-col h-full">
              <h1 className="text-2xl mb-8 text-book-dark text-left">
                Table of Contents
              </h1>

              <div className="flex flex-col h-full pt-22">
                <div className="space-y-6">
                  {(Object.keys(chapters) as Array<keyof typeof chapters>).map(
                    (chapter) => (
                      <button
                        key={chapter}
                        className={`w-full text-left p-4 rounded transition-colors ${
                          currentChapter === chapter
                            ? "bg-book-accent-light text-book-dark font-bold"
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

              <div className="relative">
                <div
                  onClick={onClose}
                  className="absolute -right-6 -top-[48rem] cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 pb-2"
                >
                  <div className="relative">
                    <div className="w-24 h-40 bg-book-accent rounded-t-lg shadow-lg relative overflow-hidden flex items-center justify-center -mt-4">
                      <h2 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-book-light font-serif text-base whitespace-nowrap rotate-70">
                        Close Book
                      </h2>
                    </div>
                    <div className="w-24 h-6 bg-book-accent rounded-b-lg shadow-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-book-bg to-transparent z-10"></div>
      </div>
    );
  }
);
