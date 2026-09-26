"use client";

import { useEffect, useRef, useState } from "react";

// Horizontal card row with previous/next arrows; also scrolls by swipe or trackpad.
export default function Carousel({ head, label, children }) {
  const track = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = track.current;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir) => {
    const el = track.current;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="section-head">
        {head}
        <div className="carousel-arrows">
          <button type="button" className="arrow-btn" onClick={() => step(-1)} disabled={!canPrev} aria-label={`Previous ${label}`}>←</button>
          <button type="button" className="arrow-btn" onClick={() => step(1)} disabled={!canNext} aria-label={`Next ${label}`}>→</button>
        </div>
      </div>
      <div className="carousel-track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </>
  );
}
