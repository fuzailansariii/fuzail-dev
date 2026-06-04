"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/fuzailansariii",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/fuzailansariii",
    external: true,
  },
  { label: "Email", href: "mailto:hello@fuzail.in", external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 lg:py-40">
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-[0.07] blur-[120px]" />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <SectionLabel count="04" label="Contact" />
          </motion.div>

          <motion.h2
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 font-heading text-[clamp(1.8rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-tx"
          >
            Let&apos;s build{" "}
            <span className="bg-linear-to-br from-white via-v4 to-v1 bg-clip-text text-transparent">
              something great.
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 font-mono-ui text-[13px] leading-[1.85] text-t2"
          >
            I&apos;m currently open to new opportunities — freelance, full-time,
            or interesting side projects. If you have something in mind,
            I&apos;d love to hear about it.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <Link
              href="mailto:hello@fuzail.in"
              className="inline-flex items-center gap-3 rounded bg-v1 px-10 py-4 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-[0_14px_40px_rgba(124,58,237,0.45)]"
            >
              Say Hello
              <span className="text-[16px]">→</span>
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mb-10 h-px w-24 origin-center bg-b2"
          />

          {/* Social Links */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8"
          >
            {LINKS.map(({ label, href, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-t3 transition-colors duration-200 hover:text-v3"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
