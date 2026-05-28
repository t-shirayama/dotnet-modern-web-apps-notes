export type Route =
  | { name: "home" }
  | { name: "chapter"; chapterId: string; noteId?: string };

export function parseRoute(hash: string): Route {
  const normalized = hash.replace(/^#\/?/, "");
  // Chapter and note ids are stored as encodeURIComponent values from build/readNotes.ts.
  // Keep route segments encoded so URL-generated ids and parsed ids compare exactly.
  const parts = normalized.split("/").filter(Boolean);

  if (parts[0] === "docs" && parts[1]) {
    return { name: "chapter", chapterId: parts[1], noteId: parts[2] };
  }

  return { name: "home" };
}

export function homeHref(): string {
  return "#/";
}

export function chapterHref(chapterId: string): string {
  return `#/docs/${chapterId}`;
}

export function noteHref(chapterId: string, noteId: string): string {
  return `#/docs/${chapterId}/${noteId}`;
}
