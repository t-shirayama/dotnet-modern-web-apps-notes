# Repository Guidelines

## Project Structure

- `docs/` contains the learning notes. Use numbered chapter folders and numbered Markdown files.
- `src/` contains the React viewer that loads Markdown from `docs/`.
- `public/` contains static assets such as the favicon.
- `.github/workflows/pages.yml` builds and deploys the site to GitHub Pages.

## Documentation Rules

- Keep each note small enough to reread independently, but complete enough to explain the decision point.
- Put reference links in the chapter's final `参考サイト` note.
- Prefer Microsoft Learn, .NET docs, Azure docs, and official GitHub repositories for references.
- Use backticks for API names, commands, product identifiers, package names, and code symbols.
- Avoid copying source text verbatim. Rewrite as Japanese memoranda with practical interpretation.
- Add Mermaid diagrams when they make architecture, dependency direction, workflow, testing, or hosting decisions easier to understand.
- Prefer `flowchart` Mermaid diagrams for explanatory notes. Keep diagrams focused, and pair them with short surrounding prose.
- Mermaid diagrams are rendered from Markdown into SVG. Treat externally supplied Mermaid content as review-required content.

## Commands

- `npm ci` installs dependencies.
- `npm run dev` starts the local Vite server.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run build` verifies TypeScript and production output.
- `npm run preview` serves the production build locally.
