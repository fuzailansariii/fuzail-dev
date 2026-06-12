import { errorResponse, successResponse } from "@/lib/helper/api-response";
import { db } from "@/src/db";
import { project } from "@/src/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const projects = await db
      .select()
      .from(project)
      .orderBy(desc(project.createdAt));

    if (!projects.length) return errorResponse("No projects found", 404);

    return successResponse(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return errorResponse("Internal server error", 500);
  }
}
