import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "./TeamV2.css";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  stats: { value: string; label: string }[];
  tags: string[];
  email: string;
  phone: string;
  social: { linkedin?: string };
}

const MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Singh",
    role: "Founder & Chief Executive",
    bio: "Visionary leader with over two decades of experience reshaping luxury real estate across three continents. Pioneer of the boutique estate concept.",
    image: "images/rahul-singh.jpg",
    stats: [
      { value: "12", label: "Years" },
      { value: "$850M", label: "Volume" },
      { value: "120+", label: "Properties" },
    ],
    tags: ["Luxury Estates", "Investment Strategy", "Market Analysis"],
    email: "rahul@luxestate.com",
    phone: "+91 98100 00001",
    social: { linkedin: "#" },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "Award-winning designer bringing editorial elegance and cinematic vision to luxury property presentation. Former Art Director at Architectural Digest.",
    image: "images/team3.png",
    stats: [
      { value: "10", label: "Years" },
      { value: "6", label: "Awards" },
      { value: "80+", label: "Projects" },
    ],
    tags: ["Visual Identity", "Photography", "Brand Strategy"],
    email: "sarah@luxestate.com",
    phone: "+91 98100 00002",
    social: { linkedin: "#" },
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Head of Global Sales",
    bio: "Master negotiator with an unparalleled network of UHNW clients. Closed over $2B in transactions with a reputation for discretion and results.",
    image: "images/team4.png",
    stats: [
      { value: "10", label: "Years" },
      { value: "$620M", label: "Closed" },
      { value: "94%", label: "Retention" },
    ],
    tags: ["Negotiations", "Private Clients", "Off-Market"],
    email: "michael@luxestate.com",
    phone: "+91 98100 00003",
    social: { linkedin: "#" },
  },
  {
    id: 4,
    name: "Emma Williams",
    role: "Principal Architect",
    bio: "RIBA-certified architect merging sustainability with timeless design. Leads our in-house architectural evaluation and renovation advisory team.",
    image: "images/team2.png",
    stats: [
      { value: "9", label: "Years" },
      { value: "42", label: "Projects" },
      { value: "3", label: "Countries" },
    ],
    tags: ["Sustainable Design", "Renovations", "Historic Properties"],
    email: "emma@luxestate.com",
    phone: "+91 98100 00004",
    social: { linkedin: "#" },
  },
  {
    id: 5,
    name: "David Park",
    role: "Investment Director",
    bio: "Former Goldman Sachs VP now directing strategic property investments. Specialises in portfolio optimisation for family offices and institutions.",
    image: "images/team5.png",
    stats: [
      { value: "8", label: "Years" },
      { value: "$320M", label: "AUM" },
      { value: "22%", label: "Avg. ROI" },
    ],
    tags: ["Portfolio Strategy", "Family Offices", "Market Intelligence"],
    email: "david@luxestate.com",
    phone: "+91 98100 00005",
    social: { linkedin: "#" },
  },
];

const BASE = import.meta.env.BASE_URL || "/";

export default function TeamV2() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".tv2-card");
    if (!cards.length) return;

    gsap.set(cards, { y: 60, autoAlpha: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="tv2" ref={sectionRef}>

      {/* ── Header ── */}
      <header className="tv2__header">
        <div className="tv2__header-left">
          <span className="tv2__eyebrow">Our People</span>
          <h2 className="tv2__title">
            The Minds <em>Behind</em>
            <br />Every Deal
          </h2>
        </div>
        <p className="tv2__subtitle">
          A curated ensemble of creative minds and industry veterans — each
          bringing unmatched expertise to every client engagement.
        </p>
      </header>

      <div className="tv2__rule" aria-hidden="true" />

      {/* ── Grid ── */}
      <div className="tv2__grid">
        {MEMBERS.map((m, i) => (
          <article
            key={m.id}
            className="tv2-card"
          >
            {/* Index badge */}
            <span className="tv2-card__index">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Photo */}
            <div className="tv2-card__image">
              <img
                src={`${BASE}${m.image}`}
                alt={m.name}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>

            {/* Rest footer — always visible, hides when panel opens */}
            <div className="tv2-card__footer">
              <h3 className="tv2-card__name">{m.name}</h3>
              <p className="tv2-card__role">{m.role}</p>
            </div>

            {/* Hover panel — slides up */}
            <div className="tv2-card__panel" aria-hidden="true">
              <div className="tv2-card__panel-scroll">
                <p className="tv2-panel__role">{m.role}</p>
                <div className="tv2-panel__rule" />
                <p className="tv2-panel__bio">{m.bio}</p>

                <div className="tv2-panel__stats">
                  {m.stats.map((s, idx) => (
                    <div key={idx} className="tv2-panel__stat">
                      <span className="tv2-panel__stat-val">{s.value}</span>
                      <span className="tv2-panel__stat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="tv2-panel__tags">
                  {m.tags.map((tag, idx) => (
                    <span key={idx} className="tv2-panel__tag">{tag}</span>
                  ))}
                </div>

                <div className="tv2-panel__actions">
                  <a
                    href={`tel:${m.phone}`}
                    className="tv2-panel__btn tv2-panel__btn--gold"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Call
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="tv2-panel__btn tv2-panel__btn--outline"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                  {m.social.linkedin && (
                    <a
                      href={m.social.linkedin}
                      className="tv2-panel__btn tv2-panel__btn--icon"
                      aria-label="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
}
