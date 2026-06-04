"use client";
import { motion } from "motion/react";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";
import CodeWindow from "../layout/code-window";

const STATS = [
  { value: "3+", label: "Years building" },
  { value: "10+", label: "Projects shipped" },
  { value: "\u221E", label: "Lines of code" },
  { value: "1", label: "Goal" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      {/* Subtle divider orb */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-[0.06] blur-[100px]" />

      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 mt-14">
          {/* left — Stats */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel count="01" label="About" />

            <h2 className="my-6 font-heading text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-tx">
              The Dev
              <br />
              <span className="bg-linear-to-r from-v3 to-v1 bg-clip-text text-transparent">
                Behind
              </span>
              <br />
              <span>the code</span>
            </h2>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 border border-b1 rounded-lg overflow-hidden"
            >
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group flex flex-col items-start gap-2 p-6 bg-s1 hover:bg-s2 transition-colors
                            ${i % 2 === 0 ? "border-r border-b1" : ""}
                              ${i < 2 ? "border-b border-b1" : ""}
                            `}
                >
                  <span className="font-heading text-5xl font-extrabold leading-none tracking-[-0.04em] text-v3">
                    {value}
                  </span>
                  <span className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-t3">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* right */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 font-mono-ui text-[13px] leading-[1.9] text-t2">
                <p>
                  <span className="font-bold">I&apos;m Fuzail</span> — a full
                  stack developer from India, focused on building fast,
                  production-ready web applications from zero to deployment.
                </p>
                <p>
                  My core stack is <span className="text-v3">Next.js</span>,{" "}
                  <span className="text-v3">TypeScript</span>, and{" "}
                  <span className="text-v3">PostgreSQL</span> — with Drizzle ORM
                  handling the data layer and Supabase on the backend. I care
                  about clean API design, type safety, and writing code that
                  scales without breaking.
                </p>
                <p>
                  Currently exploring{" "}
                  <span className="text-v3">
                    Docker, container orchestration,
                  </span>{" "}
                  and <span className="text-v3">CI/CD pipelines</span> —
                  actively looking for full-stack and backend roles where I can
                  ship real things to real users.
                </p>
              </div>
            </motion.div>
            <CodeWindow fileName="fuzail.config.ts">
              {/* // who am i */}
              <p>
                <span className="text-gray-600 italic">{"// who am i"}</span>
              </p>

              {/* const me = { */}
              <p>
                <span className="text-purple-400">const </span>
                <span className="text-blue-400">me</span>
                <span className="text-tx"> = {"{"}</span>
              </p>

              {/* name */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">name</span>
                <span className="text-tx">: </span>
                <span className="text-yellow-400">"Fuzail Ansari"</span>
                <span className="text-tx">,</span>
              </p>

              {/* role */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">role</span>
                <span className="text-tx">: </span>
                <span className="text-yellow-400">"Full Stack Developer"</span>
                <span className="text-tx">,</span>
              </p>

              {/* experience */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">experience</span>
                <span className="text-tx">: </span>
                <span className="text-yellow-400">"2+ year"</span>
                <span className="text-tx">,</span>
              </p>

              {/* location */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">location</span>
                <span className="text-tx">: </span>
                <span className="text-yellow-400">"India"</span>
                <span className="text-tx">,</span>
              </p>

              {/* stack */}
              {/* stack — one line on xl, multiline below xl */}

              {/* xl: single line */}
              <p className="hidden xl:block">
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">stack</span>
                <span className="text-tx">: [</span>
                <span className="text-yellow-400">"Next.js"</span>
                <span className="text-tx">, </span>
                <span className="text-yellow-400">"TypeScript"</span>
                <span className="text-tx">, </span>
                <span className="text-yellow-400">"PostgreSQL"</span>
                <span className="text-tx">, </span>
                <span className="text-yellow-400">"Drizzle"</span>
                <span className="text-tx">, </span>
                <span className="text-yellow-400">"Docker"</span>
                <span className="text-tx">],</span>
              </p>

              {/* below xl: multiline */}
              <div className="xl:hidden">
                <p>
                  <span className="text-tx ml-4">{"  "}</span>
                  <span className="text-green-400">stack</span>
                  <span className="text-tx">: [</span>
                </p>
                {[
                  "Next.js",
                  "TypeScript",
                  "PostgreSQL",
                  "Drizzle",
                  "Docker",
                ].map((s) => (
                  <p key={s} className="ml-8">
                    <span className="text-yellow-400">"{s}"</span>
                    <span className="text-tx">,</span>
                  </p>
                ))}
                <p>
                  <span className="text-tx ml-4">],</span>
                </p>
              </div>

              {/* learning */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">learning</span>
                <span className="text-tx">: [</span>
                <span className="text-yellow-400">"DevOps"</span>
                <span className="text-tx">, </span>
                <span className="text-yellow-400">"AWS"</span>
                <span className="text-tx">],</span>
              </p>
              {/* availableForWork */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">availableForWork</span>
                <span className="text-tx">: </span>
                <span className="text-orange-400">true</span>
                <span className="text-tx">,</span>
              </p>

              {/* remoteFriendly */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">remoteFriendly</span>
                <span className="text-tx">: </span>
                <span className="text-orange-400">true</span>
                <span className="text-tx">,</span>
              </p>

              {/* coffee */}
              <p>
                <span className="text-tx ml-4">{"  "}</span>
                <span className="text-green-400">coffee</span>
                <span className="text-tx">: </span>
                <span className="text-blue-400">Infinity</span>
                <span className="text-tx">,</span>
              </p>

              {/* closing */}
              <p>
                <span className="text-tx">{"}"}</span>
              </p>
            </CodeWindow>
          </div>
        </div>
      </Container>
    </section>
  );
}
