import React, { useState } from "react";

export default function Filters() {
  const [selectedCategories, setSelectedCategories] = useState(["Semua Produk"]);
  const [selectedPackages, setSelectedPackages] = useState(["Semua Package"]);

  const categories = ["Semua Produk", "Obat", "Vitamin & Suplemen", "Antibiotik"];
  const packages = ["Semua Package", "Tablet", "Kapsul", "Syrup"];

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <div className="w-64 p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleSelection(selectedCategories, setSelectedCategories, cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Packaging</h3>
        <ul className="space-y-1">
          {packages.map((pack) => (
            <li key={pack}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPackages.includes(pack)}
                  onChange={() => toggleSelection(selectedPackages, setSelectedPackages, pack)}
                />
                {pack}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Range Harga</h3>
        <input type="range" min="0" max="1000000" className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0</span>
          <span>1.000.000</span>
        </div>
      </div>
    </div>
  );
}