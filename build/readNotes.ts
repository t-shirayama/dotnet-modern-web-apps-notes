import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Chapter } from "../src/types";

function stripNumberPrefix(value: string): string {
  return value.replace(/^\d+[_\s-]*/, "").replace(/\.md$/, "");
}

function readOrder(value: string): number {
  const match = value.match(/^(\d+)/);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function readTitle(fileName: string, markdown: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading?.[1]?.trim() || stripNumberPrefix(fileName);
}

function slugify(value: string): string {
  return encodeURIComponent(value);
}

export function readChapters(rootDir: string): Chapter[] {
  const docsDir = join(rootDir, "docs");

  if (!existsSync(docsDir)) {
    return [];
  }

  return readdirSync(docsDir)
    .filter((entry) => statSync(join(docsDir, entry)).isDirectory())
    .map((folderName) => {
      const folderPath = join(docsDir, folderName);
      const notes = readdirSync(folderPath)
        .filter((entry) => entry.endsWith(".md"))
        .map((fileName) => {
          const markdown = readFileSync(join(folderPath, fileName), "utf8");

          return {
            id: slugify(`${folderName}/${fileName}`),
            order: readOrder(fileName),
            fileName,
            title: readTitle(fileName, markdown),
            markdown,
          };
        })
        .sort((a, b) => a.order - b.order || a.fileName.localeCompare(b.fileName, "ja"));

      return {
        id: slugify(folderName),
        order: readOrder(folderName),
        folderName,
        title: stripNumberPrefix(folderName),
        notes,
      };
    })
    .sort((a, b) => a.order - b.order || a.folderName.localeCompare(b.folderName, "ja"));
}
