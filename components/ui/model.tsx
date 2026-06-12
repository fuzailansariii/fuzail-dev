"use client";
import { useEffect } from "react";
import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import {
  projectSchema,
  ProjectFormData,
} from "@/lib/validation/validation.projects";
import { Project } from "@/src/db/schema";
import StatusIndicator from "./status-indicator";
import FormInput from "./input";
import StatusSelect from "./status-select";
import TagsInput from "./tags-input";
import Button from "./button";

interface ModalProps {
  mode: "create" | "edit";
  project?: Project | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function Model({
  mode,
  project,
  onClose,
  onSuccess,
}: ModalProps) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues:
      isEdit && project
        ? {
            title: project.title,
            subHeading: project.subHeading ?? "",
            description: project.description,
            tags: project.tags,
            status: project.status as "live" | "in_progress",
            type: project.type,
            category: project.category ?? "",
            githubUrl: project.githubUrl ?? "",
            liveUrl: project.liveUrl ?? "",
            featured: project.featured,
          }
        : {
            title: "",
            subHeading: "",
            description: "",
            tags: [],
            status: "live",
            type: "client",
            category: "",
            githubUrl: "",
            liveUrl: "",
            featured: false,
          },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (isEdit && project) {
        await axios.patch(`/api/projects/admin/${project.id}`, data);
        toast.success("Project updated");
      } else {
        await axios.post("/api/projects/admin", data);
        toast.success("Project created");
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unexpected error. Try again.");
      }
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
      }}
      className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-s1 border border-b1 rounded-t-xl sm:rounded-sm w-full sm:max-w-[600px] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              <StatusIndicator
                label="fuzail.in / admin"
                className="text-[11px] lowercase"
              />
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-tx">
                {isEdit ? "Edit Project." : "Add Project."}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-t4 hover:text-tx transition-colors mt-1 p-1 -mr-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormInput
              label="Project Title"
              placeholder="E.G. NEURAL FLOW"
              error={errors.title?.message}
              {...register("title")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Sub Heading"
                placeholder="EDUCATION PLATFORM"
                error={errors.subHeading?.message}
                {...register("subHeading")}
              />
              <FormInput
                label="Category"
                placeholder="E.G. WEB DEVELOPMENT"
                error={errors.category?.message}
                {...register("category")}
              />
            </div>

            <FormInput
              label="Description"
              textarea
              placeholder="Write a detailed technical breakdown..."
              error={errors.description?.message}
              {...register("description")}
            />

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsInput value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.tags && (
              <p className="-mt-2 font-mono text-[10px] text-red-400">
                {errors.tags.message}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <StatusSelect value={field.value} onChange={field.onChange} />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block font-mono font-bold text-[10px] uppercase tracking-widest text-t4 mb-1.5">
                      Type
                    </label>
                    <div className="flex rounded border border-b2 overflow-hidden">
                      {(["client", "personal"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => field.onChange(t)}
                          className={`flex-1 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                            field.value === t
                              ? "bg-v1 text-white"
                              : "bg-bg text-t3 hover:text-tx"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="GitHub Repository (Optional)"
                placeholder="https://github.com/..."
                error={errors.githubUrl?.message}
                {...register("githubUrl")}
              />
              <FormInput
                label="Live URL (Optional)"
                placeholder="https://..."
                error={errors.liveUrl?.message}
                {...register("liveUrl")}
              />
            </div>

            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between py-4 border-t border-b1">
                  <div>
                    <p className="font-mono font-bold text-[10px] uppercase tracking-widest text-t4">
                      Featured Project
                    </p>
                    <p className="font-mono text-[11px] text-t3 mt-0.5">
                      Pin this to the top of your portfolio grid
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
                      field.value ? "bg-v1" : "bg-b2"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                        field.value ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              )}
            />

            <Button
              title={
                isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update Project"
                    : "Create Project"
              }
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5"
            />
          </form>
        </div>
      </div>
    </motion.div>
  );

  return createPortal(content, document.body);
}
