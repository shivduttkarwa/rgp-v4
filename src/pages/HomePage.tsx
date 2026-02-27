import { useEffect, useRef } from "react";
import HeroSection from "../sections/HeroSection";
import "./AboutPage.css";
import About from "../sections/About";
import Team from "../sections/Team";

import PortfolioShowcase from "../sections/PortfolioShowcase";
import PropertyListingSection from "@/sections/PropertyListingSection";
import ServiceSelection from "@/sections/ServiceSelection";
import PhilosophyPillars from "@/sections/Philosophy";
import WhyUs from "@/sections/WhyUs";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const img = (name: string) => `${base}images/${name}`;

export default function HomePage({ ready = false }: { ready?: boolean }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear one-time init guards so StrictMode's double-invoke doesn't skip animations
    const guards = [
      "clipRevealInit",
      "clipRevealRtlInit",
      "clipRevealTopInit",
      "clipRevealLeftInit",
      "clipRevealRightInit",
      "wordRevealInit",
      "wordWriteInit",
      "clipSmoothInit",
      "clipSmoothDownInit",
      "charRevealInit",
    ];
    guards.forEach((key) => {
      pageRef.current
        ?.querySelectorAll<HTMLElement>(
          `[data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}]`,
        )
        .forEach((el) => delete el.dataset[key]);
    });

    const cleanup = initGsapSwitchAnimations(pageRef.current);
    return cleanup;
  }, []);

  return (
    <div ref={pageRef}>
      <HeroSection ready={ready} />

      {/* RAHUL INTRO */}
      <div className="about-page" style={{ background: "var(--rg-warm-200)" }}>
        <section
          className="split-green"
          style={{ background: "var(--rg-warm-100)" }}
        >
          <div className="container">
            <div className="wrap">
              <div className="img-card">
                <div
                  className="split-img-clip"
                  data-gsap="clip-smooth-down"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.05"
                  data-gsap-mobile="clip-smooth-down"
                  data-gsap-mobile-cards-start="top 90%"
                >
                  <img
                    alt="Rahul Singh — Real Gold Properties"
                    src={img("rahul-singh.jpg")}
                  />
                </div>
              </div>
              <div className="stack">
                <div className="eyebrow">Meet Your Agent</div>
                <h3
                  className="h-serif"
                  data-gsap="char-reveal"
                  data-gsap-start="top 90%"
                >
                  Rahul Singh
                </h3>
                <p
                  className="split-desc"
                  data-gsap="fade-up"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.15"
                >
                  Brisbane-based and client-first — Rahul brings honesty, deep
                  local knowledge, and a genuine commitment to your best
                  outcome. Whether you're buying, selling, or just want to know
                  what your property is worth, he makes the process simple and
                  stress-free.
                </p>
                <p
                  className="split-desc"
                  data-gsap="fade-up"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.25"
                >
                  With over a decade of experience across Brisbane's property
                  market, Rahul has built his reputation on one principle: doing
                  right by his clients.
                </p>
                <div className="split-cta">
                  <a
                    href="/about"
                    className="btn-secondary"
                    data-gsap="btn-clip-reveal"
                    data-gsap-delay="0.2"
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    <span className="bs-text">Learn More About Rahul</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <PropertyListingSection />

      <Team />

      <ServiceSelection />
      <PhilosophyPillars />
      <WhyUs />
      <PortfolioShowcase />
    </div>
  );
}
