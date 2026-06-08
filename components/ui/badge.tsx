import React from "react";

type ProjectStatus = "live" | "in_progress";
type ProjectType = "client" | "personal";

interface BadgeProps {
  status: ProjectStatus;
  type: ProjectType;
}

const statusStyles = {
  live: "bg-gr/10 text-green-400 border border-gr/20",
  in_progress: "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20",
};

const typeStyles = {
  client: "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  personal: "bg-v4/10 text-v4 border border-v4/20",
};

export default function Badge({ status, type }: BadgeProps) {
  return (
    <div className="flex gap-2 h-5">
      <span
        className={`rounded-xs px-2 py-0.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.06em] ${
          statusStyles[status]
        }`}
      >
        {status.replace("_", " ")}
      </span>
      <span
        className={`rounded-xs px-2 py-0.5 font-mono-ui text-[10px] font-bold uppercase tracking-[0.06em] ${
          typeStyles[type]
        }`}
      >
        {type}
      </span>
    </div>
  );
}
