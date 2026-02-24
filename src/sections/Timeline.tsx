import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  index: number;
  step: string;
  year: string;
  title: string;
  desc: string;
  metrics: { val: string; label: string }[];
  imgSrc: string;
  imgAlt: string;
}

const STEPS: Step[] = [
  {
    index: 0,
    step: 'Step 01',
    year: '2009',
    title: 'The Foundation',
    desc: "Real Gold Properties opened with three people and a conviction: luxury real estate deserves a personal touch. We chose to grow slowly, earn trust deeply, and never compromise on quality.",
    metrics: [
      { val: '3', label: 'Team Members' },
      { val: '12', label: 'Properties' },
    ],
    imgSrc: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=700&fit=crop',
    imgAlt: '2009',
  },
  {
    index: 1,
    step: 'Step 02',
    year: '2013',
    title: 'Breaking Through',
    desc: "We crossed $100 million in annual transactions. More importantly, our referral rate hit 78%. Clients weren't just returning — they were sending everyone they knew.",
    metrics: [
      { val: '$100M+', label: 'Annual Sales' },
      { val: '78%', label: 'Referrals' },
    ],
    imgSrc: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=700&fit=crop',
    imgAlt: '2013',
  },
  {
    index: 2,
    step: 'Step 03',
    year: '2017',
    title: 'Going Global',
    desc: "Our clients invested across borders, so we followed. Offices in Dubai and London extended our curated approach internationally — same principles, wider canvas.",
    metrics: [
      { val: '3', label: 'Offices' },
      { val: '6', label: 'Countries' },
    ],
    imgSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=700&fit=crop',
    imgAlt: '2017',
  },
  {
    index: 3,
    step: 'Step 04',
    year: '2021',
    title: 'Redefining Luxury',
    desc: "We launched Sustainable Estates — proving luxury and environmental responsibility aren't opposites. Our first net-zero development sold out in 90 days.",
    metrics: [
      { val: '90', label: 'Days Sold Out' },
      { val: 'Net-Zero', label: 'Certified' },
    ],
    imgSrc: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=700&fit=crop',
    imgAlt: '2021',
  },
  {
    index: 4,
    step: 'Step 05',
    year: '2024',
    title: 'The Next Chapter',
    desc: "$2.4 billion in managed assets. 850+ families across three continents. Zero unresolved disputes. Every promise kept. The next fifteen years start now.",
    metrics: [
      { val: '$2.4B', label: 'Portfolio' },
      { val: '850+', label: 'Families' },
    ],
    imgSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=700&fit=crop',
    imgAlt: '2024',
  },
];

export default function Timeline() {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const deviceFrameRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const contentRailRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const currentActiveRef = useRef<number>(0);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    const frameImgs = frameImgRefs.current.filter(Boolean) as HTMLDivElement[];
    const deviceFrame = deviceFrameRef.current;
    const progressFill = progressFillRef.current;
    const contentRail = contentRailRef.current;

    const intro = introRef.current;
    if (!deviceFrame || !progressFill || !contentRail || !intro) return;

    frameImgs.forEach((img, i) => {
      gsap.set(img, { opacity: i === 0 ? 1 : 0 });
    });

    panels[0]?.classList.add('rg-active');

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    panels.forEach((panel, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => activateStep(i, panels),
          onEnterBack: () => activateStep(i, panels),
        })
      );

      if (i < panels.length - 1) {
        const DROP = 0.35;
        const DROP_PX = 80;

        triggers.push(
          ScrollTrigger.create({
            trigger: panels[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: 1.5,
            onUpdate: (self) => {
              const p = self.progress;
              let y: number, rotateY: number, tiltT: number;

              if (p <= DROP) {
                tiltT = 0;
                y = (p / DROP) * DROP_PX;
                rotateY = i * 180;
              } else {
                tiltT = (p - DROP) / (1 - DROP);
                y = (1 - tiltT) * DROP_PX;
                rotateY = i * 180 + tiltT * 180;
              }

              gsap.set(deviceFrame, {
                y,
                rotateY,
                scale: 1 - Math.sin(tiltT * Math.PI) * 0.04,
              });

              const norm = rotateY % 360;
              const frontFace = norm < 90 || norm >= 270;

              if (tiltT < 0.5) {
                gsap.set(frameImgs[i], { opacity: 1, scaleX: frontFace ? 1 : -1 });
                gsap.set(frameImgs[i + 1], { opacity: 0, scaleX: 1 });
              } else {
                gsap.set(frameImgs[i], { opacity: 0 });
                gsap.set(frameImgs[i + 1], { opacity: 1, scaleX: frontFace ? 1 : -1 });
              }

              deviceFrame.classList.toggle('rg-flipping', tiltT > 0.05 && tiltT < 0.95);
            },
            onLeave: () => {
              const endAngle = (i + 1) * 180;
              const norm = endAngle % 360;
              const frontFace = norm < 90 || norm >= 270;
              gsap.set(deviceFrame, { rotateY: endAngle, y: 0, scale: 1 });
              deviceFrame.classList.remove('rg-flipping');
              frameImgs.forEach((img, idx) => {
                const active = idx === i + 1;
                gsap.set(img, { opacity: active ? 1 : 0, scaleX: active && !frontFace ? -1 : 1 });
              });
            },
            onLeaveBack: () => {
              const startAngle = i * 180;
              const norm = startAngle % 360;
              const frontFace = norm < 90 || norm >= 270;
              gsap.set(deviceFrame, { rotateY: startAngle, y: 0, scale: 1 });
              deviceFrame.classList.remove('rg-flipping');
              frameImgs.forEach((img, idx) => {
                const active = idx === i;
                gsap.set(img, { opacity: active ? 1 : 0, scaleX: active && !frontFace ? -1 : 1 });
              });
            },
          })
        );
      }

      const els = panel.querySelectorAll<HTMLElement>(
        '.rg-panel-step, .rg-panel-year, .rg-panel-title, .rg-panel-desc, .rg-panel-metrics'
      );
      gsap.set(els, { y: 25, opacity: 0 });
      triggers.push(
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          once: true,
          onEnter: () => {
            gsap.to(els, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out' });
          },
        })
      );
    });

    triggers.push(
      ScrollTrigger.create({
        trigger: contentRail,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.3,
        onUpdate: (self) => {
          progressFill.style.height = self.progress * 100 + '%';
        },
      })
    );

    const introEls = [
      intro.querySelector('.rg-intro-eyebrow'),
      intro.querySelector('.rg-intro-title'),
      intro.querySelector('.rg-intro-desc'),
    ].filter(Boolean) as HTMLElement[];
    gsap.set(introEls, { y: 10, opacity: 0 });
    triggers.push(
      ScrollTrigger.create({
        trigger: intro,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          introEls.forEach((el, i) => {
            gsap.to(el, { y: 0, opacity: 1, duration: 0.7, delay: i * 0.15 });
          });
        },
      })
    );

    // Recalculate all scroll positions after the full page layout settles
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  function activateStep(index: number, panels: HTMLDivElement[]) {
    if (currentActiveRef.current === index) return;
    currentActiveRef.current = index;
    panels.forEach((p, i) => p.classList.toggle('rg-active', i === index));
  }

  return (
    <div className="rg-root">
      <section className="rg-intro" ref={introRef}>
        <span className="rg-intro-eyebrow">Our Journey</span>
        <h2 className="rg-intro-title">Fifteen Years of Building Trust</h2>
        <p className="rg-intro-desc">Every milestone shaped who we are. Scroll to walk through our story.</p>
      </section>

      <section className="rg-timeline-container">
        <div className="rg-timeline-layout">

          <div className="rg-content-rail" ref={contentRailRef}>
            <div className="rg-progress-track">
              <div className="rg-progress-fill" ref={progressFillRef} />
            </div>

            {STEPS.map((s, i) => (
              <div
                key={s.year}
                className="rg-panel"
                data-index={i}
                ref={(el) => { panelRefs.current[i] = el; }}
              >
                <div className="rg-panel-dot" />
                <p className="rg-panel-step">{s.step}</p>
                <p className="rg-panel-year">{s.year}</p>
                <h2 className="rg-panel-title">{s.title}</h2>
                <p className="rg-panel-desc">{s.desc}</p>
                <div className="rg-panel-metrics">
                  {s.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="rg-m-val">{m.val}</div>
                      <div className="rg-m-label">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rg-image-rail">
            <div className="rg-frame-container">
              <div className="rg-device-frame" ref={deviceFrameRef}>
                <div className="rg-frame-images">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.year}
                      className="rg-frame-img"
                      data-img={i}
                      ref={(el) => { frameImgRefs.current[i] = el; }}
                    >
                      <img src={s.imgSrc} alt={s.imgAlt} />
                      <div className="rg-frame-img-overlay" />
                      <span className="rg-frame-img-label">{s.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="rg-end-section">
        <div className="rg-end-line" />
        <p className="rg-end-text">The story continues. <span>Write it with us.</span></p>
      </section>
    </div>
  );
}
