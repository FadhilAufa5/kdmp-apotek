import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ open, onClose }: SuccessPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-6 h-6" />
            Berhasil Disimpan
          </DialogTitle>
        </DialogHeader>
        <div className="text-gray-600">
          Delivery Order berhasil disimpan ke sistem.
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
