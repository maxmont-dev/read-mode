"use client";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      className="w-full h-full resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-mono text-sm leading-relaxed focus:outline-none border-0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your Markdown here..."
      spellCheck={false}
    />
  );
}
