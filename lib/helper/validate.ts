import { NextRequest } from "next/server";
import { z } from "zod";

export async function validateRequest<T>(
  req: NextRequest,
  schema: z.ZodType<T>,
) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return {
        data: null,
        error: z.treeifyError(result.error),
      };
    }
    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error: "Invalid JSON body" };
  }
}
