import { cn } from "@/lib/utils";

interface SectionLabelProps {
  count: string;
  label: string;
  className?: string;
}

export default function SectionLabel({
  count,
  label,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "mb-2.5 flex items-center gap-2.5 font-mono-ui text-[11px] uppercase tracking-[0.18em] text-v4",
        className,
      )}
    >
      <span>{count}</span>/<span>{label}</span>
    </div>
  );
}
