import React, { useEffect, useRef } from "react";
import HeroSection from "../sections/HeroSection";
import RGPSplitSlider from "../components/reusable/SplitSlider";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import "./TestimonialPage.css";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexander Chen",
    role: "CEO",
    company: "TechVentures",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "Absolutely transformative experience. The attention to detail and level of craftsmanship exceeded all expectations. This is what premium service looks like.",
    rating: 5,
    location: "San Francisco",
  },
  {
    id: 2,
    name: "Sophia Williams",
    role: "Creative Director",
    company: "Design Studio",
    avatar: "https://i.pravatar.cc/150?img=5",
    content:
      "Working with this team has been an incredible journey. Their vision aligned perfectly with ours, and the results speak for themselves. Highly recommended.",
    rating: 5,
    location: "New York",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Founder",
    company: "StartUp Labs",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "From concept to execution, everything was handled with utmost professionalism. They redefined what we thought was possible.",
    rating: 5,
    location: "London",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Marketing VP",
    company: "Global Brands",
    avatar: "https://i.pravatar.cc/150?img=9",
    content:
      "The ROI we've seen since partnering has been phenomenal. Best decision we made this year without any doubt.",
    rating: 5,
    location: "Madrid",
  },
  {
    id: 5,
    name: "James Mitchell",
    role: "CTO",
    company: "InnovateTech",
    avatar: "https://i.pravatar.cc/150?img=8",
    content:
      "Technical excellence meets creative brilliance. They understood our complex requirements and delivered beyond expectations.",
    rating: 5,
    location: "Berlin",
  },
  {
    id: 6,
    name: "Isabella Foster",
    role: "Brand Manager",
    company: "Luxe Collective",
    avatar: "https://i.pravatar.cc/150?img=10",
    content:
      "Our brand identity has never been stronger. The strategic approach combined with stunning execution was exactly what we needed.",
    rating: 5,
    location: "Paris",
  },
  {
    id: 7,
    name: "David Park",
    role: "Product Lead",
    company: "NextGen",
    avatar: "https://i.pravatar.cc/150?img=11",
    content:
      "Seamless collaboration from start to finish. The team's expertise and dedication are unmatched in the industry.",
    rating: 5,
    location: "Seoul",
  },
  {
    id: 8,
    name: "Olivia Thompson",
    role: "Art Director",
    company: "Creative Minds",
    avatar: "https://i.pravatar.cc/150?img=20",
    content:
      "As a creative professional myself, I'm incredibly impressed by the level of artistry and innovation in every project.",
    rating: 5,
    location: "Sydney",
  },
  {
    id: 9,
    name: "Michael Brown",
    role: "Operations Director",
    company: "Enterprise Corp",
    avatar: "https://i.pravatar.cc/150?img=12",
    content:
      "Efficient, professional, and results-driven. They transformed our operations and elevated our brand presence significantly.",
    rating: 5,
    location: "Chicago",
  },
  {
    id: 10,
    name: "Emma Davis",
    role: "Startup Founder",
    company: "Bloom Ventures",
    avatar: "https://i.pravatar.cc/150?img=23",
    content:
      "They didn't just meet our expectations – they redefined what we thought was possible. Truly exceptional work.",
    rating: 5,
    location: "Austin",
  },
  {
    id: 11,
    name: "Robert Wilson",
    role: "Head of Design",
    company: "PixelPerfect",
    avatar: "https://i.pravatar.cc/150?img=14",
    content:
      "The creativity and technical prowess shown in our project was remarkable. Every detail was carefully considered.",
    rating: 5,
    location: "Toronto",
  },
  {
    id: 12,
    name: "Amanda Lee",
    role: "CMO",
    company: "Growth Marketing",
    avatar: "https://i.pravatar.cc/150?img=24",
    content:
      "Our conversion rates doubled after implementing their solutions. The strategic insight was invaluable.",
    rating: 5,
    location: "Singapore",
  },
  {
    id: 13,
    name: "Christopher White",
    role: "Tech Lead",
    company: "CodeCraft",
    avatar: "https://i.pravatar.cc/150?img=15",
    content:
      "Impeccable code quality and architecture. They set a new standard for technical excellence in our industry.",
    rating: 5,
    location: "Seattle",
  },
  {
    id: 14,
    name: "Sarah Martinez",
    role: "UX Director",
    company: "UserFirst",
    avatar: "https://i.pravatar.cc/150?img=25",
    content:
      "User-centric design at its finest. Our user satisfaction scores improved dramatically after the redesign.",
    rating: 5,
    location: "Miami",
  },
  {
    id: 15,
    name: "Daniel Taylor",
    role: "CEO",
    company: "Visionary Labs",
    avatar: "https://i.pravatar.cc/150?img=17",
    content:
      "A partnership that exceeded all expectations. Their vision aligned perfectly with our ambitious goals.",
    rating: 5,
    location: "Dubai",
  },
  {
    id: 16,
    name: "Jennifer Adams",
    role: "Brand Strategist",
    company: "Impact Agency",
    avatar: "https://i.pravatar.cc/150?img=26",
    content:
      "Strategic brilliance combined with creative excellence. Our brand has never been more powerful.",
    rating: 5,
    location: "Amsterdam",
  },
  {
    id: 17,
    name: "Kevin Zhang",
    role: "Product Manager",
    company: "InnoProduct",
    avatar: "https://i.pravatar.cc/150?img=18",
    content:
      "From ideation to launch, every phase was handled with precision and care. Outstanding results.",
    rating: 5,
    location: "Hong Kong",
  },
  {
    id: 18,
    name: "Rachel Green",
    role: "Creative Lead",
    company: "Artistry Digital",
    avatar: "https://i.pravatar.cc/150?img=27",
    content:
      "They brought our creative vision to life in ways we couldn't have imagined. Pure artistic excellence.",
    rating: 5,
    location: "Los Angeles",
  },
  {
    id: 19,
    name: "Anthony Miller",
    role: "VP Engineering",
    company: "TechForward",
    avatar: "https://i.pravatar.cc/150?img=53",
    content:
      "The technical depth and problem-solving ability of this team is exceptional. Highly recommended.",
    rating: 5,
    location: "Boston",
  },
  {
    id: 20,
    name: "Victoria Hughes",
    role: "Founder",
    company: "Elevate Co.",
    avatar: "https://i.pravatar.cc/150?img=28",
    content:
      "They truly understand what it means to elevate a brand. Our transformation has been remarkable.",
    rating: 5,
    location: "Vancouver",
  },
  {
    id: 21,
    name: "Thomas Anderson",
    role: "Digital Director",
    company: "Future Media",
    avatar: "https://i.pravatar.cc/150?img=51",
    content:
      "Cutting-edge solutions delivered with professionalism. They're ahead of the curve in every way.",
    rating: 5,
    location: "Stockholm",
  },
  {
    id: 22,
    name: "Maria Garcia",
    role: "CEO",
    company: "Horizon Ventures",
    avatar: "https://i.pravatar.cc/150?img=29",
    content:
      "A transformative partnership that has propelled our company to new heights. Exceptional in every way.",
    rating: 5,
    location: "Barcelona",
  },
  {
    id: 23,
    name: "Jason Lee",
    role: "Innovation Lead",
    company: "NextWave",
    avatar: "https://i.pravatar.cc/150?img=52",
    content:
      "Innovation meets execution. They consistently deliver solutions that are both creative and practical.",
    rating: 5,
    location: "Tokyo",
  },
  {
    id: 24,
    name: "Laura Bennett",
    role: "Design Director",
    company: "Aesthetic Lab",
    avatar: "https://i.pravatar.cc/150?img=30",
    content:
      "Pure aesthetic excellence. Every design decision was thoughtful and impactful for our brand.",
    rating: 5,
    location: "Milan",
  },
  {
    id: 25,
    name: "Steven Clark",
    role: "COO",
    company: "Streamline Inc",
    avatar: "https://i.pravatar.cc/150?img=54",
    content:
      "They streamlined our processes and elevated our brand simultaneously. Incredible value delivered.",
    rating: 5,
    location: "Denver",
  },
  {
    id: 26,
    name: "Nicole Wright",
    role: "Marketing Director",
    company: "Pulse Marketing",
    avatar: "https://i.pravatar.cc/150?img=31",
    content:
      "Our marketing effectiveness increased threefold. The strategic approach was game-changing.",
    rating: 5,
    location: "Atlanta",
  },
  {
    id: 27,
    name: "Brandon Scott",
    role: "Tech Founder",
    company: "CodeVision",
    avatar: "https://i.pravatar.cc/150?img=55",
    content:
      "Technical excellence at its finest. They solved complex problems with elegant solutions.",
    rating: 5,
    location: "Portland",
  },
  {
    id: 28,
    name: "Ashley King",
    role: "Creative VP",
    company: "Imaginarium",
    avatar: "https://i.pravatar.cc/150?img=32",
    content:
      "Imagination brought to life with precision. Our creative projects have never been better executed.",
    rating: 5,
    location: "Nashville",
  },
  {
    id: 29,
    name: "Ryan Cooper",
    role: "Business Lead",
    company: "Apex Solutions",
    avatar: "https://i.pravatar.cc/150?img=56",
    content:
      "The apex of professional service. Every interaction was smooth and every delivery exceptional.",
    rating: 5,
    location: "Phoenix",
  },
  {
    id: 30,
    name: "Megan Turner",
    role: "UX Lead",
    company: "Experience First",
    avatar: "https://i.pravatar.cc/150?img=33",
    content:
      "User experience transformed. Our users love the new design and engagement has skyrocketed.",
    rating: 5,
    location: "Philadelphia",
  },
  {
    id: 31,
    name: "Patrick Murphy",
    role: "Founder",
    company: "Bold Ventures",
    avatar: "https://i.pravatar.cc/150?img=57",
    content:
      "Bold ideas executed boldly. They weren't afraid to push boundaries and the results speak volumes.",
    rating: 5,
    location: "Dublin",
  },
  {
    id: 32,
    name: "Christina Flores",
    role: "Brand VP",
    company: "Identity Works",
    avatar: "https://i.pravatar.cc/150?img=34",
    content:
      "Our brand identity has never been stronger or more cohesive. Masterful strategic work.",
    rating: 5,
    location: "Mexico City",
  },
  {
    id: 33,
    name: "Gregory Nelson",
    role: "CTO",
    company: "DataDriven",
    avatar: "https://i.pravatar.cc/150?img=58",
    content:
      "Data-driven decisions met creative execution. The balance they achieve is remarkable.",
    rating: 5,
    location: "San Diego",
  },
  {
    id: 34,
    name: "Samantha Reed",
    role: "Marketing CEO",
    company: "Momentum",
    avatar: "https://i.pravatar.cc/150?img=35",
    content:
      "They created momentum for our brand that continues to grow. Exceptional strategic partners.",
    rating: 5,
    location: "Charlotte",
  },
  {
    id: 35,
    name: "Derek Holmes",
    role: "Product VP",
    company: "Innovation Hub",
    avatar: "https://i.pravatar.cc/150?img=59",
    content:
      "Innovation at every turn. They consistently surprise us with creative solutions.",
    rating: 5,
    location: "Minneapolis",
  },
  {
    id: 36,
    name: "Katherine Price",
    role: "Art Director",
    company: "Canvas Creative",
    avatar: "https://i.pravatar.cc/150?img=36",
    content:
      "Every project is a masterpiece. The artistic vision and execution are unparalleled.",
    rating: 5,
    location: "New Orleans",
  },
  {
    id: 37,
    name: "Justin Brooks",
    role: "Startup CEO",
    company: "Launch Pad",
    avatar: "https://i.pravatar.cc/150?img=60",
    content:
      "They helped us launch with impact. Our startup couldn't have asked for better partners.",
    rating: 5,
    location: "Austin",
  },
  {
    id: 38,
    name: "Angela Foster",
    role: "Design Lead",
    company: "Pixel Studio",
    avatar: "https://i.pravatar.cc/150?img=37",
    content:
      "Pixel-perfect execution with strategic thinking. The combination is rare and valuable.",
    rating: 5,
    location: "Detroit",
  },
  {
    id: 39,
    name: "Brian Campbell",
    role: "Operations VP",
    company: "Efficient Corp",
    avatar: "https://i.pravatar.cc/150?img=61",
    content:
      "Efficiency without sacrificing quality. They optimized our operations beautifully.",
    rating: 5,
    location: "Cleveland",
  },
  {
    id: 40,
    name: "Stephanie Ward",
    role: "CEO",
    company: "Vision Forward",
    avatar: "https://i.pravatar.cc/150?img=38",
    content:
      "Visionary thinking with practical execution. They turned our dreams into reality.",
    rating: 5,
    location: "Tampa",
  },
  {
    id: 41,
    name: "Nathan Hayes",
    role: "Tech Director",
    company: "Digital Core",
    avatar: "https://i.pravatar.cc/150?img=62",
    content:
      "The digital transformation was seamless. Our core systems are now future-proof.",
    rating: 5,
    location: "Pittsburgh",
  },
  {
    id: 42,
    name: "Lauren Mitchell",
    role: "Creative CEO",
    company: "Spark Agency",
    avatar: "https://i.pravatar.cc/150?img=39",
    content:
      "They sparked creativity in our entire organization. The ripple effects are still being felt.",
    rating: 5,
    location: "Baltimore",
  },
  {
    id: 43,
    name: "Timothy Ross",
    role: "Business Director",
    company: "Growth Partners",
    avatar: "https://i.pravatar.cc/150?img=63",
    content:
      "Our growth trajectory changed dramatically after partnering. Exceptional strategic guidance.",
    rating: 5,
    location: "Orlando",
  },
  {
    id: 44,
    name: "Monica Collins",
    role: "UX Director",
    company: "Interface Lab",
    avatar: "https://i.pravatar.cc/150?img=40",
    content:
      "Interface perfection achieved. Our users can't stop praising the new experience.",
    rating: 5,
    location: "Sacramento",
  },
  {
    id: 45,
    name: "Charles Evans",
    role: "Innovation VP",
    company: "Pioneer Tech",
    avatar: "https://i.pravatar.cc/150?img=64",
    content:
      "Pioneering solutions that set us apart from competitors. True innovation partners.",
    rating: 5,
    location: "Las Vegas",
  },
  {
    id: 46,
    name: "Diana Morgan",
    role: "Brand CEO",
    company: "Legacy Brand",
    avatar: "https://i.pravatar.cc/150?img=41",
    content:
      "They helped us build a legacy brand that will stand the test of time. Invaluable work.",
    rating: 5,
    location: "Kansas City",
  },
  {
    id: 47,
    name: "Edward Barnes",
    role: "CFO",
    company: "Value Metrics",
    avatar: "https://i.pravatar.cc/150?img=65",
    content:
      "The ROI exceeded all projections. Every dollar invested returned manifold.",
    rating: 5,
    location: "St. Louis",
  },
  {
    id: 48,
    name: "Rebecca Stone",
    role: "Creative Director",
    company: "Artisan Digital",
    avatar: "https://i.pravatar.cc/150?img=42",
    content:
      "Artisan craftsmanship in the digital age. Every detail was meticulously considered.",
    rating: 5,
    location: "Indianapolis",
  },
  {
    id: 49,
    name: "Frank Peterson",
    role: "Founder",
    company: "Zenith Solutions",
    avatar: "https://i.pravatar.cc/150?img=66",
    content:
      "We reached the zenith of our industry with their help. Transformative partnership.",
    rating: 5,
    location: "Columbus",
  },
  {
    id: 50,
    name: "Grace Hamilton",
    role: "CEO",
    company: "Harmony Brands",
    avatar: "https://i.pravatar.cc/150?img=43",
    content:
      "Perfect harmony between strategy and execution. Our brand sings like never before.",
    rating: 5,
    location: "San Jose",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. VOICE MOSAIC — Bento grid
───────────────────────────────────────────────────────────────────────────── */
const MOSAIC_COLORS = [
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
];

const MOSAIC_PICKS = [
  testimonials[2],
  testimonials[5],
  testimonials[8],
  testimonials[11],
  testimonials[14],
  testimonials[17],
  testimonials[20],
  testimonials[23],
  testimonials[26],
];

const VoiceMosaic: React.FC = () => (
  <section className="tp-mosaic">
    <div className="tp-mosaic__header">
      <span className="tp-mosaic__kicker">Real Voices</span>
      <h2 className="tp-mosaic__title">
        Stories That <em>Define</em> Us
      </h2>
    </div>

    <div className="tp-mosaic__grid">
      {MOSAIC_PICKS.map((item, i) => (
        <article
          key={item.id}
          className={`tp-mosaic__card tp-mosaic__card--${i + 1}`}
          style={{ "--mc": MOSAIC_COLORS[i] } as React.CSSProperties}
        >
          <div className="tp-mosaic__card-glow" />
          <div className="tp-mosaic__card-header">
            <img src={item.avatar} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.role}</p>
            </div>
            <div className="tp-mosaic__card-rating">★ 5.0</div>
          </div>
          <blockquote>"{item.content}"</blockquote>
          <div className="tp-mosaic__card-tag">{item.company}</div>
        </article>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   5. TICKER WALL — 3-column infinite auto-scroll
───────────────────────────────────────────────────────────────────────────── */
const TICKER_COLORS = [
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
  "var(--rg-gold)",
];

interface TickerColProps {
  items: Testimonial[];
  speed: number;
  reversed?: boolean;
}

const TickerCol: React.FC<TickerColProps> = ({ items, speed, reversed }) => (
  <div
    className={`tp-ticker__col${reversed ? " tp-ticker__col--rev" : ""}`}
    style={{ "--ts": `${speed}s` } as React.CSSProperties}
  >
    <div className="tp-ticker__inner">
      {[...items, ...items].map((item, i) => (
        <article
          key={`${item.id}-${i}`}
          className="tp-ticker__card"
          style={
            {
              "--tc": TICKER_COLORS[i % TICKER_COLORS.length],
            } as React.CSSProperties
          }
        >
          <div className="tp-ticker__card-accent" />
          <div className="tp-ticker__card-head">
            <img src={item.avatar} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>
                {item.role} · {item.company}
              </p>
            </div>
          </div>
          <p className="tp-ticker__card-text">"{item.content}"</p>
        </article>
      ))}
    </div>
  </div>
);

const TickerWall: React.FC = () => (
  <section className="tp-ticker">
    <div className="tp-ticker__header">
      <span className="tp-ticker__kicker">All Reviews</span>
      <h2 className="tp-ticker__title">
        The Full <em>Chorus</em>
      </h2>
    </div>

    <div className="tp-ticker__container">
      <div className="tp-ticker__wall">
        <TickerCol items={testimonials.slice(15, 24)} speed={32} />
        <TickerCol items={testimonials.slice(24, 33)} speed={44} reversed />
        <TickerCol items={testimonials.slice(33, 42)} speed={38} />
      </div>
      <div className="tp-ticker__fade-top" />
      <div className="tp-ticker__fade-bottom" />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   6. FINAL CTA
───────────────────────────────────────────────────────────────────────────── */
const FinalCTA: React.FC = () => (
  <section className="tp-cta">
    <div className="tp-cta__blobs" aria-hidden="true">
      <div className="tp-cta__blob tp-cta__blob--1" />
      <div className="tp-cta__blob tp-cta__blob--2" />
      <div className="tp-cta__blob tp-cta__blob--3" />
    </div>

    <div className="tp-cta__inner">
      <div className="tp-cta__visual">
        <span className="tp-cta__bigq">"</span>
        <div className="tp-cta__avatar-fan">
          {testimonials.slice(0, 7).map((t, i) => (
            <img
              key={t.id}
              src={t.avatar}
              alt={t.name}
              style={{ "--fi": i } as React.CSSProperties}
            />
          ))}
        </div>
        <p className="tp-cta__total">{testimonials.length}+ verified reviews</p>
      </div>

      <div className="tp-cta__text">
        <span className="tp-cta__kicker">Join the Legacy</span>
        <h2 className="tp-cta__heading">
          Write Your
          <br />
          <em>Success Story</em>
        </h2>
        <p className="tp-cta__body">
          Join hundreds of satisfied clients who transformed their vision into
          extraordinary reality.
        </p>
        <div className="tp-cta__actions">
          <a href="#" className="tp-cta__btn tp-cta__btn--solid">
            Start Your Journey
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#" className="tp-cta__btn tp-cta__btn--ghost">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
const TestimonialPage: React.FC<{ ready?: boolean }> = ({ ready = false }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const guards = [
      "clipRevealInit", "clipRevealRtlInit", "clipRevealTopInit",
      "clipRevealLeftInit", "clipRevealRightInit", "wordRevealInit",
      "wordWriteInit", "clipSmoothInit", "clipSmoothDownInit", "charRevealInit",
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
  <main className="testimonial-page">
    <HeroSection
      ready={ready}
      showVideo={false}
      showCta={false}
      bgImage="images/hero1.jpg"
      titleLine1={
        <>
          Client <span className="rg-gold">Stories</span>
        </>
      }
      titleLine2={
        <>
          Words That <span className="rg-amber">Inspire</span>
        </>
      }
      subtitle={`${testimonials.length} verified experiences — refined, discreet service from start to finish.`}
      footer={
        <div className="t-hero__stats-slab">
          <div className="t-hero__stats">
            <div className="t-hero__stat">
              <span className="t-hero__stat-value">4.9</span>
              <span className="t-hero__stat-label">Avg. Rating</span>
            </div>
            <div className="t-hero__stat-divider" />
            <div className="t-hero__stat">
              <span className="t-hero__stat-value">100%</span>
              <span className="t-hero__stat-label">Client Satisfaction</span>
            </div>
            <div className="t-hero__stat-divider" />
            <div className="t-hero__stat">
              <span className="t-hero__stat-value">{testimonials.length}</span>
              <span className="t-hero__stat-label">Total Reviews</span>
            </div>
          </div>
        </div>
      }
    />
    <div className="t-section-heading">
      <header className="t-section-heading__header">
        <span className="t-section-heading__eyebrow" data-gsap="fade-up">
          Client Voices
        </span>
        <h2
          className="t-section-heading__title"
          data-gsap="char-reveal"
          data-gsap-start="top 85%"
        >
          What Our Clients <em>Say</em>
        </h2>
        <p
          className="t-section-heading__subtitle"
          data-gsap="fade-up"
          data-gsap-delay="0.2"
        >
          Real experiences from real clients — every word earned, never
          scripted.
        </p>
      </header>
    </div>
    <RGPSplitSlider />
    <VoiceMosaic />
    <TickerWall />

    <FinalCTA />
  </main>
  </div>
  );
};

export default TestimonialPage;
