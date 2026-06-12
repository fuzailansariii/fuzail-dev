"use client";

import { KeyboardEvent, useState } from "react";
import { X } from "lucide-react";
import Button from "./button";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  max?: number;
}

export default function TagsInput({
  value,
  onChange,
  max = 10,
}: TagsInputProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed) && value.length < max) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div>
      <label className="block font-mono font-bold text-[10px] uppercase tracking-widest text-t4 mb-1.5">
        Tech Stack Tags
      </label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="React, Three.js, GLSL..."
          className="w-full bg-bg border border-b2 rounded text-tx font-mono text-[13px] px-3.5 py-2.5 focus:outline-none focus:border-v2 focus:ring-1 focus:ring-v1/30 transition-all placeholder:text-t4"
        />
        <button
          onClick={add}
          className="px-7 py-2.5 shrink-0 bg-v1 text-white hover:bg-[#6d28d9] hover:shadow-[0_10px_32px_rgba(124,58,237,0.45)] rounded font-mono-ui text-[10px] uppercase tracking-[0.12em] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg border border-b2 rounded text-[10px] font-mono uppercase tracking-widest text-t2"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                className="text-t4 hover:text-tx transition-colors"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
