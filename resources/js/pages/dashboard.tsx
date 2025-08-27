import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react"; // ⬅️ tambahin usePage
import { Clock, CheckCircle, XCircle, ListChecks } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function DashboardOrders() {
  const { auth }: any = usePage().props; 
  const adminName = auth?.user?.name || "Admin"; // fallback kalau tidak ada nama

  // Dummy data untuk orders
  const stats = {
    total: 6,
    pending: 2,
    accepted: 2,
    rejected: 1,
  };

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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Orders" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-x-auto">
        
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Selamat Datang, {adminName}! 👋
          </h1>
          <p className="text-gray-600">
            Semoga harimu menyenangkan!  Berikut ringkasan pesanan koperasi hari ini.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <ListChecks className="text-blue-600 mb-2" size={32} />
              <h3 className="text-lg font-bold">{stats.total}</h3>
              <p className="text-gray-500 text-sm">Total Orders Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Clock className="text-yellow-600 mb-2" size={32} />
              <h3 className="text-lg font-bold">{stats.pending}</h3>
              <p className="text-gray-500 text-sm">Pending Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <CheckCircle className="text-green-600 mb-2" size={32} />
              <h3 className="text-lg font-bold">{stats.accepted}</h3>
              <p className="text-gray-500 text-sm">Accepted Orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <XCircle className="text-red-600 mb-2" size={32} />
              <h3 className="text-lg font-bold">{stats.rejected}</h3>
              <p className="text-gray-500 text-sm">Rejected Orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Recent Purchase Orders</h3>
              <div className="flex flex-col gap-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
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
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-4">Notifications</h3>
              <div className="flex flex-col gap-3">
                {notifications.map((notif, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="text-gray-500">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-gray-400">{notif.time}</p>
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
