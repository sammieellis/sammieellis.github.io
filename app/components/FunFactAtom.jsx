"use client";

import { useState } from "react";

const facts = [
  "Squeeze iron to Earth’s-core pressures and it flips from electron donor to electron acceptor, pulling electrons away from elements like silicon and sulfur.",
  "Cesium’s 5p electrons are “core” electrons, normally off-limits for chemistry. Under pressure they can form real chemical bonds, and I’m hunting for a compound where experiments can catch them doing it.",
  "Squeeze hydrogen hard enough and, before it turns metallic, its molecules start acting like an electride, with electrons pooling in the gaps between H₂ molecules.",
  "Our ELFNet model predicts electron localization maps about 350× faster than DFT, to help find metal frameworks that could hold superhydrides.",
  "Fluorine can etch MoS₂ and WS₂ one atomic layer at a time. A machine-learned potential lets me simulate it out to nanoseconds.",
];

const mouths = [
  "M-26,28 Q0,56 26,28 Z",
  "M-12,32 a12,14 0 1,0 24,0 a12,14 0 1,0 -24,0",
  "M-26,28 Q0,56 26,28 Z",
  "M-22,30 Q0,48 22,30 Z",
  "M-12,32 a12,14 0 1,0 24,0 a12,14 0 1,0 -24,0",
];

const INK = "#1F1B4D";
const faces = ["sparkle", "happy", "wink", "ooh", "sparkle"];

function Eye({ x }) {
  return (
    <g>
      <ellipse cx={x} cy="12" rx="9.5" ry="11" fill={INK} />
      <circle cx={x + 3.2} cy="7.5" r="3.6" fill="#FFFFFF" />
      <circle cx={x - 3} cy="16" r="1.6" fill="#FFFFFF" />
    </g>
  );
}

function Face({ kind }) {
  const cheeks = (
    <g fill="#FF8A7A" opacity="0.55">
      <ellipse cx="-50" cy="30" rx="13" ry="7.5" />
      <ellipse cx="50" cy="30" rx="13" ry="7.5" />
    </g>
  );
  const smile = <path d="M-9,30 q4.5,6 9,0 q4.5,6 9,0" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />;
  if (kind === "happy") {
    return (
      <g>
        <path d="M-40,14 q9,-12 18,0 M22,14 q9,-12 18,0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M-7,27 q7,10 14,0 z" fill={INK} />
        {cheeks}
      </g>
    );
  }
  if (kind === "wink") {
    return (
      <g>
        <Eye x={-31} />
        <path d="M22,13 q9,-9 18,0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        {smile}
        {cheeks}
      </g>
    );
  }
  if (kind === "ooh") {
    return (
      <g>
        <Eye x={-31} />
        <Eye x={31} />
        <ellipse cx="0" cy="33" rx="5" ry="6" fill={INK} />
        {cheeks}
      </g>
    );
  }
  return (
    <g>
      <Eye x={-31} />
      <Eye x={31} />
      {smile}
      {cheeks}
    </g>
  );
}

function ring(r, n, offsetDeg) {
  return Array.from({ length: n }, (_, k) => {
    const t = ((offsetDeg + (360 * k) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  });
}

export default function FunFactAtom() {
  const [fact, setFact] = useState(0);
  const next = () => setFact((f) => (f + 1) % facts.length);

  return (
    <div className="fact-atom">
      <div className="speech" aria-live="polite">
        <span className="mono muted">DID YOU KNOW · {fact + 1} / {facts.length}</span>
        <p>{facts[fact]}</p>
      </div>
      <button className="mascot" type="button" onClick={next} aria-label="Show the next research fact">
        <svg className="bob" viewBox="-170 -170 340 340" aria-hidden="true">
          <defs>
            <radialGradient id="mcloud">
              <stop offset="0%" stopColor="#9DE6F0" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#CFEFF6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#DDF3F7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle r="168" fill="url(#mcloud)" />
          <circle r="128" fill="none" stroke="#3F5BFF" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.6" />
          <g className="orbit" style={{ animationDuration: "7s" }}>
            {ring(118, 4, 20).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="8" fill="#7FDDEB" stroke="#1F1B4D" strokeWidth="2" />
            ))}
          </g>
          <g className="orbit-rev" style={{ animationDuration: "11s" }}>
            {ring(146, 6, 0).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="6.5" fill="#9DB0FF" stroke="#1F1B4D" strokeWidth="2" />
            ))}
          </g>
          <circle r="88" fill="#F6D743" stroke="#1F1B4D" strokeWidth="2.5" />
          <ellipse cx="-30" cy="-40" rx="22" ry="12" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 -30 -40)" />
          <Face kind={faces[fact % faces.length]} />
        </svg>
      </button>
      <span className="mono muted small">tap the atom for the next one</span>
    </div>
  );
}
