import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  UserX,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { route } from 'ziggy-js';
import axios from "axios";

export default function UsersPage({ users }: any) {
  const [open, setOpen] = useState(false);

  const { data, setData, post, reset, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    role: "busdev",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("users.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
        location.reload(); // reload supaya tabel update
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      axios.delete(route("users.destroy", id)).then(() => location.reload());
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      desc: "Active users in the system",
      icon: <Users className="text-blue-600" size={28} />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Admins",
      value: users.filter((u: any) => u.role === "super").length,
      desc: "Active admin users in the system",
      icon: <Shield className="text-green-600" size={28} />,
      bg: "bg-green-100",
    },
    {
      title: "Total Dormant",
      value: 0,
      desc: "Inactive users in the system",
      icon: <UserX className="text-red-600" size={28} />,
      bg: "bg-red-100",
    },
  ];

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      super: "bg-red-100 text-red-700",
      busdev: "bg-purple-100 text-purple-700",
      apotek: "bg-green-100 text-green-700",
    };
    return map[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <AppLayout>
      <Head title="User Management" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-gray-600">
              Manage user details, roles, and their permissions
            </p>
          </div>
          <Button
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            <UserPlus size={18} /> Create User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div
                    className={`p-3 rounded-full ${s.bg} flex items-center justify-center`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{s.value}</h3>
                    <p className="text-sm text-gray-500">{s.title}</p>
                    <p className="text-xs text-gray-400">{s.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4">Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any, idx: number) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadge(
                            u.role
                          )}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          active
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => (window.location.href = route('users.edit', u.id))}
                        >
                          <Pencil size={14} /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDelete(u.id)}
                        >
                          <Trash2 size={14} /> Delete
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <Label>Role</Label>
              <RadioGroup
                value={data.role}
                onValueChange={(val) => setData("role", val)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="super" id="super" />
                  <Label htmlFor="super">Super</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="busdev" id="busdev" />
                  <Label htmlFor="busdev">Busdev</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="apotek" id="apotek" />
                  <Label htmlFor="apotek">Apotek</Label>
                </div>
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={processing} className="bg-blue-600 text-white">
                {processing ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
