import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import HeroSearchPanel from "../components/HeroSearchPanel";
import Intro from "../sections/Intro";

import PortfolioShowcase from "../sections/PortfolioShowcase";
import PropertyListingSection from "@/sections/PropertyListingSection";
import ServiceSelection from "@/sections/ServiceSelection";
import PhilosophyPillars from "@/sections/Philosophy";
import RgpCta from "@/components/reusable/RgpCta";

import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
export default function HomePage({ ready = false }: { ready?: boolean }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear one-time init guards so StrictMode's double-invoke doesn't skip animations
    const guards = [
      "clipRevealInit",
      "clipRevealRtlInit",
      "clipRevealTopInit",
      "clipRevealLeftInit",
      "clipRevealRightInit",
      "wordRevealInit",
      "wordWriteInit",
      "clipSmoothInit",
      "clipSmoothDownInit",
      "charRevealInit",
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
      <HeroSection
        ready={ready}
        ctaOnClick={() => navigate("/properties")}
        panel={<HeroSearchPanel />}
      />

      <Intro />

      <PropertyListingSection />

      <ServiceSelection />
      <RgpCta
        eyebrow="Need Guidance?"
        title="Not Sure Where to"
        titleEm="Start?"
        text="Our experienced advisors are here to understand your needs and guide you through every step of your real estate journey."
        bgVideo="vids/cta-vid.mp4"
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "0450 009 291", href: "tel:+61450009291" }}
        stats={[
          { value: "5+", label: "Years Experience" },
          { value: "100+", label: "Happy Clients" },
          { value: "24/7", label: "Support Available" },
        ]}
      />
      <PhilosophyPillars />

      <PortfolioShowcase />
    </div>
  );
}
