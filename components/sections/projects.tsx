"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";
import Tag from "../ui/tags";
import ArrowUp from "../icons/arrow-up";

const FEATURED_PROJECT = {
  num: "01",
  title: "Shipping Updates",
  subHeading: "EDUCATION PLATEFORM",
  description:
    "A premium platform for shipping entrance exam preparation with protected video courses, PDF study materials, Razorpay payments, and role-based content management.",
  tags: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Clerk",
    "Razorpay",
  ],
  status: "In Progress",
  type: "Client",
  href: "#",
};

const PROJECTS = [
  {
    num: "02",
    title: "Invoice Kit",
    subHeading: "INVOICING PLATFORM",
    description:
      "Generate, manage, and export professional invoices with reusable customer data and authentication.",
    tags: ["Next.js", "PostgreSQL", "Drizzle"],
    status: "Live",
    type: "Personal",
    href: "#",
  },
  {
    num: "03",
    title: "Developer Portfolio",
    subHeading: "PORTFOLIO SITE",
    description:
      "A dark, terminal-inspired portfolio focused on motion, typography, and developer branding.",
    tags: ["Next.js", "Tailwind", "Motion"],
    status: "Live",
    type: "Personal",
    href: "#",
  },
  {
    num: "04",
    title: "REST API Boilerplate",
    subHeading: "NODE.JS BACKEND STARTER",
    description:
      "Production-ready backend starter with authentication, validation, Docker, and PostgreSQL.",
    tags: ["Node.js", "Docker", "PostgreSQL"],
    status: "Live",
    type: "Personal",
    href: "#",
  },
  {
    num: "05",
    title: "CLI Toolkit",
    subHeading: "DEVELOPER CLI TOOLS",
    description:
      "Developer tooling for generating project scaffolds and speeding up setup workflows.",
    tags: ["Node.js", "TypeScript"],
    status: "Live",
    type: "Personal",
    href: "#",
  },
];

const statusStyles = {
  Live: "bg-gr/10 text-green-400 border border-gr/20",
  "In Progress": "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
};

const typeStyles = {
  Client: "bg-blue-400/10 text-blue-300 border border-blue-400/20",
  Personal: "bg-v3/10 text-v3 border border-v3/20",
};
export default function Projects() {
  return (
    <section id="work" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-[0.06] blur-[100px]" />

      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel count="03" label="Work" />
          <h2 className="my-6 font-heading text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-tx">
            Projects I've Shipped
          </h2>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-xl border border-b1">
          {/* Featured */}
          <Link
            href={FEATURED_PROJECT.href}
            className="group relative block overflow-hidden border-b border-b1 bg-s1 p-8 transition-colors hover:bg-s2 md:p-12"
          >
            {/* Hover Glow */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top Row */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 font-mono-ui text-[10px] tracking-widest text-t4">
                  {FEATURED_PROJECT.num} - Featured
                </p>
                <p className="text-[11px] text-v3/60 tracking-wider font-mono-ui">
                  {FEATURED_PROJECT.subHeading}
                </p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`rounded-sm px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.06em] ${
                    statusStyles[
                      FEATURED_PROJECT.status as keyof typeof statusStyles
                    ]
                  }`}
                >
                  {FEATURED_PROJECT.status}
                </span>

                <span
                  className={`rounded-sm px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.06em] ${
                    typeStyles[FEATURED_PROJECT.type as keyof typeof typeStyles]
                  }`}
                >
                  {FEATURED_PROJECT.type}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-6 font-heading text-[2.25rem] sm:text-[3rem] font-black tracking-tighter text-tx transition-colors duration-300 group-hover:text-v3">
              {FEATURED_PROJECT.title}
            </h3>

            {/* Description */}
            <p className="mb-8 max-w-2xl font-mono-ui text-[13px] leading-[1.9] text-t2">
              {FEATURED_PROJECT.description}
            </p>

            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-1.5">
              {FEATURED_PROJECT.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>

            {/* Link */}
            <div className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-all duration-300 group-hover:gap-3 group-hover:text-v3">
              <span>Github</span>

              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUp />
              </span>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <Link
                key={project.num}
                href={project.href}
                className={`group relative bg-s1 p-5 transition-colors hover:bg-s2 md:p-9 ${
                  index < 2 ? "border-b border-b1" : ""
                } ${index % 2 === 0 ? "md:border-r md:border-b1" : ""}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex justify-between">
                  <div className="font-mono-ui text-[10px] tracking-widest text-t4 mb-4">
                    <p className="mb-1">{project.num}</p>
                    {project.subHeading && (
                      <p className="text-[10px] text-v3/60 tracking-wider font-mono-ui">
                        {project.subHeading}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 h-5">
                    <span
                      className={`rounded-xs px-2 py-0.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.06em] ${
                        statusStyles[
                          project.status as keyof typeof statusStyles
                        ]
                      }`}
                    >
                      {project.status}
                    </span>

                    <span
                      className={`rounded-xs px-2 py-0.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.06em] ${
                        typeStyles[project.type as keyof typeof typeStyles]
                      }`}
                    >
                      {project.type}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2.5 font-heading text-[1.25rem] tracking-tighter font-black text-tx transition-colors group-hover:text-v3">
                  {project.title}
                </h3>

                <p className="mb-5 font-mono-ui text-[12px] leading-[1.85] text-t2">
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag tag={tag} key={tag} />
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-all duration-300 group-hover:gap-3 group-hover:text-v3">
                  <span>Github</span>
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUp />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
