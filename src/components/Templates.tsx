"use client";

const templates: Record<string, string> = {
  Article: `# The Future of Web Development

Web development continues to evolve at a rapid pace. In this article, we explore the key trends shaping the industry.

## The Rise of Server Components

Server components represent a paradigm shift in how we think about rendering. By moving logic to the server, we reduce bundle sizes and improve performance.

### Benefits

- **Smaller bundles** — Less JavaScript shipped to the client
- **Better SEO** — Content is rendered on the server
- **Improved security** — Sensitive logic stays server-side

## TypeScript Everywhere

TypeScript adoption has reached a tipping point. Most new projects start with TypeScript, and the ecosystem has matured significantly.

> "TypeScript is not just a type checker — it's a language server that makes your editor smarter." — *Anonymous Developer*

## Conclusion

The web platform is more capable than ever. With modern frameworks, developers can build fast, accessible, and maintainable applications.

---

*Published on 2025-01-15 · 2 min read*
`,
  "Meeting Notes": `# Team Standup — Monday

**Date:** 2025-01-20
**Attendees:** Alice, Bob, Carol, Dave

---

## Updates

### Alice — Frontend
- [x] Completed the dashboard redesign
- [x] Fixed responsive layout issues
- [ ] Still working on accessibility audit

### Bob — Backend
- [x] Deployed new API endpoints
- [ ] Need to add rate limiting
- [ ] Database migration pending review

### Carol — Design
- [x] Finalised the new colour palette
- [ ] Icon set review in progress

### Dave — DevOps
- [x] Set up CI/CD pipeline
- [x] Monitoring alerts configured
- [ ] Load testing scheduled for Wednesday

## Action Items

| Owner | Task | Due |
|-------|------|-----|
| Alice | Complete a11y audit | Wed |
| Bob | Add rate limiting | Thu |
| Dave | Run load tests | Wed |

## Next Meeting

**Wednesday, 10:00 AM** — Focus on launch readiness.
`,
  README: `# My Project

A brief description of what this project does and who it's for.

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`typescript
import { configure } from "my-project";

const app = configure({
  debug: true,
  port: 3000,
});

app.start();
\`\`\`

## API Reference

### \`configure(options)\`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| \`debug\` | \`boolean\` | \`false\` | Enable debug logging |
| \`port\` | \`number\` | \`8080\` | Server port |

### \`app.start()\`

Starts the application server. Returns a \`Promise<void>\`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
};

interface TemplatesProps {
  onSelect: (markdown: string) => void;
}

export default function Templates({ onSelect }: TemplatesProps) {
  return (
    <div className="flex gap-1">
      {Object.entries(templates).map(([name, content]) => (
        <button
          key={name}
          onClick={() => onSelect(content)}
          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
        >
          {name}
        </button>
      ))}
    </div>
  );
}
