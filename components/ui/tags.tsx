import React from "react";

export default function Tag({ tag }: { tag: string }) {
  return (
    <span className="rounded-sm border border-v3/20 bg-v4/9 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.06em] text-v4/70">
      {tag}
    </span>
  );
}
