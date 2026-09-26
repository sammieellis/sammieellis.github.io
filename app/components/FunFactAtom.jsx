"use client";

import { useState } from "react";

const facts = [
  "Iron usually gives electrons away, but squeeze it hard enough and it starts taking them. In iron iodide, the charge on iron flips from positive to negative near 150 GPa.",
  "Cesium’s 5p electrons belong to its core and normally stay out of chemistry. Under pressure they can form chemical bonds, and my thesis looks for a compound where experiments can observe this.",
  "When molecular hydrogen turns metallic under pressure, the H₂ molecules stay intact and electrons move into the empty spaces between them, much like in an electride.",
  "Our ELFNet model predicts electron localization functions about 350× faster than DFT, helping identify metal frameworks that could host superhydrides.",
  "Quantum-accurate simulations usually reach only picoseconds on small cells. I fine-tune a machine-learned potential on them so it can run for nanoseconds on much larger systems.",
];

const mouths = [
  "M-26,28 Q0,56 26,28 Z",
  "M-12,32 a12,14 0 1,0 24,0 a12,14 0 1,0 -24,0",
  "M-26,28 Q0,56 26,28 Z",
  "M-22,30 Q0,48 22,30 Z",
  "M-12,32 a12,14 0 1,0 24,0 a12,14 0 1,0 -24,0",
];

const INK = "#1F1B4D";
const faces = ["smile", "happy", "wink", "ooh", "happy"];

function Eye({ x }) {
  return <ellipse cx={x} cy="10" rx="7" ry="9" fill={INK} />;
}

function Face({ kind }) {
  const cheeks = (
    <g fill="#FF8A7A" opacity="0.55">
      <ellipse cx="-48" cy="28" rx="13" ry="7.5" />
      <ellipse cx="48" cy="28" rx="13" ry="7.5" />
    </g>
  );
  const open = <path d="M-15,24 q15,22 30,0 z" fill={INK} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />;
  const tongue = <path d="M-7,34 q7,-6 14,0 q-7,6 -14,0 z" fill="#FF8A7A" />;
  if (kind === "happy") {
    return (
      <g>
        <path d="M-40,12 q9,-12 18,0 M22,12 q9,-12 18,0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        {open}{tongue}{cheeks}
      </g>
    );
  }
  if (kind === "wink") {
    return (
      <g>
        <Eye x={-31} />
        <path d="M22,12 q9,-10 18,0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        {open}{tongue}{cheeks}
      </g>
    );
  }
  if (kind === "ooh") {
    return (
      <g>
        <Eye x={-31} />
        <Eye x={31} />
        <ellipse cx="0" cy="31" rx="6.5" ry="8" fill={INK} />
        {cheeks}
      </g>
    );
  }
  return (
    <g>
      <Eye x={-31} />
      <Eye x={31} />
      {open}{tongue}{cheeks}
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
