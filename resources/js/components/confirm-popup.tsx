import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmPopupProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmPopup({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: ConfirmPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Konfirmasi
          </Button>
        </div>
      </div>
    </div>
  );
}
