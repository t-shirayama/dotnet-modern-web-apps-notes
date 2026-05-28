/// <reference types="vite/client" />

declare module "virtual:notes-content" {
  import type { Chapter } from "./content";

  const chapters: Chapter[];
  export default chapters;
}
