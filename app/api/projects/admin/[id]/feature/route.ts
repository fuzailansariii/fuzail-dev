import { errorResponse, successResponse } from "@/lib/helper/api-response";
import { requireAdmin } from "@/lib/helper/auth";
import { db } from "@/src/db";
import { project } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return errorResponse("Unauthorized", 401);

    const [existingProject] = await db
      .select()
      .from(project)
      .where(eq(project.id, id));

    if (!existingProject) return errorResponse("Project Not found", 404);

    await db.transaction(async (tx) => {
      // remove featured flag from all projects
      await tx.update(project).set({ featured: false });

      // set selected project as featured
      await tx
        .update(project)
        .set({ featured: true })
        .where(eq(project.id, id));
    });

    revalidatePath("/");

    return successResponse({
      message: "Project featured successfully",
    });
  } catch (error) {
    console.error("PATCH /api/admin/projects/[id]/feature error:", error);

    return errorResponse("Internal server error", 500);
  }
}
