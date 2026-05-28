import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { chapters, getChapter } from "./content";
import type { Chapter } from "./types";
import { chapterHref, homeHref, noteHref, parseRoute } from "./router";

let mermaidPromise: Promise<typeof import("mermaid").default> | undefined;

function loadMermaid() {
  mermaidPromise ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: {
        primaryColor: "#eef6ff",
        primaryBorderColor: "#2563eb",
        primaryTextColor: "#102a43",
        lineColor: "#64748b",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      },
    });

    return mermaid;
  });

  return mermaidPromise;
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return useMemo(() => parseRoute(hash), [hash]);
}

function resetScrollImmediately() {
  window.scrollTo(0, 0);
}

function navigateHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return;
  }

  event.preventDefault();
  resetScrollImmediately();

  if (window.location.hash !== href) {
    window.location.hash = href;
  }
}

function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const diagramId = useId().replace(/:/g, "");

  useEffect(() => {
    let isCancelled = false;

    setError(null);

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    loadMermaid()
      .then((mermaid) => mermaid.render(`mermaid-${diagramId}`, chart))
      .then(({ svg }) => {
        if (!isCancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError("図を描画できませんでした。Mermaid の構文を確認してください。");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [chart, diagramId]);

  if (error) {
    return (
      <div className="mermaid-diagram mermaid-diagram-error">
        <p>{error}</p>
        <pre>
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return <div className="mermaid-diagram" ref={containerRef} />;
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const language = /language-(\w+)/.exec(className || "")?.[1];

    if (language === "mermaid") {
      return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

function Header() {
  return (
    <header className="site-header">
      <a
        className="brand"
        href={homeHref()}
        aria-label="Modern Web Apps with ASP.NET Core and Azure Notes home"
        onClick={(event) => navigateHash(event, homeHref())}
      >
        <span className="brand-mark">MWA</span>
        <span>
          <strong>Modern Web Apps with ASP.NET Core and Azure Notes</strong>
          <small>Architecture notes for ASP.NET Core and Azure</small>
        </span>
      </a>
    </header>
  );
}

function EmptyState() {
  return (
    <section className="empty-state" aria-label="empty content">
      <h2>まだ備忘録がありません</h2>
      <p>
        <code>docs/01_概要/01_概要.md</code> を追加すると、章一覧に表示されます。
      </p>
    </section>
  );
}

function HomePage() {
  const totalNotes = chapters.reduce((sum, chapter) => sum + chapter.notes.length, 0);

  return (
    <main className="home">
      <section className="home-intro">
        <p className="eyebrow">Memo</p>
        <h1>ASP.NET Core と Azure で設計する最新 Web アプリケーション</h1>
        <p>
          Microsoft Learn の eBook 系ガイドを、章ごとに判断基準と実務での見方へ整理した日本語の備忘録です。
        </p>
        <div className="stats" aria-label="content summary">
          <span>{chapters.length} chapters</span>
          <span>{totalNotes} notes</span>
        </div>
      </section>

      {chapters.length > 0 ? (
        <section className="chapter-grid" aria-label="chapters">
          {chapters.map((chapter) => (
            <a
              className="chapter-card"
              href={chapterHref(chapter.id)}
              key={chapter.id}
              onClick={(event) => navigateHash(event, chapterHref(chapter.id))}
            >
              <span className="chapter-number">{String(chapter.order).padStart(2, "0")}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.notes.length} notes</p>
            </a>
          ))}
        </section>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}

function ChapterNav({ currentChapter }: { currentChapter: Chapter }) {
  return (
    <aside className="chapter-nav" aria-label="chapter navigation">
      <a className="back-link" href={homeHref()} onClick={(event) => navigateHash(event, homeHref())}>
        Home
      </a>
      <nav>
        {chapters.map((chapter) => (
          <a
            aria-current={chapter.id === currentChapter.id ? "page" : undefined}
            href={chapterHref(chapter.id)}
            key={chapter.id}
            onClick={(event) => navigateHash(event, chapterHref(chapter.id))}
          >
            <span>{String(chapter.order).padStart(2, "0")}</span>
            {chapter.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function ChapterPage({ chapter, currentNoteId }: { chapter: Chapter; currentNoteId?: string }) {
  useEffect(() => {
    if (!currentNoteId) {
      return;
    }

    document.getElementById(currentNoteId)?.scrollIntoView({ block: "start" });
  }, [currentNoteId]);

  return (
    <main className="chapter-layout">
      <ChapterNav currentChapter={chapter} />
      <section className="note-column">
        <div className="chapter-title">
          <p className="eyebrow">Chapter {String(chapter.order).padStart(2, "0")}</p>
          <h1>{chapter.title}</h1>
          <p>{chapter.folderName}</p>
        </div>

        {chapter.notes.map((note) => (
          <article className="note-card" id={note.id} key={note.id}>
            <header className="note-header">
              <span>{String(note.order).padStart(2, "0")}</span>
              <h2>
                {note.title}
                <a
                  className="note-anchor"
                  href={noteHref(chapter.id, note.id)}
                  onClick={(event) => navigateHash(event, noteHref(chapter.id, note.id))}
                >
                  Link
                </a>
              </h2>
            </header>
            <div className="markdown-body">
              <ReactMarkdown
                components={markdownComponents}
                rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
                remarkPlugins={[remarkGfm]}
              >
                {note.markdown}
              </ReactMarkdown>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="home">
      <section className="home-intro">
        <p className="eyebrow">Not found</p>
        <h1>章が見つかりませんでした</h1>
        <p>URL を確認するか、ホームから章を選び直してください。</p>
        <a className="primary-link" href={homeHref()} onClick={(event) => navigateHash(event, homeHref())}>
          Home
        </a>
      </section>
    </main>
  );
}

export default function App() {
  const route = useHashRoute();
  const routeKey =
    route.name === "chapter" ? `chapter:${route.chapterId}:${route.noteId ?? ""}` : "home";

  useLayoutEffect(() => {
    resetScrollImmediately();
  }, [routeKey]);

  if (route.name === "chapter") {
    const chapter = getChapter(route.chapterId);
    return (
      <>
        <Header />
        {chapter ? <ChapterPage chapter={chapter} currentNoteId={route.noteId} /> : <NotFoundPage />}
      </>
    );
  }

  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}
