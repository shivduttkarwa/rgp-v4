import type { ReactNode } from "react";
import RgButton from "@/components/reusable/RgButton";
import "./cta-2.css";

export type Cta2Stat = {
  value: ReactNode;
  label: ReactNode;
};

export type Cta2Commitment = {
  title: ReactNode;
};

export type Cta2Link = {
  label: ReactNode;
  to?: string;
  href?: string;
};

export type Cta2Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  titleEm?: ReactNode;
  text: ReactNode;
  primary: Cta2Link;
  secondary?: Cta2Link;
  commitments?: Cta2Commitment[];
  bgImage?: string;
  minHeight?: string;
  className?: string;
};

const DEFAULT_COMMITMENTS: Cta2Commitment[] = [
  { title: "Data‑backed guidance" },
  { title: "Off‑market access" },
  { title: "Calm negotiation" },
];

export default function Cta2({
  eyebrow,
  title,
  titleEm,
  text,
  primary,
  secondary,
  commitments = DEFAULT_COMMITMENTS,
  bgImage = "/images/hero1.jpg",
  minHeight = "70vh",
  className = "",
}: Cta2Props) {
  const style = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ["--cta2-bg" as any]: `url("${bgImage}")`,
    ["--cta2-min-h" as any]: minHeight,
  };

  return (
    <section className={`cta2${className ? ` ${className}` : ""}`} style={style}>
      <div className="cta2__container">
        <div className="cta2__grid">
          <div className="cta2__copy">
            <span className="cta2__eyebrow" data-gsap="fade-up">
              {eyebrow}
            </span>

            <h3
              className="cta2__title"
              data-gsap="char-reveal"
              data-gsap-start="top 85%"
            >
              {title} {titleEm ? <em>{titleEm}</em> : null}
            </h3>

            <p className="cta2__text" data-gsap="fade-up" data-gsap-delay="0.15">
              {text}
            </p>

            <div className="cta2__actions">
              {primary.to ? (
                <RgButton
                  variant="gold"
                  to={primary.to}
                  label={primary.label}
                  data-gsap="btn-clip-reveal"
                  data-gsap-delay="0.2"
                />
              ) : (
                <RgButton
                  variant="gold"
                  href={primary.href ?? "#"}
                  label={primary.label}
                  data-gsap="btn-clip-reveal"
                  data-gsap-delay="0.2"
                />
              )}

              {secondary ? (
                secondary.to ? (
                  <RgButton
                    variant="outline"
                    to={secondary.to}
                    label={secondary.label}
                    data-gsap="btn-clip-reveal"
                    data-gsap-delay="0.2"
                  />
                ) : (
                  <RgButton
                    variant="outline"
                    href={secondary.href ?? "#"}
                    label={secondary.label}
                    data-gsap="btn-clip-reveal"
                    data-gsap-delay="0.2"
                  />
                )
              ) : null}
            </div>
          </div>

          {commitments.length ? (
            <div
              className="cta2__commitments"
              data-gsap="zoom-in"
              data-gsap-stagger="0.25"
            >
              {commitments.map((c, idx) => (
                <div key={idx} className="cta2__commitment">
                  <span className="cta2__commitment-title">{c.title}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

