"use client";

import { useToastStore } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          id={t.id} 
          title={t.title}
          description={t.description}
          variant={t.variant}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
