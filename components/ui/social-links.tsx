"use client";

import Link from "next/link";
import { motion } from "motion/react";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/fuzailansariii",
  },
  {
    label: "X",
    href: "https://x.com/fuzail_ansarii",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohdfuzailansari",
  },
  {
    label: "Email",
    href: "mailto:fuzailansarisecret@gmail.com",
  },
] as const;

type SocialLinksProps = {
  orientation?: "vertical" | "horizontal";
  className?: string;
  animate?: boolean;
};

export default function SocialLinks({
  orientation = "horizontal",
  className = "",
  animate,
}: SocialLinksProps) {
  const isVertical = orientation === "vertical";

  return (
    <motion.div
      initial={
        animate
          ? {
              x: isVertical ? 16 : 0,
              y: isVertical ? 0 : 16,
              opacity: 0,
            }
          : false
      }
      animate={
        animate
          ? {
              x: 0,
              y: 0,
              opacity: 1,
            }
          : false
      }
      transition={{
        duration: 0.5,
        delay: 1,
      }}
      className={[
        "flex",
        isVertical
          ? "flex-col items-center gap-5"
          : "flex-row items-center gap-6",
        className,
      ].join(" ")}
    >
      {SOCIALS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          target={label !== "Email" ? "_blank" : undefined}
          rel={label !== "Email" ? "noopener noreferrer" : undefined}
          className={[
            "font-mono-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-t4 transition-colors hover:text-v3",
            isVertical && "[writing-mode:vertical-rl]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </Link>
      ))}
    </motion.div>
  );
}
