"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "./badge";
import Tag from "./tags";
import ArrowUp from "../icons/arrow-up";
import ConfirmDialog from "./confirm-dialog";
import { Project } from "@/src/db/schema";

interface ProjectProps {
  project: Project;
  index?: number;
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
  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
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

        <h2 className="mb-6 font-heading text-[2.25rem] sm:text-[3rem] font-black tracking-tighter text-tx transition-colors duration-300 group-hover:text-v3">
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

        <div className="flex items-center gap-5">
          <Link
            target="_blank"
            href={project.liveUrl ?? "#"}
            className="group/link inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-colors duration-300 hover:text-v3"
          >
            <span>Live</span>
            <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <ArrowUp className="size-3" />
            </span>
          </Link>

          <Link
            target="_blank"
            href={project.githubUrl ?? "#"}
            className="group/link inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-colors duration-300 hover:text-v3"
          >
            <span>Github</span>
            <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <ArrowUp className="size-3" />
            </span>
          </Link>
        </div>
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
    <div
      className={`group relative bg-s1 transition-colors hover:bg-s2 ${
        index < 2 ? "border-b border-b1" : ""
      } ${index % 2 === 0 ? "md:border-r md:border-b1" : ""}`}
    >
      {isAdmin && (
        <AdminActions
          onEdit={onEdit}
          onDeleteRequest={() => setConfirmOpen(true)}
        />
      )}

      <div className="block p-5 md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="flex justify-between gap-2">
          <div className="font-mono-ui text-[10px] tracking-widest text-t4 mb-4">
            {project.subHeading && (
              <p className="text-[10px] text-v3/60 tracking-wider font-mono-ui">
                {project.subHeading}
              </p>
            )}
          </div>
          <Badge status={project.status} type={project.type} />
        </div>

        <h2 className="mb-2.5 font-heading text-[1.25rem] tracking-tighter font-black text-tx transition-colors group-hover:text-v3">
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

        <div className="flex items-center gap-5 mt-5">
          <Link
            target="_blank"
            href={project.liveUrl ?? "#"}
            className="group/link inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-colors duration-300 hover:text-v3"
          >
            <span>Live</span>
            <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <ArrowUp className="size-3" />
            </span>
          </Link>

          <Link
            target="_blank"
            href={project.githubUrl ?? "#"}
            className="group/link inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-colors duration-300 hover:text-v3"
          >
            <span>Github</span>
            <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
              <ArrowUp className="size-3" />
            </span>
          </Link>
        </div>
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
