import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Search, Filter, Eye, Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const mockPOs = [
  {
    id: "PO 001",
    koperasi: "Koperasi Desa Purwokerto",
    pengentri: "Agus Praya",
    date: "18-08-2025",
    qty: 12,
    price: 199800,
    status: "Pending",
    products: [
      { name: "Paracetamol 500ml", qty: 7, unitPrice: 15000, subtotal: 105000 },
      { name: "Amoxilin 500ml", qty: 5, unitPrice: 15000, subtotal: 75000 },
    ],
  },
  {
    id: "PO 002",
    koperasi: "Koperasi Sehat Makmur",
    pengentri: "Budi Santoso",
    date: "20-08-2025",
    qty: 8,
    price: 125000,
    status: "Accepted",
    products: [
      { name: "Vitamin C 1000mg", qty: 3, unitPrice: 25000, subtotal: 75000 },
      { name: "Masker Medis", qty: 5, unitPrice: 10000, subtotal: 50000 },
    ],
  },
];

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function PurchaseOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [pos, setPos] = useState(mockPOs);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);

  const filteredPOs = pos.filter((po) => {
    const matchSearch = po.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || po.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleReject = (poId: string) => {
    setSelectedPO(poId);
    setModalOpen(true);
  };

  const confirmReject = () => {
    if (selectedPO) {
      setPos((prev) =>
        prev.map((po) =>
          po.id === selectedPO ? { ...po, status: "Rejected" } : po
        )
      );
      setSelectedPO(null);
      setModalOpen(false);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Purchase Orders", href: "/purchase-orders" }]}>
      <Head title="Purchase Orders" />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <p className="text-gray-500">Manage incoming purchase orders from cooperation</p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by PO ID..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">PO ID</th>
                <th className="p-3 text-left">Nama Koperasi</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Item QTY</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{po.id}</td>
                  <td className="p-3">{po.koperasi}</td>
                  <td className="p-3">{po.date}</td>
                  <td className="p-3">{po.qty}</td>
                  <td className="p-3">Rp{po.price.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[po.status as keyof typeof statusColor]}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link href={route("purchase.show", po.id)}>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Button>
                    </Link>

                    <Button variant="ghost" size="icon">
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => handleReject(po.id)}>
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Reject Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Purchase Order</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to reject PO {selectedPO}?</p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmReject}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
