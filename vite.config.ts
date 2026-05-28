import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readChapters } from "./build/readNotes";

const virtualModuleId = "virtual:notes-content";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

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
          return `export default ${JSON.stringify(readChapters(__dirname))};`;
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
