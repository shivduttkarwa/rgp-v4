import { useState, type ReactNode } from "react";
import RgButton from "@/components/reusable/RgButton";
import "./eoi-cta.css";

export type EoiCtaProps = {
  badgeIcon?: ReactNode;
  badgeText?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  buttonLabel: ReactNode;
  buttonTo: string;
  bgImage?: string;
  bgVideo?: string;
  posterImage?: string;
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
  bgImage = "/images/int.jpg",
  bgVideo,
  posterImage,
  minHeight = "100vh",
  mobileMinHeight = "70vh",
  className = "",
}: EoiCtaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const poster = posterImage ?? bgImage;

  const style = {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ["--eoi-bg" as any]: `url("${poster}")`,
    ["--eoi-min-h" as any]: minHeight,
    ["--eoi-min-h-m" as any]: mobileMinHeight,
  };

  return (
    <section
      className={[
        "eoi-cta",
        bgVideo ? "eoi-cta--has-video" : "",
        videoReady ? "eoi-cta--video-ready" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {bgVideo ? (
        <video
          className="eoi-cta__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={bgVideo} />
        </video>
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

