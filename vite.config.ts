import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const virtualModuleId = "virtual:notes-content";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

type Note = {
  id: string;
  order: number;
  fileName: string;
  title: string;
  markdown: string;
};

type Chapter = {
  id: string;
  order: number;
  folderName: string;
  title: string;
  notes: Note[];
};

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

function readChapters(): Chapter[] {
  const docsDir = join(__dirname, "docs");

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

export default defineConfig({
  base: "/dotnet-modern-web-apps-notes/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react";
          }

          if (
            id.includes("node_modules/react-markdown/") ||
            id.includes("node_modules/remark-gfm/") ||
            id.includes("node_modules/rehype-highlight/")
          ) {
            return "markdown";
          }

          return undefined;
        },
      },
    },
  },
  plugins: [
    react(),
    {
      name: "dotnet-modern-web-apps-notes-content",
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId;
        }

        return null;
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return `export default ${JSON.stringify(readChapters())};`;
        }

        return null;
      },
      configureServer(server) {
        const docsDir = join(__dirname, "docs");

        if (existsSync(docsDir)) {
          server.watcher.add(docsDir);
        }
      },
    },
  ],
});
