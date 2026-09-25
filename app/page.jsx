import FunFactAtom from "./components/FunFactAtom";
import PressureExplorer from "./components/PressureExplorer";

const SCHOLAR = "https://scholar.google.com/citations?user=3hrvXUYAAAAJ&hl=en";
const LINKEDIN = "https://www.linkedin.com/in/samantha-l-ellis/";
const EMAIL = "mailto:samantha.scott.309@my.csun.edu";
const CV = "/Samantha_Ellis_CV.pdf";

const navTiles = [
  { n: 1, sym: "Rs", label: "Research", href: "#research", color: "#7FD9A0" },
  { n: 2, sym: "Pb", label: "Publications", href: "#publications", color: "#9DB0FF" },
  { n: 3, sym: "Pr", label: "Presentations", href: "#presentations", color: "#F6D743" },
  { n: 4, sym: "Te", label: "Teaching", href: "#teaching", color: "#FFB8A6" },
  { n: 5, sym: "Nw", label: "News", href: "#news", color: "#7FDDEB" },
];

const publications = [
  {
    year: "2026", venue: "J. Materials Informatics 6, 45", color: "#E3E8FF", tape: "#F6D743", tilt: -1.5,
    title: "Prediction of Electron Localization Functions from Superposed Atomic Densities for Accelerated Superhydride Discovery",
    authors: <>A. Ellis, <strong>S. Ellis</strong>, and M. Miao</>,
    href: "https://www.oaepublish.com/articles/jmi.2026.44",
    preview: "/publication-elf-preview.jpg",
    alt: "Predicted and DFT electron localization function isosurfaces for AuGa and calcium",
    credit: "Journal of Materials Informatics, Fig. 4",
  },
  {
    year: "2026", venue: "J. Phys. Chem. Lett.", color: "#DDF5E4", tape: "#FF9A80", tilt: 1,
    title: "Emerging Electride Behavior and Metallization in Molecular Hydrogen under High Pressure",
    authors: <>A. Ellis, <strong>S. Ellis</strong>, A. Pandit, and M. Miao</>,
    href: "https://doi.org/10.1021/acs.jpclett.6c01415",
    preview: "/publication-hydrogen-preview.png",
    alt: "Interstitial-character band plots for molecular hydrogen structures under pressure",
    credit: "ACS Supporting Information, Fig. S2",
  },
  {
    year: "2025", venue: "PNAS 122, e2414911122", color: "#FFE1D8", tape: "#7FD9A0", tilt: -0.8,
    title: "Pressure-Induced Redox Reversal of Iron and the Distribution of Elements in Deep Earth",
    authors: <>X. Wang, X. Feng, J. Li, Y. Lv, A. Ellis, <strong>S. Scott</strong>, et al.</>,
    href: "https://doi.org/10.1073/pnas.2414911122",
    preview: "/publication-iron-redox-preview.png",
    alt: "Electron localization and pressure-dependent formation enthalpy from the published iron redox study",
    credit: "PNAS, Fig. 4",
  },
];

const presentations = [
  {
    kind: "Poster", color: "#7FD9A0", tilt: -1, button: "View poster",
    date: "AUG 2026 · KNOXVILLE, TN", venue: "2026 CNMS User Meeting",
    title: "Modeling Gas-Assisted Etching of MoS₂ and WS₂ with Machine-Learned Interatomic Potentials",
    pdf: "/CNMS_2026_TMD_Etching_Poster.pdf", preview: "/CNMS_2026_TMD_Etching_Poster_preview.png",
    alt: "Preview of the 2026 CNMS User Meeting TMD etching poster",
  },
  {
    kind: "Talk", color: "#FFA98F", tilt: 0.8, button: "View slides",
    date: "MAR 2026 · DENVER, CO", venue: "APS Global Physics Summit",
    title: "Pressure-Induced Redox Reversal of Iron and the Distribution of Elements in Deep Earth",
    pdf: "/APS_2026_Fe_Redox_Talk.pdf", preview: "/APS_2026_Fe_Redox_Talk_preview.png",
    alt: "Preview of the APS 2026 iron redox talk",
  },
  {
    kind: "Poster", color: "#F6D743", tilt: -0.6, button: "View poster",
    date: "MAR 2025 · ANAHEIM, CA", venue: "APS Global Physics Summit",
    title: "Insulator-to-Metal Transition of Molecular Hydrogen Under Pressure",
    pdf: "/APS_2025_Molecular_Hydrogen_Poster.pdf", preview: "/APS_2025_Molecular_Hydrogen_Poster_preview.png",
    alt: "Preview of the APS 2025 molecular hydrogen poster",
  },
];

const roles = [
  { badge: "TA", color: "#7FD9A0", title: "Teaching Assistant", meta: "General & Organic Chemistry Labs · CSUN",
    text: "I taught six laboratory sections across general and organic chemistry, combining pre-lab instruction with hands-on guidance in quantitative analysis, spectroscopy, scientific documentation, and lab safety." },
  { badge: "Pm", color: "#9DB0FF", title: "Graduate Peer Mentor", meta: "Office of Undergraduate Research · CSUN",
    text: "I led workshops and individual advising for students joining research groups, preparing conference materials, applying to graduate programs, and developing CVs and personal statements. I also supported campus outreach events connecting prospective and high-school students with research opportunities." },
  { badge: "Jc", color: "#F6D743", title: "Journal Club co-founder", meta: "Chemistry & Biochemistry Journal Club · CSUN",
    text: "A monthly, student-led forum for reading current chemical literature, where students can practice presenting papers, ask technical questions, and exchange feedback in a low-pressure setting." },
];

const quotes = [
  { text: "Explains concepts in an efficient but also easy to understand way.", who: "General Chemistry II Lab student", color: "#FFFFFF", side: "left" },
  { text: "Sammie was very kind and patient and really easy to talk to throughout the semester.", who: "General Chemistry II Lab student", color: "#DDF5E4", side: "right" },
  { text: "She does want us to figure out things before we go to her, which I appreciate.", who: "Organic Chemistry I Lab student", color: "#FFF4BF", side: "left" },
];

const photos = [
  { src: "/journal-club-discussion.jpeg", alt: "Members of the CSUN Chemistry and Biochemistry Journal Club after a meeting", caption: "Journal Club meetup", tilt: -1 },
  { src: "/research-showcase-presentation.jpg", alt: "Samantha Ellis presenting deep-Earth chemistry at a CSUN student research showcase", caption: "Deep-Earth chemistry at a student research showcase (MSA × SACNAS)", tilt: 0.75 },
  { src: "/cv-workshop.jpg", alt: "Samantha Ellis leading a curriculum vitae workshop for CSUN students", caption: "Leading a CV workshop for the Chem & Biochem Club", tilt: -0.5 },
  { src: "/chemistry-club-pi-day.jpg", alt: "Samantha Ellis with members of the CSUN Chemistry and Biochemistry Club at a Pi Day event", caption: "Women in Science Pi Day booth", tilt: 1 },
  { src: "/journal-club-materials-chemistry.jpeg", alt: "CSUN Chemistry and Biochemistry Journal Club members at a materials chemistry discussion", caption: "Materials chemistry night at Journal Club", tilt: -0.75 },
];

const news = [
  { href: "https://newsroom.csun.edu/2026/05/14/grad-student-and-undergrad-win-national-science-foundation-research-fellowship/",
    img: "/csun-newsroom-grfp.jpg", alt: "Samantha Ellis standing beside her computational materials research poster",
    meta: "MAY 2026 · CSUN NEWSROOM", title: "Graduate researchers receive National Science Foundation fellowships", isNew: true, color: "#FFF4BF" },
  { href: "https://newsroom.csun.edu/2025/11/18/study-by-csun-prof-upends-understanding-of-what-happens-to-iron-at-earths-core/",
    img: "/csun-newsroom-iron-core.jpg", alt: "Illustration of Earth and its core accompanying a CSUN Newsroom article about iron under pressure",
    meta: "NOV 2025 · CSUN NEWSROOM", title: "Study by CSUN Prof Upends Understanding of What Happens to Iron at Earth’s Core", color: "#FFFFFF" },
  { href: "https://t.e2ma.net/webview/it10xk/de0c2a38558e5a239902e187dd02712e",
    img: "/our-admitted-matadors-day.jpeg", alt: "Office of Undergraduate Research newsletter preview featuring Admitted Matadors Day",
    meta: "OFFICE OF UNDERGRADUATE RESEARCH NEWSLETTER", title: "Graduate peer mentoring and undergraduate research outreach", color: "#FFFFFF" },
];

function Sparkle({ className, style }) {
  return (
    <svg className={`sparkle ${className || ""}`} style={style} viewBox="-12 -12 24 24" aria-hidden="true">
      <path d="M0,-11 l3,8 l8,3 l-8,3 l-3,8 l-3,-8 l-8,-3 l8,-3 z" fill="#F6D743" stroke="#1F1B4D" strokeWidth="1.5" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4,1.5 h5.5 l3,3 v10 h-8.5 z M9.5,1.5 v3 h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <svg width="44" height="44" viewBox="-30 -30 60 60" aria-hidden="true">
            <g className="orbit" style={{ animationDuration: "5s" }}>
              <circle cx="24" cy="0" r="3.5" fill="#F6D743" stroke="#1F1B4D" strokeWidth="1.2" />
              <circle cx="-24" cy="0" r="3.5" fill="#F6D743" stroke="#1F1B4D" strokeWidth="1.2" />
            </g>
            <circle r="14" fill="#F6D743" stroke="#1F1B4D" strokeWidth="2" />
            
          </svg>
          <span>Samantha Ellis</span>
        </a>
        <nav className="tiles" aria-label="Primary navigation">
          {navTiles.map((t) => (
            <a key={t.sym} className="tile" href={t.href} style={{ background: t.color }}>
              <span className="tile-n">{t.n}</span>
              <span className="tile-sym">{t.sym}</span>
              <span className="tile-label">{t.label}</span>
            </a>
          ))}
          <a className="tile tile-dark" href={CV} target="_blank" rel="noreferrer">
            <span className="tile-n">6</span>
            <span className="tile-sym">Cv</span>
            <span className="tile-label">CV ↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="badges">
              <span className="badge badge-yellow">NSF Graduate Research Fellow</span>
              <span className="badge">M.S. Chemistry · CSUN</span>
              <span className="badge">Oak Ridge National Lab</span>
            </div>
            <h1>Samantha <span className="pink">Ellis</span></h1>
            <p className="lead">
              I’m a computational materials chemist studying how chemical bonds rewrite their rules under extreme conditions, from{" "}
              <mark className="hl-peach">iron at Earth’s core</mark> to <mark className="hl-lav">core electrons that start bonding</mark>, using{" "}
              <mark className="hl-mint">machine learning</mark> to accelerate the search for new superhydrides.
            </p>
            <p className="sub">
              I’m completing my M.S. with Prof. Maosheng Miao at CSUN and working as a Research Student Intern at Oak Ridge National Laboratory with Eva Zarkadoula and Jingsong Huang.
            </p>
            <div className="buttons">
              <a className="btn btn-pink" href={EMAIL}>Say hi</a>
              <a className="btn" href={SCHOLAR} target="_blank" rel="noreferrer">Google Scholar ↗</a>
              <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <FunFactAtom />
        </section>

        <section id="research" className="panel squeeze">
          <div className="section-head">
            <div>
              <span className="elfbar" aria-hidden="true" /><span className="eyebrow">RESEARCH · DRAG THE SLIDER</span>
              <h2>Chemistry under pressure</h2>
            </div>
            <p>Drag the slider from 0 GPa (everyday pressure) up to the millions of atmospheres where even hydrogen changes character. Each stop is one of my projects.</p>
          </div>
          <PressureExplorer />
        </section>

        <section id="publications" className="wrap section">
          <div className="section-head">
            <div>
              <span className="elfbar" aria-hidden="true" /><span className="eyebrow">PEER-REVIEWED PAPERS · CLICK A CARD TO READ</span>
              <h2>Publications</h2>
            </div>
            <a className="underline-link" href={SCHOLAR} target="_blank" rel="noreferrer">Everything on Google Scholar ↗</a>
          </div>
          <div className="card-grid">
            {publications.map((p) => (
              <a key={p.title} className="card wiggle" href={p.href} target="_blank" rel="noreferrer" style={{ background: p.color }}>
                <figure className="thumb">
                  <img src={p.preview} alt={p.alt} loading="lazy" />
                  <figcaption>{p.credit}</figcaption>
                </figure>
                <span className="mono small">{p.year} · {p.venue}</span>
                <span className="card-title">{p.title}</span>
                <span className="authors">{p.authors}</span>
                <span className="chip-btn">Read the paper ↗</span>
              </a>
            ))}
          </div>
          <p className="note">Earlier work may appear under <strong>Samantha Scott</strong>.</p>
        </section>

        <section id="presentations" className="wrap section">
          <div className="section-head">
            <div>
              <span className="elfbar" aria-hidden="true" /><span className="eyebrow">TALKS &amp; POSTERS · SLIDES AND POSTERS OPEN AS PDFs</span>
              <h2>Presentations</h2>
            </div>
          </div>
          <div className="card-grid">
            {presentations.map((p) => (
              <a key={p.pdf} className="card wiggle pres" href={p.pdf} target="_blank" rel="noreferrer">
                <div className="pres-thumb">
                  <img src={p.preview} alt={p.alt} loading="lazy" />
                  <span className="kind" style={{ background: p.color }}>{p.kind}</span>
                  <span className="pdf mono">PDF</span>
                </div>
                <span className="mono small muted">{p.date}</span>
                <span className="card-title">{p.title}</span>
                <span className="authors">{p.venue}</span>
                <span className="chip-btn" style={{ background: p.color }}><DocIcon />{p.button}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="teaching" className="panel teaching">
          <div className="teaching-grid">
            <div className="teaching-copy">
              <span className="elfbar" aria-hidden="true" /><span className="eyebrow">TEACHING · MENTORING · SERVICE</span>
              <h2>Your path can be nonlinear and still lead somewhere meaningful.</h2>
              <p>
                As a first-generation college student, I know how much a good mentor matters. I try to be that for others: I challenge students to grow, help them work through uncertainty, and remind them they don’t need everything figured out.
              </p>
              <div className="roles">
                {roles.map((r) => (
                  <div key={r.title} className="role">
                    <span className="role-badge" style={{ background: r.color }}>{r.badge}</span>
                    <div>
                      <strong>{r.title}</strong>
                      <span className="role-meta">{r.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="quotes">
              <span className="eyebrow">FROM ANONYMOUS STUDENT EVALUATIONS</span>
              {quotes.map((q) => (
                <blockquote key={q.text} className={`bubble bubble-${q.side}`} >
                  <p>“{q.text}”</p>
                  <cite>{q.who}</cite>
                </blockquote>
              ))}
            </div>
          </div>
          <div className="photo-strip">
            {photos.map((ph) => (
              <figure key={ph.src} className="polaroid" style={{ "--tilt": `${ph.tilt}deg` }}>
                <img src={ph.src} alt={ph.alt} loading="lazy" />
                <figcaption>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="news" className="wrap section news">
          <figure className="polaroid big" style={{ "--tilt": "-1.5deg" }}>
            <img src="/samantha-ellis-portrait.jpg" alt="Samantha Ellis holding her dog" />
            <figcaption>me + my favorite lab buddy</figcaption>
          </figure>
          <div className="news-list">
            <h2>In the news</h2>
            {news.map((n) => (
              <a key={n.href} className="news-card wiggle" href={n.href} target="_blank" rel="noreferrer" style={{ background: n.color }}>
                <img src={n.img} alt={n.alt} loading="lazy" />
                <span className="news-text">
                  <span className="mono small muted">{n.isNew && <span className="new">Featured</span>}{n.meta}</span>
                  <span className="news-title">{n.title}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-left">
          <svg width="80" height="80" viewBox="-45 -45 90 90" aria-hidden="true">
            <circle r="32" fill="#F6D743" stroke="#F6F5FB" strokeWidth="3" />
            
          </svg>
          <div>
            <p className="footer-title">Let’s talk chemistry.</p>
            <p className="footer-sub">Open to collaborations, questions, and conversations about electronic structure.</p>
          </div>
        </div>
        <div className="footer-links">
          <a className="fbtn fbtn-pink" href={EMAIL}>Email me</a>
          <a className="fbtn" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="fbtn" href={SCHOLAR} target="_blank" rel="noreferrer">Scholar</a>
          <a className="fbtn" href={CV} target="_blank" rel="noreferrer">CV</a>
        </div>
        <p className="copyright">© 2026 Samantha Ellis</p>
      </footer>
    </>
  );
}
