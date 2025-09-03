import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { route } from "ziggy-js";

export default function UserEdit({ user }: any) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("users.update", user.id));
  };

  const handleCancel = () => {
    window.location.href = route("super.users"); // kembali ke halaman daftar user
  };

  return (
    <AppLayout>
      <Head title="Edit User" />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
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
            <Label htmlFor="password">Password (kosongkan jika tidak ingin diubah)</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
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

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              className="bg-blue-600 text-white"
              disabled={processing}
            >
              {processing ? "Updating..." : "Update"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
