# Read Mode

A minimal Markdown editor with live preview, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm start
```

### Features

- **Two-pane layout** (desktop) or **tabbed view** (mobile) — edit Markdown on the left, see live HTML preview on the right
- **Live preview** with 200ms debounce
- **Copy HTML** to clipboard
- **Download HTML** as a standalone `.html` file with embedded read-mode CSS
- **Read Mode toggle** — switches to comfortable serif typography with wide line-height
- **Print** — CSS print stylesheet hides the editor and toolbar
- **3 sample templates** — Article, Meeting Notes, README
- **Word count + reading time** in the toolbar
- **localStorage persistence** — your Markdown is saved automatically

## Security notes

- All rendered HTML is sanitised with [DOMPurify](https://github.com/cure53/DOMPurify) before display
- `markdown-it` is configured with `html: false` to prevent raw HTML injection at the parser level
- Only an explicit allowlist of HTML tags and attributes passes through sanitisation
- A warning banner appears if sanitisation removes any content
- Downloaded HTML files contain the same sanitised output

## Limitations

- No server-side rendering of the editor (client component with `"use client"`)
- No syntax highlighting in code blocks
- No collaborative editing or backend storage
- Sanitisation comparison uses string length heuristic — minor formatting differences may trigger false positive warnings
- DOMPurify runs client-side only; no server-side sanitisation fallback

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 + `@tailwindcss/typography`
- `markdown-it` for Markdown parsing
- `dompurify` for XSS sanitisation
