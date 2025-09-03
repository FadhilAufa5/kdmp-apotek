import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Users, Shield, ShoppingCart, Box, Map } from "lucide-react";
import { route } from "ziggy-js";
import { motion } from "framer-motion";

interface AuthProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
}

export default function SuperDashboard() {
  const { auth } = usePage<AuthProps>().props;
  const adminName = auth?.user?.name || "Admin";

  const cards = [
    {
      title: "Purchase Orders",
      desc: "Kelola semua order apotek",
      icon: <ShoppingCart className="w-10 h-10 text-blue-600" />,
      link: route("purchase.index"),
    },
    {
      title: "Process Orders",
      desc: "Pantau progress delivery",
      icon: <Box className="w-10 h-10 text-purple-600" />,
      link: route("process.index"),
    },
    {
      title: "Mapping",
      desc: "Data dari admin busdev",
      icon: <Map className="w-10 h-10 text-green-600" />,
      link: route("mapping.index"),
    },
    {
      title: "Account Management",
      desc: "Tambah & kelola semua pengguna KDMP",
      icon: <Shield className="w-10 h-10 text-pink-600" />,
      link: route("super.users"),
    },
    {
      title: "User Management",
      desc: "Add, edit, and manage admin users",
      icon: <Users className="w-10 h-10 text-red-600" />,
      link: route("super.users"),
    },
  ];

  return (
    <AppLayout
      breadcrumbs={[{ title: "Dashboard", href: "/dashboard/super" }]}
    >
      <Head title="Super Admin Dashboard" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Selamat Datang, {adminName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Berikut ringkasan aktivitas hari ini.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="p-6 flex items-center gap-4 cursor-pointer bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow rounded-xl"
                onClick={() => (window.location.href = c.link)}
              >
                {c.icon}
                <div>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {c.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {c.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
