// HomeTestimonials (Philosophy.tsx) — same card design, videos instead of images
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Philosophy.css";

type Testimonial = {
  kicker: string;
  title: string;
  desc: string;
  video: string;
  poster: string;
  tintVar: "gold" | "amber" | "crimson";
};

const TESTIMONIALS: Testimonial[] = [
  {
    kicker: "SUNNYBANK · SOLD",
    title: "SARAH M.",
    desc: "Rahul made selling our home completely stress-free. His market knowledge and honest advice got us $40k above what we expected. Couldn't recommend him more highly.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://files.staging.peachworlds.com/website/dbf16c23-6134-4df6-a509-bd2a6b79ab37/chatgpt-image-3-apr-2025-16-33-58.webp",
    tintVar: "gold",
  },
  {
    kicker: "UNDERWOOD · PURCHASED",
    title: "JAMES & LISA",
    desc: "As first-home buyers we were nervous, but Rahul guided us through every step with patience and clarity. We found our perfect home within three weeks.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://files.staging.peachworlds.com/website/d80b404a-7e8e-40ee-a08c-cbab3f8a7ad3/chatgpt-image-3-apr-2025-16-23-38.webp",
    tintVar: "amber",
  },
  {
    kicker: "EIGHT MILE PLAINS · APPRAISAL",
    title: "DAVID K.",
    desc: "The free appraisal was insightful and there was zero pressure. Rahul gave us a realistic picture of our property's value backed by solid, comparable data.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://files.staging.peachworlds.com/website/504aad69-04e9-4c61-8e60-4bf340ec746f/chatgpt-image-3-apr-2025-16-23-32.webp",
    tintVar: "crimson",
  },
];

function TestiCard({ t }: { t: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    // Unmute + go fullscreen so user gets full controls
    v.muted = false;
    if (v.requestFullscreen) {
      v.requestFullscreen().then(() => v.play().catch(() => {}));
    } else {
      v.controls = true;
      v.muted = false;
      v.play().catch(() => {});
    }
  };

  return (
    <article
      className="rg-philo__card"
      data-tint={t.tintVar}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="rg-philo__media">
        <video
          ref={videoRef}
          className="rg-philo__img"
          src={t.video}
          poster={t.poster}
          muted
          playsInline
          loop
          preload="none"
        />
      </div>

      {/* Play icon overlay (always visible, fades on hover) */}
      <div className="rg-philo__play-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
          <path d="M19 16l14 8-14 8V16z" fill="currentColor" />
        </svg>
      </div>

      <div className="rg-philo__pill">
        <div className="rg-philo__pillKicker">{t.kicker}</div>
        <div className="rg-philo__pillTitle">{t.title}</div>
      </div>

      <div className="rg-philo__reveal" aria-hidden="true">
        <div className="rg-philo__revealInner">
          <div className="rg-philo__revealKicker">{t.kicker}</div>
          <div className="rg-philo__revealTitle">{t.title}</div>
          <p className="rg-philo__revealDesc">{t.desc}</p>
        </div>
      </div>
    </article>
  );
}

export default function PhilosophyPillars() {
  return (
    <section className="rg-philo" aria-label="Client Testimonials">
      <div className="rg-philo__wrap">
        <header className="rg-philo__head">
          <p data-gsap="fade-up" className="rg-philo__label">
            Testimonials
          </p>
          <h2
            data-gsap="char-reveal"
            data-gsap-start="top 85%"
            className="rg-philo__title"
          >
            What Our <em>Clients</em> Say
          </h2>
          <p
            data-gsap="fade-up"
            data-gsap-delay="0.2"
            className="rg-philo__subtitle"
          >
            Real feedback from Brisbane homeowners who trusted Rahul to buy,
            sell, or appraise their property.
          </p>
        </header>

        <div className="rg-philo__divider" role="separator" />

        {/* Desktop grid */}
        <div
          data-gsap="clip-smooth-down"
          data-gsap-stagger="0.14"
          data-gsap-delay="0.1"
          className="rg-philo__grid"
          aria-label="Client testimonials"
        >
          {TESTIMONIALS.map((t) => (
            <TestiCard key={t.title} t={t} />
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
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.title}>
                <div className="rg-philo__card-wrap">
                  <TestiCard t={t} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="rg-philo__cta-row">
          <a href="/testimonials" className="rg-philo__cta-btn">
            <span>Read All Reviews</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
