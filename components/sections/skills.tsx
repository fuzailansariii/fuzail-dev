"use client";

import { motion } from "motion/react";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";
import CodeWindow from "../layout/code-window";

const STACK = [
  {
    category: "frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "backend",
    items: ["Node.js", "tRPC", "Drizzle ORM", "REST APIs"],
  },
  {
    category: "database",
    items: ["PostgreSQL", "Supabase", "Redis", "Neon"],
  },
  {
    category: "devops",
    items: ["Docker", "GitHub Actions", "Linux", "Vercel"],
  },
  {
    category: "tools",
    items: ["Git", "Figma", "VS Code", "Postman"],
  },
];

export default function Skills() {
  return (
    <section id="stack" className="relative py-28 lg:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel count="02" label="Stack" />

          <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-tx">
            Tools I build with.
          </h2>

          <p className="max-w-xl text-sm text-t2">
            Technologies I use daily to build fast, scalable and
            production-ready web applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <CodeWindow fileName="stack.config.ts">
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {STACK.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  {/* command */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-emerald-400">$</span>

                    <span className="text-v1">cd ./{group.category}</span>

                    <span className="h-px flex-1 bg-b1" />
                  </div>

                  {/* tech list */}
                  <ul className="space-y-2 pl-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-t2 transition-colors hover:text-tx"
                      >
                        <span className="bg-t2 size-1 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </CodeWindow>
        </motion.div>
      </Container>
    </section>
  );
}
