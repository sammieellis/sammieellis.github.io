"use client";

import { useState } from "react";

const INK = "#1F1B4D";

const faces = [
  { eyes: "M-12,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M6,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0", eyeFill: INK, mouth: "M-7,6 Q0,13 7,6" },
  { eyes: "M-13,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0 M5,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0", eyeFill: "#FFFFFF", mouth: "M-3,9 a3,4 0 1,0 6,0 a3,4 0 1,0 -6,0" },
  { eyes: "M-12,-8 L-6,-5 M12,-8 L6,-5 M-11,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0 M6.6,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0", eyeFill: INK, mouth: "M-6,9 L6,9" },
  { eyes: "M-12,-8 L-6,-4 L-12,0 M12,-8 L6,-4 L12,0", eyeFill: "none", mouth: "M-8,9 q2,-3 4,0 q2,3 4,0 q2,-3 4,0 q2,3 4,0" },
];

// [symbol, color, cloudScale, interstitialBlob, note]
const LEVELS = [
  {
    name: "Lab bench", gpa: "≈ 0 GPa", mood: "F etches surface S, which leaves as SF₃", stage: "#E0F5E7", card: "#DDF5E4",
    atoms: null,
    where: "Oak Ridge National Lab · 2026",
    title: "Etching 2D materials, one atomic layer at a time",
    body: "At ambient pressure, I study fluorine-driven gas-assisted etching of MoS₂ and WS₂ monolayers. I model the reaction pathways with AIMD and MLFF-AIMD and use them to fine-tune a machine-learned interatomic potential, extending etching simulations to nanosecond timescales and nanometer length scales.",
    tags: ["AIMD", "MLFF-AIMD", "MLIP fine-tuning", "reaction pathways"],
  },
  {
    name: "Beyond +1", gpa: "~221 GPa", mood: "Cs 5p electrons take part in bonding", stage: "#E6EBFF", card: "#E3E8FF",
    atoms: [["O", "#FF9A80", 0.95, 0, "Cs–O bond"], ["Cs", "#7FDDEB", 1.1, 0, "5p active"], ["O", "#FF9A80", 0.95, 0, "Cs–O bond"]],
    where: "M.S. thesis · CSUN",
    title: "Core electrons that bond",
    body: "Cesium is normally limited to a +1 oxidation state, with its 5p electrons held in the core. Theory has shown that under pressure these 5p electrons can take part in bonding, and in cesium polyoxides the O–O bonds give way to covalent Cs–O bonds. My thesis searches for a candidate system in which this core reactivity can be realized experimentally. I predict structures with CALYPSO, construct ternary convex hulls, and simulate Cs XANES spectra to identify signatures that experimentalists can measure.",
    tags: ["CALYPSO", "ternary convex hulls", "FEFF XANES", "Bader charge"],
  },
  {
    name: "Earth’s core", gpa: "up to 350 GPa", mood: "FeSi (1:1), charge transfer from Si to Fe", stage: "#FFE1D6", card: "#FFE1D8",
    atoms: [["Si", "#9DB0FF", 0.8, 0, "donates e⁻ →"], ["Fe", "#FFA98F", 1.3, 0, "accepts e⁻"]],
    where: "PNAS · 2025",
    title: "Iron switches sides",
    body: "Under ambient conditions, iron acts as an electron donor. At core pressures of up to ~350 GPa, its compact 3d states drop in energy relative to the np states of p-block elements, and iron becomes an electron acceptor. I built HSE convex hulls and Bader charge analyses across Fe–p-block systems. The elements that bond most strongly to iron at core conditions turn out to be the least depleted from the mantle, which points to volatile loss during Earth’s accretion rather than sequestration in the core.",
    tags: ["HSE DFT", "convex hulls", "Bader charge", "Fe–p-block"],
  },
  {
    name: "Hydrogen extreme", gpa: "up to 500 GPa", mood: "electrons localize at interstitial sites between H₂", stage: "#FFF1CF", card: "#FFF4BF",
    atoms: [["H₂", "#FFFFFF", 0.9, 1, ""], ["H₂", "#FFFFFF", 0.9, 1, "interstitial e⁻"], ["H₂", "#FFFFFF", 0.9, 1, ""]],
    where: "J. Phys. Chem. Lett. · 2026",
    title: "Hydrogen turns into an electride",
    body: "Most molecular crystals become metallic through bond rearrangement. In molecular hydrogen, we showed that metallization is accompanied by electride-like behavior, as electrons move into interstitial sites among the H₂ molecules. These interstitial electrons may influence electron–phonon coupling and superconductivity, and similar features persist in metal superhydrides that retain H₂ units at moderate pressures.",
    tags: ["electrides", "interstitial bands", "metallization"],
  },
];

const STOP_GPA = [0, 221, 350, 500];

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
      <ellipse cx="-14" cy="8" rx="5" ry="3" fill="#D8452B" opacity="0.4" />
      <ellipse cx="14" cy="8" rx="5" ry="3" fill="#D8452B" opacity="0.4" />
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

function Atom({ a, i, n, lvl, x, sq, face, S }) {
  const [sym, fill, cs, blob, note] = a;
  const id = `L${lvl}A${i}`;
  const isMol = sym === "H₂";
  const isCs = sym === "Cs" && lvl === 1;
  const ecol = isCs ? "#3F5BFF" : "#F6D743";
  const esz = isCs ? 6 : 4.5;
  const half = 75 + sq[2];
  const flow = lvl === 2 && sym === "Si";
  return (
    <g transform={`translate(${x},100)`}>
      <g transform={`scale(${S})`}>
      <defs>
        <radialGradient id={`cl-${id}`}>
          <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
          <stop offset="60%" stopColor={fill} stopOpacity="0.5" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`br-${id}`}>
          <stop offset="0%" stopColor="#FF6B4A" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#F6D743" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7FD9A0" stopOpacity="0" />
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
            <circle key={k} className="flowR" style={{ animationDelay: `${k * 0.6}s` }} cx="20" cy={py} r="4.5" fill="#F6D743" stroke={INK} strokeWidth="1.4" />
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
            <circle cx="0" cy="-52" r="4.5" fill="#F6D743" stroke={INK} strokeWidth="1.4" />
            <circle cx="0" cy="52" r="4.5" fill="#F6D743" stroke={INK} strokeWidth="1.4" />
          </g>
        </g>
      ) : (
        <g>
          <ellipse rx={sq[0] * 0.78} ry={(sq[0] + (sq[1] - sq[0]) * 0.45) * 0.78} fill={fill} stroke={INK} strokeWidth="2.2" />
          <Face face={face} />
        </g>
      )}
      {lvl === 3 && <path d="M26,-34 q6,10 0,13 q-6,-3 0,-13" fill="#7FDDEB" stroke={INK} strokeWidth="1.5" />}
      </g>
      <text y={78 * S + 26} textAnchor="middle" className="atom-sym">{sym}</text>
      <text y={78 * S + 46} textAnchor="middle" className="atom-note">{note}</text>
    </g>
  );
}

function AtomRow({ lvl, sq }) {
  const L = LEVELS[lvl];
  const face = faces[lvl];
  const n = L.atoms.length;
  const S = n === 2 ? 1.5 : 1.3;
  const spacing = (150 + 2 * sq[2]) * S * (n === 2 ? 1.15 : 1);
  const W = (n - 1) * spacing + 190 * S;
  const top = 100 - 80 * S;
  const H = 80 * S + 78 * S + 56;
  return (
    <svg className="atom-row" viewBox={`${300 - W / 2} ${top} ${W} ${H}`} role="img" aria-label={`${L.name}: ${L.mood}`}>
      {L.atoms.map((a, i) => (
        <Atom key={`${lvl}-${i}`} a={a} i={i} n={n} lvl={lvl} sq={sq} face={face} S={S} x={300 + (i - (n - 1) / 2) * spacing} />
      ))}
    </svg>
  );
}

function TmdScene() {
  const mo = [70, 170, 270, 370, 470];
  const s = [120, 220, 320, 420];
  const sf3 = [[296, 62], [346, 64], [352, 110]];
  return (
    <svg className="tmd" viewBox="0 0 540 300" role="img" aria-label="Side view of a MoS₂ monolayer with fluorine atoms etching away a sulfur atom as SF₃">
      <rect x="14" y="62" width="512" height="176" rx="24" fill="#9DB0FF" opacity="0.12" />
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
          {sx !== 320 && <circle cx={sx} cy="92" r="18" fill="#F6D743" stroke={INK} strokeWidth="2.5" />}
          <circle cx={sx} cy="208" r="18" fill="#F6D743" stroke={INK} strokeWidth="2.5" />
        </g>
      ))}
      {mo.map((mx) => (
        <g key={mx}>
          <circle cx={mx} cy="150" r="26" fill="#9DB0FF" stroke={INK} strokeWidth="2.5" />
          <circle cx={mx - 8} cy="146" r="2.8" fill={INK} />
          <circle cx={mx + 8} cy="146" r="2.8" fill={INK} />
          <path d={`M${mx - 6},155 Q${mx},161 ${mx + 6},155`} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx={mx - 14} cy="154" rx="4" ry="2.5" fill="#D8452B" opacity="0.4" />
          <ellipse cx={mx + 14} cy="154" rx="4" ry="2.5" fill="#D8452B" opacity="0.4" />
        </g>
      ))}
      <g className="etch">
        {sf3.map(([x, y]) => <line key={`b${x}`} x1="320" y1="92" x2={x} y2={y} stroke={INK} strokeWidth="3" />)}
        <circle cx="320" cy="92" r="18" fill="#F6D743" stroke={INK} strokeWidth="2.5" />
        <path d="M314,88 l4,3 l-4,3 M326,88 l-4,3 l4,3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {sf3.map(([x, y]) => (
          <g key={`f${x}`}>
            <circle cx={x} cy={y} r="11" fill="#FF9A80" stroke={INK} strokeWidth="2.2" />
            <text x={x} y={y + 4} textAnchor="middle" className="svg-f">F</text>
          </g>
        ))}
        <text x="366" y="86" className="svg-label">SF₃</text>
      </g>
      {[[150, 34], [236, 26], [430, 36]].map(([fx, fy], i) => (
        <g key={fx} className="bob" style={{ animationDelay: `${i * 0.5}s` }}>
          <circle cx={fx} cy={fy} r="11" fill="#FF9A80" stroke={INK} strokeWidth="2.2" />
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
  // u runs continuously from 0 (lab bench) to 3 (hydrogen); each whole number is one project
  const [u, setU] = useState(initialLevel);
  const lvl = Math.min(3, Math.round(u));
  const L = LEVELS[lvl];
  const i0 = Math.min(2, Math.floor(u));
  const f = u - i0;
  // sizes and spacing squeeze smoothly; spin speed changes per project so the animation never jumps mid-drag
  const sq = SQUISH[i0].slice(0, 3).map((v, k) => v + (SQUISH[i0 + 1][k] - v) * f).concat(SQUISH[lvl][3]);
  const gpa = Math.round(STOP_GPA[i0] + (STOP_GPA[i0 + 1] - STOP_GPA[i0]) * f);
  return (
    <div className="explorer">
      <div className="explorer-grid">
        <div className="stage" style={{ background: L.stage }}>
          {lvl === 0 ? <TmdScene /> : <AtomRow lvl={lvl} sq={sq} />}
          <span className="pill mono">≈ {gpa} GPa · {L.mood}</span>
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
        <input id="pressure" type="range" min="0" max="3" step="0.01" value={u} aria-valuetext={`about ${gpa} GPa: ${L.name}`} onChange={(e) => setU(Number(e.target.value))} />
        <div className="scale-labels" aria-hidden="true"><span>0 GPa · lab bench</span><span>500 GPa · hydrogen</span></div>
        <div className="stops">
          {LEVELS.map((x, i) => (
            <button key={x.name} type="button" className={i === lvl ? "stop active" : "stop"} aria-pressed={i === lvl} onClick={() => setU(i)}>
              <span>{x.name}</span>
              <span className="mono">{x.gpa}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
