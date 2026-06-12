import { ChevronDown } from "lucide-react";
import type { ProjectStatus } from "@/types/project";

interface StatusSelectProps {
  value: ProjectStatus;
  onChange: (value: ProjectStatus) => void;
}

const options: { value: ProjectStatus; label: string }[] = [
  { value: "live", label: "Live" },
  { value: "in_progress", label: "In Progress" },
];

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div>
      <label className="block font-mono font-bold text-[10px] uppercase tracking-widest text-t4 mb-1.5">
        Status
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as ProjectStatus)}
          className="w-full appearance-none bg-bg border border-b2 rounded text-tx font-mono text-[13px] px-3.5 py-2.5 pr-9 focus:outline-none focus:border-v2 focus:ring-1 focus:ring-v1/30 transition-all cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-t4"
        />
      </div>
    </div>
  );
}
