import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Users, Shield, ShoppingCart, Box, Map } from "lucide-react";
import { route } from "ziggy-js";

export default function SuperDashboard() {
  const cards = [
    {
      title: "Purchase Orders",
      desc: "Kelola semua order apotek",
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      link: route("purchase.index"),
    },
    {
      title: "Process Orders",
      desc: "Pantau progress delivery",
      icon: <Box className="w-8 h-8 text-purple-600" />,
      link: route("process.index"),
    },
    {
      title: "Mapping",
      desc: "Data dari admin busdev",
      icon: <Map className="w-8 h-8 text-green-600" />,
      link: route("mapping.index"),
    },
    {
      title: "Account Management",
      desc: "Tambah & kelola semua pengguna KDMP",
      icon: <Shield className="w-8 h-8 text-pink-600" />,
      link: route("super.users"),
    },
    {
      title: "User Management",
      desc: "Add, edit, and manage admin users",
      icon: <Users className="w-8 h-8 text-red-600" />,
      link: route("super.users"), // misal arahkan ke halaman yang sesuai
    },
  ];

  return (
    <AppLayout
      breadcrumbs={[{ title: "Dashboard", href: "/dashboard/super" }]}
    >
      <Head title="Super Admin Dashboard" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor semua aktivitas admin (Apotek & Busdev) dan kelola user
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <Card
              key={idx}
              className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = c.link)}
            >
              {c.icon}
              <div>
                <h2 className="font-bold text-lg">{c.title}</h2>
                <p className="text-sm text-gray-500">{c.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
