"use client";

import { create } from "zustand";

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "destructive";
};

type ToastStore = {
  toasts: ToastType[];
  toast: (t: Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
};

let counter = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  toast: (t) => {
    const id = (++counter).toString();
    set((state) => ({ toasts: [...state.toasts, { id, ...t }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 4000); // auto close
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
