"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Toolbar from "@/components/Toolbar";
import { markdownToHtml } from "@/utils/markdownToHtml";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const STORAGE_KEY = "read-mode-markdown";
const DEBOUNCE_MS = 200;

const DEFAULT_MARKDOWN = `# Welcome to Read Mode

Start writing **Markdown** on the left and see the live preview on the right.

## Features

- Live preview with debounce
- Copy HTML to clipboard
- Download as HTML file
- Read mode for comfortable reading
- Print-friendly output

> Try loading a template from the toolbar above!
`;

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function getWordCount(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function getReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function buildDownloadHtml(html: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Read Mode Export</title>
<style>
  body {
    max-width: 720px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 18px;
    line-height: 1.8;
    color: #1a1a1a;
    background: #fafafa;
  }
  h1, h2, h3, h4, h5, h6 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin-top: 2em; margin-bottom: 0.5em; }
  h1 { font-size: 2em; border-bottom: 1px solid #e5e5e5; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; }
  a { color: #2563eb; }
  pre { background: #f3f4f6; padding: 1em; border-radius: 6px; overflow-x: auto; }
  code { font-size: 0.9em; background: #f3f4f6; padding: 0.15em 0.3em; border-radius: 3px; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 3px solid #d1d5db; margin-left: 0; padding-left: 1em; color: #6b7280; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d1d5db; padding: 0.5em 0.75em; text-align: left; }
  th { background: #f3f4f6; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid #e5e5e5; margin: 2em 0; }
</style>
</head>
<body>
${html}
</body>
</html>`;
}

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const [mounted, setMounted] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy HTML");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [sanitizeWarning, setSanitizeWarning] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setMarkdown(saved !== null ? saved : DEFAULT_MARKDOWN);
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, markdown);
    }
  }, [markdown, mounted]);

  const debouncedMarkdown = useDebounce(markdown, DEBOUNCE_MS);

  const rawHtml = markdownToHtml(debouncedMarkdown);
  const { html: safeHtml, wasModified } = mounted
    ? sanitizeHtml(rawHtml)
    : { html: "", wasModified: false };

  useEffect(() => {
    setSanitizeWarning(wasModified);
  }, [wasModified]);

  const wordCount = getWordCount(debouncedMarkdown);
  const readingTime = getReadingTime(wordCount);

  const handleCopyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(safeHtml);
      setCopyLabel("Copied!");
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopyLabel("Copy HTML"), 2000);
    } catch {
      setCopyLabel("Failed");
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopyLabel("Copy HTML"), 2000);
    }
  }, [safeHtml]);

  const handleDownloadHtml = useCallback(() => {
    const fullHtml = buildDownloadHtml(safeHtml);
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "read-mode-export.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [safeHtml]);

  const handleSelectTemplate = useCallback((content: string) => {
    setMarkdown(content);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        wordCount={wordCount}
        readingTime={readingTime}
        readMode={readMode}
        onToggleReadMode={() => setReadMode((v) => !v)}
        onCopyHtml={handleCopyHtml}
        onDownloadHtml={handleDownloadHtml}
        onSelectTemplate={handleSelectTemplate}
        copyLabel={copyLabel}
      />

      {/* Mobile tabs */}
      <div className="flex md:hidden border-b border-gray-200 dark:border-gray-700 print:hidden">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "edit"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Desktop: two panes */}
      <div className="flex-1 hidden md:flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 print:hidden">
          <Editor value={markdown} onChange={setMarkdown} />
        </div>
        <div className="w-1/2">
          <Preview html={safeHtml} readMode={readMode} sanitizeWarning={sanitizeWarning} />
        </div>
      </div>

      {/* Mobile: tabbed */}
      <div className="flex-1 md:hidden overflow-hidden">
        {activeTab === "edit" ? (
          <div className="h-full print:hidden">
            <Editor value={markdown} onChange={setMarkdown} />
          </div>
        ) : (
          <Preview html={safeHtml} readMode={readMode} sanitizeWarning={sanitizeWarning} />
        )}
      </div>
    </div>
  );
}
