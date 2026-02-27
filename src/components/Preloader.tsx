import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

interface PreloaderProps {
  onComplete?: () => void;
}

const STAGES = [
  { target: 30,  speed: 18 },
  { target: 55,  speed: 22 },
  { target: 75,  speed: 16 },
  { target: 90,  speed: 20 },
  { target: 100, speed: 14 },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [hidden, setHidden] = useState(false);

  // Keep ref in sync without causing effect re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.documentElement.classList.add("scroll-locked");
    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, []);

  // Progress + curtain — no onComplete in deps, use ref instead
  useEffect(() => {
    let progress = 0;
    let currentStage = 0;
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout>;

    function update() {
      if (cancelled) return;

      if (currentStage >= STAGES.length) {
        // Fire immediately so browser gets 120ms to paint newly-visible content
        // before the curtain animation starts — prevents jank frame during slide
        onCompleteRef.current?.();

        timerId = setTimeout(() => {
          if (cancelled) return;
          const el = preloaderRef.current;
          if (!el) return;

          gsap.to(el, {
            y: "-100%",
            duration: 0.75,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              document.documentElement.classList.remove("scroll-locked");
              setHidden(true);
            },
          });
        }, 120);
        return;
      }

      const stage = STAGES[currentStage];

      if (progress < stage.target) {
        progress += Math.random() * 3 + 1;
        if (progress > stage.target) progress = stage.target;
        timerId = setTimeout(update, stage.speed + Math.random() * 20);
      } else {
        currentStage++;
        timerId = setTimeout(update, 80 + Math.random() * 120);
      }
    }

    timerId = setTimeout(update, 400);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, []); // empty deps — onComplete accessed via ref

  if (hidden) return null;

  return (
    <div className="preloader" ref={preloaderRef} aria-hidden="true">
      <div className="preloader-skyline" aria-hidden="true">
        <div className="preloader-building" />
        <div className="preloader-building" />
        <div className="preloader-building" />
        <div className="preloader-building" />
        <div className="preloader-building" />
      </div>
      <div className="preloader-text">
        <h2 className="preloader-title">Loading</h2>
      </div>
    </div>
  );
}
