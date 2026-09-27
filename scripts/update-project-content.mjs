// One-off: rewrite project titles/descriptions/tags to match resume & GitHub.
// Review, then run with: node scripts/update-project-content.mjs
// Uses DATABASE_URL from .env.local. Runs in a single transaction.
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: ".env.local", quiet: true });

const updates = [
  {
    id: "c7a4839a-40ce-4cd7-9fa9-4bb15a53d585", // SU Test
    title: "Maritime Exam Mock Test Platform",
    description:
      "A paid mock-test platform for maritime entrance exams. Students take timed MCQ tests, get instant scores and performance analytics, and compete on a public leaderboard. Paid access runs through Razorpay, and real students have bought and completed tests. I built the whole thing — schema, backend, UI, auth, payments and deployment.",
  },
  {
    id: "bfd16e8d-754d-4ae1-9aea-02064f994671", // Shipping Updates
    title: "Maritime E-Commerce & Study Platform",
    description:
      "An e-commerce and study platform for Merchant Navy aspirants. Students buy physical books or download PDFs instantly. It handles Razorpay payments and order management for both physical and digital orders, and serves real users across India.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle-ORM",
      "Clerk-Auth",
      "Razorpay",
      "ImageKit",
      "TailwindCSS",
    ],
  },
  {
    id: "7acdceb8-5ed6-4967-874d-38ad4cca6a84", // DropFile
    title: "Cloud File Manager",
    subHeading: "Private Cloud Storage App",
    description:
      "A private cloud file manager. Drag-and-drop uploads, folders, starred files, and a trash with restore. Files stay private to the signed-in user — there are no public share links.",
    // same stack, spelling normalised to match the other cards
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
      "Drizzle-ORM",
      "Clerk-Auth",
    ],
  },
  {
    id: "0bd13925-052f-458e-9ed9-771a26e1bde2", // Secondary Brain
    title: "Bookmarking App",
    description:
      "A bookmarking app to save YouTube videos, tweets and web links in one place, with category filters and user accounts.",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "TailwindCSS",
    ],
  },
  {
    id: "7250ab1b-ed18-45be-9c5f-cfe3b1d7ff35", // Clentric — tags only
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "PostgreSQL",
      "Drizzle-ORM",
      "Supabase",
      "Clerk-Auth",
      "Stripe",
    ],
  },
];

const sql = postgres(process.env.DATABASE_URL);

try {
  await sql.begin(async (tx) => {
    for (const { id, ...fields } of updates) {
      const { subHeading, ...rest } = fields;
      const set = { ...rest, updated_at: new Date() };
      if (subHeading) set.sub_heading = subHeading;
      const [row] = await tx`
        update project set ${tx(set)} where id = ${id} returning title
      `;
      if (!row) throw new Error(`Project ${id} not found — aborting`);
      console.log(`updated: ${row.title}`);
    }
  });
} finally {
  await sql.end();
}
