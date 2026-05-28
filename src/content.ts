import notesContent from "virtual:notes-content";

export type Note = {
  id: string;
  order: number;
  fileName: string;
  title: string;
  markdown: string;
};

export type Chapter = {
  id: string;
  order: number;
  folderName: string;
  title: string;
  notes: Note[];
};

export const chapters: Chapter[] = notesContent;

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}
