"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "sonner";
import axios from "axios";
import Container from "../ui/container";
import SectionLabel from "../ui/section-label";
import { FeaturedProjectCard, ProjectCard } from "../ui/project-card";
import { Project } from "@/src/db/schema";
import Modal from "../ui/model";

interface ProjectsClientProps {
  projects: Project[];
  isAdmin: boolean;
}

export default function ProjectsClient({
  projects,
  isAdmin,
}: ProjectsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setModalMode("edit");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/projects/admin/${id}`);
      toast.success("Project deleted");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const handleSuccess = () => {
    startTransition(() => router.refresh());
  };

  return (
    <section id="work" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#7c3aed,transparent)] opacity-[0.06] blur-[100px]" />

      <Container>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel count="03" label="Work" />
          <h2 className="my-6 font-heading text-[clamp(2rem,5vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-tx">
            Projects I've Shipped
          </h2>
        </motion.div>

        {/* Add project button — admin only */}
        {isAdmin && (
          <button
            onClick={() => {
              setSelectedProject(null);
              setModalMode("create");
            }}
            className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-t3 hover:text-tx transition-colors"
          >
            + Add Project
          </button>
        )}

        <div className="mt-4 overflow-hidden rounded-xl border border-b1">
          {featuredProject && (
            <FeaturedProjectCard
              project={featuredProject}
              isAdmin={isAdmin}
              onEdit={() => handleEdit(featuredProject)}
              onDelete={() => handleDelete(featuredProject.id)}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {regularProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isAdmin={isAdmin}
                onEdit={() => handleEdit(project)}
                onDelete={() => handleDelete(project.id)}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Single modal instance */}
      {modalMode && (
        <Modal
          mode={modalMode}
          project={selectedProject}
          onClose={() => {
            setModalMode(null);
            setSelectedProject(null);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}
