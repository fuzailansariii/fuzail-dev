import { getProjects } from "@/lib/queries/project";
import ProjectClient from "./project-client";
import { requireAdmin } from "@/lib/helper/auth";

export default async function Projects() {
  const projects = await getProjects();
  const { isAdmin } = await requireAdmin();

  return <ProjectClient projects={projects} isAdmin={isAdmin} />;
}
