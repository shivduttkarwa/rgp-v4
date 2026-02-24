import React, { useState, useEffect, useRef } from "react";
import "./TestimonialPage.css";

// Types
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  category: string;
  featured?: boolean;
  date: string;
}

// Sample testimonials data (50 reviews)
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexander Chen",
    role: "CEO",
    company: "TechVentures Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "Absolutely transformative experience. The attention to detail and level of craftsmanship exceeded all expectations. This is what premium service looks like.",
    rating: 5,
    category: "service",
    featured: true,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Sophia Williams",
    role: "Creative Director",
    company: "Design Studio Co.",
    avatar: "https://i.pravatar.cc/150?img=2",
    content:
      "Working with this team has been an incredible journey. Their vision aligned perfectly with ours, and the results speak for themselves.",
    rating: 5,
    category: "design",
    featured: true,
    date: "2024-01-12",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Founder",
    company: "StartUp Labs",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "From concept to execution, everything was handled with utmost professionalism. Highly recommend to anyone seeking excellence.",
    rating: 5,
    category: "quality",
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Marketing VP",
    company: "Global Brands",
    avatar: "https://i.pravatar.cc/150?img=4",
    content:
      "The ROI we've seen since partnering has been phenomenal. Best decision we made this year.",
    rating: 5,
    category: "service",
    date: "2024-01-08",
  },
  {
    id: 5,
    name: "James Mitchell",
    role: "CTO",
    company: "InnovateTech",
    avatar: "https://i.pravatar.cc/150?img=5",
    content:
      "Technical excellence meets creative brilliance. They understood our complex requirements and delivered beyond expectations.",
    rating: 5,
    category: "quality",
    featured: true,
    date: "2024-01-05",
  },
  {
    id: 6,
    name: "Isabella Foster",
    role: "Brand Manager",
    company: "Luxe Collective",
    avatar: "https://i.pravatar.cc/150?img=6",
    content:
      "Our brand identity has never been stronger. The strategic approach combined with stunning execution was exactly what we needed.",
    rating: 5,
    category: "design",
    date: "2024-01-03",
  },
  {
    id: 7,
    name: "David Park",
    role: "Product Lead",
    company: "NextGen Solutions",
    avatar: "https://i.pravatar.cc/150?img=7",
    content:
      "Seamless collaboration from start to finish. The team's expertise and dedication are unmatched in the industry.",
    rating: 5,
    category: "service",
    date: "2023-12-28",
  },
  {
    id: 8,
    name: "Olivia Thompson",
    role: "Art Director",
    company: "Creative Minds Agency",
    avatar: "https://i.pravatar.cc/150?img=8",
    content:
      "As a creative professional myself, I'm incredibly impressed by the level of artistry and innovation displayed in every project.",
    rating: 5,
    category: "design",
    date: "2023-12-25",
  },
  {
    id: 9,
    name: "Michael Brown",
    role: "Operations Director",
    company: "Enterprise Corp",
    avatar: "https://i.pravatar.cc/150?img=9",
    content:
      "Efficient, professional, and results-driven. They transformed our operations and elevated our brand presence significantly.",
    rating: 5,
    category: "quality",
    date: "2023-12-22",
  },
  {
    id: 10,
    name: "Emma Davis",
    role: "Startup Founder",
    company: "Bloom Ventures",
    avatar: "https://i.pravatar.cc/150?img=10",
    content:
      "They didn't just meet our expectations – they redefined what we thought was possible. Truly exceptional work.",
    rating: 5,
    category: "service",
    date: "2023-12-20",
  },
  // Adding more testimonials to reach ~50
  {
    id: 11,
    name: "Robert Wilson",
    role: "Head of Design",
    company: "PixelPerfect",
    avatar: "https://i.pravatar.cc/150?img=11",
    content:
      "The creativity and technical prowess shown in our project was remarkable. Every detail was carefully considered.",
    rating: 5,
    category: "design",
    date: "2023-12-18",
  },
  {
    id: 12,
    name: "Amanda Lee",
    role: "CMO",
    company: "Growth Marketing",
    avatar: "https://i.pravatar.cc/150?img=12",
    content:
      "Our conversion rates doubled after implementing their solutions. The strategic insight was invaluable.",
    rating: 5,
    category: "quality",
    date: "2023-12-15",
  },
  {
    id: 13,
    name: "Christopher White",
    role: "Tech Lead",
    company: "CodeCraft",
    avatar: "https://i.pravatar.cc/150?img=13",
    content:
      "Impeccable code quality and architecture. They set a new standard for technical excellence.",
    rating: 5,
    category: "quality",
    date: "2023-12-12",
  },
  {
    id: 14,
    name: "Sarah Martinez",
    role: "UX Director",
    company: "UserFirst Design",
    avatar: "https://i.pravatar.cc/150?img=14",
    content:
      "User-centric design at its finest. Our user satisfaction scores improved dramatically.",
    rating: 5,
    category: "design",
    date: "2023-12-10",
  },
  {
    id: 15,
    name: "Daniel Taylor",
    role: "CEO",
    company: "Visionary Labs",
    avatar: "https://i.pravatar.cc/150?img=15",
    content:
      "A partnership that exceeded all expectations. Their vision aligned perfectly with our ambitious goals.",
    rating: 5,
    category: "service",
    date: "2023-12-08",
  },
  {
    id: 16,
    name: "Jennifer Adams",
    role: "Brand Strategist",
    company: "Impact Agency",
    avatar: "https://i.pravatar.cc/150?img=16",
    content:
      "Strategic brilliance combined with creative excellence. Our brand has never been more powerful.",
    rating: 5,
    category: "design",
    date: "2023-12-05",
  },
  {
    id: 17,
    name: "Kevin Zhang",
    role: "Product Manager",
    company: "InnoProduct",
    avatar: "https://i.pravatar.cc/150?img=17",
    content:
      "From ideation to launch, every phase was handled with precision and care. Outstanding results.",
    rating: 5,
    category: "service",
    date: "2023-12-03",
  },
  {
    id: 18,
    name: "Rachel Green",
    role: "Creative Lead",
    company: "Artistry Digital",
    avatar: "https://i.pravatar.cc/150?img=18",
    content:
      "They brought our creative vision to life in ways we couldn't have imagined. Pure artistic excellence.",
    rating: 5,
    category: "design",
    date: "2023-12-01",
  },
  {
    id: 19,
    name: "Anthony Miller",
    role: "VP Engineering",
    company: "TechForward",
    avatar: "https://i.pravatar.cc/150?img=19",
    content:
      "The technical depth and problem-solving ability of this team is exceptional. Highly recommended.",
    rating: 5,
    category: "quality",
    date: "2023-11-28",
  },
  {
    id: 20,
    name: "Victoria Hughes",
    role: "Founder",
    company: "Elevate Co.",
    avatar: "https://i.pravatar.cc/150?img=20",
    content:
      "They truly understand what it means to elevate a brand. Our transformation has been remarkable.",
    rating: 5,
    category: "service",
    featured: true,
    date: "2023-11-25",
  },
  {
    id: 21,
    name: "Thomas Anderson",
    role: "Digital Director",
    company: "Future Media",
    avatar: "https://i.pravatar.cc/150?img=21",
    content:
      "Cutting-edge solutions delivered with professionalism. They're ahead of the curve in every way.",
    rating: 5,
    category: "quality",
    date: "2023-11-22",
  },
  {
    id: 22,
    name: "Maria Garcia",
    role: "CEO",
    company: "Horizon Ventures",
    avatar: "https://i.pravatar.cc/150?img=22",
    content:
      "A transformative partnership that has propelled our company to new heights. Exceptional in every way.",
    rating: 5,
    category: "service",
    date: "2023-11-20",
  },
  {
    id: 23,
    name: "Jason Lee",
    role: "Innovation Lead",
    company: "NextWave Tech",
    avatar: "https://i.pravatar.cc/150?img=23",
    content:
      "Innovation meets execution. They consistently deliver solutions that are both creative and practical.",
    rating: 5,
    category: "quality",
    date: "2023-11-18",
  },
  {
    id: 24,
    name: "Laura Bennett",
    role: "Design Director",
    company: "Aesthetic Lab",
    avatar: "https://i.pravatar.cc/150?img=24",
    content:
      "Pure aesthetic excellence. Every design decision was thoughtful and impactful.",
    rating: 5,
    category: "design",
    date: "2023-11-15",
  },
  {
    id: 25,
    name: "Steven Clark",
    role: "COO",
    company: "Streamline Inc.",
    avatar: "https://i.pravatar.cc/150?img=25",
    content:
      "They streamlined our processes and elevated our brand simultaneously. Incredible value delivered.",
    rating: 5,
    category: "service",
    date: "2023-11-12",
  },
  {
    id: 26,
    name: "Nicole Wright",
    role: "Marketing Director",
    company: "Pulse Marketing",
    avatar: "https://i.pravatar.cc/150?img=26",
    content:
      "Our marketing effectiveness increased threefold. The strategic approach was game-changing.",
    rating: 5,
    category: "quality",
    date: "2023-11-10",
  },
  {
    id: 27,
    name: "Brandon Scott",
    role: "Tech Founder",
    company: "CodeVision",
    avatar: "https://i.pravatar.cc/150?img=27",
    content:
      "Technical excellence at its finest. They solved complex problems with elegant solutions.",
    rating: 5,
    category: "quality",
    date: "2023-11-08",
  },
  {
    id: 28,
    name: "Ashley King",
    role: "Creative VP",
    company: "Imaginarium",
    avatar: "https://i.pravatar.cc/150?img=28",
    content:
      "Imagination brought to life with precision. Our creative projects have never been better executed.",
    rating: 5,
    category: "design",
    date: "2023-11-05",
  },
  {
    id: 29,
    name: "Ryan Cooper",
    role: "Business Lead",
    company: "Apex Solutions",
    avatar: "https://i.pravatar.cc/150?img=29",
    content:
      "The apex of professional service. Every interaction was smooth and every delivery exceptional.",
    rating: 5,
    category: "service",
    date: "2023-11-03",
  },
  {
    id: 30,
    name: "Megan Turner",
    role: "UX Lead",
    company: "Experience First",
    avatar: "https://i.pravatar.cc/150?img=30",
    content:
      "User experience transformed. Our users love the new design and engagement has skyrocketed.",
    rating: 5,
    category: "design",
    date: "2023-11-01",
  },
  {
    id: 31,
    name: "Patrick Murphy",
    role: "Founder",
    company: "Bold Ventures",
    avatar: "https://i.pravatar.cc/150?img=31",
    content:
      "Bold ideas executed boldly. They weren't afraid to push boundaries and the results speak volumes.",
    rating: 5,
    category: "quality",
    date: "2023-10-28",
  },
  {
    id: 32,
    name: "Christina Flores",
    role: "Brand VP",
    company: "Identity Works",
    avatar: "https://i.pravatar.cc/150?img=32",
    content:
      "Our brand identity has never been stronger or more cohesive. Masterful strategic work.",
    rating: 5,
    category: "design",
    date: "2023-10-25",
  },
  {
    id: 33,
    name: "Gregory Nelson",
    role: "CTO",
    company: "DataDriven Co.",
    avatar: "https://i.pravatar.cc/150?img=33",
    content:
      "Data-driven decisions met creative execution. The balance they achieve is remarkable.",
    rating: 5,
    category: "quality",
    date: "2023-10-22",
  },
  {
    id: 34,
    name: "Samantha Reed",
    role: "Marketing CEO",
    company: "Momentum Media",
    avatar: "https://i.pravatar.cc/150?img=34",
    content:
      "They created momentum for our brand that continues to grow. Exceptional strategic partners.",
    rating: 5,
    category: "service",
    date: "2023-10-20",
  },
  {
    id: 35,
    name: "Derek Holmes",
    role: "Product VP",
    company: "Innovation Hub",
    avatar: "https://i.pravatar.cc/150?img=35",
    content:
      "Innovation at every turn. They consistently surprise us with creative solutions.",
    rating: 5,
    category: "quality",
    date: "2023-10-18",
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
    category: "design",
    date: "2023-10-15",
  },
  {
    id: 37,
    name: "Justin Brooks",
    role: "Startup CEO",
    company: "Launch Pad",
    avatar: "https://i.pravatar.cc/150?img=37",
    content:
      "They helped us launch with impact. Our startup couldn't have asked for better partners.",
    rating: 5,
    category: "service",
    date: "2023-10-12",
  },
  {
    id: 38,
    name: "Angela Foster",
    role: "Design Lead",
    company: "Pixel Studio",
    avatar: "https://i.pravatar.cc/150?img=38",
    content:
      "Pixel-perfect execution with strategic thinking. The combination is rare and valuable.",
    rating: 5,
    category: "design",
    date: "2023-10-10",
  },
  {
    id: 39,
    name: "Brian Campbell",
    role: "Operations VP",
    company: "Efficient Corp",
    avatar: "https://i.pravatar.cc/150?img=39",
    content:
      "Efficiency without sacrificing quality. They optimized our operations beautifully.",
    rating: 5,
    category: "quality",
    date: "2023-10-08",
  },
  {
    id: 40,
    name: "Stephanie Ward",
    role: "CEO",
    company: "Vision Forward",
    avatar: "https://i.pravatar.cc/150?img=40",
    content:
      "Visionary thinking with practical execution. They turned our dreams into reality.",
    rating: 5,
    category: "service",
    featured: true,
    date: "2023-10-05",
  },
  {
    id: 41,
    name: "Nathan Hayes",
    role: "Tech Director",
    company: "Digital Core",
    avatar: "https://i.pravatar.cc/150?img=41",
    content:
      "The digital transformation was seamless. Our core systems are now future-proof.",
    rating: 5,
    category: "quality",
    date: "2023-10-03",
  },
  {
    id: 42,
    name: "Lauren Mitchell",
    role: "Creative CEO",
    company: "Spark Agency",
    avatar: "https://i.pravatar.cc/150?img=42",
    content:
      "They sparked creativity in our entire organization. The ripple effects are still being felt.",
    rating: 5,
    category: "design",
    date: "2023-10-01",
  },
  {
    id: 43,
    name: "Timothy Ross",
    role: "Business Director",
    company: "Growth Partners",
    avatar: "https://i.pravatar.cc/150?img=43",
    content:
      "Our growth trajectory changed dramatically after partnering. Exceptional strategic guidance.",
    rating: 5,
    category: "service",
    date: "2023-09-28",
  },
  {
    id: 44,
    name: "Monica Collins",
    role: "UX Director",
    company: "Interface Lab",
    avatar: "https://i.pravatar.cc/150?img=44",
    content:
      "Interface perfection achieved. Our users can't stop praising the new experience.",
    rating: 5,
    category: "design",
    date: "2023-09-25",
  },
  {
    id: 45,
    name: "Charles Evans",
    role: "Innovation VP",
    company: "Pioneer Tech",
    avatar: "https://i.pravatar.cc/150?img=45",
    content:
      "Pioneering solutions that set us apart from competitors. True innovation partners.",
    rating: 5,
    category: "quality",
    date: "2023-09-22",
  },
  {
    id: 46,
    name: "Diana Morgan",
    role: "Brand CEO",
    company: "Legacy Brand",
    avatar: "https://i.pravatar.cc/150?img=46",
    content:
      "They helped us build a legacy brand that will stand the test of time. Invaluable work.",
    rating: 5,
    category: "design",
    date: "2023-09-20",
  },
  {
    id: 47,
    name: "Edward Barnes",
    role: "CFO",
    company: "Value Metrics",
    avatar: "https://i.pravatar.cc/150?img=47",
    content:
      "The ROI exceeded all projections. Every dollar invested returned manifold.",
    rating: 5,
    category: "service",
    date: "2023-09-18",
  },
  {
    id: 48,
    name: "Rebecca Stone",
    role: "Creative Director",
    company: "Artisan Digital",
    avatar: "https://i.pravatar.cc/150?img=48",
    content:
      "Artisan craftsmanship in the digital age. Every detail was meticulously considered.",
    rating: 5,
    category: "design",
    date: "2023-09-15",
  },
  {
    id: 49,
    name: "Frank Peterson",
    role: "Founder",
    company: "Zenith Solutions",
    avatar: "https://i.pravatar.cc/150?img=49",
    content:
      "We reached the zenith of our industry with their help. Transformative partnership.",
    rating: 5,
    category: "quality",
    date: "2023-09-12",
  },
  {
    id: 50,
    name: "Grace Hamilton",
    role: "CEO",
    company: "Harmony Brands",
    avatar: "https://i.pravatar.cc/150?img=50",
    content:
      "Perfect harmony between strategy and execution. Our brand sings like never before.",
    rating: 5,
    category: "service",
    featured: true,
    date: "2023-09-10",
  },
];

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={index < rating ? "var(--rg-gold)" : "transparent"}
            stroke={index < rating ? "var(--rg-gold)" : "var(--rg-text-light)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  duration?: number;
}> = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

// Single Testimonial Card Component
const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  variant?: "default" | "featured" | "compact" | "marquee";
  index?: number;
}> = ({ testimonial, variant = "default", index = 0 }) => {
  return (
    <article
      className={`testimonial-card testimonial-card--${variant}`}
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <div className="testimonial-card__glow" />
      <div className="testimonial-card__content">
        <div className="testimonial-card__quote-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21C5.33333 17.6667 6.5 14.6667 6.5 12C6.5 9.33333 5.33333 7.33333 3 6V3C7.66667 4 10.3333 6.33333 11 10C11.6667 13.6667 10.3333 17.6667 7 22L3 21ZM14 21C16.3333 17.6667 17.5 14.6667 17.5 12C17.5 9.33333 16.3333 7.33333 14 6V3C18.6667 4 21.3333 6.33333 22 10C22.6667 13.6667 21.3333 17.6667 18 22L14 21Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <p className="testimonial-card__text">{testimonial.content}</p>

        <StarRating rating={testimonial.rating} />

        <div className="testimonial-card__author">
          <div className="testimonial-card__avatar-wrapper">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="testimonial-card__avatar"
            />
            <div className="testimonial-card__avatar-ring" />
          </div>
          <div className="testimonial-card__author-info">
            <h4 className="testimonial-card__name">{testimonial.name}</h4>
            <p className="testimonial-card__role">
              {testimonial.role} <span className="testimonial-card__at">@</span>{" "}
              {testimonial.company}
            </p>
          </div>
        </div>
      </div>

      {variant === "featured" && (
        <div className="testimonial-card__badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
          Featured
        </div>
      )}
    </article>
  );
};

// Marquee Component
const Marquee: React.FC<{
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}> = ({ items, direction = "left", speed = 30 }) => {
  return (
    <div className={`marquee marquee--${direction}`}>
      <div
        className="marquee__track"
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            variant="marquee"
          />
        ))}
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton: React.FC<{
  label: string;
  value: string;
  active: boolean;
  count: number;
  onClick: () => void;
}> = ({ label, value, active, count, onClick }) => {
  return (
    <button
      className={`filter-btn ${active ? "filter-btn--active" : ""}`}
      onClick={onClick}
    >
      <span className="filter-btn__label">{label}</span>
      <span className="filter-btn__count">{count}</span>
    </button>
  );
};

// Main Component
const TestimonialPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { label: "All Reviews", value: "all" },
    { label: "Service", value: "service" },
    { label: "Design", value: "design" },
    { label: "Quality", value: "quality" },
  ];

  const getCategoryCount = (category: string) => {
    if (category === "all") return testimonials.length;
    return testimonials.filter((t) => t.category === category).length;
  };

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeFilter);

  const featuredTestimonials = testimonials.filter((t) => t.featured);

  const marqueeRow1 = testimonials.slice(0, 10);
  const marqueeRow2 = testimonials.slice(10, 20);
  const marqueeRow3 = testimonials.slice(20, 30);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + 8, filteredTestimonials.length),
      );
      setIsLoading(false);
    }, 500);
  };

  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <div className="testimonial-page">
      {/* Ambient Background */}
      <div className="testimonial-page__ambient">
        <div className="ambient-orb ambient-orb--1" />
        <div className="ambient-orb ambient-orb--2" />
        <div className="ambient-orb ambient-orb--3" />
      </div>

      {/* Hero Section */}
      <section className="testimonial-hero">
        <div className="testimonial-hero__container">
          <div className="testimonial-hero__badge">
            <span className="testimonial-hero__badge-dot" />
            Trusted by Industry Leaders
          </div>

          <h1 className="testimonial-hero__title">
            What Our <span className="text-gradient">Clients</span> Say
          </h1>

          <p className="testimonial-hero__subtitle">
            Don't just take our word for it. Here's what professionals and
            industry leaders have to say about their experience working with us.
          </p>

          {/* Stats Grid */}
          <div className="testimonial-hero__stats">
            <div className="stat-card">
              <div className="stat-card__icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-card__value">
                <AnimatedCounter end={testimonials.length} suffix="+" />
              </div>
              <div className="stat-card__label">Happy Clients</div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-card__value">{averageRating}</div>
              <div className="stat-card__label">Average Rating</div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 4L12 14.01L9 11.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-card__value">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="stat-card__label">Satisfaction Rate</div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-card__value">
                <AnimatedCounter end={5} suffix="+" />
              </div>
              <div className="stat-card__label">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="testimonial-hero__floating">
          {featuredTestimonials.slice(0, 3).map((t, i) => (
            <div key={t.id} className={`floating-card floating-card--${i + 1}`}>
              <img src={t.avatar} alt={t.name} />
              <div className="floating-card__info">
                <span className="floating-card__name">{t.name}</span>
                <StarRating rating={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="testimonial-marquee-section">
        <div className="testimonial-marquee-section__header">
          <h2 className="section-title">
            Voices of <span className="text-gradient">Excellence</span>
          </h2>
          <p className="section-subtitle">
            A continuous stream of appreciation from those who experienced our
            dedication to excellence.
          </p>
        </div>

        <div className="marquee-wrapper">
          <Marquee items={marqueeRow1} direction="left" speed={40} />
          <Marquee items={marqueeRow2} direction="right" speed={45} />
          <Marquee items={marqueeRow3} direction="left" speed={35} />
        </div>

        <div className="marquee-fade marquee-fade--left" />
        <div className="marquee-fade marquee-fade--right" />
      </section>

      {/* Featured Testimonials - Bento Grid */}
      <section className="testimonial-featured">
        <div className="testimonial-featured__container">
          <div className="testimonial-featured__header">
            <div className="section-tag">
              <span className="section-tag__icon">★</span>
              Featured Reviews
            </div>
            <h2 className="section-title">
              Highlighted <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="section-subtitle">
              Hand-picked reviews from industry leaders who transformed their
              vision with us.
            </p>
          </div>

          <div className="bento-grid">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant="featured"
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials with Filters */}
      <section className="testimonial-all">
        <div className="testimonial-all__container">
          <div className="testimonial-all__header">
            <h2 className="section-title">
              All <span className="text-gradient">Reviews</span>
            </h2>
            <p className="section-subtitle">
              Explore all {testimonials.length} reviews from our valued clients.
            </p>

            {/* Filter Bar */}
            <div className="filter-bar">
              {categories.map((category) => (
                <FilterButton
                  key={category.value}
                  label={category.label}
                  value={category.value}
                  active={activeFilter === category.value}
                  count={getCategoryCount(category.value)}
                  onClick={() => {
                    setActiveFilter(category.value);
                    setVisibleCount(12);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="testimonial-masonry">
            {filteredTestimonials
              .slice(0, visibleCount)
              .map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredTestimonials.length && (
            <div className="load-more-wrapper">
              <button
                className={`load-more-btn ${isLoading ? "loading" : ""}`}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="load-more-btn__spinner" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Reviews
                    <span className="load-more-btn__count">
                      ({filteredTestimonials.length - visibleCount} remaining)
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="testimonial-cta">
        <div className="testimonial-cta__container">
          <div className="testimonial-cta__content">
            <div className="testimonial-cta__badge">
              Join Our Success Stories
            </div>
            <h2 className="testimonial-cta__title">
              Ready to Create Your Own{" "}
              <span className="text-gradient">Success Story</span>?
            </h2>
            <p className="testimonial-cta__text">
              Join hundreds of satisfied clients who have transformed their
              vision into reality. Let's start your journey to excellence today.
            </p>
            <div className="testimonial-cta__buttons">
              <button className="btn btn--primary">
                Get Started
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="btn btn--secondary">Contact Us</button>
            </div>
          </div>

          {/* Floating Avatars */}
          <div className="testimonial-cta__avatars">
            {testimonials.slice(0, 8).map((t, i) => (
              <div
                key={t.id}
                className="cta-avatar"
                style={{ "--avatar-index": i } as React.CSSProperties}
              >
                <img src={t.avatar} alt={t.name} />
              </div>
            ))}
            <div className="cta-avatar-count">+{testimonials.length - 8}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialPage;
