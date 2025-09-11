import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText } from "lucide-react";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmPopup from "@/components/confirm-popup";
import { useToastStore } from "@/components/ui/use-toast";

export default function PurchaseOrderDetail({ purchaseOrder }: any) {
  const [status, setStatus] = useState(purchaseOrder.status || "Process");
  const [hasDO, setHasDO] = useState(purchaseOrder.hasDeliveryOrder || false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { toast } = useToastStore();

  const handleCreateDO = () => {
    setHasDO(true);
    setStatus("On Delivery");
    toast({
      title: "Delivery Order berhasil dibuat",
      description: `DO untuk Purchase Order ${purchaseOrder.id} telah dibuat.`,
      variant: "success",
    });
  };

  const statusClass =
    status === "On Delivery"
      ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      : status === "Received"
      ? "bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300"
      : status === "Rejected"
      ? "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300"
      : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Purchase Orders", href: "/purchase-orders" },
        { title: purchaseOrder.id, href: "#" },
      ]}
    >
      <Head title={`Purchase Order ${purchaseOrder.id}`} />

      <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{`Purchase Orders ${purchaseOrder.id}`}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Detail View of Selected Purchase Orders
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${statusClass}`}>
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">{status.toUpperCase()}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-semibold mb-3">Order Information</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Purchase Order ID", value: purchaseOrder.id },
                  { label: "Nama Koperasi", value: purchaseOrder.koperasi },
                  { label: "Tanggal Order", value: purchaseOrder.date },
                  { label: "Nama Pengentri", value: purchaseOrder.pengentri },
                ].map((info, idx) => (
                  <div key={idx}>
                    <p className="text-gray-500 dark:text-gray-400">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Products */}
            <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-semibold mb-3">
                Products ({purchaseOrder.products.length} Items)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="p-2 text-left">Product Name</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right">Sub Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {purchaseOrder.products.map((p: any, i: number) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-2">{p.name}</td>
                        <td className="p-2 text-center">{p.qty}</td>
                        <td className="p-2 text-right">
                          Rp {p.unitPrice.toLocaleString("id-ID")}
                        </td>
                        <td className="p-2 text-right">
                          Rp {p.subtotal.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3 text-sm">
                <div className="font-semibold">
                  Sub Total Value: Rp {purchaseOrder.subtotal.toLocaleString("id-ID")}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card className="p-4 space-y-3 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-semibold">Delivery Information</h2>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium">Tujuan Delivery</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {purchaseOrder.delivery_address}
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-gray-600 dark:text-gray-400">1–2 Business Days</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Delivery Order Create Date
                  </p>
                  <p className="font-medium">{hasDO ? purchaseOrder.date : "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Received Date</p>
                  <p className="font-medium">-</p>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-4 space-y-2 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-semibold">Order Summary</h2>
              {[
                { label: "Total Products", value: purchaseOrder.products.length },
                { label: "Total Quantity", value: purchaseOrder.qty },
                {
                  label: "Sub Total Order",
                  value: `Rp ${purchaseOrder.subtotal.toLocaleString("id-ID")}`,
                },
                {
                  label: "PPN (11%)",
                  value: `Rp ${purchaseOrder.ppn.toLocaleString("id-ID")}`,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
              <hr className="my-2 border-gray-200 dark:border-gray-600" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Value</span>
                <span>Rp {purchaseOrder.price.toLocaleString("id-ID")}</span>
              </div>

              {status === "Process" && !hasDO && (
                <>
                  <Button
                    onClick={() => setOpenConfirm(true)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Buat Delivery Order
                  </Button>

                  <ConfirmPopup
                    open={openConfirm}
                    onClose={() => setOpenConfirm(false)}
                    onConfirm={handleCreateDO}
                    title="Buat Delivery Order"
                    description={`Apakah Anda yakin ingin membuat Delivery Order untuk PO ${purchaseOrder.id}?`}
                  />
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
