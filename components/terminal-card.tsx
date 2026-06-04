"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

const TERMINAL_LINES = [
  { type: "command", text: "$ next build" },
  { type: "muted", text: "compiling..." },
  { type: "success", text: "✓ compiled successfully" },

  { type: "command", text: "$ drizzle-kit push" },
  { type: "muted", text: "connecting to supabase..." },
  { type: "success", text: "✓ 3 tables migrated" },

  { type: "command", text: "$ git push origin main" },
  { type: "muted", text: "pushing..." },
  { type: "success", text: "✓ pushed to origin/main" },

  { type: "command", text: "$ vercel --prod" },
  { type: "muted", text: "building..." },
  { type: "success", text: "✓ deployed to production" },

  { type: "success", text: "▲ fuzail.in [live]" },
];

export default function TerminalCard() {
  const [visibleCount, setVisibleCount] = useState(1);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      if (visibleCount === 1) {
        bodyRef.current.scrollTop = 0;
      } else {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    }
  }, [visibleCount]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (visibleCount < TERMINAL_LINES.length) {
      timeoutId = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 800);
    } else {
      timeoutId = setTimeout(() => {
        setVisibleCount(0);
      }, 8000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visibleCount]);

  return (
    <div
      className="
        w-full
        max-w-[400px]
        mx-auto
        lg:mr-0
        lg:ml-auto
        overflow-hidden
        rounded-2xl
        border
        border-b1
        bg-s1/80
        backdrop-blur-xl
        shadow-[0_0_80px_rgba(139,92,246,0.10)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-b1 px-5 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />

        <span className="ml-3 font-mono-ui text-xs text-t3">
          fuzail@dev ~ portfolio
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="h-[320px] overflow-y-auto p-6 font-mono-ui text-xs leading-6 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TERMINAL_LINES.slice(0, visibleCount).map((line, index) => (
          <motion.div
            key={`${line.text}-${index}`}
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className={
              line.type === "command"
                ? "text-v4"
                : line.type === "success"
                  ? "text-gr"
                  : "text-t4"
            }
          >
            {line.text}
          </motion.div>
        ))}

        <div className="mt-3 flex items-center">
          <span className="mr-2 text-v4">$</span>

          <motion.span
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
            className="inline-block h-6 w-3 bg-v2"
          />
        </div>
      </div>
    </div>
  );
}
