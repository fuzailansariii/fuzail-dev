"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Container from "../ui/container";
import TerminalCard from "../terminal-card";
import { Divider } from "../ui/divider";
import SocialLinks from "../ui/social-links";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Orb */}
      <div className="pointer-events-none absolute top-[-150px] left-[-80px] h-[500px] w-[500px] max-w-[90vw] rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-10 blur-[80px]" />

      <Container>
        <div className="relative flex min-h-screen flex-col justify-center pt-24 pb-20 lg:pt-0 lg:pb-0 gap-5">
          {/* ── Top name / role row ── */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-start gap-5"
          >
            {/* Decorative line + dot */}

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="block h-px bg-linear-to-r from-v1 to-t3"
            />
            <span className="font-mono-ui text-[9px] sm:text-xs uppercase tracking-[0.22em] text-v3">
              Mohd Fuzail Ansari&nbsp;&mdash;&nbsp;Full Stack Developer
            </span>
          </motion.div>
          {/* ── Two-column grid ── */}
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            {/* ── LEFT: Content ── */}
            <div className="w-full md:w-[65%]">
              {/* Headline */}
              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="mb-5 font-heading text-center md:text-start text-[clamp(3rem,9vw,7rem)] font-extrabold leading-none tracking-[-0.045em]"
              >
                <span className="block text-tx">Building</span>
                <span className="block bg-linear-to-br from-white via-v4 to-v1 bg-clip-text text-transparent">
                  the Web.
                </span>
              </motion.h1>

              {/* ── Bottom row: subtext left + buttons right ── */}
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.52 }}
                className="flex flex-col gap-6"
              >
                {/* Subtext */}
                <p className="font-mono-ui text-sm text-center md:text-start leading-[1.85] text-t2">
                  Next.js&nbsp;&middot;&nbsp;TypeScript&nbsp;&middot;&nbsp;PostgreSQL
                  <br />
                  Exploring DevOps.{" "}
                  <span className="text-t3">Shipping things that matter.</span>
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center md:justify-start gap-3 shrink-0">
                  <Link
                    href="#work"
                    className="rounded bg-v1 px-7 py-3 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-[0_10px_32px_rgba(124,58,237,0.45)]"
                  >
                    View Work
                  </Link>
                  <Link
                    href="#contact"
                    className="rounded border border-b2 px-7 py-3 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-t2 transition-all hover:-translate-y-0.5 hover:border-v2 hover:text-tx"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Terminal Card ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="w-full flex-1 flex justify-center lg:justify-end"
            >
              <TerminalCard />
            </motion.div>
          </div>
          {/* ── Social Links (vertical, right edge) ── */}
          <SocialLinks
            orientation="vertical"
            className="absolute top-1/2 -right-8 hidden -translate-y-1/2 xl:flex"
          />
        </div>
      </Container>
    </section>
  );
}
