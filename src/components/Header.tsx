import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/RGP-logo.png`;

  return (
    <>
      <header
        className={`rg-header ${isOpen ? "rg-header--menu-open" : ""}`}
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
