import { Project } from "@/types/project";

export const FEATURED_PROJECTS: Project[] = [
  {
    num: 0o1,
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
    status: "in_progress",
    type: "client",
    href: "#",
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    num: 0o2,
    title: "Invoice Kit",
    subHeading: "INVOICING PLATFORM",
    description:
      "Generate, manage, and export professional invoices with reusable customer data and authentication.",
    tags: ["Next.js", "PostgreSQL", "Drizzle"],
    status: "live",
    type: "personal",
    href: "#",
  },
  {
    num: 0o3,
    title: "Developer Portfolio",
    subHeading: "PORTFOLIO SITE",
    description:
      "A dark, terminal-inspired portfolio focused on motion, typography, and developer branding.",
    tags: ["Next.js", "Tailwind", "Motion"],
    status: "live",
    type: "personal",
    href: "#",
  },
  {
    num: 0o4,
    title: "REST API Boilerplate",
    subHeading: "NODE.JS BACKEND STARTER",
    description:
      "Production-ready backend starter with authentication, validation, Docker, and PostgreSQL.",
    tags: ["Node.js", "Docker", "PostgreSQL"],
    status: "live",
    type: "personal",
    href: "#",
  },
  {
    num: 0o5,
    title: "CLI Toolkit",
    subHeading: "DEVELOPER CLI TOOLS",
    description:
      "Developer tooling for generating project scaffolds and speeding up setup workflows.",
    tags: ["Node.js", "TypeScript"],
    status: "live",
    type: "personal",
    href: "#",
  },
];
