import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { Link } from "@inertiajs/react";

const initialItems = [
  { name: "Paracetamol", exp: "18-07-2026", qty: 2, unitPrice: 15000, discount: 0, tax: 11, total: 16600 },
  { name: "Amoxilin", exp: "18-07-2026", qty: 9, unitPrice: 15000, discount: 0, tax: 11, total: 16600 },
];

export default function DeliveryOrder() {
  const { props }: any = usePage();
  const { id } = props;

  const [items, setItems] = useState(initialItems);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleEdit = (idx: number) => { setEditIndex(idx); setEditData(items[idx]); };
  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const newItems = [...items];
      newItems[editIndex] = editData;
      setItems(newItems);
      setEditIndex(null);
      setEditData(null);
    }
  };
  const handleDelete = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const handleSaveDO = () => setOpenSuccess(true);

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Process Orders", href: "/process" },
        { title: "Delivery Orders", href: "/process/delivery" },
      ]}
    >
      <Head title={`Delivery Order ${id}`} />

      <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold">Delivery Order {id}</h1>
        <p className="text-gray-500 dark:text-gray-400">Create Delivery Order for Purchase Orders</p>

        {/* Purchase Order Info */}
        <Card className="p-4 space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold">Purchase Order Informations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" value="Koperasi Desa Pejagalan" readOnly />
            <input className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" value="Kusnadie" readOnly />
            <input className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" value="Agus Praya" readOnly />
            <input className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" value="30" readOnly />
          </div>
        </Card>

        {/* Delivery Location */}
        <Card className="p-4 space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold">Delivery Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Jl. Jenderal Sudirman No. 21 KAV 3", "Jati", "Banyuwangi", "Jawa Tengah", "RT 11 / RW 12", "142510"].map((val, idx) => (
              <input key={idx} className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" value={val} readOnly />
            ))}
          </div>
        </Card>

        {/* Barang Pesanan */}
        <Card className="p-4 space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="font-semibold">Barang Pesanan</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-2 text-left">Nama Barang</th>
                  <th className="p-2">EXP Date</th>
                  <th className="p-2">Item QTY</th>
                  <th className="p-2">Price Unit</th>
                  <th className="p-2">Discount</th>
                  <th className="p-2">Tax</th>
                  <th className="p-2">Total Price</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.exp}</td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">Rp{item.unitPrice.toLocaleString()},00</td>
                    <td className="p-2">{item.discount}%</td>
                    <td className="p-2">{item.tax}%</td>
                    <td className="p-2">Rp{item.total.toLocaleString()},00</td>
                    <td className="p-2 flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(idx)}>
                        <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)}>
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Edit Modal */}
        <Dialog open={editIndex !== null} onOpenChange={() => { setEditIndex(null); setEditData(null); }}>
          <DialogContent className="dark:bg-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Edit Barang</DialogTitle>
            </DialogHeader>
            {editData && (
              <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
                {[
                  { label: "Nama Barang", value: editData.name, disabled: true },
                  { label: "EXP Date", value: editData.exp, disabled: true },
                  { label: "Item QTY", value: editData.qty, disabled: false, type: "number" },
                  { label: "Price Unit", value: editData.unitPrice, disabled: true },
                  { label: "Discount (%)", value: editData.discount, disabled: true },
                  { label: "Tax (%)", value: editData.tax, disabled: true },
                  { label: "Total Price", value: editData.total, disabled: true },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm mb-1">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      className={`border rounded p-2 w-full ${field.disabled ? "bg-gray-100 dark:bg-gray-700" : "dark:bg-gray-800 dark:text-gray-100"}`}
                      value={field.value}
                      disabled={field.disabled}
                      onChange={field.disabled ? undefined : e => setEditData({ ...editData, qty: Number(e.target.value) })}
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" type="button" onClick={() => { setEditIndex(null); setEditData(null); }}>Batal</Button>
                  <Button className="bg-blue-600 text-white" type="submit">Simpan</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Success Popup */}
        <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
          <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
                Berhasil Disimpan
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 dark:text-gray-300">
              Delivery Order berhasil disimpan ke sistem.
            </p>
            <DialogFooter>
              <Link href={route("process.order", id)}>
                <Button className="bg-green-600 text-white">OK</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Batal</Button>
          <Button className="bg-green-600 text-white" onClick={handleSaveDO}>Simpan DO</Button>
        </div>
      </div>
    </AppLayout>
  );
}
