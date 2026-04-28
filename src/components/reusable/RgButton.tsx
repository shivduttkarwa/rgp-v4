import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link, type LinkProps } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type RgButtonVariant = "gold" | "blue" | "outline";

type CommonProps = {
  /** Visible label text */
  label: ReactNode;
  /** Theme variant */
  variant?: RgButtonVariant;
  /** Add right-side arrow icon */
  withArrow?: boolean;
  /** Override arrow size */
  arrowSize?: number;
  className?: string;
};

type AsRouterLink = CommonProps & {
  to: LinkProps["to"];
  href?: never;
} & Omit<LinkProps, "to" | "className" | "children">;

type AsAnchor = CommonProps & {
  href: string;
  to?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type AsButton = CommonProps & {
  to?: never;
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type RgButtonProps = AsRouterLink | AsAnchor | AsButton;

export default function RgButton(props: RgButtonProps) {
  const {
    label,
    variant = "gold",
    withArrow = true,
    arrowSize = 18,
    className = "",
    ...rest
  } = props as RgButtonProps & Record<string, unknown>;

  const classes = `rg-btn rg-btn--${variant}${className ? ` ${className}` : ""}`;
  const arrow = withArrow ? <ArrowRight size={arrowSize} aria-hidden="true" /> : null;

  if ("to" in props) {
    const { to, ...linkRest } = rest as Omit<AsRouterLink, keyof CommonProps>;
    return (
      <Link to={to} className={classes} {...linkRest}>
        <span>{label}</span>
        {arrow}
      </Link>
    );
  }

  if ("href" in props) {
    const { href, ...anchorRest } = rest as Omit<AsAnchor, keyof CommonProps>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        <span>{label}</span>
        {arrow}
      </a>
    );
  }

  const buttonRest = rest as Omit<AsButton, keyof CommonProps>;
  return (
    <button className={classes} type="button" {...buttonRest}>
      <span>{label}</span>
      {arrow}
    </button>
  );
}

