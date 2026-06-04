"use client";

import { useEffect, useRef } from "react";

const COMMANDS = [
  "git push origin main",
  "docker compose up -d",
  "pnpm build",
  "pnpm dev",
  "drizzle-kit generate",
  "drizzle-kit migrate",
  "next build",
  "vercel --prod",
  "SELECT * FROM projects",
  "SELECT COUNT(*) FROM skills",
  "POST /api/contact",
  "GET /api/projects",
  "✓ Deployment successful",
  "✓ Build completed",
  "✓ Migration applied",
  'git commit -m "feat: portfolio hero"',
  "docker build -t portfolio .",
  "npx tsc --noEmit",
  "pnpm lint",
  "git merge feat/hero",
];

export default function AuroraBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animsRef = useRef<Animation[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const elements = COMMANDS.map((command) => {
      const el = document.createElement("div");

      const top = 5 + Math.random() * 85;
      const left = 5 + Math.random() * 80;

      el.textContent = command;

      el.style.cssText = `
        position: absolute;
        top: ${top}%;
        left: ${left}%;
        font-family: var(--font-mono-ui);
        font-size: 13px;
        font-weight: 500;
        color: rgba(167,139,250,.85);
        white-space: nowrap;
        pointer-events: none;
        filter: blur(.5px);
        text-shadow:
          0 0 10px rgba(167,139,250,.12);
        will-change: transform, opacity;
      `;

      container.appendChild(el);

      const duration = 12000 + Math.random() * 8000;
      const driftX = (Math.random() - 0.5) * 120;

      const animation = el.animate(
        [
          {
            opacity: 0,
            transform: "translateX(0px)",
          },
          {
            opacity: 0.08,
            transform: `translateX(${driftX * 0.5}px)`,
          },
          {
            opacity: 0.08,
            transform: `translateX(${driftX}px)`,
          },
          {
            opacity: 0,
            transform: `translateX(${driftX}px)`,
          },
        ],
        {
          duration,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: -Math.random() * duration,
        },
      );

      animsRef.current.push(animation);

      return el;
    });

    return () => {
      animsRef.current.forEach((anim) => anim.cancel());
      animsRef.current = [];

      elements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Aurora Orb 1 */}
      <div className="absolute -top-40 -left-32 h-[650px] w-[650px] rounded-full bg-v1 opacity-[0.14] blur-[160px] animate-float" />

      {/* Aurora Orb 2 */}
      <div className="absolute top-10 right-[-180px] h-[550px] w-[550px] rounded-full bg-v2 opacity-[0.10] blur-[180px] animate-float-reverse" />

      {/* Aurora Orb 3 */}
      <div className="absolute bottom-[-220px] left-1/3 h-[500px] w-[500px] rounded-full bg-v3 opacity-[0.08] blur-[180px] animate-[float_20s_ease-in-out_infinite]" />

      {/* Noise Layer */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Terminal Commands */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
    </div>
  );
}
