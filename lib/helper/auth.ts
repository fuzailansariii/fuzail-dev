import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { sessionClaims } = await auth();

  const role = (sessionClaims as any)?.role;

  if (role !== "admin") {
    return { isAdmin: false };
  }
  return { isAdmin: true };
}
