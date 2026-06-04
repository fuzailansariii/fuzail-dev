import { ReactNode } from "react";

export default function CodeWindow({
  fileName,
  children,
}: {
  fileName: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-s1 border border-b1 rounded-xl overflow-hidden font-mono text-[13px]">
      {/* Window bar */}
      <div className="bg-s2 px-4 py-2 flex items-center gap-2 border-b border-b1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] tracking-wider text-t4">
          {fileName}
        </span>
      </div>
      <div className="p-5 leading-loose text-[11px] md:text-[12px] overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
