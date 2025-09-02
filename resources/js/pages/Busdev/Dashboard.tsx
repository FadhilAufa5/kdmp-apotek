import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Map,
  FolderX,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function DashboardAccounts() {
  const { auth }: any = usePage().props;
  const adminName = auth?.user?.name || "Admin";
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy stats sesuai layout gambar
  const stats = [
    { label: "Total Cooperative Account", value: 6, icon: <ShoppingCart className="text-blue-600" size={28} /> },
    { label: "Total Pending Accounts", value: 4, icon: <Clock className="text-yellow-600" size={28} /> },
    { label: "Total Accepted Accounts", value: 6, icon: <CheckCircle className="text-green-600" size={28} /> },
    { label: "Total Rejected Accounts", value: 6, icon: <XCircle className="text-red-600" size={28} /> },
  ];

  const extraStats = [
    { label: "Todays Cooperative Account", value: 6, icon: <Calendar className="text-purple-600" size={28} /> },
    { label: "Total Mapped Account", value: 6, icon: <Map className="text-green-600" size={28} /> },
    { label: "Total Not Mapped Account", value: 6, icon: <FolderX className="text-yellow-600" size={28} /> },
  ];

  const recentOrders = [
    {
      status: "Accepted",
      message: "Berhasil menerima Akun Koperasi Desa Purwokerto",
      date: "21 Agustus 2025, 9:20:21 AM",
    },
    {
      status: "Rejected",
      message:
        "Berhasil menolak Akun Koperasi Desa Purwokerto dengan Alasan Kode pos tidak sesuai",
      date: "20 Agustus 2025, 1:31:02 PM",
    },
    {
      status: "Accepted",
      message: "Berhasil menerima Akun Koperasi Desa Purworejo",
      date: "18 Agustus 2025, 8:40:01 AM",
    },
  ];

  const notifications = [
    { message: "Terdapat 5 Account Not Mapped", time: "9:12:45 AM" },
    { message: "Terdapat 3 Akun yang baru mendaftar", time: "5:06:12 AM" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Accounts" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-x-auto">
        {/* Header dengan Button Notifikasi */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Selamat Datang, {adminName}! 👋</h1>
            <p className="text-gray-600">
              Berikut ringkasan akun koperasi dan aktivitas terbaru.
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
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50"
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

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                {item.icon}
                <h3 className="text-lg font-bold mt-2">{item.value}</h3>
                <p className="text-gray-500 text-sm text-center">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extra Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {extraStats.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                {item.icon}
                <h3 className="text-lg font-bold mt-2">{item.value}</h3>
                <p className="text-gray-500 text-sm text-center">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Recent Purchase Orders</h3>
              <div className="flex flex-col gap-3">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 border rounded-lg ${
                      order.status === "Accepted"
                        ? "bg-green-50"
                        : order.status === "Rejected"
                        ? "bg-red-50"
                        : "bg-gray-50"
                    }`}
                  >
                    {order.status === "Accepted" ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <div>
                      <p className="text-sm font-medium">{order.message}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}