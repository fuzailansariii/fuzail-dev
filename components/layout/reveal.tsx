"use client";
import { useRef } from "react";
import { useInView, motion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const animateRef = useRef(null);

  const inView = useInView(animateRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.div
      ref={animateRef}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
