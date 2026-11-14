"use client";

import { useState } from "react";

// News cards, newest first, a few per page with older/newer arrows
// (same arrow buttons as the carousels). Arrows only appear when there is more than one page.
export default function NewsList({ items, perPage = 3 }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const shown = items.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="news-list">
      <div className="news-head">
        <h2>In the news</h2>
        {pages > 1 && (
          <div className="carousel-arrows">
            <span className="mono small muted" aria-live="polite">{page + 1} / {pages}</span>
            <button type="button" className="arrow-btn" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Newer news">←</button>
            <button type="button" className="arrow-btn" onClick={() => setPage(page + 1)} disabled={page === pages - 1} aria-label="Older news">→</button>
          </div>
        )}
      </div>
      {shown.map((n) => (
        <a key={n.href} className="news-card wiggle" href={n.href} target="_blank" rel="noreferrer" style={{ background: n.color }}>
          <img className={n.portrait ? "portrait" : undefined} src={n.img} alt={n.alt} loading="lazy" />
          <span className="news-text">
            <span className="mono small muted">{n.meta}</span>
            <span className="news-title">{n.title}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
