import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Clock, CheckCircle, XCircle, ListChecks, Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard/busdev" },
];

export default function DashboardOrders() {
  const { auth }: any = usePage().props;
  const adminName = auth?.user?.name || "Admin";
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = { total: 5, pending: 2, accepted: 2, rejected: 1 };

  const recentOrders = [
    { id: "PO 001", koperasi: "Koperasi Desa Purwokerto", price: 199800, status: "Pending" },
    { id: "PO 002", koperasi: "Koperasi Desa Purworejo", price: 214900, status: "Accepted" },
    { id: "PO 003", koperasi: "Koperasi Desa Bangka Belitung", price: 68900, status: "Accepted" },
    { id: "PO 004", koperasi: "Koperasi Desa Aceh", price: 421600, status: "Pending" },
    { id: "PO 005", koperasi: "Koperasi Desa Solo", price: 9900, status: "Rejected" },
  ];

  const notifications = [
    { message: "New urgent purchase order from Koperasi Desa Aceh", time: "9:12:45 AM" },
    { message: "Koperasi Desa Ngawi telah menunggu 5 Hari semenjak PO", time: "5:06:12 AM" },
    { message: "2 Unit Koperasi berhasil diterima pagi ini", time: "2:11:26 AM" },
  ];

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statsIcons = [
    <ListChecks className="text-blue-600 mb-2" size={32} />,
    <Clock className="text-yellow-600 mb-2" size={32} />,
    <CheckCircle className="text-green-600 mb-2" size={32} />,
    <XCircle className="text-red-600 mb-2" size={32} />,
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Orders" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-x-auto">

        {/* Header + Notifications */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Selamat Datang, {adminName}! 👋</h1>
            <p className="text-gray-600">
              Semoga harimu menyenangkan! Berikut ringkasan pesanan koperasi hari ini.
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center gap-2 relative"
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
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10 p-4">
                <h3 className="text-sm font-bold mb-3">Notifications</h3>
                <div className="flex flex-col gap-3">
                  {notifications.map((notif, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <Clock className="text-gray-500" size={18} />
                      <div>
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-gray-400">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(stats).map((key, idx) => (
            <motion.div
              key={key}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
            >
              <Card className="cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  {statsIcons[idx]}
                  <h3 className="text-lg font-bold">{Object.values(stats)[idx]}</h3>
                  <p className="text-gray-500 text-sm capitalize">{key} Orders</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4">Recent Purchase Orders</h3>
            <div className="flex flex-col gap-3">
              {recentOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <ListChecks size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.koperasi}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      Rp {order.price.toLocaleString("id-ID")},00
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
 