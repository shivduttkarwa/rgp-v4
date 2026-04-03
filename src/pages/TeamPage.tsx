import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import Team from "../sections/TeamV2";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import "./TeamPage.css";


const VALUES = [
  {
    number: "01",
    title: "Integrity First",
    body: "Every recommendation we make is backed by honest data and transparent advice — no hidden agendas, no inflated figures.",
  },
  {
    number: "02",
    title: "Client-Centric",
    body: "We listen before we speak. Understanding your goals, timeline, and concerns shapes every decision we take on your behalf.",
  },
  {
    number: "03",
    title: "Precision & Detail",
    body: "From market appraisals to contract negotiations, we execute with meticulous attention to the details that move outcomes.",
  },
  {
    number: "04",
    title: "Long-term Thinking",
    body: "We're not here for one transaction. We're building relationships that serve your property journey for decades.",
  },
];

const AWARDS = [
  { value: "$850M+", label: "Combined Sales Volume" },
  { value: "500+", label: "Properties Transacted" },
  { value: "97%", label: "Client Satisfaction" },
  { value: "15+", label: "Industry Awards" },
];

export default function TeamPage({ ready = false }: { ready?: boolean }) {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const guards = [
      "clipRevealInit", "clipRevealRtlInit", "clipRevealTopInit",
      "clipRevealLeftInit", "clipRevealRightInit", "wordRevealInit",
      "wordWriteInit", "clipSmoothInit", "clipSmoothDownInit", "charRevealInit",
    ];
    guards.forEach((key) => {
      pageRef.current
        ?.querySelectorAll<HTMLElement>(
          `[data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}]`,
        )
        .forEach((el) => delete el.dataset[key]);
    });

    const cleanup = initGsapSwitchAnimations(pageRef.current);
    return () => cleanup?.();
  }, []);

  return (
    <>
      <HeroSection
        ready={ready}
        showVideo={false}
        showCta
        ctaLabel="Book a Consultation"
        ctaOnClick={() => navigate("/contact")}
        bgImage="images/about-hero.jpg"
        titleLine1={<>Meet Our</>}
        titleLine2={
          <>
            Expert <span className="rg-gold">Team</span>
          </>
        }
        subtitle="A curated ensemble of creative minds and industry veterans shaping the future of luxury real estate."
      />

      <main className="team-page" ref={pageRef}>
        {/* ── Expanding cards ── */}
        <Team />
       

        {/* ── Values ── */}
        <section className="tp-values">
          <div className="tp-container">
            <div className="tp-values__header">
              <span
                className="tp-eyebrow"
                data-gsap="fade-up"
              >
                What Drives Us
              </span>
              <h2
                className="tp-heading"
                data-gsap="char-reveal"
                data-gsap-start="top 85%"
              >
                Our Core <em>Values</em>
              </h2>
            </div>
            <div className="tp-values__grid">
              {VALUES.map((v) => (
                <article
                  key={v.number}
                  className="tp-value-card"
                  data-gsap="clip-smooth-down"
                  data-gsap-start="top 85%"
                >
                  <span className="tp-value-card__num">{v.number}</span>
                  <div className="tp-value-card__line" />
                  <h3 className="tp-value-card__title">{v.title}</h3>
                  <p className="tp-value-card__body">{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="tp-stats">
          <div className="tp-container">
            <div className="tp-stats__grid">
              {AWARDS.map((s) => (
                <div key={s.label} className="tp-stat">
                  <span
                    className="tp-stat__value"
                    data-gsap="fade-up"
                  >
                    {s.value}
                  </span>
                  <span
                    className="tp-stat__label"
                    data-gsap="fade-up"
                    data-gsap-delay="0.08"
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Join us CTA ── */}
        <section className="tp-join">
          <div className="tp-container">
            <div className="tp-join__inner">
              <div className="tp-join__text">
                <span
                  className="tp-eyebrow"
                  data-gsap="fade-up"
                >
                  Careers
                </span>
                <h2
                  className="tp-heading"
                  data-gsap="char-reveal"
                  data-gsap-start="top 85%"
                >
                  Interested in <em>Joining</em>
                  <br />the Team?
                </h2>
                <p
                  className="tp-join__body"
                  data-gsap="fade-up"
                  data-gsap-delay="0.12"
                >
                  We're always looking for exceptional talent — people who
                  combine market intelligence with genuine care for their
                  clients. If that sounds like you, we'd love to talk.
                </p>
                <div
                  className="tp-join__actions"
                  data-gsap="fade-up"
                  data-gsap-delay="0.2"
                >
                  <Link to="/contact" className="tp-btn-primary">
                    Get in Touch
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                  <Link to="/about" className="tp-btn-ghost">
                    Learn About Us
                  </Link>
                </div>
              </div>

              <div className="tp-join__image">
                <div
                  className="tp-join__img-wrap"
                  data-gsap="clip-reveal-right"
                  data-gsap-start="top 75%"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/about-hero.jpg`}
                    alt="Our office environment"
                    loading="lazy"
                  />
                  <div className="tp-join__img-badge">
                    <span className="tp-join__badge-num">12+</span>
                    <span className="tp-join__badge-label">Years of Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
