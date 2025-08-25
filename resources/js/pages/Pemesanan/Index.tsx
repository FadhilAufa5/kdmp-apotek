import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Medicines',
        href: 'pemesanan/medicines',
    },
];



export default function Index() {
      const products = [
    {
      name: "Paracetamol",
      price: 15000,
      stock: 21,
      category: "Obat",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Vitamin C",
      price: 10000,
      stock: 200,
      category: "Vitamin",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Amoxilin",
      price: 15000,
      stock: 0,
      category: "Obat",
      image: "https://via.placeholder.com/150",
    },
  ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Medicines" />
    <div className="flex gap-6 p-6">
      {/* Sidebar */}
      <Filters />

      {/* Product Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Medicine Catalog</h1>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-1/2 border px-3 py-2 rounded-md"
          />
          <select className="border px-3 py-2 rounded-md">
            <option>Most Relevant</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </div>
        </AppLayout>
    );
}
