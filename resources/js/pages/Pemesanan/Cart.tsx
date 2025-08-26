import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { type BreadcrumbItem, CartItem } from '@/types';
import { ShoppingBag } from "lucide-react";


const breadcrumbs: BreadcrumbItem[] = [
    {
    title: 'Medicines',
    href: '/pemesanan/medicines',
  },
  {
    title: 'Cart',
    href: '/pemesanan/cart',
  },
];
export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (name: string, delta: number) => {
    const updated = cart
      .map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated)); // simpan lagi
  };

  const removeItem = (name: string) => {
    const updated = cart.filter((item) => item.name !== name);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ppn = subtotal * 0.11;
  const grandTotal = subtotal + ppn;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cart" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-84 text-gray-500">
            <ShoppingBag size={80} className="mb-4" />
            <p className="text-xl font-medium">Anda belum memesan barang apapun</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      {item.qty} | {item.packaging}
                    </p>
                    <p className="text-blue-600 font-bold">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.name, -1)}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
<div className="text-lg mt-6 space-y-2 w-80 ml-auto bg-blue-300 rounded-md p-4 ">
  <div className="grid grid-cols-2">
    <span>Sub Total :</span>
    <span className="text-right">Rp{subtotal.toLocaleString()}</span>
  </div>
  <div className="grid grid-cols-2">
    <span>PPn (11%) :</span>
    <span className="text-right">Rp{ppn.toLocaleString()}</span>
  </div>
  <div className="text-blue-800 grid grid-cols-2 text-xl font-bold mt-6">
    <span>Total :</span>
    <span className="text-right">Rp{grandTotal.toLocaleString()}</span>
  </div>
</div>

            <div className="text-right mt-10">
              <Link
                href={route('po')}
                className="mr-4 inline-block text-blue-600 hover:underline"
                >
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Checkout
              </button>
              </Link>
            </div>
          </div>
        )}

        <Link
          href="/pemesanan/medicines"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke katalog
        </Link>
      </div>
    </AppLayout>
  );
}