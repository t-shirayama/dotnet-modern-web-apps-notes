import notesContent from "virtual:notes-content";
import type { Chapter } from "./types";

export const chapters: Chapter[] = notesContent;

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export type { Chapter, Note } from "./types";
