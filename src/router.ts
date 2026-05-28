export type Route =
  | { name: "home" }
  | { name: "chapter"; chapterId: string };

export function parseRoute(hash: string): Route {
  const normalized = hash.replace(/^#\/?/, "");
  const parts = normalized.split("/").filter(Boolean);

  if (parts[0] === "docs" && parts[1]) {
    return { name: "chapter", chapterId: parts[1] };
  }

  return { name: "home" };
}

export function homeHref(): string {
  return "#/";
}

export function chapterHref(chapterId: string): string {
  return `#/docs/${chapterId}`;
}
