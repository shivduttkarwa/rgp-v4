// Philosophy.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Philosophy.css";

type Pillar = {
  title: string; // BIG overlay title (bottom, blend-mode)
  kicker: string; // small line above title (optional feeling)
  desc: string; // hover reveal text
  img: string; // image url
  tintVar: "gold" | "amber" | "crimson"; // uses your vars only
};

const PILLARS: Pillar[] = [
  {
    title: "CLARITY",
    kicker: "OUR PHILOSOPHY",
    desc: "We simplify every decision with honest pricing, clear comparables, and zero-pressure guidance—so you always know what’s next.",
    img: "https://files.staging.peachworlds.com/website/dbf16c23-6134-4df6-a509-bd2a6b79ab37/chatgpt-image-3-apr-2025-16-33-58.webp",
    tintVar: "gold",
  },
  {
    title: "CARE",
    kicker: "HOW WE WORK",
    desc: "From first viewing to final handover, we obsess over details—timelines, paperwork, follow-ups—so the experience feels effortless.",
    img: "https://files.staging.peachworlds.com/website/d80b404a-7e8e-40ee-a08c-cbab3f8a7ad3/chatgpt-image-3-apr-2025-16-23-38.webp",
    tintVar: "amber",
  },
  {
    title: "RESULTS",
    kicker: "WHAT YOU GET",
    desc: "Strategic marketing, negotiation discipline, and data-led insights—built to protect your value and maximize outcomes with integrity.",
    img: "https://files.staging.peachworlds.com/website/504aad69-04e9-4c61-8e60-4bf340ec746f/chatgpt-image-3-apr-2025-16-23-32.webp",
    tintVar: "crimson",
  },
];

export default function Philosophy() {
  return (
    <section className="rg-philo" aria-label="Real Gold Properties Philosophy">
      <div className="rg-philo__wrap">
        <header className="rg-philo__head">
          <p className="rg-philo__label">Philosophy</p>
          <h2 className="rg-philo__title">Our <em>Philosophy</em></h2>
          <p className="rg-philo__subtitle">
            Real estate, made calm and confident—where every move is guided by
            clarity, care, and results.
          </p>
        </header>

        <div className="rg-philo__divider" role="separator" />

        {/* Desktop grid */}
        <div className="rg-philo__grid" aria-label="Philosophy pillars">
          {PILLARS.map((p) => (
            <article key={p.title} className="rg-philo__card" data-tint={p.tintVar}>
              <div className="rg-philo__media">
                <img className="rg-philo__img" src={p.img} alt={p.title} loading="lazy" />
              </div>
              <div className="rg-philo__pill">
                <div className="rg-philo__pillKicker">{p.kicker}</div>
                <div className="rg-philo__pillTitle">{p.title}</div>
              </div>
              <div className="rg-philo__reveal" aria-hidden="true">
                <div className="rg-philo__revealInner">
                  <div className="rg-philo__revealKicker">{p.kicker}</div>
                  <div className="rg-philo__revealTitle">{p.title}</div>
                  <p className="rg-philo__revealDesc">{p.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile swiper */}
        <div className="rg-philo__swiper-wrap">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.08}
            grabCursor
            speed={420}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{ 480: { slidesPerView: 1.2, spaceBetween: 20 } }}
          >
            {PILLARS.map((p) => (
              <SwiperSlide key={p.title}>
                <article className="rg-philo__card" data-tint={p.tintVar}>
                  <div className="rg-philo__media">
                    <img className="rg-philo__img" src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <div className="rg-philo__pill">
                    <div className="rg-philo__pillKicker">{p.kicker}</div>
                    <div className="rg-philo__pillTitle">{p.title}</div>
                  </div>
                  <div className="rg-philo__reveal" aria-hidden="true">
                    <div className="rg-philo__revealInner">
                      <div className="rg-philo__revealKicker">{p.kicker}</div>
                      <div className="rg-philo__revealTitle">{p.title}</div>
                      <p className="rg-philo__revealDesc">{p.desc}</p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
