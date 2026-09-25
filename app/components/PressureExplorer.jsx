"use client";

import { useEffect, useState } from "react";

const INK = "#1F1B4D";

const faces = [
  { eyes: "M-12,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M6,-5 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0", eyeFill: INK, mouth: "M-7,6 Q0,13 7,6" },
  { eyes: "M-13,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0 M5,-5 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0", eyeFill: "#FFFFFF", mouth: "M-3,9 a3,4 0 1,0 6,0 a3,4 0 1,0 -6,0" },
  { eyes: "M-12,-8 L-6,-5 M12,-8 L6,-5 M-11,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0 M6.6,-1 a2.2,2.2 0 1,0 4.4,0 a2.2,2.2 0 1,0 -4.4,0", eyeFill: INK, mouth: "M-6,9 L6,9" },
  { eyes: "M-12,-8 L-6,-4 L-12,0 M12,-8 L6,-4 L12,0", eyeFill: "none", mouth: "M-8,9 q2,-3 4,0 q2,3 4,0 q2,-3 4,0 q2,3 4,0" },
];

// [symbol, color, cloudScale, note]
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
    atoms: [["O", "#FF9A80", 0.95, "Cs–O bond"], ["Cs", "#7FDDEB", 1.1, "5p active"], ["O", "#FF9A80", 0.95, "Cs–O bond"]],
    where: "M.S. thesis · CSUN",
    title: "Core electrons that bond",
    body: "Cesium is normally limited to a +1 oxidation state, with its 5p electrons held in the core. Theory has shown that under pressure these 5p electrons can take part in bonding, and in cesium polyoxides the O–O bonds give way to covalent Cs–O bonds. My thesis searches for a candidate system in which this core reactivity can be realized experimentally. I predict structures with CALYPSO, construct ternary convex hulls, and simulate Cs XANES spectra to identify signatures that experimentalists can measure.",
    tags: ["CALYPSO", "ternary convex hulls", "FEFF XANES", "Bader charge"],
  },
  {
    name: "Earth’s core", gpa: "up to 350 GPa", mood: "Fe–I charge transfer reverses near 150 GPa", stage: "#FFE1D6", card: "#FFE1D8",
    atoms: null,
    where: "PNAS · 2025",
    title: "Iron switches sides",
    body: "Under ambient conditions, iron acts as an electron donor. At core pressures of up to ~350 GPa, its compact 3d states drop in energy relative to the np states of p-block elements, and iron becomes an electron acceptor. I built HSE convex hulls and Bader charge analyses across Fe–p-block systems. The elements that bond most strongly to iron at core conditions turn out to be the least depleted from the mantle, which points to volatile loss during Earth’s accretion rather than sequestration in the core.",
    tags: ["HSE DFT", "convex hulls", "Bader charge", "Fe–p-block"],
  },
  {
    name: "Hydrogen extreme", gpa: "up to 500 GPa", mood: "electrons localize at interstitial sites between H₂", stage: "#FFF1CF", card: "#FFF4BF",
    atoms: null,
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

function Atom({ a, i, n, lvl, x, sq, face, S }) {
  const [sym, fill, cs, note] = a;
  const id = `L${lvl}A${i}`;
  const isCs = sym === "Cs";
  const ecol = isCs ? "#3F5BFF" : "#F6D743";
  const esz = isCs ? 6 : 4.5;
  return (
    <g transform={`translate(${x},100)`}>
      <g transform={`scale(${S})`}>
      <defs>
        <radialGradient id={`cl-${id}`}>
          <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
          <stop offset="60%" stopColor={fill} stopOpacity="0.5" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse rx={sq[0] * 1.55 * cs} ry={sq[1] * 1.45 * cs} fill={`url(#cl-${id})`} />
      <ellipse rx={sq[0] * 1.12 * cs} ry={sq[1] * 1.05 * cs} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.45" />
      <g className="orbit" style={{ animationDuration: `${sq[3] * 1.2}s` }}>
        {pts(46, 4, 0).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={esz} fill={ecol} stroke={INK} strokeWidth="1.4" />)}
      </g>
      <g className="orbit-rev" style={{ animationDuration: `${sq[3] * 1.9}s` }}>
        {pts(60, 2, 45).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={esz} fill={ecol} stroke={INK} strokeWidth="1.4" />)}
      </g>

      <ellipse rx={sq[0] * 0.78} ry={(sq[0] + (sq[1] - sq[0]) * 0.45) * 0.78} fill={fill} stroke={INK} strokeWidth="2.2" />
      <Face face={face} />
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

// FeI Bader charges (HSE), PNAS 2025 SI Fig. 8c: the sign of the charge on Fe flips near 150 GPa
const Q_P = [0, 50, 100, 150, 200, 250, 300];
const Q_FE = [0.31, 0.15, 0.05, -0.02, -0.065, -0.1, -0.22];
const Q_I = [-0.3, -0.15, -0.045, 0.02, 0.07, 0.1, 0.22];
// Fe–I band centers in eV, SI Fig. 9: compression pushes I 5p up past Fe 3d
const E_P = [0, 50, 100, 200, 300];
const E_FE3D = [0, -1.6, -1.9, -1.9, -2.7];
const E_I5P = [-3.7, -2.8, -3.0, -0.3, -0.8];

function interp(xs, ys, x) {
  const q = Math.min(xs[xs.length - 1], Math.max(xs[0], x));
  let k = 0;
  while (k < xs.length - 2 && q > xs[k + 1]) k++;
  return ys[k] + (ys[k + 1] - ys[k]) * ((q - xs[k]) / (xs[k + 1] - xs[k]));
}

// one compression cycle: hold at 0, squeeze to 300 GPa, hold, release
const CYCLE = 11000;
function cyclePressure(t) {
  const u = (t % CYCLE) / CYCLE;
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);
  if (u < 0.1) return 0;
  if (u < 0.5) return 300 * ease((u - 0.1) / 0.4);
  if (u < 0.68) return 300;
  if (u < 0.92) return 300 * (1 - ease((u - 0.68) / 0.24));
  return 0;
}

function useCyclingPressure() {
  const [p, setP] = useState(300);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      setP(cyclePressure(now - t0));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return p;
}

function FeIScene() {
  const p = useCyclingPressure();
  const qFe = interp(Q_P, Q_FE, p);
  const qI = interp(Q_P, Q_I, p);
  const feGives = qFe > 0;
  // Fe on the cube corners, I in the body center (CsCl-type FeI at 300 GPa); the cell shrinks as pressure rises
  const s = 140 * (1 - 0.14 * (p / 300));
  const d = s * 0.4;
  const cx = 140, cy = 165;
  const fx = cx - d / 2, fy = cy + d / 2;
  const front = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([i, j]) => [fx + (i * s) / 2, fy + (j * s) / 2]);
  const back = front.map(([x, y]) => [x + d, y - d]);
  const edge = (pts) => pts.map(([x, y], k) => `${k ? "L" : "M"}${x},${y}`).join(" ") + " Z";
  const flow = Math.min(1, Math.abs(qFe) / 0.15);
  const happy = faces[0], worried = faces[1];
  const sgn = (q) => (q >= 0 ? `+${q.toFixed(2)}` : `−${Math.abs(q).toFixed(2)}`);
  // energy levels
  const EY = (e) => 90 - e * 34;
  const e3d = interp(E_P, E_FE3D, p);
  const e5p = interp(E_P, E_I5P, p);
  // Bader chart
  const X = (x) => 445 + (x / 300) * 135;
  const Y = (q) => 150 - q * 190;
  const path = (ys) => Q_P.map((x, k) => `${k ? "L" : "M"}${X(x)},${Y(ys[k])}`).join(" ");
  return (
    <svg className="atom-row" viewBox="0 0 600 300" role="img" aria-label="FeI under a compression cycle from 0 to 300 GPa: electrons flow from Fe to I at low pressure and reverse direction near 150 GPa">
      <text x="14" y="24" className="svg-label">FeI · {Math.round(p)} GPa</text>
      <text x="14" y="42" className="svg-mono">{feGives ? "Fe gives e⁻ (reductant)" : "Fe takes e⁻ (oxidant)"}</text>

      <path d={edge(back)} fill="none" stroke={INK} strokeWidth="1.2" opacity="0.4" />
      {front.map(([x, y], k) => <line key={k} x1={x} y1={y} x2={back[k][0]} y2={back[k][1]} stroke={INK} strokeWidth="1.2" opacity="0.4" />)}
      {back.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="13" fill="#FFA98F" stroke={INK} strokeWidth="1.8" opacity="0.7" />)}
      <circle cx={cx} cy={cy} r="30" fill="#C5A8FF" stroke={INK} strokeWidth="2.2" />
      <g opacity={flow}>
        {front.map(([x, y], k) => {
          const d0 = feGives ? `M${x},${y} L${cx},${cy}` : `M${cx},${cy} L${x},${y}`;
          return [0, 1].map((j) => (
            <circle key={`${k}-${j}`} className="e-flow" r="4.5" fill="#F6D743" stroke={INK} strokeWidth="1.3"
              style={{ offsetPath: `path("${d0}")`, animationDelay: `${k * 0.35 + j * 0.9}s` }} />
          ));
        })}
      </g>
      <path d={edge(front)} fill="none" stroke={INK} strokeWidth="1.6" />
      {front.map(([x, y], k) => (
        <g key={k} transform={`translate(${x},${y})`}>
          <circle r="20" fill="#FFA98F" stroke={INK} strokeWidth="2.2" />
          <Face face={feGives ? worried : happy} scale={0.5} />
        </g>
      ))}
      <g transform={`translate(${cx},${cy})`}><Face face={feGives ? happy : worried} scale={0.8} /></g>
      <text x={front[3][0] - 26} y={front[3][1] + 5} textAnchor="end" className="svg-label">Fe</text>
      <text x={cx} y={cy + 50} textAnchor="middle" className="svg-label">I</text>

      <g>
        <text x="290" y="46" className="svg-mono">band center</text>
        <line x1="290" y1={EY(0.4)} x2="290" y2={EY(-4.2)} stroke={INK} strokeWidth="1.2" />
        <text x="296" y={EY(-4.2) + 16} className="svg-mono">E</text>
        <line x1="296" y1={EY(e3d)} x2="326" y2={EY(e3d)} stroke="#D8452B" strokeWidth="4" strokeLinecap="round" />
        <line x1="296" y1={EY(e5p)} x2="326" y2={EY(e5p)} stroke="#7B4DFF" strokeWidth="4" strokeLinecap="round" />
        <text x="331" y={EY(e3d) + 4} className="svg-mono">Fe 3d</text>
        <text x="331" y={EY(e5p) + 4} className="svg-mono">I 5p</text>
      </g>

      <g>
        <text x="445" y="46" className="svg-mono">Bader charge</text>
        <line x1="445" y1={Y(0)} x2="580" y2={Y(0)} stroke={INK} strokeWidth="1" opacity="0.35" />
        <line x1="445" y1={Y(0.36)} x2="445" y2={Y(-0.36)} stroke={INK} strokeWidth="1.2" />
        <line x1="445" y1={Y(-0.36)} x2="580" y2={Y(-0.36)} stroke={INK} strokeWidth="1.2" />
        {[0.3, 0, -0.3].map((q) => <text key={q} x="438" y={Y(q) + 4} textAnchor="end" className="svg-mono">{q > 0 ? `+${q}` : q}</text>)}
        {[0, 150, 300].map((x) => <text key={x} x={X(x)} y={Y(-0.36) + 16} textAnchor="middle" className="svg-mono">{x}</text>)}
        <text x="512" y={Y(-0.36) + 32} textAnchor="middle" className="svg-mono">GPa</text>
        <path d={path(Q_I)} fill="none" stroke="#7B4DFF" strokeWidth="2" strokeDasharray="5 4" />
        <path d={path(Q_FE)} fill="none" stroke="#D8452B" strokeWidth="2" />
        <line x1={X(p)} y1={Y(0.36)} x2={X(p)} y2={Y(-0.36)} stroke={INK} strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx={X(p)} cy={Y(qI)} r="6.5" fill="#C5A8FF" stroke={INK} strokeWidth="1.8" />
        <circle cx={X(p)} cy={Y(qFe)} r="6.5" fill="#FFA98F" stroke={INK} strokeWidth="1.8" />
        <text x="445" y="272" className="svg-mono">Fe {sgn(qFe)} · I {sgn(qI)}</text>
      </g>
      <text x="14" y="296" className="svg-mono">FeI (CsCl-type at 300 GPa) · data: PNAS 2025 SI</text>
    </svg>
  );
}

// Interstitial channels between H₂ molecules, drawn after the wave functions in JPCL 2026 Fig. 3
const CHANNEL_X = [150, 300, 450];
const channel = (x) => `M${x},18 C${x + 16},70 ${x - 16},110 ${x},150 S${x + 16},230 ${x},282`;
// [x, y, angle] of each H₂ in the layer: perpendicular, tilted, and parallel orientations
const H2_SITES = [
  [75, 80, 90], [75, 215, 30], [225, 75, -35], [225, 210, 0],
  [375, 85, 0], [375, 220, 60], [525, 78, 40], [525, 212, 90],
];

function HydrogenScene({ gpa, face }) {
  const w = 30 + Math.max(0, Math.min(1, (gpa - 400) / 100)) * 14;
  return (
    <svg className="atom-row" viewBox="0 0 600 300" role="img" aria-label="H₂ molecules with electrons localized in interstitial channels between them">
      <defs>
        <filter id="iso-soft" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      <rect x="10" y="18" width="580" height="264" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.45" />
      {CHANNEL_X.map((x, k) => (
        <g key={x} className="breathe" style={{ animationDelay: `${k * 0.6}s` }}>
          <path d={channel(x)} fill="none" stroke={INK} strokeWidth={w + 3} opacity="0.25" />
          <path d={channel(x)} fill="none" stroke="#F6D743" strokeWidth={w} />
          <g filter="url(#iso-soft)">
            <path d={channel(x)} fill="none" stroke="#7FD9A0" strokeWidth={w * 0.95} opacity="0.55" />
            <path d={channel(x)} fill="none" stroke="#F6D743" strokeWidth={w * 0.6} />
            <path d={channel(x)} fill="none" stroke="#FF6B4A" strokeWidth={w * 0.2} opacity="0.6" />
          </g>
          {[18, 282].map((y) => (
            <g key={y}>
              <ellipse cx={x} cy={y} rx={w / 2} ry="6" fill="#F6D743" stroke={INK} strokeWidth="1.2" />
              <ellipse cx={x} cy={y} rx={w / 5} ry="3" fill="#FF6B4A" />
            </g>
          ))}
        </g>
      ))}
      {CHANNEL_X.map((x, k) => (
        [0, 1, 2].map((j) => (
          <circle
            key={`${x}-${j}`}
            className={k % 2 ? "e-hop e-rev" : "e-hop"}
            r="5"
            fill="#FFF7D6"
            stroke={INK}
            strokeWidth="1.4"
            style={{ offsetPath: `path("${channel(x)}")`, offsetDistance: `${15 + j * 33}%`, animationDelay: `${-(j * 2.4 + k)}s` }}
          />
        ))
      ))}
      {H2_SITES.map(([x, y, rot]) => (
        <g key={`${x}-${y}`} transform={`translate(${x},${y}) rotate(${rot})`}>
          <line x1="-19" y1="0" x2="19" y2="0" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          <line x1="-19" y1="0" x2="19" y2="0" stroke="#F4C9CF" strokeWidth="6.5" strokeLinecap="round" />
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * 21},0)`}>
              <circle r="15" fill="#F4C9CF" stroke={INK} strokeWidth="2.2" />
              <g transform={`rotate(${-rot})`}><Face face={face} scale={0.5} /></g>
            </g>
          ))}
        </g>
      ))}
      <text x="20" y="298" className="svg-mono">H₂ layer · interstitial channels (yellow) hold the conducting electrons</text>
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
          {lvl === 0 ? <TmdScene />
            : lvl === 2 ? <FeIScene />
            : lvl === 3 ? <HydrogenScene gpa={gpa} face={faces[3]} />
            : <AtomRow lvl={lvl} sq={sq} />}
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
