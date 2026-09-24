const External = () => <span aria-hidden="true">↗</span>;

const publications = [
  {
    year: "2026",
    title: "Prediction of Electron Localization Functions from Superposed Atomic Densities for Accelerated Superhydride Discovery",
    authors: <>A. Ellis, <strong>S. Ellis</strong>, and M. Miao</>,
    journal: "Journal of Materials Informatics, 6, 45",
    href: "https://www.oaepublish.com/articles/jmi.2026.44",
    preview: "/publication-elf-preview.jpg",
    previewAlt: "Predicted and DFT electron localization function isosurfaces for AuGa and calcium",
    previewCredit: "Journal of Materials Informatics, Fig. 4",
  },
  {
    year: "2026",
    title: "Emerging Electride Behavior and Metallization in Molecular Hydrogen under High Pressure",
    authors: <>A. Ellis, <strong>S. Ellis</strong>, A. Pandit, and M. Miao</>,
    journal: "Journal of Physical Chemistry Letters",
    href: "https://doi.org/10.1021/acs.jpclett.6c01415",
    preview: "/publication-hydrogen-preview.png",
    previewAlt: "Interstitial-character band plots for molecular hydrogen structures under pressure",
    previewCredit: "ACS Supporting Information, Fig. S2",
  },
  {
    year: "2025",
    title: "Pressure-Induced Redox Reversal of Iron and the Distribution of Elements in Deep Earth",
    authors: <>X. Wang, X. Feng, J. Li, Y. Lv, A. Ellis, <strong>S. Scott</strong>, et al.</>,
    journal: "Proceedings of the National Academy of Sciences, 122, e2414911122",
    href: "https://doi.org/10.1073/pnas.2414911122",
    preview: "/publication-iron-redox-preview.png",
    previewAlt: "Electron localization and pressure-dependent formation enthalpy from the published iron redox study",
    previewCredit: "PNAS, Fig. 4",
  },
];

export default function Page() {
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="site-name" href="#top">Samantha Ellis</a>
          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#research">Research</a>
            <a href="#publications">Publications</a>
            <a href="#presentations">Presentations</a>
            <a href="#teaching">Teaching &amp; Mentoring</a>
            <a href="#news">News</a>
            <a href="/Samantha_Ellis_CV.pdf" target="_blank">CV</a>
          </nav>
        </div>
        <nav className="mobile-section-nav" aria-label="Mobile section navigation">
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#presentations">Presentations</a>
          <a href="#teaching">Teaching</a>
          <a href="#news">News</a>
        </nav>
      </header>

      <main id="top">
        <section className="intro container">
          <div className="intro-text">
            <p className="role">NSF Graduate Research Fellow</p>
            <h1>Samantha Ellis</h1>
            <p className="affiliation">M.S. Chemistry Candidate · California State University, Northridge</p>
            <p className="summary">
              I am a computational materials chemist studying chemical bonding and reactivity using electronic-structure theory, atomistic simulation, and machine learning.
            </p>
            <div className="profile-links">
              <a href="mailto:samantha.scott.309@my.csun.edu">Email</a>
              <a href="https://www.linkedin.com/in/samantha-l-ellis/" target="_blank" rel="noreferrer">LinkedIn <External /></a>
              <a href="https://scholar.google.com/citations?user=3hrvXUYAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar <External /></a>
              <a href="/Samantha_Ellis_CV.pdf" target="_blank">Curriculum Vitae</a>
            </div>
          </div>
          <figure className="portrait">
            <img src="/samantha-ellis.jpg" alt="Samantha Ellis holding her dog" />
          </figure>
        </section>

        <div className="container content">
          <section id="about" className="page-section about">
            <h2>About</h2>
            <div className="section-body two-column-copy">
              <p>
                I am pursuing an M.S. in Chemistry at California State University, Northridge, where I work with Professor Maosheng Miao. My research uses static DFT, ab initio molecular dynamics, crystal structure prediction, electronic-structure analysis, and machine-learned interatomic potentials to investigate chemical bonding and reactivity under high pressure and in two-dimensional materials.
              </p>
              <p>
                In 2026, I joined Oak Ridge National Laboratory as a Research Student Intern working with Eva Zarkadoula and Jingsong Huang. At ORNL, I use density functional theory and machine-learned interatomic potentials to study fluorine-mediated reactions on transition-metal dichalcogenide surfaces.
              </p>
            </div>
          </section>

          <section id="research" className="page-section">
            <div className="section-heading">
              <h2>Research</h2>
              <p>Selected current and recent projects</p>
            </div>
            <div className="research-projects">
              <article>
                <h3>High-pressure chemistry and core-electron reactivity</h3>
                <p>
                  My M.S. thesis examines pressure-induced Cs 5p core reactivity in cesium polyoxides. I use crystal-structure prediction, ternary convex-hull construction, XANES simulation, and electronic-structure analysis to identify candidate phases and spectroscopic signatures for experiment.
                </p>
                <p className="methods">Methods: CALYPSO, ternary convex hulls, FEFF XANES, Bader charge, electronic-structure analysis</p>
              </article>
              <article>
                <h3>Machine-learned modeling of gas-assisted etching in two-dimensional materials</h3>
                <p>
                  At Oak Ridge National Laboratory, I am fine-tuning a machine-learned interatomic potential using reaction pathways modeled with AIMD and MLFF-AIMD. The goal is to scale simulations of fluorine-driven etching in MoS₂ and WS₂ to nanosecond timescales and nanoscale length scales.
                </p>
                <p className="methods">Methods: AIMD, MLFF-AIMD, MLIP fine-tuning, reaction-pathway modeling</p>
              </article>
              <article>
                <h3>Iron redox chemistry under deep-Earth conditions</h3>
                <p>
                  I used HSE DFT to construct pressure-dependent convex hulls and generate Bader charge plots across Fe–p-block systems, helping demonstrate that iron can reverse from an electron donor to an electron acceptor under core pressures.
                </p>
                <p className="methods">Methods: HSE DFT, convex-hull construction, Bader charge analysis and visualization</p>
              </article>
            </div>
          </section>

          <section id="publications" className="page-section">
            <div className="section-heading">
              <h2>Publications</h2>
              <a href="https://scholar.google.com/citations?user=3hrvXUYAAAAJ&hl=en" target="_blank" rel="noreferrer">View Google Scholar <External /></a>
            </div>
            <ol className="publication-list">
              {publications.map((publication) => (
                <li key={publication.title}>
                  <span className="publication-year">{publication.year}</span>
                  <div className={publication.preview ? "publication-main has-preview" : "publication-main"}>
                    {publication.preview && (
                      <a className="publication-preview" href={publication.href} target="_blank" rel="noreferrer" aria-label={`View ${publication.title}`}>
                        <img src={publication.preview} alt={publication.previewAlt} />
                        <span>{publication.previewCredit}</span>
                      </a>
                    )}
                    <div className="publication-copy">
                      <h3>
                        {publication.href ? <a href={publication.href} target="_blank" rel="noreferrer">{publication.title}</a> : publication.title}
                      </h3>
                      <p>{publication.authors}</p>
                      <p className="journal">{publication.journal}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="name-note">Earlier publications and presentations may appear under Samantha Scott.</p>
          </section>

          <section id="presentations" className="page-section">
            <h2>Presentations</h2>
            <div className="presentation-list">
              <article>
                <a className="presentation-preview" href="/CNMS_2026_TMD_Etching_Poster.pdf" target="_blank" rel="noreferrer" aria-label="Open 2026 CNMS User Meeting poster PDF">
                  <img src="/CNMS_2026_TMD_Etching_Poster_preview.png" alt="Preview of the 2026 CNMS User Meeting TMD etching poster" />
                </a>
                <div className="presentation-copy">
                  <p className="presentation-type">Poster presentation</p>
                  <h3>Modeling Gas-Assisted Etching of MoS₂ and WS₂ with Machine-Learned Interatomic Potentials</h3>
                  <p className="item-meta">2026 CNMS User Meeting · Knoxville, Tennessee · August 2026</p>
                  <a href="/CNMS_2026_TMD_Etching_Poster.pdf" target="_blank" rel="noreferrer">View poster (PDF)</a>
                </div>
              </article>
              <article>
                <a className="presentation-preview" href="/APS_2026_Fe_Redox_Talk.pdf" target="_blank" rel="noreferrer" aria-label="Open APS 2026 talk PDF">
                  <img src="/APS_2026_Fe_Redox_Talk_preview.png" alt="Preview of the APS 2026 iron redox talk" />
                </a>
                <div className="presentation-copy">
                  <p className="presentation-type">Oral presentation</p>
                  <h3>Pressure-Induced Redox Reversal of Iron and the Distribution of Elements in Deep Earth</h3>
                  <p className="item-meta">APS Global Physics Summit · Denver, Colorado · March 2026</p>
                  <a href="/APS_2026_Fe_Redox_Talk.pdf" target="_blank" rel="noreferrer">View slides (PDF)</a>
                </div>
              </article>
              <article>
                <a className="presentation-preview" href="/APS_2025_Molecular_Hydrogen_Poster.pdf" target="_blank" rel="noreferrer" aria-label="Open APS 2025 poster PDF">
                  <img src="/APS_2025_Molecular_Hydrogen_Poster_preview.png" alt="Preview of the APS 2025 molecular hydrogen poster" />
                </a>
                <div className="presentation-copy">
                  <p className="presentation-type">Poster presentation</p>
                  <h3>Insulator-to-Metal Transition of Molecular Hydrogen Under Pressure</h3>
                  <p className="item-meta">APS Global Physics Summit · Anaheim, California · March 2025</p>
                  <a href="/APS_2025_Molecular_Hydrogen_Poster.pdf" target="_blank" rel="noreferrer">View poster (PDF)</a>
                </div>
              </article>
            </div>
          </section>

          <section id="teaching" className="page-section teaching-section">
            <h2>Teaching, Mentoring &amp; Service</h2>
            <div className="teaching-content">
              <p className="teaching-intro">
                As a first-generation college student, I know how important it is to have mentors who can help make an unfamiliar academic path feel navigable. I want to provide that support for other students by challenging them to grow, helping them work through uncertainty, and showing them that they do not need to have everything figured out. Their path can be nonlinear and still lead somewhere meaningful.
              </p>

              <div className="teaching-list">
                <article>
                  <h3>Teaching Assistant</h3>
                  <p className="item-meta">General Chemistry and Organic Chemistry Laboratories · CSUN</p>
                  <p>I taught six laboratory sections across general and organic chemistry, combining pre-laboratory instruction with hands-on guidance in quantitative analysis, spectroscopy, scientific documentation, and laboratory safety.</p>
                </article>
                <article>
                  <h3>Graduate Peer Mentor</h3>
                  <p className="item-meta">Office of Undergraduate Research · CSUN</p>
                  <p>I led workshops and individual advising for students joining research groups, preparing conference materials, applying to graduate programs, and developing CVs and personal statements. I also supported campus outreach events connecting prospective and high-school students with research opportunities.</p>
                </article>
                <article>
                  <h3>Chemistry and Biochemistry Journal Club</h3>
                  <p className="item-meta">Co-founder and Coordinator · CSUN</p>
                  <p>I co-founded a monthly, student-led forum for reading and discussing current chemical literature. The club gives undergraduate and graduate students a low-pressure setting to practice presenting papers, asking technical questions, and exchanging feedback.</p>
                </article>
              </div>

              <div className="student-reflections">
                <p className="subsection-label">From anonymous student evaluations</p>
                <div className="reflection-grid">
                  <blockquote>
                    <p>Explains concepts in an efficient but also easy to understand way.</p>
                    <cite>General Chemistry II Lab student</cite>
                  </blockquote>
                  <blockquote>
                    <p>Sammie was very kind and patient and really easy to talk to throughout the semester.</p>
                    <cite>General Chemistry II Lab student</cite>
                  </blockquote>
                  <blockquote>
                    <p>She does want us to figure out things before we go to her, which I appreciate.</p>
                    <cite>Organic Chemistry I Lab student</cite>
                  </blockquote>
                </div>
              </div>

              <figure className="journal-club-feature">
                <div className="journal-club-gallery">
                  <img src="/journal-club-discussion.jpeg" alt="Members of the CSUN Chemistry and Biochemistry Journal Club after a meeting" />
                  <img src="/journal-club-materials-chemistry.jpeg" alt="CSUN Chemistry and Biochemistry Journal Club members at a materials chemistry discussion" />
                </div>
                <figcaption>Student-led Chemistry and Biochemistry Journal Club meetings at CSUN.</figcaption>
              </figure>

              <div className="engagement-feature">
                <p className="subsection-label">Mentoring and outreach in practice</p>
                <div className="engagement-gallery">
                  <figure>
                    <img src="/research-showcase-presentation.jpg" alt="Samantha Ellis presenting deep-Earth chemistry at a CSUN student research showcase" />
                    <figcaption>
                      <strong>Student research showcase</strong>
                      <span>Presenting high-pressure and deep-Earth chemistry at a showcase hosted by CSUN's Microbiology Student Association and SACNAS.</span>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="/cv-workshop.jpg" alt="Samantha Ellis leading a curriculum vitae workshop for CSUN students" />
                    <figcaption>
                      <strong>CV workshop</strong>
                      <span>Leading a workshop for the Chemistry and Biochemistry Club through CSUN's Office of Undergraduate Research.</span>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="/chemistry-club-pi-day.jpg" alt="Samantha Ellis with members of the CSUN Chemistry and Biochemistry Club at a Pi Day event" />
                    <figcaption>
                      <strong>Departmental service</strong>
                      <span>Helping run the Chemistry and Biochemistry Club booth at the CSUN Women in Science Pi Day event.</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          <section id="news" className="page-section coverage-section">
            <h2>News</h2>
            <div className="feature-links" aria-label="Featured articles">
              <a className="featured-news" href="https://newsroom.csun.edu/2026/05/14/grad-student-and-undergrad-win-national-science-foundation-research-fellowship/" target="_blank" rel="noreferrer">
                <img src="/csun-newsroom-grfp.jpg" alt="Samantha Ellis standing beside her computational materials research poster" />
                <div>
                  <span>Featured · CSUN Newsroom</span>
                  <strong>Graduate researchers receive National Science Foundation fellowships</strong>
                </div>
              </a>
              <a className="newsletter-profile news-story" href="https://newsroom.csun.edu/2025/11/18/study-by-csun-prof-upends-understanding-of-what-happens-to-iron-at-earths-core/" target="_blank" rel="noreferrer">
                <img src="/csun-newsroom-iron-core.jpg" alt="Illustration of Earth and its core accompanying a CSUN Newsroom article about iron under pressure" />
                <span>CSUN Newsroom · November 2025</span>
                <strong>Study by CSUN Prof Upends Understanding of What Happens to Iron at Earth’s Core</strong>
              </a>
              <a className="newsletter-profile" href="https://t.e2ma.net/webview/it10xk/de0c2a38558e5a239902e187dd02712e" target="_blank" rel="noreferrer">
                <img src="/our-admitted-matadors-day.jpeg" alt="Office of Undergraduate Research newsletter preview featuring Admitted Matadors Day" />
                <span>Office of Undergraduate Research newsletter</span>
                <strong>Graduate peer mentoring and undergraduate research outreach</strong>
              </a>
            </div>
          </section>

        </div>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© 2026 Samantha Ellis</p>
          <div>
            <a href="mailto:samantha.scott.309@my.csun.edu">Email</a>
            <a href="https://www.linkedin.com/in/samantha-l-ellis/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://scholar.google.com/citations?user=3hrvXUYAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar</a>
          </div>
        </div>
      </footer>
    </>
  );
}
