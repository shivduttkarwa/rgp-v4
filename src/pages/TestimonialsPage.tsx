import React, { useState, useRef, useEffect } from "react";
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

// Hero Section
const HeroSection: React.FC = () => {
  const featured = testimonials[0];

  return (
    <section className="t-hero">
      <div className="t-hero__bg">
        <div className="t-hero__grid" />
        <div className="t-hero__glow" />
      </div>

      <div className="t-hero__content">
        <div className="t-hero__label">
          <span className="t-hero__label-line" />
          <span>Client Stories</span>
          <span className="t-hero__label-line" />
        </div>

        <h1 className="t-hero__title">
          Words That
          <br />
          <span className="t-hero__title-accent">Inspire Us</span>
        </h1>

        <p className="t-hero__subtitle">
          {testimonials.length} stories from clients who transformed their
          vision into reality
        </p>

        <div className="t-hero__stats">
          <div className="t-hero__stat">
            <span className="t-hero__stat-value">5.0</span>
            <span className="t-hero__stat-label">Avg. Rating</span>
          </div>
          <div className="t-hero__stat-divider" />
          <div className="t-hero__stat">
            <span className="t-hero__stat-value">100%</span>
            <span className="t-hero__stat-label">Satisfaction</span>
          </div>
          <div className="t-hero__stat-divider" />
          <div className="t-hero__stat">
            <span className="t-hero__stat-value">50+</span>
            <span className="t-hero__stat-label">Reviews</span>
          </div>
        </div>
      </div>

      <div className="t-hero__scroll">
        <div className="t-hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

// Featured Quote Section
const FeaturedQuote: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const featured = [testimonials[1], testimonials[4], testimonials[7]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="t-featured">
      <div className="t-featured__container">
        <div className="t-featured__quote-wrapper">
          {featured.map((item, index) => (
            <blockquote
              key={item.id}
              className={`t-featured__quote ${index === current ? "active" : ""}`}
            >
              <span className="t-featured__quote-mark">"</span>
              <p>{item.content}</p>
            </blockquote>
          ))}
        </div>

        <div className="t-featured__author">
          <div className="t-featured__avatars">
            {featured.map((item, index) => (
              <button
                key={item.id}
                className={`t-featured__avatar-btn ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              >
                <img src={item.avatar} alt={item.name} />
                <div className="t-featured__avatar-ring" />
              </button>
            ))}
          </div>

          <div className="t-featured__author-info">
            <h3>{featured[current].name}</h3>
            <p>
              {featured[current].role}, {featured[current].company}
            </p>
          </div>
        </div>

        <div className="t-featured__progress">
          {featured.map((_, index) => (
            <div
              key={index}
              className={`t-featured__progress-bar ${index === current ? "active" : ""}`}
            >
              <div className="t-featured__progress-fill" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Avatar Wall Section
const AvatarWall: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  const selected = testimonials.find((t) => t.id === selectedId);

  const handleClose = () => setSelectedId(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="t-wall">
      <div className="t-wall__header">
        <span className="t-wall__tag">The People</span>
        <h2 className="t-wall__title">Faces Behind The Words</h2>
        <p className="t-wall__subtitle">
          Click on any avatar to read their story
        </p>
      </div>

      <div className="t-wall__grid" ref={wallRef}>
        {testimonials.map((item, index) => (
          <button
            key={item.id}
            className={`t-wall__item ${selectedId === item.id ? "selected" : ""} ${hoveredId === item.id ? "hovered" : ""}`}
            onClick={() => setSelectedId(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ "--delay": `${index * 0.02}s` } as React.CSSProperties}
          >
            <img src={item.avatar} alt={item.name} />
            <div className="t-wall__item-overlay">
              <span className="t-wall__item-name">
                {item.name.split(" ")[0]}
              </span>
            </div>
            <div className="t-wall__item-glow" />
          </button>
        ))}
      </div>

      {/* Modal */}
      <div
        className={`t-modal ${selected ? "open" : ""}`}
        onClick={handleClose}
      >
        <div className="t-modal__content" onClick={(e) => e.stopPropagation()}>
          {selected && (
            <>
              <button className="t-modal__close" onClick={handleClose}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="t-modal__header">
                <img
                  src={selected.avatar}
                  alt={selected.name}
                  className="t-modal__avatar"
                />
                <div className="t-modal__info">
                  <h3>{selected.name}</h3>
                  <p>{selected.role}</p>
                  <span>
                    {selected.company} · {selected.location}
                  </span>
                </div>
              </div>

              <div className="t-modal__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="var(--rg-gold)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="t-modal__quote">
                "{selected.content}"
              </blockquote>

              <div className="t-modal__footer">
                <span className="t-modal__verified">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified Review
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Horizontal Scroll Section
const HorizontalScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="t-horizontal">
      <div className="t-horizontal__header">
        <div className="t-horizontal__header-left">
          <span className="t-horizontal__tag">Latest Reviews</span>
          <h2 className="t-horizontal__title">Recent Stories</h2>
        </div>

        <div className="t-horizontal__controls">
          <button className="t-horizontal__btn" onClick={() => scroll("left")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="t-horizontal__btn" onClick={() => scroll("right")}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="t-horizontal__track"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {testimonials.slice(0, 15).map((item, index) => (
          <article key={item.id} className="t-card">
            <div className="t-card__top">
              <div className="t-card__number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="t-card__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="var(--rg-gold)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            <blockquote className="t-card__quote">"{item.content}"</blockquote>

            <div className="t-card__author">
              <img src={item.avatar} alt={item.name} />
              <div className="t-card__author-info">
                <h4>{item.name}</h4>
                <p>
                  {item.role}, {item.company}
                </p>
              </div>
            </div>

            <div className="t-card__location">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {item.location}
            </div>

            <div className="t-card__line" />
          </article>
        ))}
      </div>

      <div className="t-horizontal__progress">
        <div
          className="t-horizontal__progress-bar"
          style={{ transform: `scaleX(${scrollProgress || 0.1})` }}
        />
      </div>
    </section>
  );
};

// Masonry Grid Section
const MasonrySection: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const remaining = testimonials.slice(15);

  return (
    <section className="t-masonry">
      <div className="t-masonry__header">
        <span className="t-masonry__tag">All Reviews</span>
        <h2 className="t-masonry__title">More Success Stories</h2>
      </div>

      <div className="t-masonry__grid">
        {remaining.slice(0, visibleCount).map((item, index) => (
          <article
            key={item.id}
            className="t-masonry__item"
            style={{ "--index": index } as React.CSSProperties}
          >
            <div className="t-masonry__item-header">
              <img src={item.avatar} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>{item.company}</p>
              </div>
              <div className="t-masonry__item-stars">
                <svg viewBox="0 0 24 24" fill="var(--rg-gold)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>5.0</span>
              </div>
            </div>
            <p className="t-masonry__item-text">"{item.content}"</p>
          </article>
        ))}
      </div>

      {visibleCount < remaining.length && (
        <button
          className="t-masonry__load"
          onClick={() =>
            setVisibleCount((prev) => Math.min(prev + 8, remaining.length))
          }
        >
          <span>Load More</span>
          <span className="t-masonry__load-count">
            {remaining.length - visibleCount} remaining
          </span>
        </button>
      )}
    </section>
  );
};

// CTA Section
const CTASection: React.FC = () => {
  return (
    <section className="t-cta">
      <div className="t-cta__bg">
        <div className="t-cta__orb t-cta__orb--1" />
        <div className="t-cta__orb t-cta__orb--2" />
      </div>

      <div className="t-cta__content">
        <h2 className="t-cta__title">
          Ready to Write
          <br />
          <span>Your Success Story?</span>
        </h2>

        <p className="t-cta__text">
          Join hundreds of satisfied clients who have transformed their vision
          into reality.
        </p>

        <div className="t-cta__avatars">
          {testimonials.slice(0, 6).map((item) => (
            <img key={item.id} src={item.avatar} alt={item.name} />
          ))}
          <span className="t-cta__avatars-count">
            +{testimonials.length - 6}
          </span>
        </div>

        <div className="t-cta__buttons">
          <a href="#" className="t-cta__btn t-cta__btn--primary">
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
          <a href="#" className="t-cta__btn t-cta__btn--secondary">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
const TestimonialPage: React.FC = () => {
  return (
    <main className="testimonial-page">
      <HeroSection />
      <FeaturedQuote />
      <AvatarWall />
      <HorizontalScroll />
      <MasonrySection />
      <CTASection />
    </main>
  );
};

export default TestimonialPage;
