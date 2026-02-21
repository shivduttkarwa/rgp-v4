import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./NewAbout.css";

type NewAboutProps = {
  kicker?: string;
  title?: string;
  lead?: string;
  image?: string;
};

const principles = [
  {
    title: "Discreet Expertise",
    body: "Local knowledge delivered with calm, measured guidance.",
  },
  {
    title: "Curated Presentation",
    body: "A refined visual standard that elevates every listing.",
  },
  {
    title: "Clear Advocacy",
    body: "Steady negotiation that protects value and removes noise.",
  },
];

export default function NewAbout({
  kicker = "ABOUT REAL GOLD PROPERTIES",
  title = "Minimal, modern, and quietly luxurious — the way real estate should feel.",
  lead = "We offer a boutique, editorial approach to buying, selling, and renting. Every decision is intentional, every detail refined, and every client supported with clarity.",
  image = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=85",
}: NewAboutProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 980) return;

    gsap.registerPlugin(ScrollTrigger);

    const selector = ".rg-new-about__parallax";
    gsap.set(selector, { yPercent: -8, willChange: "transform" });
    const tween = gsap.to(selector, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".rg-new-about__image",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="rg-new-about" aria-label="About Real Gold Properties (New)">
      <div className="rg-new-about__inner">
        <header className="rg-new-about__header">
          <span className="rg-new-about__kicker" data-gsap="fade-up">
            {kicker}
          </span>
          <h2 className="rg-new-about__title" data-gsap="word-reveal" data-gsap-delay="0.1">
            {title}
          </h2>
          <p className="rg-new-about__lead" data-gsap="fade-up" data-gsap-delay="0.2">
            {lead}
          </p>
        </header>

        <div className="rg-new-about__layout">
          <figure
            className="rg-new-about__image"
            data-gsap="clip-smooth-down"
            data-gsap-start="top 85%"
          >
            <img
              className="rg-new-about__parallax"
              src={image}
              alt="Refined interior space"
            />
            <figcaption className="rg-new-about__caption">
              <span>Signature Standard</span>
              <strong>Editorial, composed, precise.</strong>
            </figcaption>
          </figure>

          <div className="rg-new-about__content">
            <div className="rg-new-about__eyebrow" data-gsap="fade-up">
              THE APPROACH
            </div>
            <h3 className="rg-new-about__subtitle" data-gsap="fade-up" data-gsap-delay="0.1">
              A quiet confidence across every step.
            </h3>
            <p className="rg-new-about__copy" data-gsap="fade-up" data-gsap-delay="0.2">
              We align early on goals, pricing, and presentation. From there, the
              process is clean and focused: thoughtful staging, intentional
              marketing, and steady, honest communication.
            </p>
            <div className="rg-new-about__divider" aria-hidden="true" />
            <div className="rg-new-about__principles">
              {principles.map((item, index) => (
                <div
                  key={item.title}
                  className="rg-new-about__principle"
                  data-gsap="fade-up"
                  data-gsap-delay={`${0.15 + index * 0.08}`}
                >
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rg-new-about__footer" data-gsap="fade-up" data-gsap-delay="0.2">
          <div className="rg-new-about__footer-line" />
          <p>
            Boutique scale. Market-led insight. White-glove service — without the noise.
          </p>
        </div>
      </div>
    </section>
  );
}
