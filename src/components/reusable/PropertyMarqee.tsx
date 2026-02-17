import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * RealGold Properties — Marquee Property Slider
 * - Continuous marquee (seamless loop)
 * - Faster speed (tweak SPEED_PX_PER_SEC)
 * - Pause on hover (auto pauses + resumes)
 * - Drag/swipe with inertia
 * - Better, more aesthetic cards (glass, premium borders, elegant typography)
 *
 * Drop this into your project as: PropertyMarquee.tsx
 * Requires your :root variables already defined globally.
 */

type PropertyCard = {
  id: string;
  title: string;
  location: string;
  stats: string; // e.g. "82,000 sq ft"
  type: string; // e.g. "Industrial"
  tags: string[];
  image: string;
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h12"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function PropertyMarquee() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const SPEED_PX_PER_SEC = 42; // ✅ increased marquee speed (was ~18)
  const HOVER_PAUSE = true; // ✅ pauses on hover
  const GAP_PX_FALLBACK = 18;

  const items: PropertyCard[] = useMemo(
    () => [
      {
        id: "p1",
        title: "Montreal Distribution Center",
        location: "Montreal",
        stats: "82,000 sq ft",
        type: "Industrial",
        tags: ["Lease", "Dock doors", "High clear"],
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "p2",
        title: "Toronto Class-A Offices",
        location: "Toronto",
        stats: "14 floors",
        type: "Commercial",
        tags: ["Core CBD", "Transit", "Concierge"],
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "p3",
        title: "Riverside Residences",
        location: "Waterfront",
        stats: "168 units",
        type: "Residential",
        tags: ["New build", "Gym", "Parking"],
        image:
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "p4",
        title: "Logistics Park West",
        location: "Etobicoke",
        stats: "210,000 sq ft",
        type: "Industrial",
        tags: ["For sale", "ESFR", "Trailer"],
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "p5",
        title: "Midtown Suites",
        location: "Toronto",
        stats: "96 units",
        type: "Multi-Residential",
        tags: ["Stabilized", "Retail base", "Low capex"],
        image:
          "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "p6",
        title: "Civic Retail Corner",
        location: "Downtown",
        stats: "24,500 sq ft",
        type: "Retail",
        tags: ["Anchor", "High footfall", "Corner"],
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
      },
    ],
    [],
  );

  // Duplicate items for seamless marquee (we will render A + A)
  const doubled = useMemo(() => [...items, ...items], [items]);

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // ----- Helpers -----
    const getGap = () => {
      const cs = window.getComputedStyle(track);
      const g = parseFloat((cs.columnGap || cs.gap || "") as string);
      return Number.isFinite(g) ? g : GAP_PX_FALLBACK;
    };

    const getSetWidth = () => {
      // width of the FIRST set of cards (items.length), including gaps between them
      const children = Array.from(track.children) as HTMLElement[];
      const count = items.length;
      const gap = getGap();
      let w = 0;

      for (let i = 0; i < count; i++) {
        const el = children[i];
        if (!el) break;
        w += el.getBoundingClientRect().width;
        if (i < count - 1) w += gap;
      }
      return w;
    };

    // ----- Animation State -----
    let x = 0;
    let speed = SPEED_PX_PER_SEC;

    // Drag state
    let isDown = false;
    let startX = 0;
    let startOffset = 0;

    // velocity for inertia
    let lastMoveTime = 0;
    let lastMoveX = 0;
    let velocity = 0;

    // Pause control
    const shouldAutoMove = () => {
      if (isDown) return false;
      if (HOVER_PAUSE && isHover) return false;
      return true;
    };

    const onDown = (e: PointerEvent | TouchEvent) => {
      isDown = true;
      viewport.classList.add("rgMarquee_dragging");

      const clientX =
        (e as TouchEvent).touches && (e as TouchEvent).touches[0]
          ? (e as TouchEvent).touches[0].clientX
          : (e as PointerEvent).clientX;

      startX = clientX;
      startOffset = x;

      velocity = 0;
      lastMoveTime = performance.now();
      lastMoveX = clientX;

      // prevent image ghost drag
      if ("preventDefault" in e) e.preventDefault();
    };

    const onMove = (e: PointerEvent | TouchEvent) => {
      if (!isDown) return;

      const clientX =
        (e as TouchEvent).touches && (e as TouchEvent).touches[0]
          ? (e as TouchEvent).touches[0].clientX
          : (e as PointerEvent).clientX;

      const dx = clientX - startX;
      x = startOffset + dx;

      const now = performance.now();
      const dt = Math.max(16, now - lastMoveTime);
      const dv = clientX - lastMoveX;
      velocity = dv / dt; // px per ms

      lastMoveTime = now;
      lastMoveX = clientX;
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      viewport.classList.remove("rgMarquee_dragging");

      // Inertia
      let throwSpeed = velocity * 1000; // px/sec
      throwSpeed = clamp(throwSpeed, -2200, 2200); // slightly more premium/controlled

      let inertia = throwSpeed;
      const decay = 0.92;

      const drift = () => {
        if (Math.abs(inertia) < 10) return;
        x += inertia * (16 / 1000);
        inertia *= decay;
        requestAnimationFrame(drift);
      };
      requestAnimationFrame(drift);
    };

    // Pointer events
    viewport.addEventListener("pointerdown", onDown as any, { passive: false });
    window.addEventListener("pointermove", onMove as any, { passive: false });
    window.addEventListener("pointerup", onUp);

    // Touch fallback
    viewport.addEventListener("touchstart", onDown as any, { passive: false });
    window.addEventListener("touchmove", onMove as any, { passive: false });
    window.addEventListener("touchend", onUp);

    // RAF loop
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (shouldAutoMove()) {
        speed = SPEED_PX_PER_SEC;
        x -= speed * dt;
      }

      const setW = getSetWidth();

      // Keep x in [-setW, 0] to loop seamlessly
      if (setW > 0) {
        if (x <= -setW) x += setW;
        if (x >= 0) x -= setW;
      }

      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const setW = getSetWidth();
      if (setW > 0) {
        while (x <= -setW) x += setW;
        while (x >= 0) x -= setW;
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("pointerdown", onDown as any);
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("pointerup", onUp);

      viewport.removeEventListener("touchstart", onDown as any);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);

      window.removeEventListener("resize", onResize);
    };
  }, [GAP_PX_FALLBACK, HOVER_PAUSE, SPEED_PX_PER_SEC, isHover, items.length]);

  return (
    <section className="rgMarquee">
      <div className="wrap">
        <header className="rgMarquee__head">
          <div className="rgMarquee__kicker">Featured</div>
          <h2 className="rgMarquee__title">
            Available <em>Properties</em>
          </h2>
          <p className="rgMarquee__sub">
            A curated stream of opportunities — hover to pause, drag to explore.
          </p>
        </header>
      </div>

      <div className="rgMarquee__rail" aria-label="Property marquee slider">
        <div
          className="rgMarquee__fade rgMarquee__fade--l"
          aria-hidden="true"
        />
        <div
          className="rgMarquee__fade rgMarquee__fade--r"
          aria-hidden="true"
        />

        <div
          className="rgMarquee__viewport"
          ref={viewportRef}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="rgMarquee__track" ref={trackRef}>
            {doubled.map((p, idx) => (
              <article className="rgProp" key={`${p.id}-${idx}`}>
                <div className="rgProp__media">
                  <img src={p.image} alt={p.title} draggable={false} />
                  <div className="rgProp__pill">{p.type}</div>

                  {/* subtle premium corner highlight */}
                  <div className="rgProp__shine" aria-hidden="true" />
                </div>

                <div className="rgProp__body">
                  <div className="rgProp__top">
                    <h3 className="rgProp__name">{p.title}</h3>
                    <div className="rgProp__meta">
                      <span>{p.location}</span>
                      <span className="rgProp__dot" aria-hidden="true" />
                      <span>{p.stats}</span>
                    </div>
                  </div>

                  <div
                    className="rgProp__tags"
                    aria-label="Property highlights"
                  >
                    {p.tags.map((t) => (
                      <span className="rgProp__tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="rgProp__cta">
                    <button className="rgProp__btn" type="button">
                      View Details
                      <span className="rgProp__btnIcon" aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Styles scoped by classnames (works with plain CSS file too) */}
      <style>{`
        .rgMarquee{
          padding: clamp(48px, 6vw, 88px) 0;
          background: var(--rg-beige-light);
          border-top: 1px solid rgba(44,24,16,.08);
          border-bottom: 1px solid rgba(44,24,16,.08);
          overflow: hidden;
        }

        .rgMarquee__head{ margin-bottom: 22px; }
        .rgMarquee__kicker{
          display:flex; align-items:center; gap: 12px;
          font-size: 14px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(92,77,66,.72);
          margin-bottom: 10px;
        }
        .rgMarquee__kicker::before{
          content:"";
          width: 46px; height: 1px;
          background: var(--rg-gold);
          opacity: .9;
        }
        .rgMarquee__title{
          margin: 0 0 8px;
          font-size: clamp(34px, 3.4vw, 56px);
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-weight: 400;
          color: var(--rg-text-dark);
          font-family: var(--font-body);
        }
        .rgMarquee__title em{
          font-family: var(--font-title);
          font-style: italic;
          font-weight: 400;
        }
        .rgMarquee__sub{
          margin: 0;
          color: rgba(92,77,66,.78);
          max-width: 62ch;
          line-height: 1.6;
          font-size: 14px;
        }

        /* Rail + fades */
        .rgMarquee__rail{ position: relative; padding: 10px 0 2px; }
        .rgMarquee__fade{
          position:absolute; top:0; bottom:0;
          width: min(180px, 12vw);
          pointer-events:none;
          z-index: 3;
        }
        .rgMarquee__fade--l{
          left:0;
          background: linear-gradient(90deg, var(--rg-beige-light) 0%, rgba(255,248,240,0) 100%);
        }
        .rgMarquee__fade--r{
          right:0;
          background: linear-gradient(270deg, var(--rg-beige-light) 0%, rgba(255,248,240,0) 100%);
        }

        .rgMarquee__viewport{
          overflow: hidden;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-y;
        }
        .rgMarquee__viewport.rgMarquee_dragging{ cursor: grabbing; }

        .rgMarquee__track{
          display:flex;
          gap: 18px;
          will-change: transform;
          padding: 12px var(--rg-pad);
        }

        /* ===== Premium Property Card ===== */
        .rgProp{
          flex: 0 0 auto;
          width: clamp(300px, 26vw, 410px);
          border-radius: 22px;
          overflow: hidden;
          position: relative;

          /* layered surface */
          background:
            radial-gradient(120% 120% at 10% 0%, rgba(255,255,255,.90) 0%, rgba(255,248,240,.62) 40%, rgba(245,239,230,.82) 100%);
          border: 1px solid rgba(44,24,16,.10);
          box-shadow:
            0 18px 40px rgba(44,24,16,.10),
            inset 0 1px 0 rgba(255,255,255,.65);

          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease, filter .22s ease;
          filter: saturate(1.02);
        }

        .rgProp::before{
          /* subtle gold edge glow */
          content:"";
          position:absolute;
          inset: -1px;
          border-radius: 22px;
          pointer-events:none;
          background: radial-gradient(80% 60% at 20% 0%, rgba(212,160,86,.26) 0%, rgba(212,160,86,0) 60%);
          opacity: .9;
        }

        .rgProp:hover{
          transform: translateY(-4px);
          border-color: rgba(44,24,16,.16);
          box-shadow:
            0 22px 58px rgba(44,24,16,.14),
            inset 0 1px 0 rgba(255,255,255,.70);
        }

        .rgProp__media{
          position: relative;
          height: 236px;
          background: var(--rg-beige-dark);
          overflow:hidden;
        }
        .rgProp__media img{
          width:100%; height:100%;
          object-fit: cover;
          transform: scale(1.06);
          filter: saturate(1.03) contrast(1.04);
          user-select:none;
          -webkit-user-drag:none;
        }
        .rgProp__media::after{
          content:"";
          position:absolute; inset:0;
          background:
            linear-gradient(180deg, rgba(0,0,0,.00) 35%, rgba(0,0,0,.52) 100%);
          pointer-events:none;
        }

        .rgProp__pill{
          position:absolute;
          left: 14px; top: 14px;
          z-index: 2;
          padding: 9px 12px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,248,240,.96);
          background: rgba(27,17,12,.58);
          border: 1px solid rgba(255,248,240,.26);
          backdrop-filter: blur(7px);
        }

        .rgProp__shine{
          position:absolute;
          right:-30%;
          top:-40%;
          width: 70%;
          height: 120%;
          background: linear-gradient(90deg, rgba(255,255,255,.0) 0%, rgba(255,255,255,.14) 45%, rgba(255,255,255,0) 100%);
          transform: rotate(22deg);
          pointer-events:none;
          opacity: .75;
        }

        .rgProp__body{
          padding: 16px 16px 16px;
        }

        .rgProp__top{
          display:flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 12px;
        }

        .rgProp__name{
          margin: 0;
          font-size: 18px;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--rg-text-dark);
          font-weight: 600;
        }

        .rgProp__meta{
          display:flex;
          align-items:center;
          gap: 10px;
          font-size: 13px;
          color: rgba(92,77,66,.78);
        }
        .rgProp__dot{
          width: 4px; height: 4px;
          border-radius: 999px;
          background: rgba(212,160,86,.9);
          box-shadow: 0 0 0 3px rgba(212,160,86,.14);
        }

        .rgProp__tags{
          display:flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .rgProp__tag{
          font-size: 12px;
          color: rgba(44,24,16,.86);
          background: rgba(232,220,200,.56);
          border: 1px solid rgba(44,24,16,.08);
          padding: 7px 10px;
          border-radius: 999px;
          line-height: 1;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.55);
        }

        .rgProp__cta{ display:flex; }

        .rgProp__btn{
          width: 100%;
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 999px;
          border: 1px solid rgba(44,24,16,.16);
          background:
            linear-gradient(180deg, rgba(255,255,255,.72) 0%, rgba(255,248,240,.92) 100%);
          color: var(--rg-text-dark);
          font-size: 13px;
          letter-spacing: .01em;
          cursor:pointer;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
        }

        .rgProp__btnIcon{
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display:grid;
          place-items:center;
          background: rgba(212,160,86,.18);
          border: 1px solid rgba(212,160,86,.30);
          color: rgba(44,24,16,.92);
          transition: transform .18s ease, background .18s ease;
        }
        .rgProp__btnIcon svg{ width: 18px; height: 18px; display:block; }

        .rgProp__btn:hover{
          transform: translateY(-1px);
          background: #fff;
          border-color: rgba(44,24,16,.24);
        }
        .rgProp__btn:hover .rgProp__btnIcon{
          transform: translateX(2px);
          background: rgba(212,160,86,.22);
        }

        @media (max-width: 640px){
          .rgProp{ width: 86vw; }
          .rgProp__media{ height: 210px; }
        }
      `}</style>
    </section>
  );
}
