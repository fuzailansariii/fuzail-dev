"use client";

import { motion } from "motion/react";

interface StatusIndicatorProps {
  label?: string;
  available?: boolean;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
}

import { cn } from "@/lib/utils"; // Adjust path if needed

export default function StatusIndicator({
  label = "Available for work",
  available = true,
  className = "",
  animate = false,
  animationDelay = 0,
}: StatusIndicatorProps) {
  const color = available ? "bg-gr" : "bg-yellow-500";

  return (
    <motion.div
      {...(animate && {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, delay: animationDelay },
      })}
      className={cn(
        "flex items-center gap-2.5 font-mono-ui tracking-[0.14em] text-t2",
        className,
      )}
    >
      <div
        className={cn(
          "relative rounded-full",
          color,
          animate ? "h-[5px] w-[5px]" : "h-[6px] w-[6px]",
        )}
      >
        {available && (
          <span
            className={cn(
              "animate-ping-slow absolute inset-[-3px] rounded-full",
              `${color}/30`,
            )}
          />
        )}
      </div>
      <span>{label}</span>
    </motion.div>
  );
}
