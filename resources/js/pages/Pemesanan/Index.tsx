import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { CartItem, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Medicines',
    href: '/pemesanan/medicines',
  },
];

export default function Index() {
  const products = [
    { name: "Paracetamol", price: 15000, stock: 21, qty:"250ml", category: "Obat", packaging:"Syrup", image: "https://placehold.co/400" },
    { name: "Vitamin C", price: 10000, stock: 200, qty:"10pcs", category: "Vitamin", packaging:"Kapsul", image: "https://placehold.co/400" },
    { name: "Amoxilin", price: 15000, stock: 0, qty:"250ml", category: "Antibiotik", packaging:"Syrup", image: "https://placehold.co/400" },
    { name: "Aspirin", price: 25000, stock: 25, qty:"15pcs", category: "Obat", packaging:"Tablet", image: "https://placehold.co/400" },
  ];

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [filters, setFilters] = useState({ categories: ["Semua Produk"], packages: ["Semua Package"] });
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔹 Hitung total item dalam cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 🔹 Load cart dari localStorage saat pertama kali render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 🔹 Fungsi Add to Cart
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name);
      let newCart;
      if (existing) {
        newCart = prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Simpan ke localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };
  

// 🔹 filter berdasarkan search
let filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

// ambil filter aktif (tanpa "Semua")
const activeCategories = filters.categories.filter((c) => c !== "Semua Produk");
const activePackages = filters.packages.filter((p) => p !== "Semua Package");

// 🔹 jika tidak ada filter → tampil semua
if (activeCategories.length === 0 && activePackages.length === 0) {
  // tidak diapa-apain, semua produk lolos
} else {
  filteredProducts = filteredProducts.filter((p) => {
    const matchCategory =
      activeCategories.length === 0 || activeCategories.includes(p.category);

    const matchPackage =
      activePackages.length === 0 || activePackages.includes(p.packaging);

    return matchCategory && matchPackage; // AND hanya kalau dua-duanya ada
  });
}

  // 🔹 sorting
  if (sortBy === "lowest") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  }



  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicines" />
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 w-full">
          <Filters onFilterChange={setFilters} />
        </div>

        {/* Product Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">Medicine Catalog</h1>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">A → Z</SelectItem>
                <SelectItem value="name-desc">Z → A</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
                <SelectItem value="highest">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Produk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p, i) => (
              <ProductCard key={i} product={p} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Floating Cart Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <a href="/pemesanan/cart" className="relative">
          <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <ShoppingCart size={24} className="sm:size-8" />
          </button>

          {/* 🔹 Badge jumlah item */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </a>
      </div>
    </AppLayout>
  );
}