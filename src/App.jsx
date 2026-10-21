import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone, Clock, Star, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import falcon from "./assets/falcon-pendant.jpg";
import cross from "./assets/cross-pendant.jpg";
import ring from "./assets/ring-kiss.jpg";

// ---------------------------------------------------------------- content (from antaresjewelry.com)
const COMPANY = "Antares Jewelry Studio";
const ABBR = "ajs";
const END_DATE = "2026-11-25T23:59:59-07:00";
const ORIGINAL = "http://antaresjewelry.com/";
const PHONE = "970-461-2910";
const PHONE_TOLL_FREE = "800-647-6337";
const EMAIL = "gems@antaresjewelry.com";
const ADDRESS = "1400 Falls Court";
const CITY = "Loveland, Colorado";
const MAP_QUERY = "1400 Falls Court, Loveland, CO";
const SPECIAL_ORDERS = "https://antaresjewelry.jewelershowcase.com/";
const GOOGLE_REVIEWS = "https://www.google.com/search?q=Antares+Jewelry+Studio+Loveland+CO";

const NAV = [
  ["Custom design", "#process"],
  ["Repairs", "#repairs"],
  ["Programs", "#programs"],
  ["Visit", "#visit"],
];

const PROCESS = [
  { mag: "I", title: "Bring an idea", text: "Come in to talk through a piece for you, your loved ones or your friends. A rough sketch is all that's needed, and it can be worked out here at the studio." },
  { mag: "II", title: "Choose the design", text: "We refine the drawing together until the design is right. Live outside Loveland? Send your idea by email, U.S. mail or fax." },
  { mag: "III", title: "Approve the wax", text: "When the lost-wax process suits the piece, a wax model is carved and shown to you for approval before any metal is poured." },
  { mag: "IV", title: "Cast & finish", text: "Your jewelry is cast, then finished and set. A mold can be taken to make more than one piece of the same design." },
];

const REPAIRS = [
  { group: "Jewelry repair", items: [
    ["Heirloom restoration", "Family pieces brought back to like-new condition"],
    ["Ring sizing", "Up or down, worked on the premises"],
    ["Reshanking", "Thickening thin and weak ring shanks"],
    ["Expandable ring shanks", "For rings that need to clear a knuckle"],
  ]},
  { group: "Stones & settings", items: [
    ["Stone tightening", "Loose stones secured before they're lost"],
    ["Stone remounting", "Move your stones into a new setting"],
    ["Prong work", "Prong tipping, repair and rebuilding"],
  ]},
  { group: "Chains, pearls & finishing", items: [
    ["Chain repair", "Plus replacement of clasps"],
    ["Pearl & bead stringing", "Restrung strands and new designs"],
    ["Engraving", "Names, dates and messages"],
    ["Casting & finishing", "Done in the studio, not sent out"],
    ["Appraisals", "Appraisal services for your jewelry"],
  ]},
  { group: "Watches", items: [
    ["Watch batteries", "In stock and installed while you wait, when possible"],
    ["Minor repairs", "Some can be done in store"],
    ["Major repairs & cleaning", "Also available"],
  ]},
];

const PROGRAMS = [
  { k: "Trade-in", title: "Put old gold toward something new", text: "Having your stones remounted? Trade in your gold, platinum and other metals toward the new purchase." },
  { k: "Layaway", title: "Easy terms, only 10% down", text: "Reserve the piece you love with 10% down and pay the rest over time." },
  { k: "Special orders", title: "Browse the wider catalog", text: "Rings, pendants, chains and more can be special ordered through the Antares online showcase.", href: SPECIAL_ORDERS, cta: "Open the catalog" },
];

const CARRY = ["Rings", "Pendants", "Chains", "Earrings", "Necklaces", "Diamonds", "All varieties of gemstones", "Watches", "Antique jewelry"];

// ---------------------------------------------------------------- star chart (Scorpius)
const SCORPIUS = {
  beta: [470, 80, 2.6], delta: [452, 148, 2.8], pi: [462, 214, 2.2], sigma: [384, 176, 2.2],
  alpha: [332, 218, 0], tau: [292, 262, 2.1], eps: [256, 332, 2.6], mu: [236, 400, 2.2],
  zeta: [240, 468, 2.2], eta: [288, 520, 2.2], theta: [356, 530, 2.6], iota: [410, 492, 2.2],
  kappa: [424, 446, 2.4], lambda: [388, 420, 2.8], upsilon: [366, 428, 2],
};
const LINES = [["beta", "delta"], ["delta", "pi"], ["delta", "sigma"], ["sigma", "alpha"], ["alpha", "tau"], ["tau", "eps"], ["eps", "mu"], ["mu", "zeta"], ["zeta", "eta"], ["eta", "theta"], ["theta", "iota"], ["iota", "kappa"], ["kappa", "lambda"], ["lambda", "upsilon"]];

function seeded(n, seed = 7) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, () => [rand() * 600, rand() * 600, rand() * 1.1 + 0.3, rand()]);
}
const FIELD = seeded(150);

function StarChart() {
  const [ax, ay] = SCORPIUS.alpha;
  return (
    <svg className="chart" viewBox="0 0 600 600" role="img" aria-label="Star chart of Scorpius with the red star Antares at its heart">
      <defs>
        <radialGradient id="antares-glow">
          <stop offset="0" stopColor="#ffd9c2" />
          <stop offset=".18" stopColor="#f07a52" />
          <stop offset=".45" stopColor="rgba(210,85,58,.35)" />
          <stop offset="1" stopColor="rgba(210,85,58,0)" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="292" className="chart-ring" />
      <circle cx="300" cy="300" r="282" className="chart-ring thin" />
      {Array.from({ length: 72 }, (_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const long = i % 6 === 0;
        const r1 = 282, r2 = long ? 268 : 275;
        return <line key={i} x1={300 + r1 * Math.cos(a)} y1={300 + r1 * Math.sin(a)} x2={300 + r2 * Math.cos(a)} y2={300 + r2 * Math.sin(a)} className="tick" />;
      })}
      {[120, 200].map((r) => <circle key={r} cx="300" cy="300" r={r} className="chart-grid" />)}
      <path d="M18 300 H582 M300 18 V582" className="chart-grid" />
      <path d="M60 140 Q300 230 540 140 M60 460 Q300 370 540 460" className="chart-grid" />
      {FIELD.map(([x, y, r, o], i) => ((x - 300) ** 2 + (y - 300) ** 2 < 270 ** 2) && <circle key={i} cx={x} cy={y} r={r} className="field-star" style={{ opacity: 0.25 + o * 0.6, animationDelay: `${(o * 6).toFixed(2)}s` }} />)}
      {LINES.map(([a, b]) => <line key={a + b} x1={SCORPIUS[a][0]} y1={SCORPIUS[a][1]} x2={SCORPIUS[b][0]} y2={SCORPIUS[b][1]} className="con-line" />)}
      {Object.entries(SCORPIUS).filter(([k]) => k !== "alpha").map(([k, [x, y, r]]) => <circle key={k} cx={x} cy={y} r={r} className="con-star" />)}
      <circle cx={ax} cy={ay} r="70" fill="url(#antares-glow)" className="antares-glow" />
      <circle cx={ax} cy={ay} r="7" className="antares-core" />
      <path d={`M${ax} ${ay - 26} V${ay + 26} M${ax - 26} ${ay} H${ax + 26}`} className="antares-spike" />
      <line x1={ax - 10} y1={ay + 12} x2={ax - 78} y2={ay + 78} className="label-line" />
      <text x={ax - 82} y={ay + 96} className="chart-label" textAnchor="end">α SCO · ANTARES</text>
      <text x="300" y="592" className="chart-caption" textAnchor="middle">SCORPIUS</text>
    </svg>
  );
}

function Mark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="mark">
      <path d="M20 1 L22.6 17.4 L39 20 L22.6 22.6 L20 39 L17.4 22.6 L1 20 L17.4 17.4 Z" fill="currentColor" />
      <path d="M20 9 L21.4 18.6 L31 20 L21.4 21.4 L20 31 L18.6 21.4 L9 20 L18.6 18.6 Z" transform="rotate(45 20 20)" fill="currentColor" opacity=".55" />
      <circle cx="20" cy="20" r="3.4" fill="var(--antares)" />
    </svg>
  );
}

// ---------------------------------------------------------------- sections
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-row">
        <a className="brand" href="#top" aria-label="Antares Jewelry Studio home">
          <Mark />
          <span className="brand-text"><strong>Antares</strong><small>Jewelry Studio</small></span>
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-call" href={`tel:${PHONE}`} onClick={() => setOpen(false)}><Phone size={15} /> {PHONE}</a>
        </nav>
        <button className="menu-btn" type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="coords">RA 16ʰ 29ᵐ · DEC −26° 25′ · LOVELAND, NORTHERN COLORADO</p>
          <h1>One of a kind, <em>drawn, carved &amp; cast</em> under <span className="nowrap">one roof.</span></h1>
          <p className="hero-lede">Antares Jewelry Studio brings custom, original jewelry design straight to the public, plus expert jewelry and watch repair worked on the premises at reasonable prices.</p>
          <div className="hero-ctas">
            <a className="btn btn-red" href="#visit">Start a custom piece <ArrowRight size={18} /></a>
            <a className="btn btn-ghost" href={`tel:${PHONE}`}><Phone size={17} /> {PHONE}</a>
          </div>
          <ul className="hero-proof">
            <li><strong>Start to finish</strong><span>Designed and made in-studio</span></li>
            <li><strong>10% down</strong><span>Easy layaway terms</span></li>
            <li><strong>Trade-in</strong><span>Gold &amp; platinum toward remounts</span></li>
          </ul>
        </div>
        <div className="hero-chart">
          <StarChart />
          <figure className="hero-lens">
            <img src={falcon} alt="Hand-made peregrine falcon pendant from Antares Jewelry Studio" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function QuickStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-grid">
        <a href={`tel:${PHONE}`}><Phone size={18} /><span><small>Studio</small>{PHONE}</span></a>
        <a href={`tel:${PHONE_TOLL_FREE}`}><Phone size={18} /><span><small>Toll free</small>{PHONE_TOLL_FREE}</span></a>
        <a href={`mailto:${EMAIL}`}><Mail size={18} /><span><small>Email</small>{EMAIL}</span></a>
        <a href="#visit"><MapPin size={18} /><span><small>Studio</small>{ADDRESS}, Loveland</span></a>
      </div>
    </div>
  );
}

function OneRoof() {
  return (
    <section className="roof">
      <div className="wrap roof-grid">
        <div>
          <p className="eyebrow">The Antares difference</p>
          <h2>Many jewelers <em>outsource</em> their work. Antares doesn't.</h2>
        </div>
        <div className="roof-text">
          <p>Antares Jewelry Studio works directly with you from start to finish. The sketch, the wax, the casting, the finishing and the setting all happen at the studio bench, so the person you talk to about your idea is the one who makes it.</p>
          <p>The same bench handles repairs: whether it's a family heirloom that needs restoring or a ring that needs sizing, every piece is worked on the premises.</p>
          <a className="text-link" href="#process">See how a custom piece is made <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head light">
          <p className="eyebrow">Custom jewelry design &amp; fabrication</p>
          <h2>From a rough sketch <em>to a finished piece</em></h2>
          <p>Four steps, each one approved by you, plotted like the stars of a constellation.</p>
        </div>
        <ol className="steps">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="step">
              <span className={`step-star${i === PROCESS.length - 1 ? " is-red" : ""}`} aria-hidden="true" />
              <span className="step-mag">{step.mag}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="process-foot">
          <p><strong>Outside Loveland?</strong> Send your idea by email, U.S. mail or fax and we'll work it out from there.</p>
          <a className="btn btn-gold" href={`mailto:${EMAIL}?subject=Custom%20jewelry%20idea`}>Email your sketch <Mail size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Bench() {
  return (
    <section className="bench">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">From the bench</p>
          <h2>Pieces that exist <em>nowhere else</em></h2>
        </div>
        <div className="bench-grid">
          <figure className="bench-item tall">
            <img src={cross} alt="Polished open cross pendant with a cut-out figure, photographed on granite" loading="lazy" />
            <figcaption><span>No. 01</span>Open cross pendant</figcaption>
          </figure>
          <figure className="bench-item">
            <img src={falcon} alt="Peregrine falcon pendant with detailed feathered wings" loading="lazy" />
            <figcaption><span>No. 02</span>Peregrine falcon pendant</figcaption>
          </figure>
          <figure className="bench-item">
            <img src={ring} alt="A groom kissing his bride's hand, showing her diamond ring" loading="lazy" />
            <figcaption><span>No. 03</span>Rings for the moments that matter</figcaption>
          </figure>
        </div>
        <p className="bench-note">All jewelry copyrights, expressed or implied, unless otherwise stated in writing, remain the property of Antares Jewelry.</p>
      </div>
    </section>
  );
}

function Repairs() {
  let n = 0;
  return (
    <section className="repairs" id="repairs">
      <div className="wrap">
        <div className="section-head split">
          <div>
            <p className="eyebrow">Repair catalogue</p>
            <h2>Jewelry &amp; watch repair, <em>worked on the premises</em></h2>
          </div>
          <p>Every repair is done in the studio at reasonable prices. Bring the piece in, or call ahead with questions.</p>
        </div>
        <div className="catalogue">
          {REPAIRS.map((g) => (
            <div className="cat-group" key={g.group}>
              <h3><Star size={14} /> {g.group}</h3>
              <ul>
                {g.items.map(([name, note]) => {
                  n += 1;
                  return (
                    <li key={name}>
                      <span className="cat-no">AJS·{String(n).padStart(2, "0")}</span>
                      <span className="cat-name">{name}</span>
                      <span className="cat-note">{note}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="wrap">
        <div className="section-head light">
          <p className="eyebrow">Policies &amp; programs</p>
          <h2>Ways to make it <em>yours</em></h2>
        </div>
        <div className="program-grid">
          {PROGRAMS.map((p) => (
            <article className="program" key={p.k}>
              <span className="program-k">{p.k}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              {p.href && <a className="text-link light" href={p.href} target="_blank" rel="noopener noreferrer">{p.cta} <ArrowUpRight size={16} /></a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Carry() {
  return (
    <section className="carry">
      <div className="wrap carry-grid">
        <div>
          <p className="eyebrow">In the cases</p>
          <h2>Fine jewelry in <em>gold, platinum &amp; silver</em></h2>
          <p className="carry-lede">Fine jewelry with diamonds and gemstones mounted in gold, silver and platinum. Watches and antique jewelry are also available.</p>
          <ul className="chips">{CARRY.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <aside className="memberships" aria-label="Memberships">
          <p className="eyebrow">Memberships</p>
          <div className="member"><Mark size={26} /><span><strong>Jewelers of America</strong><small>Trade organization member</small></span></div>
          <div className="member"><Mark size={26} /><span><strong>Loveland Chamber of Commerce</strong><small>Local organization member</small></span></div>
          <a className="review-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            <span>Read what customers say on Google</span><ArrowUpRight size={16} />
          </a>
        </aside>
      </div>
    </section>
  );
}

function Visit() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Custom design", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) throw new Error(d.message || "Something went wrong. Please call the studio.");
      setStatus("sent");
      setMsg(d.demo ? "Thanks! This is a concept preview, so nothing was sent. On the live site this goes straight to the studio." : "Thanks! The studio will be in touch soon.");
    } catch (err) {
      setStatus("error");
      setMsg(err.message);
    }
  }
  return (
    <section className="visit" id="visit">
      <div className="wrap visit-grid">
        <div className="visit-info">
          <p className="eyebrow">Visit the studio</p>
          <h2>Bring your idea <em>to the bench</em></h2>
          <ul className="contact-list">
            <li><Phone size={18} /><span><small>Studio</small><a href={`tel:${PHONE}`}>{PHONE}</a></span></li>
            <li><Phone size={18} /><span><small>Toll free</small><a href={`tel:${PHONE_TOLL_FREE}`}>{PHONE_TOLL_FREE}</a></span></li>
            <li><Mail size={18} /><span><small>Email</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></li>
            <li><MapPin size={18} /><span><small>Location</small>{ADDRESS}<br />{CITY}</span></li>
            <li><Clock size={18} /><span><small>Hours</small>Please call ahead to confirm studio hours.</span></li>
          </ul>
          <div className="map">
            <a className="map-fallback" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noopener noreferrer"><strong>{ADDRESS}</strong>Open in Google Maps</a>
            <iframe title="Map to Antares Jewelry Studio" src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <form className="request" onSubmit={submit}>
          <h3>Start a design or repair</h3>
          <p>Tell us what you have in mind. A rough idea is plenty.</p>
          {status === "sent" ? <p className="form-ok" role="status">{msg}</p> : (
            <>
              <label>Name *<input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label>
              <div className="form-row">
                <label>Phone *<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
                <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
              </div>
              <label>I'm interested in
                <select value={form.service} onChange={(e) => update("service", e.target.value)}>
                  {["Custom design", "Stone remount / trade-in", "Jewelry repair", "Watch repair or battery", "Appraisal", "Layaway or special order", "Something else"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label>Your idea<textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="The piece, the stones, the occasion..." /></label>
              <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {status === "error" && <p className="form-err" role="alert">{msg}</p>}
              <button className="btn btn-red full" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send to the studio"} <ArrowRight size={18} /></button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="brand" href="#top"><Mark /><span className="brand-text"><strong>Antares</strong><small>Jewelry Studio</small></span></a>
          <p>Unique custom and fine jewelry design in the heart of Northern Colorado.</p>
        </div>
        <div>
          <h4>Studio</h4>
          <a href="#process">Custom design &amp; fabrication</a>
          <a href="#repairs">Jewelry repair</a>
          <a href="#repairs">Watch repair</a>
          <a href="#programs">Trade-in &amp; layaway</a>
          <a href={SPECIAL_ORDERS} target="_blank" rel="noopener noreferrer">Special orders</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${PHONE}`}>{PHONE}</a>
          <a href={`tel:${PHONE_TOLL_FREE}`}>{PHONE_TOLL_FREE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{ADDRESS}, {CITY}</span>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent concept · not for official use. Current site: <a href={ORIGINAL}>antaresjewelry.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickStrip />
        <OneRoof />
        <Process />
        <Bench />
        <Repairs />
        <Programs />
        <Carry />
        <Visit />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
