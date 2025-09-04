import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingCart,
  CheckCircle,
  XCircle,
  Package,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function DashboardApotek() {
  const { auth }: any = usePage().props;
  const apotekName = auth?.user?.name || "Apotek";
  const [showNotifications, setShowNotifications] = useState(false);

  // Stats utama
  const stats = [
    { label: "Total Pesanan", value: 12, icon: <ShoppingCart className="text-blue-600" size={28} /> },
    { label: "Pesanan Selesai", value: 8, icon: <CheckCircle className="text-green-600" size={28} /> },
    { label: "Pesanan Ditolak", value: 2, icon: <XCircle className="text-red-600" size={28} /> },
    { label: "Stok Obat", value: 56, icon: <Package className="text-purple-600" size={28} /> },
  ];

  // Notifikasi
  const notifications = [
    { message: "2 pesanan baru menunggu konfirmasi", time: "09:10 AM" },
    { message: "Stok Paracetamol menipis", time: "07:55 AM" },
  ];

  // Pesanan terbaru
  const recentOrders = [
    {
      status: "Selesai",
      message: "Pesanan #INV-2025 berhasil diproses",
      date: "04 Sept 2025, 10:20 AM",
    },
    {
      status: "Ditolak",
      message: "Pesanan #INV-2024 ditolak (stok habis)",
      date: "03 Sept 2025, 09:05 AM",
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Apotek" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 dark:bg-gray-950 dark:text-gray-100">
        
        {/* Header + Notifications */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Selamat Datang, {apotekName}! 🏥
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Berikut ringkasan aktivitas apotek Anda.
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center gap-2 relative dark:border-gray-700 dark:text-gray-200"
            >
              <Bell size={20} />
              Notifikasi
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 p-4">
                <h3 className="text-sm font-bold mb-3 dark:text-gray-200">
                  Notifications
                </h3>
                <div className="flex flex-col gap-3">
                  {notifications.map((notif, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition"
                    >
                      <span className="text-xs text-gray-400">
                        {notif.time}
                      </span>
                      <p className="text-sm">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
            >
              <Card className="dark:bg-gray-900 dark:border-gray-700 cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  {item.icon}
                  <h3 className="text-lg font-bold mt-2">{item.value}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4">Pesanan Terbaru</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2 text-sm font-semibold">Status</th>
                    <th className="px-4 py-2 text-sm font-semibold">Pesan</th>
                    <th className="px-4 py-2 text-sm font-semibold">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                    >
                      <td className="px-4 py-2 flex items-center gap-2">
                        {order.status === "Selesai" ? (
                          <CheckCircle className="text-green-600" size={18} />
                        ) : (
                          <XCircle className="text-red-600" size={18} />
                        )}
                        <span className="text-sm font-medium">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">{order.message}</td>
                      <td className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
