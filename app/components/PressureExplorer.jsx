"use client";

import { useState } from "react";

const INK = "#2D2440";

const faces = [
  { eyes: "M-12,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M6,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0", eyeFill: INK, mouth: "M-7,6 Q0,13 7,6" },
  { eyes: "M-13,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0 M5,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0", eyeFill: "#FFFFFF", mouth: "M-3,9 a3,4 0 1,0 6,0 a3,4 0 1,0 -6,0" },
  { eyes: "M-12,-8 L-6,-5 M12,-8 L6,-5 M-11,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0 M6.6,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0", eyeFill: INK, mouth: "M-6,9 L6,9" },
  { eyes: "M-12,-8 L-6,-4 L-12,0 M12,-8 L6,-4 L12,0", eyeFill: "none", mouth: "M-8,9 q2,-3 4,0 q2,3 4,0 q2,-3 4,0 q2,3 4,0" },
];

// [symbol, color, cloudScale, interstitialBlob, note]
const LEVELS = [
  {
    name: "Lab bench", gpa: "≈ 0 GPa", mood: "fluorine plucking sulfur off the surface", stage: "#E3F7EF", card: "#D9F5EA",
    atoms: null,
    where: "Oak Ridge National Lab · 2026",
    title: "Etching 2D materials, one atomic layer at a time",
    body: "At everyday pressure, I study how fluorine chews through MoS₂ and WS₂ monolayers during gas-assisted etching. I map reaction pathways with AIMD and MLFF-AIMD, then fine-tune a machine-learned interatomic potential on them, so we can simulate etching over nanoseconds and nanometers instead of picoseconds.",
    tags: ["AIMD", "MLFF-AIMD", "MLIP fine-tuning", "reaction pathways"],
  },
  {
    name: "Beyond +1", gpa: "~221 GPa", mood: "core electrons joining in", stage: "#EEE8FF", card: "#E8E1FF",
    atoms: [["O", "#FF8FB1", 0.95, 0, "Cs–O bond"], ["Cs", "#A8DBFF", 1.1, 0, "5p active!"], ["O", "#FF8FB1", 0.95, 0, "Cs–O bond"]],
    where: "M.S. thesis · CSUN",
    title: "Core electrons that bond",
    body: "Textbooks say cesium only ever gives up its one 6s electron. Theory has shown that under pressure, its 5p core electrons join in too: in cesium polyoxides, O–O bonds break apart and strong covalent Cs–O bonds form. My thesis looks for a candidate system where experiments can realize this core reactivity. I predict structures with CALYPSO, build ternary convex hulls, and simulate Cs XANES spectra, the fingerprint experimentalists would look for.",
    tags: ["CALYPSO", "ternary convex hulls", "FEFF XANES", "Bader charge"],
  },
  {
    name: "Earth’s core", gpa: "up to 350 GPa", mood: "FeSi (1:1): Si → Fe, iron grabbing electrons", stage: "#FFE1D6", card: "#FFE3DA",
    atoms: [["Si", "#C9B8FF", 0.8, 0, "gives e⁻ →"], ["Fe", "#FFB39A", 1.3, 0, "accepts e⁻"]],
    where: "PNAS · 2025",
    title: "Iron switches sides",
    body: "At the surface, iron gives electrons away (that’s rust!). Squeezed to core pressures (up to ~350 GPa), iron’s compact 3d bands drop in energy relative to the p-block elements’ np orbitals, so electrons flow toward iron instead. I built HSE convex hulls and Bader charge maps across Fe–p-block systems. The twist: elements that bond most strongly to core iron are the least depleted from the mantle, which points to volatile loss during Earth’s formation rather than being locked in the core.",
    tags: ["HSE DFT", "convex hulls", "Bader charge", "Fe–p-block"],
  },
  {
    name: "Hydrogen extreme", gpa: "up to 500 GPa", mood: "H₂ molecules, electrons pooling in the gaps", stage: "#FFF1CF", card: "#FFF3C4",
    atoms: [["H₂", "#FFFFFF", 0.9, 1, ""], ["H₂", "#FFFFFF", 0.9, 1, "e⁻ between molecules"], ["H₂", "#FFFFFF", 0.9, 1, ""]],
    where: "J. Phys. Chem. Lett. · 2026",
    title: "Hydrogen turns into an electride",
    body: "Most molecular crystals turn metallic by rearranging their bonds. Hydrogen doesn’t: we showed its metallization comes with electride-like behavior, with electrons localizing in the interstitial spaces between H₂ molecules. Those interstitial electrons may shape electron–phonon coupling and superconductivity, and the same features persist in metal superhydrides that keep H₂ units at moderate pressures, linking this back to the superhydride hunt.",
    tags: ["electrides", "interstitial bands", "metallization"],
  },
];

// [rx, ry, margin, spin seconds]
const SQUISH = [[40, 40, 26, 6], [36, 43, 12, 3.5], [32, 46, 2, 2], [28, 49, -8, 1.2]];

const pts = (r, n, off) =>
  Array.from({ length: n }, (_, k) => {
    const t = ((off + (360 * k) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  });

function Face({ face, scale = 1, y = 0 }) {
  return (
    <g transform={`translate(0,${y}) scale(${scale})`}>
      <path d={face.eyes} fill={face.eyeFill} stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="-14" cy="8" rx="5" ry="3" fill="#E0457B" opacity="0.4" />
      <ellipse cx="14" cy="8" rx="5" ry="3" fill="#E0457B" opacity="0.4" />
      <path d={face.mouth} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Blob({ x, id }) {
  return (
    <g transform={`translate(${x},0)`}>
      <ellipse rx="26" ry="40" fill={`url(#br-${id})`} />
      <circle className="twinkle" cx="-4" cy="-10" r="3" fill={INK} />
      <circle className="twinkle" style={{ animationDelay: ".7s" }} cx="5" cy="9" r="3" fill={INK} />
    </g>
  );
}

function Atom({ a, i, n, lvl, x, sq, face }) {
  const [sym, fill, cs, blob, note] = a;
  const id = `L${lvl}A${i}`;
  const isMol = sym === "H₂";
  const isCs = sym === "Cs" && lvl === 1;
  const ecol = isCs ? "#8B6BFF" : "#FFD66B";
  const esz = isCs ? 6 : 4.5;
  const half = 75 + sq[2];
  const flow = lvl === 2 && sym === "Si";
  return (
    <g transform={`translate(${x},100)`}>
      <defs>
        <radialGradient id={`cl-${id}`}>
          <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
          <stop offset="60%" stopColor={fill} stopOpacity="0.5" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`br-${id}`}>
          <stop offset="0%" stopColor="#5FB4FF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#8CCBFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8CCBFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse rx={sq[0] * 1.55 * cs} ry={sq[1] * 1.45 * cs} fill={`url(#cl-${id})`} />
      <ellipse rx={sq[0] * 1.12 * cs} ry={sq[1] * 1.05 * cs} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.45" />
      {blob ? <Blob x={half} id={id} /> : null}
      {blob && i === 0 ? <Blob x={-half} id={id} /> : null}

      {!isMol && (
        <>
          <g className="orbit" style={{ animationDuration: `${sq[3] * 1.2}s` }}>
            {pts(46, 4, 0).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={esz} fill={ecol} stroke={INK} strokeWidth="1.4" />)}
          </g>
          <g className="orbit-rev" style={{ animationDuration: `${sq[3] * 1.9}s` }}>
            {pts(60, 2, 45).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={esz} fill={ecol} stroke={INK} strokeWidth="1.4" />)}
          </g>
        </>
      )}

      {flow && (
        <g>
          {[-12, 2, 14].map((py, k) => (
            <circle key={k} className="flowR" style={{ animationDelay: `${k * 0.6}s` }} cx="20" cy={py} r="4.5" fill="#FFD66B" stroke={INK} strokeWidth="1.4" />
          ))}
        </g>
      )}

      {isMol ? (
        <g>
          <line x1="0" y1="-8" x2="0" y2="8" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          {[-24, 24].map((py) => (
            <g key={py} transform={`translate(0,${py})`}>
              <ellipse rx="21" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
              <Face face={face} scale={0.78} />
            </g>
          ))}
          <g className="orbit" style={{ animationDuration: `${sq[3]}s` }}>
            <circle cx="0" cy="-52" r="4.5" fill="#FFD66B" stroke={INK} strokeWidth="1.4" />
            <circle cx="0" cy="52" r="4.5" fill="#FFD66B" stroke={INK} strokeWidth="1.4" />
          </g>
        </g>
      ) : (
        <g>
          <ellipse rx={sq[0] * 0.72} ry={sq[1] * 0.72} fill={fill} stroke={INK} strokeWidth="2.5" />
          <Face face={face} />
        </g>
      )}
      {lvl === 3 && <path d="M26,-34 q6,10 0,13 q-6,-3 0,-13" fill="#8CCBFF" stroke={INK} strokeWidth="1.5" />}
      <text y="100" textAnchor="middle" className="atom-sym">{sym}</text>
      <text y="120" textAnchor="middle" className="atom-note">{note}</text>
    </g>
  );
}

function AtomRow({ lvl }) {
  const L = LEVELS[lvl];
  const sq = SQUISH[lvl];
  const face = faces[lvl];
  const n = L.atoms.length;
  const spacing = 150 + 2 * sq[2];
  return (
    <svg className="atom-row" viewBox="0 0 600 240" role="img" aria-label={`${L.name}: ${L.mood}`}>
      {L.atoms.map((a, i) => (
        <Atom key={`${lvl}-${i}`} a={a} i={i} n={n} lvl={lvl} sq={sq} face={face} x={300 + (i - (n - 1) / 2) * spacing} />
      ))}
    </svg>
  );
}

// Path the interstitial electrons follow: it weaves over and under the H₂ molecules
// through the voids between them, the delocalized network behind metallization.
const CHANNEL =
  "M20,100 C70,104 100,44 150,44 C200,44 205,95 225,97 C248,100 258,160 300,160 C342,160 352,110 375,106 C398,102 405,44 450,44 C500,44 505,95 530,97 C555,99 570,100 590,100";
const H2 = [[150, 100, -32], [300, 100, 38], [450, 100, -22]];
const POCKETS = [[80, 92, 20, 30, -20], [225, 98, 22, 34, 15], [375, 104, 22, 34, -12], [525, 94, 20, 30, 18]];

function HydrogenScene({ face }) {
  return (
    <svg className="atom-row" viewBox="0 0 600 240" role="img" aria-label="Tilted H₂ molecules with electrons pooling in, and flowing through, the interstitial gaps between them">
      <defs>
        <radialGradient id="h2-pocket">
          <stop offset="0%" stopColor="#FFD23F" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#FFE58A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={CHANNEL} fill="none" stroke="#FFD66B" strokeWidth="30" strokeLinecap="round" opacity="0.35" />
      <path d={CHANNEL} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 6" opacity="0.35" />
      {POCKETS.map(([x, y, rx, ry, rot], k) => (
        <g key={x} transform={`translate(${x},${y}) rotate(${rot})`}>
          <g className="breathe" style={{ animationDelay: `${k * 0.5}s` }}>
            <ellipse rx={rx * 1.5} ry={ry * 1.3} fill="url(#h2-pocket)" />
            <ellipse rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.45" />
          </g>
        </g>
      ))}
      {H2.map(([x, y, rot]) => (
        <g key={x} transform={`translate(${x},${y}) rotate(${rot})`}>
          <line x1="0" y1="-8" x2="0" y2="8" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(0,${side * 25})`}>
              <g className={side < 0 ? "stretch-up" : "stretch-down"}>
                <circle r="20" fill="#FFE3EC" stroke={INK} strokeWidth="2.5" />
                <g transform={`rotate(${-rot})`}><Face face={face} scale={0.74} /></g>
              </g>
            </g>
          ))}
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <circle
          key={k}
          className="e-hop"
          r="5.5"
          fill="#FFD23F"
          stroke={INK}
          strokeWidth="1.4"
          style={{ offsetPath: `path("${CHANNEL}")`, offsetDistance: `${8 + k * 16}%`, animationDelay: `${-k * 1.5}s` }}
        />
      ))}
      <path d="M326,52 q6,10 0,13 q-6,-3 0,-13" fill="#8CCBFF" stroke={INK} strokeWidth="1.5" />
      {H2.map(([x]) => <text key={x} x={x} y="208" textAnchor="middle" className="atom-sym">H₂</text>)}
      <text x="300" y="232" textAnchor="middle" className="atom-note">e⁻ localized in the interstitial gaps, flowing between H₂</text>
    </svg>
  );
}

function TmdScene() {
  const mo = [70, 170, 270, 370, 470];
  const s = [120, 220, 320, 420];
  const sf3 = [[296, 62], [346, 64], [352, 110]];
  return (
    <svg className="tmd" viewBox="0 0 540 300" role="img" aria-label="Side view of a MoS₂ monolayer with fluorine atoms etching away a sulfur atom as SF₃">
      <rect x="14" y="62" width="512" height="176" rx="24" fill="#C9B8FF" opacity="0.12" />
      {s.map((sx) =>
        [sx - 50, sx + 50].map((mx) => (
          <g key={`${sx}-${mx}`}>
            {sx !== 320 && <line x1={mx} y1="150" x2={sx} y2="92" stroke={INK} strokeWidth="3" />}
            <line x1={mx} y1="150" x2={sx} y2="208" stroke={INK} strokeWidth="3" />
          </g>
        ))
      )}
      <circle cx="320" cy="92" r="18" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      {s.map((sx) => (
        <g key={sx}>
          {sx !== 320 && <circle cx={sx} cy="92" r="18" fill="#FFD66B" stroke={INK} strokeWidth="2.5" />}
          <circle cx={sx} cy="208" r="18" fill="#FFD66B" stroke={INK} strokeWidth="2.5" />
        </g>
      ))}
      {mo.map((mx) => (
        <g key={mx}>
          <circle cx={mx} cy="150" r="26" fill="#C9B8FF" stroke={INK} strokeWidth="2.5" />
          <circle cx={mx - 8} cy="146" r="2.8" fill={INK} />
          <circle cx={mx + 8} cy="146" r="2.8" fill={INK} />
          <path d={`M${mx - 6},155 Q${mx},161 ${mx + 6},155`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx={mx - 14} cy="154" rx="4" ry="2.5" fill="#E0457B" opacity="0.4" />
          <ellipse cx={mx + 14} cy="154" rx="4" ry="2.5" fill="#E0457B" opacity="0.4" />
        </g>
      ))}
      <g className="etch">
        {sf3.map(([x, y]) => <line key={`b${x}`} x1="320" y1="92" x2={x} y2={y} stroke={INK} strokeWidth="3" />)}
        <circle cx="320" cy="92" r="18" fill="#FFD66B" stroke={INK} strokeWidth="2.5" />
        <path d="M314,88 l4,3 l-4,3 M326,88 l-4,3 l4,3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {sf3.map(([x, y]) => (
          <g key={`f${x}`}>
            <circle cx={x} cy={y} r="11" fill="#FF8FB1" stroke={INK} strokeWidth="2.2" />
            <text x={x} y={y + 4} textAnchor="middle" className="svg-f">F</text>
          </g>
        ))}
        <text x="366" y="86" className="svg-label">SF₃</text>
      </g>
      {[[150, 34], [236, 26], [430, 36]].map(([fx, fy], i) => (
        <g key={fx} className="bob" style={{ animationDelay: `${i * 0.5}s` }}>
          <circle cx={fx} cy={fy} r="11" fill="#FF8FB1" stroke={INK} strokeWidth="2.2" />
          <text x={fx} y={fy + 4} textAnchor="middle" className="svg-f">F</text>
        </g>
      ))}
      <g className="svg-mono">
        <text x="505" y="96">S</text>
        <text x="505" y="154">Mo</text>
        <text x="505" y="212">S</text>
        <text x="286" y="128">vacancy</text>
        <text x="20" y="286">MoS₂ / WS₂ monolayer · side view</text>
      </g>
    </svg>
  );
}

export default function PressureExplorer({ initialLevel = 0 }) {
  const [lvl, setLvl] = useState(initialLevel);
  const L = LEVELS[lvl];
  return (
    <div className="explorer">
      <div className="explorer-grid">
        <div className="stage" style={{ background: L.stage }}>
          {lvl === 0 ? <TmdScene /> : lvl === 3 ? <HydrogenScene face={faces[3]} /> : <AtomRow lvl={lvl} />}
          <span className="pill mono">{L.gpa} · {L.mood}</span>
        </div>
        <div className="project-card" style={{ background: L.card }}>
          <span className="pill mono small">{L.where}</span>
          <h3>{L.title}</h3>
          <p>{L.body}</p>
          <div className="tags">
            {L.tags.map((t) => <span key={t} className="tag mono">{t}</span>)}
          </div>
        </div>
      </div>
      <div className="pressure-controls">
        <label htmlFor="pressure">Pressure</label>
        <input id="pressure" type="range" min="0" max="3" step="1" value={lvl} onChange={(e) => setLvl(Number(e.target.value))} />
        <div className="stops">
          {LEVELS.map((x, i) => (
            <button key={x.name} type="button" className={i === lvl ? "stop active" : "stop"} aria-pressed={i === lvl} onClick={() => setLvl(i)}>
              <span>{x.name}</span>
              <span className="mono">{x.gpa}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
