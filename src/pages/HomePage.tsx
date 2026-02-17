import HeroSection from "../sections/HeroSection";
import About from "../sections/About";

import PortfolioShowcase from "../extra/Home/PortfolioShowcase";
import PropertyListingSection from "@/sections/PropertyListingSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <PropertyListingSection />
      <PortfolioShowcase />
    </>
  );
}
