import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./PropertySlider.css";

export type PSSlide = {
  tab: string;
  eyebrow: string;
  headline: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  cta: string;
  coverSrc: string;
  floatSrc: string;
};

const DEFAULT_SLIDES: PSSlide[] = [
  {
    tab: "BUY",
    eyebrow: "BUYER'S GUIDE",
    headline: "FIND YOUR\nPERFECT HOME",
    body: "Curated listings, expert guidance, and zero pressure. We match you with the right property at the right price, every time.",
    stats: [
      { value: "320+", label: "Active Listings" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    cta: "BROWSE LISTINGS",
    coverSrc:
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=85",
  },
  {
    tab: "SELL",
    eyebrow: "SELLER'S EDGE",
    headline: "SELL SMARTER,\nEARN MORE",
    body: "Sharp pricing strategy, professional presentation, and maximum market exposure — from day one to closing day.",
    stats: [
      { value: "14", label: "Avg. Days on Market" },
      { value: "103%", label: "List-to-Sale Ratio" },
    ],
    cta: "GET A VALUATION",
    coverSrc:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=700&q=85",
  },
  {
    tab: "RENT",
    eyebrow: "RENTAL MANAGEMENT",
    headline: "PREMIUM RENTALS,\nHASSLE-FREE",
    body: "From tenant screening to lease signing, every step handled with care — so landlords relax and renters feel at home.",
    stats: [
      { value: "500+", label: "Managed Units" },
      { value: "4.9★", label: "Tenant Rating" },
    ],
    cta: "VIEW RENTALS",
    coverSrc:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1800&q=85",
    floatSrc:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=700&q=85",
  },
];

/* ── Per-slide architectural SVG content ── */
const ARCH_VIEWBOXES = ["0 0 100 118", "0 0 80 130", "0 0 110 108"];

const ARCH_SHAPES: React.ReactNode[] = [
  /* ── BUY — traditional two-storey house ── */
  <>
    {/* chimney */}
    <rect x="67" y="12" width="10" height="28" />
    <line x1="64" y1="12" x2="80" y2="12" />
    {/* roof */}
    <polygon points="0,52 50,5 100,52" />
    {/* inner roof ridge lines */}
    <line x1="12" y1="52" x2="50" y2="14" />
    <line x1="50" y1="14" x2="88" y2="52" />
    {/* wall */}
    <rect x="8" y="50" width="84" height="60" />
    {/* upper-left window */}
    <rect x="13" y="57" width="22" height="18" />
    <line x1="24" y1="57" x2="24" y2="75" />
    <line x1="13" y1="66" x2="35" y2="66" />
    {/* upper-right window */}
    <rect x="65" y="57" width="22" height="18" />
    <line x1="76" y1="57" x2="76" y2="75" />
    <line x1="65" y1="66" x2="87" y2="66" />
    {/* lower-left window */}
    <rect x="13" y="81" width="22" height="18" />
    <line x1="24" y1="81" x2="24" y2="99" />
    <line x1="13" y1="90" x2="35" y2="90" />
    {/* lower-right window */}
    <rect x="65" y="81" width="22" height="18" />
    <line x1="76" y1="81" x2="76" y2="99" />
    <line x1="65" y1="90" x2="87" y2="90" />
    {/* arched front door */}
    <path d="M42 110 L42 87 Q42 76 50 76 Q58 76 58 87 L58 110" />
    <circle cx="56" cy="93" r="1.5" />
    {/* steps */}
    <line x1="33" y1="110" x2="67" y2="110" />
    <line x1="26" y1="114" x2="74" y2="114" />
    <line x1="18" y1="118" x2="82" y2="118" />
  </>,

  /* ── SELL — modern skyscraper ── */
  <>
    {/* spire */}
    <line x1="40" y1="0" x2="40" y2="13" />
    <line x1="33" y1="9" x2="47" y2="9" />
    {/* crown block */}
    <rect x="24" y="11" width="32" height="9" />
    {/* main tower shaft */}
    <rect x="18" y="18" width="44" height="82" />
    {/* vertical pilaster lines */}
    <line x1="29" y1="18" x2="29" y2="100" />
    <line x1="51" y1="18" x2="51" y2="100" />
    {/* window grid — 3 cols × 5 rows */}
    <rect x="21" y="23" width="9" height="10" />
    <rect x="35" y="23" width="9" height="10" />
    <rect x="49" y="23" width="9" height="10" />
    <rect x="21" y="38" width="9" height="10" />
    <rect x="35" y="38" width="9" height="10" />
    <rect x="49" y="38" width="9" height="10" />
    <rect x="21" y="53" width="9" height="10" />
    <rect x="35" y="53" width="9" height="10" />
    <rect x="49" y="53" width="9" height="10" />
    <rect x="21" y="68" width="9" height="10" />
    <rect x="35" y="68" width="9" height="10" />
    <rect x="49" y="68" width="9" height="10" />
    <rect x="21" y="83" width="9" height="10" />{" "}
    <rect x="49" y="83" width="9" height="10" />
    {/* wide base podium */}
    <rect x="4" y="100" width="72" height="24" />
    {/* podium side windows */}
    <rect x="7" y="104" width="14" height="13" />
    <rect x="59" y="104" width="14" height="13" />
    {/* entrance arch */}
    <path d="M30 124 L30 110 Q30 101 40 101 Q50 101 50 110 L50 124" />
  </>,

  /* ── RENT — wide apartment block ── */
  <>
    {/* parapet battlements */}
    <rect x="5" y="5" width="9" height="7" />
    <rect x="23" y="5" width="9" height="7" />
    <rect x="41" y="5" width="9" height="7" />
    <rect x="59" y="5" width="9" height="7" />
    <rect x="77" y="5" width="9" height="7" />
    <rect x="95" y="5" width="9" height="7" />
    {/* parapet base band */}
    <rect x="2" y="10" width="106" height="7" />
    {/* main building body */}
    <rect x="2" y="15" width="106" height="75" />
    {/* floor dividers */}
    <line x1="2" y1="40" x2="108" y2="40" />
    <line x1="2" y1="65" x2="108" y2="65" />
    {/* floor 1 — 4 windows */}
    <rect x="7" y="19" width="17" height="15" />
    <line x1="15.5" y1="19" x2="15.5" y2="34" />
    <line x1="7" y1="26.5" x2="24" y2="26.5" />
    <rect x="30" y="19" width="17" height="15" />
    <line x1="38.5" y1="19" x2="38.5" y2="34" />
    <line x1="30" y1="26.5" x2="47" y2="26.5" />
    <rect x="66" y="19" width="17" height="15" />
    <line x1="74.5" y1="19" x2="74.5" y2="34" />
    <line x1="66" y1="26.5" x2="83" y2="26.5" />
    <rect x="89" y="19" width="17" height="15" />
    <line x1="97.5" y1="19" x2="97.5" y2="34" />
    <line x1="89" y1="26.5" x2="106" y2="26.5" />
    {/* floor 2 — 5 windows */}
    <rect x="7" y="44" width="17" height="15" />
    <line x1="15.5" y1="44" x2="15.5" y2="59" />
    <rect x="30" y="44" width="17" height="15" />
    <line x1="38.5" y1="44" x2="38.5" y2="59" />
    <rect x="53" y="44" width="17" height="15" />
    <line x1="61.5" y1="44" x2="61.5" y2="59" />
    <rect x="66" y="44" width="17" height="15" />
    <line x1="74.5" y1="44" x2="74.5" y2="59" />
    <rect x="89" y="44" width="17" height="15" />
    <line x1="97.5" y1="44" x2="97.5" y2="59" />
    {/* balcony rail floor 2 */}
    <line x1="6" y1="60" x2="25" y2="60" />
    <line x1="29" y1="60" x2="48" y2="60" />
    <line x1="65" y1="60" x2="84" y2="60" />
    <line x1="88" y1="60" x2="107" y2="60" />
    {/* floor 3 — 5 windows */}
    <rect x="7" y="69" width="17" height="15" />
    <line x1="15.5" y1="69" x2="15.5" y2="84" />
    <rect x="30" y="69" width="17" height="15" />
    <line x1="38.5" y1="69" x2="38.5" y2="84" />
    <rect x="53" y="69" width="17" height="15" />
    <line x1="61.5" y1="69" x2="61.5" y2="84" />
    <rect x="66" y="69" width="17" height="15" />
    <line x1="74.5" y1="69" x2="74.5" y2="84" />
    <rect x="89" y="69" width="17" height="15" />
    <line x1="97.5" y1="69" x2="97.5" y2="84" />
    {/* central arched entrance */}
    <path d="M46 90 L46 76 Q46 68 55 68 Q64 68 64 76 L64 90" />
    {/* steps */}
    <line x1="36" y1="90" x2="74" y2="90" />
    <line x1="29" y1="95" x2="81" y2="95" />
    <line x1="20" y1="100" x2="90" y2="100" />
    <line x1="10" y1="104" x2="100" y2="104" />
    <line x1="0" y1="108" x2="110" y2="108" />
  </>,
];

type Props = {
  slides?: PSSlide[];
};

const PropertySlider: React.FC<Props> = ({ slides = DEFAULT_SLIDES }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimatingRef = useRef(false);
  const autoRef = useRef<number | null>(null);
  const activeIdxRef = useRef(0);

  const coverRefs = useRef<(HTMLImageElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const archRefs = useRef<(SVGSVGElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  const AUTO_DELAY = 6200;

  /* ── initial layout ── */
  useEffect(() => {
    slides.forEach((_, i) => {
      const cover = coverRefs.current[i];
      const content = contentRefs.current[i];
      const float = floatRefs.current[i];
      const arch = archRefs.current[i];

      if (i === 0) {
        if (cover) gsap.set(cover, { autoAlpha: 1 });
        if (content) gsap.set(content, { autoAlpha: 1 });
        if (float) gsap.set(float, { autoAlpha: 1, x: 0 });
        if (arch) gsap.set(arch, { opacity: 0, y: 40 });
      } else {
        if (cover) gsap.set(cover, { autoAlpha: 0 });
        if (content) gsap.set(content, { autoAlpha: 0 });
        if (float) gsap.set(float, { autoAlpha: 0, x: 60 });
        if (arch) gsap.set(arch, { opacity: 0, y: 30 });
      }
    });

    /* animate first slide content in */
    const c0 = contentRefs.current[0];
    if (c0) {
      const kids = Array.from(c0.children) as HTMLElement[];
      gsap.fromTo(
        kids,
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.25,
        },
      );
    }

    /* animate first arch in */
    const a0 = archRefs.current[0];
    if (a0) {
      gsap.to(a0, {
        y: 0,
        opacity: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, [slides]);

  /* ── progress bar reset helper ── */
  const resetProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.set(bar, { scaleX: 0 });
    gsap.to(bar, { scaleX: 1, duration: AUTO_DELAY / 1000, ease: "none" });
  }, []);

  /* ── go-to ── */
  const goTo = useCallback(
    (next: number) => {
      const prev = activeIdxRef.current;
      if (isAnimatingRef.current || next === prev) return;
      isAnimatingRef.current = true;
      activeIdxRef.current = next;

      const prevCover = coverRefs.current[prev];
      const nextCover = coverRefs.current[next];
      const prevContent = contentRefs.current[prev];
      const nextContent = contentRefs.current[next];
      const prevFloat = floatRefs.current[prev];
      const nextFloat = floatRefs.current[next];
      const prevArch = archRefs.current[prev];
      const nextArch = archRefs.current[next];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          isAnimatingRef.current = false;
          setActiveIdx(next);
        },
      });

      /* out: content children */
      if (prevContent) {
        const kids = Array.from(prevContent.children) as HTMLElement[];
        tl.to(
          kids,
          {
            y: -28,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.38,
            ease: "power2.in",
          },
          0,
        );
      }

      /* out: arch svg */
      if (prevArch) {
        tl.to(
          prevArch,
          { y: -25, opacity: 0, duration: 0.38, ease: "power2.in" },
          0,
        );
      }

      /* out: float */
      if (prevFloat) {
        tl.to(
          prevFloat,
          { x: -50, autoAlpha: 0, duration: 0.38, ease: "power2.in" },
          0,
        );
      }

      /* covers cross-fade */
      if (prevCover) {
        tl.to(
          prevCover,
          { autoAlpha: 0, duration: 0.65, ease: "power2.inOut" },
          0.15,
        );
      }
      if (nextCover) {
        gsap.set(nextCover, { autoAlpha: 0 });
        tl.to(
          nextCover,
          { autoAlpha: 1, duration: 0.65, ease: "power2.inOut" },
          0.15,
        );
      }

      /* in: float */
      if (nextFloat) {
        gsap.set(nextFloat, { x: 60, autoAlpha: 0 });
        tl.to(nextFloat, { x: 0, autoAlpha: 1, duration: 0.65 }, 0.3);
      }

      /* in: arch svg */
      if (nextArch) {
        gsap.set(nextArch, { y: 40, opacity: 0 });
        tl.to(nextArch, { y: 0, opacity: 0.1, duration: 0.65 }, 0.38);
      }

      /* in: content children */
      if (nextContent) {
        gsap.set(nextContent, { autoAlpha: 1 });
        const kids = Array.from(nextContent.children) as HTMLElement[];
        gsap.set(kids, { y: 52, autoAlpha: 0 });
        tl.to(kids, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.62 }, 0.42);
      }

      resetProgress();
    },
    [resetProgress],
  );

  /* ── auto-advance ── */
  useEffect(() => {
    resetProgress();
    if (autoRef.current) window.clearTimeout(autoRef.current);
    autoRef.current = window.setTimeout(() => {
      goTo((activeIdxRef.current + 1) % slides.length);
    }, AUTO_DELAY);
    return () => {
      if (autoRef.current) window.clearTimeout(autoRef.current);
    };
  }, [activeIdx, goTo, slides.length, resetProgress]);

  /* ── derived ── */
  const isFirst = activeIdx === 0;
  const isLast = activeIdx === slides.length - 1;
  const padded = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <div className="rg-ps">
      {/* ── Left accent panel ── */}
      <div className="rg-ps__accent" aria-hidden="true">
        <div className="rg-ps__accentNoise" />

        {/* Stacked architectural SVG marks */}
        <div className="rg-ps__archWrap">
          {slides.map((_, i) => (
            <svg
              key={i}
              ref={(el) => {
                archRefs.current[i] = el;
              }}
              className="rg-ps__archMark"
              viewBox={ARCH_VIEWBOXES[i % ARCH_VIEWBOXES.length]}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ARCH_SHAPES[i % ARCH_SHAPES.length]}
            </svg>
          ))}
        </div>

        <nav className="rg-ps__tabs" role="tablist" aria-label="Service tabs">
          {slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIdx}
              className={`rg-ps__tab ${i === activeIdx ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              type="button"
            >
              {s.tab}
            </button>
          ))}
        </nav>

        <div className="rg-ps__counter">
          <span className="rg-ps__counterCurrent">{padded(activeIdx)}</span>
          <span className="rg-ps__counterSep" />
          <span className="rg-ps__counterTotal">
            {padded(slides.length - 1)}
          </span>
        </div>
      </div>

      {/* ── Floating property frame ── */}
      <div className="rg-ps__floatWrap" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="rg-ps__floatFrame"
            ref={(el) => {
              floatRefs.current[i] = el;
            }}
          >
            <img
              src={slide.floatSrc}
              alt=""
              className="rg-ps__floatImg"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="rg-ps__floatBadge">{slide.tab}</div>
          </div>
        ))}
      </div>

      {/* ── Main card track ── */}
      <div className="rg-ps__track">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="rg-ps__slide"
            role="tabpanel"
            aria-hidden={i !== activeIdx}
          >
            <img
              ref={(el) => {
                coverRefs.current[i] = el;
              }}
              src={slide.coverSrc}
              alt=""
              className="rg-ps__cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="rg-ps__overlay" />

            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="rg-ps__content"
            >
              <span className="rg-ps__eyebrow">{slide.eyebrow}</span>
              <h3 className="rg-ps__headline">
                {slide.headline.split("\n").map((ln, j) => (
                  <span key={j} className="rg-ps__headlineLine">
                    {ln}
                  </span>
                ))}
              </h3>
              <p className="rg-ps__body">{slide.body}</p>
              <div className="rg-ps__stats">
                {slide.stats.map((st, j) => (
                  <div key={j} className="rg-ps__stat">
                    <span className="rg-ps__statValue">{st.value}</span>
                    <span className="rg-ps__statLabel">{st.label}</span>
                  </div>
                ))}
              </div>
              <button className="rg-ps__cta" type="button">
                {slide.cta}
                <svg
                  className="rg-ps__ctaArrow"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M4 10h12M12 5l5 5-5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Navigation — mobile only (desktop uses tabs) */}
        <button
          className={`rg-ps__navBtn rg-ps__navBtn--prev ${isFirst ? "is-disabled" : ""}`}
          onClick={() => goTo(activeIdx - 1)}
          disabled={isFirst}
          aria-label="Previous slide"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`rg-ps__navBtn rg-ps__navBtn--next ${isLast ? "is-disabled" : ""}`}
          onClick={() => goTo(activeIdx + 1)}
          disabled={isLast}
          aria-label="Next slide"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="rg-ps__progress" aria-hidden="true">
          <span className="rg-ps__progressBar" ref={progressRef} />
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
