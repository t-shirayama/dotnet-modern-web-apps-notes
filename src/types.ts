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
