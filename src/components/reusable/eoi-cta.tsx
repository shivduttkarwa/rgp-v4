import type { ReactNode } from "react";
import RgButton from "@/components/reusable/RgButton";
import assetUrl from "@/lib/assetUrl";
import "./eoi-cta.css";

export type EoiCtaProps = {
  badgeIcon?: ReactNode;
  badgeText?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  buttonLabel: ReactNode;
  buttonTo: string;
  bgImage?: string;
  minHeight?: string;
  mobileMinHeight?: string;
  className?: string;
};

export default function EoiCta({
  badgeIcon,
  badgeText = "Expression of Interest",
  title,
  text,
  buttonLabel,
  buttonTo,
  bgImage = "images/hero-11.jpg",
  minHeight = "100vh",
  mobileMinHeight = "70vh",
  className = "",
}: EoiCtaProps) {
  const bgSrc = assetUrl(typeof bgImage === "string" ? bgImage : "");

  const style = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ["--eoi-min-h" as any]: minHeight,
    ["--eoi-min-h-m" as any]: mobileMinHeight,
  };

  return (
    <section
      className={["eoi-cta", className].filter(Boolean).join(" ")}
      style={style}
    >
      {bgSrc ? (
        <img className="eoi-cta__poster" src={bgSrc} alt="" aria-hidden="true" />
      ) : null}

      <div className="eoi-cta__inner">
        <div className="eoi-cta__copy">
          <div className="eoi-cta__badge">
            {badgeIcon ? <span className="eoi-cta__badge-icon">{badgeIcon}</span> : null}
            <span>{badgeText}</span>
          </div>
          <h3 className="eoi-cta__title">{title}</h3>
          <p className="eoi-cta__text">{text}</p>
        </div>

        <RgButton
          variant="gold"
          to={buttonTo}
          label={buttonLabel}
          className="eoi-cta__button"
        />
      </div>
    </section>
  );
}

