import { errorResponse, successResponse } from "@/lib/helper/api-response";
import { requireAdmin } from "@/lib/helper/auth";
import { validateRequest } from "@/lib/helper/validate";
import { updateProjectSchema } from "@/lib/validation/validation.projects";
import { db } from "@/src/db";
import { project } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { isAdmin } = await requireAdmin();
    const { id } = await params;

    if (!isAdmin) return errorResponse("Unauthorized", 401);

    const { data, error } = await validateRequest(req, updateProjectSchema);
    if (error || !data) return errorResponse("Invalid Inputs", 422);

    const updatedProject = await db
      .update(project)
      .set(data)
      .where(eq(project.id, id))
      .returning();

    if (!updatedProject.length) return errorResponse("Project Not Found", 404);
    return successResponse(updatedProject, 200);
  } catch (error) {
    console.error("PATCH /api/admin/projects error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return errorResponse("Unauthorized", 401);
    const deletedProject = await db
      .delete(project)
      .where(eq(project.id, id))
      .returning();
    if (!deletedProject.length) return errorResponse("Project Not Found", 404);
    return successResponse({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error", error);
    return errorResponse("Internal Server Error", 500);
  }
}
