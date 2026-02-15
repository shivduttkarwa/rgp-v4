import { CSSProperties } from "react";
import "./BtnSecondary.css";

interface BtnSecondaryProps {
  label: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export default function BtnSecondary({
  label,
  width,
  height,
  color = "#f5c45e",
  onClick,
  className = "",
}: BtnSecondaryProps) {
  const buttonStyle: CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : "auto",
    // @ts-ignore - CSS custom properties
    "--btn-secondary-color": color,
  };

  return (
    <button
      className={`btn-secondary ${className}`}
      style={buttonStyle}
      onClick={onClick}
    >
      <span className="bs-text">{label}</span>
    </button>
  );
}
