"use client";

import { createPortal } from "react-dom";
import Button from "./button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  variant?: "danger" | "default";
}

export default function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  variant = "danger",
}: ConfirmDialogProps) {
  const content = (
    <div
      className="fixed inset-0 z-60 bg-bg/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-s1 border border-b1 rounded-sm w-full max-w-[400px] p-6 flex flex-col gap-5">
        <div>
          <h3 className="font-heading font-black text-lg uppercase tracking-tight text-tx">
            {title}
          </h3>
          <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-t2">
            {description}
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            title={cancelLabel}
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
          />
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 rounded font-mono text-[10px] uppercase tracking-[0.12em] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              variant === "danger"
                ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500"
                : "bg-v1 border border-v1 text-white hover:bg-v2"
            }`}
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
