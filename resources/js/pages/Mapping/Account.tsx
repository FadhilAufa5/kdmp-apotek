import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard/busdev" },
  { title: "Account Management", href: "/admin/mapping" },
];

export default function MappingUsers() {
  const accounts = [
    {
      id: 1,
      name: "Koperasi Desa Alun Alun Purwokerto",
      submitted: "2025-08-21, 08:02:01 AM",
      contact: "Agus Setyawan",
      email: "koperasidesapurwokerto@kdmp.com",
      phone: "+6285664120442",
      status: "Pending",
      address: "Jalan Jenderal Sudirman No.23 KAV 4",
      kelurahan: "Sokanegara",
      kecamatan: "Purwokerto Timur",
      kabupaten: "Banyumas",
      provinsi: "Jawa Tengah",
    },
    {
      id: 2,
      name: "Koperasi Desa Bangka",
      submitted: "2025-08-20, 09:15:00 AM",
      contact: "Budi Santoso",
      email: "koperasibangka@kdmp.com",
      phone: "+6281234567890",
      status: "Approved",
      address: "Jl. Simpang Payung No.3",
      kelurahan: "Air Bara",
      kecamatan: "Air Gegas",
      kabupaten: "Bangka Selatan",
      provinsi: "Bangka Belitung",
    },
  ];

  const [filter, setFilter] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );
  const [search, setSearch] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject";
    account: any;
  } | null>(null);

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.status === filter &&
      acc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mapping Users" />

      <div className="flex flex-col gap-10 p-4 md:p-6">
        {/* ================== ACCOUNT MANAGEMENT ================== */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Account Management</h1>
            <p className="text-gray-600">
              Manage Incoming Cooperative Account to continue Mapping
            </p>
          </div>

          {/* Tabs Filter */}
          <div className="flex gap-3">
            {["Pending", "Approved", "Rejected"].map((s) => (
              <Button
                key={s}
                variant={filter === s ? "default" : "outline"}
                onClick={() => setFilter(s as any)}
              >
                {s} ({accounts.filter((a) => a.status === s).length})
              </Button>
            ))}
          </div>

          {/* Search + Date Filter */}
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Search by Cooperative name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center border rounded-md px-3 py-2 gap-2 text-gray-500">
              <Calendar size={18} />
              <span className="text-sm">mm/dd/yyyy</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((acc) => (
                <Card key={acc.id}>
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">{acc.name}</h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          acc.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : acc.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {acc.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Submitted on {acc.submitted}
                    </p>
                    <p className="text-sm">👤 {acc.contact}</p>
                    <p className="text-sm">📧 {acc.email}</p>
                    <p className="text-sm">📞 {acc.phone}</p>

                    <div className="flex gap-3 mt-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedAccount(acc)}
                      >
                        View Details
                      </Button>
                      {acc.status === "Pending" && (
                        <>
                          <Button
                            variant="default"
                            className="flex-1 bg-green-600"
                            onClick={() =>
                              setConfirmAction({ type: "approve", account: acc })
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() =>
                              setConfirmAction({ type: "reject", account: acc })
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No {filter} accounts found.</p>
            )}
          </div>
        </div>
      </div>

      {/* ================== DETAIL MODAL ================== */}
      <Dialog
  open={!!selectedAccount}
  onOpenChange={(open) => {
    if (!open) setSelectedAccount(null);
  }}
>
  <DialogContent className="max-w-2xl rounded-2xl shadow-lg">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-lg font-bold text-blue-600">
        <User className="w-5 h-5" /> Account Details
      </DialogTitle>
    </DialogHeader>

    {selectedAccount && (
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Nama Koperasi</label>
            <input
              type="text"
              value={selectedAccount.name}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Nama Pendaftar</label>
            <input
              type="text"
              value={selectedAccount.contact}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <input
              type="text"
              value={selectedAccount.email}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">No Telp</label>
            <input
              type="text"
              value={selectedAccount.phone}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Waktu Pendaftaran</label>
            <input
              type="text"
              value={selectedAccount.submitted}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Alamat</label>
            <textarea
              value={selectedAccount.address}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm resize-none"
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Kelurahan</label>
            <input
              type="text"
              value={selectedAccount.kelurahan}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Kecamatan</label>
            <input
              type="text"
              value={selectedAccount.kecamatan}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Kabupaten</label>
            <input
              type="text"
              value={selectedAccount.kabupaten}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Provinsi</label>
            <input
              type="text"
              value={selectedAccount.provinsi}
              readOnly
              className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </form>
    )}
  </DialogContent>
</Dialog>

      {/* ================== CONFIRMATION MODAL ================== */}
      <Dialog
        open={!!confirmAction}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
      >
        {confirmAction && (
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Konfirmasi {confirmAction.type === "approve" ? "Approve" : "Reject"}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">
              Apakah Anda yakin ingin{" "}
              <b>
                {confirmAction.type === "approve" ? "Menyetujui" : "Menolak"}
              </b>{" "}
              akun <b>{confirmAction.account.name}</b>?
            </p>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmAction(null)}>
                Batal
              </Button>
              <Button
                variant={confirmAction.type === "approve" ? "default" : "destructive"}
                onClick={() => {
                  // TODO: panggil API approve/reject di sini
                  setConfirmAction(null);
                }}
              >
                Ya, {confirmAction.type === "approve" ? "Setujui" : "Tolak"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </AppLayout>
  );
}
