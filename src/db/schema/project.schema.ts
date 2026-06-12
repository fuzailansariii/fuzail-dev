import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const project = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subHeading: text("sub_heading"),
  description: text("description").notNull(),
  tags: text("tags").array().notNull().default([]),
  status: text("status", { enum: ["live", "in_progress", "archived"] })
    .notNull()
    .default("in_progress"),
  type: text("type", { enum: ["client", "personal"] }).notNull(),
  category: text("category"),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = typeof project.$inferSelect;
