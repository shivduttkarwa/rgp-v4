import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "../sections/HeroSection";

import "./AboutPage.css";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropertyMarquee from "@/components/reusable/PropertyMarqee";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const img = (name: string) => `${base}images/${name}`;

export default function AboutPage({ ready = false }: { ready?: boolean }) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLHeadingElement | null>(null);
  const introMaxProgressRef = useRef(0);
  const navigate = useNavigate();
  const splitVideoRef = useRef<HTMLVideoElement | null>(null);
  const [splitFullPlay, setSplitFullPlay] = useState(false);

  useEffect(() => {
    const video = splitVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked on some devices.
      }
    };
    void tryPlay();
  }, []);

  const handleSplitPlayClick = () => {
    const video = splitVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    setSplitFullPlay(true);
    video.play().catch(() => {});
  };

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
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = introRef.current;
    if (!el || el.dataset.linesSplit === "true") return;
    el.dataset.linesSplit = "true";

    const fragment = document.createDocumentFragment();
    const nodes = Array.from(el.childNodes);

    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "intro-word";
            span.textContent = part;
            fragment.appendChild(span);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName.toLowerCase() === "br") {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }
        const text = element.textContent || "";
        const span = document.createElement("span");
        const isGold = element.classList.contains("gold-word");
        span.className = isGold ? "intro-word gold-word" : "intro-word";
        span.textContent = text;
        fragment.appendChild(span);
      }
    });

    el.innerHTML = "";
    el.appendChild(fragment);

    const words = Array.from(el.querySelectorAll<HTMLElement>(".intro-word"));
    if (!words.length) return;

    // Group words by rendered line (supports responsive line wrapping).
    const lines: HTMLElement[][] = [];
    let currentTop: number | null = null;
    let lineWords: HTMLElement[] = [];

    words.forEach((word) => {
      const top = word.offsetTop;
      if (currentTop === null) currentTop = top;
      if (Math.abs(top - currentTop) > 2) {
        lines.push(lineWords);
        lineWords = [];
        currentTop = top;
      }
      lineWords.push(word);
    });
    if (lineWords.length) lines.push(lineWords);

    el.innerHTML = "";
    lines.forEach((line) => {
      const lineWrap = document.createElement("span");
      lineWrap.className = "intro-line";
      const lineText = document.createElement("span");
      lineText.className = "intro-line-text";
      lineWrap.appendChild(lineText);
      line.forEach((word, i) => {
        lineText.appendChild(word);
        if (i < line.length - 1) {
          lineText.appendChild(document.createTextNode(" "));
        }
      });
      el.appendChild(lineWrap);
    });

    const lineTexts = el.querySelectorAll<HTMLElement>(".intro-line-text");
    gsap.set(lineTexts, { yPercent: 100, autoAlpha: 0 });
    const tl = gsap.to(lineTexts, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      paused: true,
    });

    introMaxProgressRef.current = 0;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 35%",
      scrub: true,
      onUpdate: (self) => {
        const next = Math.max(self.progress, introMaxProgressRef.current);
        introMaxProgressRef.current = next;
        tl.progress(next);
        if (next >= 1) {
          tl.progress(1);
          self.kill();
        }
      },
    });
  }, []);

  return (
    <>
      <HeroSection
        ready={ready}
        showVideo={false}
        showCta
        ctaLabel="Book a Free Appraisal"
        ctaOnClick={() => navigate("/contact")}
        bgImage="images/h.jpg"
        titleLine1={
          <>
            Meet <span className="rg-gold">Rahul</span> Singh
          </>
        }
        titleLine2={
          <>
            Appraisal-First <span className="rg-amber">Agent</span>
          </>
        }
        subtitle="Brisbane’s calm, data-backed appraisal specialist. Clear pricing, honest advice, and a plan that helps your property stand out."
      />
      <main className="about-page" ref={pageRef}>
        {/* 2) STATEMENT */}
        <section className="section section-spacious">
          <div className="container center stack">
            <h2 className="intro-statement lead" ref={introRef}>
              Rahul Singh is the appraisal-first agent behind Real Gold
              Properties — bringing{" "}
              <span className="gold-word">local clarity</span>,{" "}
              <span className="gold-word">data-backed pricing</span>, and{" "}
              <span className="gold-word">calm negotiation</span> to every
              homeowner.
            </h2>
          </div>
        </section>

        {/* 3) GREEN SPLIT */}
        <section className="split-green">
          <div className="container">
            <div className="wrap">
              <div className="img-card">
                <div
                  className={`split-img-clip ${splitFullPlay ? "is-playing" : ""}`}
                  data-gsap="clip-smooth-down"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.05"
                  data-gsap-mobile="clip-smooth-down"
                  data-gsap-mobile-cards-start="top 90%"
                >
                  <video
                    ref={splitVideoRef}
                    className="split-video"
                    src={`${base}vids/prop1.mp4`}
                    muted
                    playsInline
                    loop={!splitFullPlay}
                    preload="metadata"
                    controls={splitFullPlay}
                  />
                  {!splitFullPlay && (
                    <button
                      type="button"
                      className="split-play-btn"
                      onClick={handleSplitPlayClick}
                      aria-label="Play property video"
                    >
                      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle
                          cx="24"
                          cy="24"
                          r="23"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path d="M19 16l14 8-14 8V16z" fill="currentColor" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="stack">
                <h3
                  className="h-serif"
                  data-gsap="char-reveal"
                  data-gsap-start="top 90%"
                >
                  Why Sellers
                  <br />
                  Choose Rahul
                </h3>
                <p
                  className="split-desc"
                  data-gsap="fade-up"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.15"
                >
                  He translates market noise into a clear, confident price
                  position — with a strategy that attracts buyers and protects
                  your upside.
                </p>
                <p
                  className="split-desc"
                  data-gsap="fade-up"
                  data-gsap-start="top 90%"
                  data-gsap-delay="0.25"
                >
                  You get straight answers, a staged plan, and weekly feedback
                  so the appraisal never sits still.
                </p>
                <ul
                  className="rahul-points"
                  data-gsap="fade-up"
                  data-gsap-delay="0.32"
                >
                  <li>
                    <strong>Street-level pricing:</strong> recent sales, buyer
                    demand, and suburb momentum.
                  </li>
                  <li>
                    <strong>Launch strategy:</strong> presentation, timing, and
                    campaign plan that drives competition.
                  </li>
                  <li>
                    <strong>Calm guidance:</strong> no pressure, just clarity
                    and next steps.
                  </li>
                </ul>
                <div className="split-cta">
                  <Link
                    to="/contact"
                    className="btn-secondary"
                    data-gsap="btn-clip-reveal"
                    data-gsap-delay="0.2"
                  >
                    <span className="bs-text">Book Your Appraisal</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4) TURN-KEY */}
        <section className="img-overlay">
          <img alt="Property walkthrough" src={img("hero2.jpg")} />
          <div className="overlay-card" data-gsap="clip-reveal-left">
            <h3 className="h-serif">
              The Appraisal
              <br />
              Strategy
            </h3>
            <p>
              Rahul’s appraisals are more than a number. Each one is built to
              attract the right buyers and set a confident path to sale.
            </p>
            <ul className="overlay-list">
              <li>
                <span className="step">01</span> On-site walk-through + market
                scan
              </li>
              <li>
                <span className="step">02</span> Pricing range + demand
                positioning
              </li>
              <li>
                <span className="step">03</span> Launch plan + feedback loop
              </li>
            </ul>
          </div>
        </section>

        {/* 5) AVAILABILITY */}
        <section className="avail">
          <div className="grid">
            <div className="photo">
              <img alt="Rahul Singh" src={img("rahul-singh.jpg")} />
            </div>
            <div className="panel">
              <div className="eyebrow">APPRAISAL</div>
              <h3
                className="h-serif"
                data-gsap="char-reveal"
                data-gsap-start="top 85%"
              >
                Ready For Your
                <br />
                Appraisal?
              </h3>
              <p data-gsap="fade-up" data-gsap-delay="0.15">
                Book a free, no-pressure appraisal with Rahul Singh. You’ll get
                a clear price range, honest advice, and a next-step plan.
              </p>
              <div className="avail-cta">
                <Link
                  to="/contact"
                  className="btn-secondary avail-cta__btn"
                  data-gsap="btn-clip-reveal"
                  data-gsap-delay="0.2"
                >
                  <span className="bs-text">Book Your Appraisal</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PropertyMarquee />
    </>
  );
}
