import {
  Home,
  Key,
  Building,
  TrendingUp,
  Search,
  CalendarCheck,
} from "lucide-react";
import RgButton from "@/components/reusable/RgButton";
import "./ServiceSelection.css";

type ServiceItem = {
  id: string;
  icon: typeof Search;
  secondaryIcon: typeof Key;
  headline: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  theme: "buy" | "sell" | "rent";
};

type ServiceHeader = {
  eyebrow: string;
  title: string;
  titleEm: string;
  subtitle: string;
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "buy",
    icon: Search,
    secondaryIcon: Key,
    headline: "Advisory",
    title: "Buyer Support",
    subtitle: "And Guidance",
    description:
      "Clear advice and local insight to help you buy with confidence—pricing, comparables, and negotiation support tailored to your goals.",
    features: [
      "Buyer support and advisory",
      "Residential property sales",
      "House & land packages",
    ],
    cta: "Speak With Us",
    theme: "buy",
  },
  {
    id: "sell",
    icon: TrendingUp,
    secondaryIcon: Home,
    headline: "Insights",
    title: "Property Appraisals",
    subtitle: "& Market Analysis",
    description:
      "Professional appraisals, transparent pricing strategy, and data-led guidance to help you make the right move at the right time.",
    features: [
      "Property appraisals and market analysis",
      "Honest communication",
      "Results driven outcomes",
    ],
    cta: "Request an Appraisal",
    theme: "sell",
  },
  {
    id: "rent",
    icon: CalendarCheck,
    secondaryIcon: Building,
    headline: "Management",
    title: "Rentals &",
    subtitle: "Property Management",
    description:
      "Reliable tenancy, proactive maintenance, and smooth day-to-day management for landlords and tenants alike.",
    features: [
      "Quality tenant selection",
      "Reliable rent collection",
      "Routine inspections & maintenance",
    ],
    cta: "Get In Touch",
    theme: "rent",
  },
];

const DEFAULT_HEADER: ServiceHeader = {
  eyebrow: "How Can We Help You?",
  title: "What Are You",
  titleEm: "Looking For?",
  subtitle:
    "Whether you're buying, selling, or renting — we're here to make your real estate journey seamless and rewarding.",
};

const ServiceSelection = ({
  services = DEFAULT_SERVICES,
  header = DEFAULT_HEADER,
}: {
  services?: ServiceItem[];
  header?: ServiceHeader;
}) => {
  return (
    <section className="svc">
      <div className="svc__container">
        {/* Header */}
        <header className="svc__header">
          <span className="svc__eyebrow" data-gsap="fade-up">
            {header.eyebrow}
          </span>
          <h2
            className="svc__title"
            data-gsap="char-reveal"
            data-gsap-start="top 85%"
          >
            {header.title} <em>{header.titleEm}</em>
          </h2>
          <p
            className="svc__subtitle"
            data-gsap="fade-up"
            data-gsap-delay="0.2"
          >
            {header.subtitle}
          </p>
        </header>

        {/* Service Cards */}
        <div className="svc__grid">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="svc-card"
              data-gsap="clip-smooth-down"
              data-gsap-delay={`${i * 0.14}`}
              data-gsap-start="top 88%"
            >
              <div className="svc-card__top" aria-hidden="true">
                <span className="svc-card__icon">
                  <service.icon size={18} />
                </span>
              </div>

              <h3 className="svc-card__word">
                {service.id.charAt(0).toUpperCase() + service.id.slice(1)}
              </h3>

              <p className="svc-card__desc">{service.description}</p>

              <div className="svc-card__footer">
                <RgButton
                  variant="blue"
                  to="/contact"
                  label={service.cta}
                  arrowSize={16}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
