import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  title: string;
  variant?: "primary" | "ghost";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  target?: string;
  onClick?: () => {};
}

export default function Button({
  className,
  title,
  variant = "primary",
  href,
  type = "button",
  disabled,
  target,
  onClick,
}: ButtonProps) {
  const base =
    "rounded px-7 py-3 font-mono-ui text-[10px] uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  const variants = {
    primary:
      "bg-v1 text-white hover:bg-[#6d28d9] hover:shadow-[0_10px_32px_rgba(124,58,237,0.45)]",
    ghost: "border border-b2 text-t2 hover:border-v2 hover:text-tx",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
