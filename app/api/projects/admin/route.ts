import { errorResponse, successResponse } from "@/lib/helper/api-response";
import { requireAdmin } from "@/lib/helper/auth";
import { validateRequest } from "@/lib/helper/validate";
import {
  projectSchema,
  ProjectFormData,
} from "@/lib/validation/validation.projects";
import { db } from "@/src/db";
import { project } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { isAdmin } = await requireAdmin();
    if (!isAdmin) return errorResponse("Unauthorized", 401);

    const { data, error } = await validateRequest(req, projectSchema);

    if (error || !data) return errorResponse("Invalid Data", 422);

    const [created] = await db.insert(project).values(data).returning();
    revalidatePath("/");

    return successResponse(created, 201);
  } catch (error) {
    console.error("POST /api/admin/projects error: ", error);
    errorResponse("Internal server error", 500);
  }
}
