"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "./badge";
import Tag from "./tags";
import ArrowUp from "../icons/arrow-up";
import ConfirmDialog from "./confirm-dialog";
import { Project } from "@/src/db/schema";
import { cn } from "@/lib/utils";

interface ProjectProps {
  project: Project;
  index?: number;
  total?: number;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AdminActions = ({
  onEdit,
  onDeleteRequest,
}: {
  onEdit?: () => void;
  onDeleteRequest?: () => void;
}) => (
  // visible always on mobile (md:opacity-0), hover-reveal on desktop
  <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.();
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-s2 border border-b2 rounded font-mono text-[10px] uppercase tracking-widest text-t2 hover:border-v2 hover:text-tx transition-colors"
    >
      <Pencil size={11} />
      <span className="hidden sm:inline">Edit</span>
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDeleteRequest?.();
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-s2 border border-b2 rounded font-mono text-[10px] uppercase tracking-widest text-red-400 hover:border-red-400 transition-colors"
    >
      <Trash2 size={11} />
      <span className="hidden sm:inline">Delete</span>
    </button>
  </div>
);

const ProjectLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    target="_blank"
    href={href}
    className="group/link inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-colors duration-300 hover:text-v3"
  >
    <span>{label}</span>
    <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
      <ArrowUp className="size-3" />
    </span>
  </Link>
);

// hide links that don't exist instead of pointing them at "#"
const ProjectLinks = ({
  liveUrl,
  githubUrl,
}: {
  liveUrl: string | null;
  githubUrl: string | null;
}) => {
  if (!liveUrl && !githubUrl) return null;
  return (
    <div className="flex items-center gap-5">
      {liveUrl && <ProjectLink href={liveUrl} label="Live" />}
      {githubUrl && <ProjectLink href={githubUrl} label="Github" />}
    </div>
  );
};

export const FeaturedProjectCard = ({
  project,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    await onDelete?.();
    setDeleting(false);
    setConfirmOpen(false);
  };

  return (
    <div className="group relative block overflow-hidden border-b border-b1 bg-s1 transition-colors hover:bg-s2">
      {isAdmin && (
        <AdminActions
          onEdit={onEdit}
          onDeleteRequest={() => setConfirmOpen(true)}
        />
      )}

      <div className="block p-5 md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 font-mono-ui text-[10px] tracking-widest text-t4">
              Featured
            </p>
            <p className="text-[11px] text-v3/60 tracking-wider font-mono-ui">
              {project.subHeading}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge status={project.status} type={project.type} />
          </div>
        </div>

        <h2 className="mb-6 font-heading text-[clamp(1.75rem,6vw,3rem)] leading-[1.05] text-balance wrap-break-word font-black tracking-tighter text-tx transition-colors duration-300 group-hover:text-v3">
          {project.title}
        </h2>

        <p className="mb-8 max-w-2xl font-mono-ui text-[13px] leading-[1.9] text-t2">
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Delete Project?"
          description={`"${project.title}" will be permanently deleted. This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
          loading={deleting}
        />
      )}
    </div>
  );
};

export const ProjectCard = ({
  project,
  index = 0,
  total = 1,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    await onDelete?.();
    setDeleting(false);
    setConfirmOpen(false);
  };

  const isLast = index === total - 1;
  const spansRow = isLast && total % 2 === 1; // odd one out fills the row
  const inLastMdRow = index >= total - (total % 2 === 0 ? 2 : 1);

  return (
    <div
      className={cn(
        "group relative bg-s1 transition-colors hover:bg-s2 border-b1",
        !isLast && "border-b",
        inLastMdRow && "md:border-b-0",
        index % 2 === 0 && !spansRow && "md:border-r",
        spansRow && "md:col-span-2",
      )}
    >
      {isAdmin && (
        <AdminActions
          onEdit={onEdit}
          onDeleteRequest={() => setConfirmOpen(true)}
        />
      )}

      <div className="block p-5 md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="mb-4 flex flex-col-reverse gap-2.5 xl:flex-row xl:items-start xl:justify-between xl:gap-3">
          <div className="min-w-0 font-mono-ui text-[10px] tracking-widest text-t4">
            {project.subHeading && (
              <p className="text-[10px] text-v3/60 tracking-wider font-mono-ui">
                {project.subHeading}
              </p>
            )}
          </div>
          <Badge status={project.status} type={project.type} />
        </div>

        <h2 className="mb-2.5 font-heading text-[1.25rem] leading-tight text-balance tracking-tighter font-black text-tx transition-colors group-hover:text-v3">
          {project.title}
        </h2>

        <p className="mb-5 font-mono-ui text-[12px] leading-[1.85] text-t2">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>

        <ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Delete Project?"
          description={`"${project.title}" will be permanently deleted. This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
          loading={deleting}
        />
      )}
    </div>
  );
};
