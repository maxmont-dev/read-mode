import DOMPurify from "dompurify";

export interface SanitizeResult {
  html: string;
  wasModified: boolean;
}

export function sanitizeHtml(dirty: string): SanitizeResult {
  const clean = DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "blockquote", "pre", "code",
      "a", "strong", "em", "del", "s",
      "table", "thead", "tbody", "tr", "th", "td",
      "img", "figure", "figcaption",
      "div", "span",
      "input",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id", "type", "checked", "disabled"],
  });
  return {
    html: clean,
    wasModified: clean.length !== dirty.length,
  };
}
