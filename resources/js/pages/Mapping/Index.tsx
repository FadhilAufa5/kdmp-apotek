import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  FileDown,
  Search,
  Info,
  Trash2,
  Link2,
} from "lucide-react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard/busdev" },
  { title: "Mapping", href: "/admin/mapping" },
];

export default function MappingUsers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [users, setUsers] = useState([
    {
      email: "koperasipurwokerto@kdmp.com",
      username: "PurwokertoMP",
      role: "Koperasi",
      status: "Mapped",
    },
    {
      email: "koperasibangka@kdmp.com",
      username: "BangkaMP",
      role: "Koperasi",
      status: "Not Mapped",
    },
    {
      email: "koperasipalu@kdmp.com",
      username: "PaluMP",
      role: "Koperasi",
      status: "Mapped",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "ALL" ||
      (filter === "MAPPED" && user.status === "Mapped") ||
      (filter === "NOT_MAPPED" && user.status === "Not Mapped");
    return matchSearch && matchFilter;
  });

  // Action handlers
  const handleMapping = (user: any) => {
    setSelectedUser(user);
    setShowDetail(true);
  };

  const handleDelete = (idx: number) => {
    setUsers(users.filter((_, i) => i !== idx));
  };

  const handleDetail = (user: any) => {
    setSelectedUser(user);
    setShowDetail(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mapping Users" />

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Mapping</h1>
            <p className="text-gray-600">Mapping Cooperation</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="w-4 h-4" /> Export
            </Button>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "ALL" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("ALL")}
            >
              All
            </Button>
            <Button
              variant={filter === "MAPPED" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("MAPPED")}
            >
              Mapped
            </Button>
            <Button
              variant={filter === "NOT_MAPPED" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("NOT_MAPPED")}
            >
              Not Mapped
            </Button>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <Table className="min-w-[600px]">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Gmail</TableHead>
                <TableHead className="font-semibold text-gray-700">Username</TableHead>
                <TableHead className="font-semibold text-gray-700">Role</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 break-words">{user.email}</TableCell>
                  <TableCell className="break-words">{user.username}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.status === "Mapped" ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Mapped
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                        Not Mapped
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 flex-wrap">
                    {user.status === "Mapped" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleDetail(user)}
                      >
                        <Info className="w-4 h-4" />
                        <span className="hidden sm:inline">Detail</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleMapping(user)}
                      >
                        <Link2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Mapping</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(i)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Footer */}
          <div className="px-4 py-3 text-sm text-gray-500 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>
              Showing 1 to {filteredUsers.length} of {users.length} results
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Prev
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Detail / Mapping Modal */}
        {showDetail && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-2 animate-fadeIn">
              <h2 className="text-lg font-bold mb-4">
                Mapping {selectedUser.email}
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Nama Koperasi</label>
                  <Input defaultValue="Koperasi Bangka Belitung Desa Mamuju" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Lokasi Koperasi</label>
                  <Input defaultValue="Jl. Simpang Payung No.3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium">Kelurahan</label>
                    <Input defaultValue="Air Bara" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Kecamatan</label>
                    <Input defaultValue="Air Gegas" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium">Provinsi</label>
                    <Input defaultValue="Bangka Selatan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Kode Pos</label>
                    <Input defaultValue="33782" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Cabang Kimia Farma</label>
                  <Input defaultValue="Kimia Farma Sungailiat" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <Button
                  variant="destructive"
                  onClick={() => setShowDetail(false)}
                >
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    setShowDetail(false);
                    setShowConfirm(true); // buka confirm modal
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Save Modal */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-2 animate-fadeIn">
              <h2 className="text-lg font-bold mb-3">Konfirmasi</h2>
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menyimpan perubahan mapping ini? Data lama akan diganti.
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowConfirm(false)}>
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    // update user jadi mapped
                    const updated = users.map((u) =>
                      u.email === selectedUser.email ? { ...u, status: "Mapped" } : u
                    );
                    setUsers(updated);
                    setShowConfirm(false);
                  }}
                >
                  Ya, Simpan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .min-w-[600px] { min-width: 100vw; }
        }
        .animate-fadeIn {
          animation: fadeIn .3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </AppLayout>
  );
}
