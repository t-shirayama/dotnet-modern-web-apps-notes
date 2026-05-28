/// <reference types="vite/client" />

declare module "virtual:notes-content" {
  import type { Chapter } from "./types";

  const chapters: Chapter[];
  export default chapters;
}
