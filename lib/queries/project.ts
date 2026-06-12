import { db } from "@/src/db";
import { project } from "@/src/db/schema";
import { desc } from "drizzle-orm";

export async function getProjects() {
  try {
    return await db
      .select()
      .from(project)
      .orderBy(desc(project.featured), desc(project.createdAt));
  } catch (error: any) {
    console.error("getProjects error: ", error.message);
    throw new Error("Failed to fetch projects");
  }
}

export async function getProjectById(id: string) {
  try {
    const projectData = await db.query.project.findFirst({
      where: (project, { eq }) => eq(project.id, id),
    });

    return projectData;
  } catch (error) {
    console.error("getProjectById error: ", error);
    throw new Error("Failed to fetch project by ID");
  }
}
