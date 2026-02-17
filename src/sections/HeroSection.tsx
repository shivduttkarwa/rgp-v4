import { useEffect, useRef } from "react";
import gsap from "gsap";
import BtnSecondary from "../components/BtnSecondary";
import "./HeroSection.css";

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const revealL1Ref = useRef<HTMLDivElement>(null);
  const revealL2Ref = useRef<HTMLDivElement>(null);
  const revealSubRef = useRef<HTMLDivElement>(null);
  const revealCtaRef = useRef<HTMLDivElement>(null);

  // Set initial states on mount — bg fully visible, only content hidden
  useEffect(() => {
    const bg = bgRef.current;
    const vignette = vignetteRef.current;
    const revealL1 = revealL1Ref.current;
    const revealL2 = revealL2Ref.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!bg || !vignette || !revealL1 || !revealL2 || !revealSub || !revealCta) return;

    // BG visible from the start — no animation needed
    gsap.set(bg, { opacity: 1, scale: 1.02 });
    gsap.set(vignette, { opacity: 0.5 });
    // Content starts hidden
    gsap.set([revealL1, revealL2, revealSub, revealCta], { x: -60, opacity: 0 });
    gsap.set(revealCta, { scale: 0.9 });
  }, []);

  // Animate content once curtain finishes rising (~750ms after ready)
  useEffect(() => {
    if (!ready) return;

    const revealL1 = revealL1Ref.current;
    const revealL2 = revealL2Ref.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!revealL1 || !revealL2 || !revealSub || !revealCta) return;

    // ready fires at progress=100, curtain takes 120ms+750ms=870ms to exit
    const tl = gsap.timeline({ delay: 0.95 });

    tl.to(revealL1, { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, 0.1);
    tl.to(revealL2, { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, 0.2);
    tl.to(revealSub, { x: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, 0.35);
    tl.to(revealCta, { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power4.out" }, 0.45);

    return () => { tl.kill(); };
  }, [ready]);

  /* ═══════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════ */
  return (
    <div className="rg-hero-wrap">
      <section className="rg-hero">
        <div
          className="rg-hero__bg"
          ref={bgRef}
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(0deg, rgba(7, 20, 37, 0.2), rgba(7, 20, 37, 0.15)), url("public/images/journal_3.jpg")',
          }}
        ></div>
        <div
          className="rg-hero__vignette"
          ref={vignetteRef}
          aria-hidden="true"
        ></div>
        {/* ── REVEAL (animates on scroll) ── */}
        <div className="rg-hero__reveal">
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" ref={revealL1Ref}>
              Luxury <span className="rg-gold">Redefined</span>
            </div>
          </div>
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" ref={revealL2Ref}>
              Living <span className="rg-amber">Elevated</span>
            </div>
          </div>
          <div className="rg-reveal__sub" ref={revealSubRef}>
            350+ premium properties delivered — luxury villas, penthouses &amp;
            exclusive estates crafted for those who demand the extraordinary.
          </div>
          <div className="rg-reveal__cta" ref={revealCtaRef}>
            <BtnSecondary label="Explore Properties" />
          </div>
        </div>
      </section>
    </div>
  );
}
