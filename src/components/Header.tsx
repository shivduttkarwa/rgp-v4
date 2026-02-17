import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isInHero, setIsInHero] = useState(false);
  const lastScrollY = useRef(0);
  const logoSrc = `${import.meta.env.BASE_URL}images/RGP-logo.png`;

  useEffect(() => {
    const heroEl =
      (document.querySelector(".rg-hero") as HTMLElement | null) ||
      (document.querySelector(".pd-hero") as HTMLElement | null) ||
      (document.querySelector(".hero-section") as HTMLElement | null);

    const handleScroll = () => {
      const current = window.scrollY;
      const goingDown = current > lastScrollY.current;

      if (current > 120 && goingDown) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsInHero(rect.bottom > 0);
      } else {
        setIsInHero(false);
      }

      lastScrollY.current = current;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`rg-header ${isOpen ? "rg-header--menu-open" : ""} ${
          isHidden ? "rg-header--hidden" : ""
        } ${isInHero ? "rg-header--hero" : ""}`}
        aria-label="Site header"
      >
        <div className="rg-header__inner">
          <Link
            to="/"
            className="rg-header__logo"
            aria-label="Real Gold Properties"
          >
            <img src={logoSrc} alt="Real Gold Properties" />
          </Link>

          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-pressed={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="hamburger-box">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </header>
      <Menu isOpen={isOpen} onOpenChange={setIsOpen} showButton={false} />
    </>
  );
}
