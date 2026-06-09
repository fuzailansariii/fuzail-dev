import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    return { isAdmin: false };
  }
  return { isAdmin: true };
}
