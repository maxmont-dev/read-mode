"use client";

import Templates from "./Templates";

interface ToolbarProps {
  wordCount: number;
  readingTime: number;
  readMode: boolean;
  onToggleReadMode: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onSelectTemplate: (markdown: string) => void;
  copyLabel: string;
}

export default function Toolbar({
  wordCount,
  readingTime,
  readMode,
  onToggleReadMode,
  onCopyHtml,
  onDownloadHtml,
  onSelectTemplate,
  copyLabel,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 print:hidden flex-wrap gap-2">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Read Mode</h1>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {wordCount} words · {readingTime} min read
        </span>
        <Templates onSelect={onSelectTemplate} />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleReadMode}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            readMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
          }`}
        >
          {readMode ? "Read Mode On" : "Read Mode"}
        </button>
        <button
          onClick={onCopyHtml}
          className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
        >
          {copyLabel}
        </button>
        <button
          onClick={onDownloadHtml}
          className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
        >
          Download HTML
        </button>
        <button
          onClick={() => window.print()}
          className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
        >
          Print
        </button>
      </div>
    </div>
  );
}
