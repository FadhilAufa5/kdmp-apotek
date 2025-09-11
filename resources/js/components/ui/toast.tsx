"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
  success:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800",
  destructive:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800",
};

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
  onClose: (id: string) => void;
}

export function Toast({ id, title, description, variant = "default", onClose }: ToastProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-start justify-between gap-3 rounded-md border p-4 shadow-lg",
        variants[variant]
      )}
    >
      <div className="grid gap-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
