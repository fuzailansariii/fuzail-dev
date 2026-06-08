import { Project } from "@/types/project";
import Link from "next/link";
import Badge from "./badge";
import Tag from "./tags";
import ArrowUp from "../icons/arrow-up";

interface ProjectProps {
  project: Project;
  index?: number;
}

export const FeaturedProjectCard = ({ project }: ProjectProps) => {
  return (
    <Link
      href={project.href}
      className="group relative block overflow-hidden border-b border-b1 bg-s1 p-5 md:p-9 transition-colors hover:bg-s2"
    >
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Row */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 font-mono-ui text-[10px] tracking-widest text-t4">
            {project.num} - Featured
          </p>
          <p className="text-[11px] text-v3/60 tracking-wider font-mono-ui">
            {project.subHeading}
          </p>
        </div>

        <div className="flex gap-2">
          <Badge status={project.status} type={project.type} />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-6 font-heading text-[2.25rem] sm:text-[3rem] font-black tracking-tighter text-tx transition-colors duration-300 group-hover:text-v3">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-8 max-w-2xl font-mono-ui text-[13px] leading-[1.9] text-t2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>

      {/* Link */}
      <div className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-all duration-300 group-hover:gap-3 group-hover:text-v3">
        <span>Github</span>

        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUp className="size-3" />
        </span>
      </div>
    </Link>
  );
};

export const ProjectCard = ({ project, index = 0 }: ProjectProps) => {
  return (
    <Link
      href={project.href}
      className={`group relative bg-s1 p-5 transition-colors hover:bg-s2 md:p-9 ${
        index < 2 ? "border-b border-b1" : ""
      } ${index % 2 === 0 ? "md:border-r md:border-b1" : ""}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-v1/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex justify-between">
        <div className="font-mono-ui text-[10px] tracking-widest text-t4 mb-4">
          <p className="mb-1">{project.num}</p>
          {project.subHeading && (
            <p className="text-[10px] text-v3/60 tracking-wider font-mono-ui">
              {project.subHeading}
            </p>
          )}
        </div>

        <Badge status={project.status} type={project.type} />
      </div>

      <h3 className="mb-2.5 font-heading text-[1.25rem] tracking-tighter font-black text-tx transition-colors group-hover:text-v3">
        {project.title}
      </h3>

      <p className="mb-5 font-mono-ui text-[12px] leading-[1.85] text-t2">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>

      <div className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.06em] text-t2 transition-all duration-300 group-hover:gap-3 group-hover:text-v3">
        <span>Github</span>
        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUp className="size-3" />
        </span>
      </div>
    </Link>
  );
};
