"use client";
import { motion } from "motion/react";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";
import { FEATURED_PROJECTS, MOCK_PROJECTS } from "@/lib/data/project";
import { FeaturedProjectCard, ProjectCard } from "../ui/project-card";

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
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedProjectCard project={project} key={project.num} />
          ))}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {MOCK_PROJECTS.map((project, idx) => (
              <ProjectCard key={project.num} project={project} index={idx} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
