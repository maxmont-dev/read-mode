"use client";

interface PreviewProps {
  html: string;
  readMode: boolean;
  sanitizeWarning: boolean;
}

export default function Preview({ html, readMode, sanitizeWarning }: PreviewProps) {
  return (
    <div className="h-full overflow-auto bg-white dark:bg-gray-900 p-4">
      {sanitizeWarning && (
        <div className="mb-3 px-3 py-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded text-amber-800 dark:text-amber-200 text-sm">
          Some content was removed during sanitisation for security.
        </div>
      )}
      <div
        className={`prose dark:prose-invert max-w-none ${readMode ? "read-mode" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
