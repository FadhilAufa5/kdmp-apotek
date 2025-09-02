// components/AccountDetailsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Landmark,
} from "lucide-react";

interface Account {
  id: number;
  name: string;
  submitted: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  kelurahan: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
}

interface AccountDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  account: Account | null;
}

export default function AccountDetailsDialog({
  open,
  onClose,
  account,
}: AccountDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
            <User className="w-6 h-6 text-blue-600" />
            Account Details
          </DialogTitle>
        </DialogHeader>

        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Building className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Nama Koperasi</p>
                  <p className="font-medium">{account.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <User className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Nama Pendaftar</p>
                  <p className="font-medium">{account.contact}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Email Pendaftar</p>
                  <p className="font-medium">{account.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">No. Telepon</p>
                  <p className="font-medium">{account.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Waktu Pendaftaran</p>
                  <p className="font-medium">{account.submitted}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Alamat Koperasi</p>
                  <p className="font-medium">{account.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Landmark className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Kelurahan</p>
                  <p className="font-medium">{account.kelurahan}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Landmark className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Kecamatan</p>
                  <p className="font-medium">{account.kecamatan}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Landmark className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Kabupaten</p>
                  <p className="font-medium">{account.kabupaten}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Landmark className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Provinsi</p>
                  <p className="font-medium">{account.provinsi}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
