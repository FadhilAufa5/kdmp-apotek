import React, { useState, useEffect } from "react";

export default function Filters({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState(["Semua Produk"]);
  const [selectedPackages, setSelectedPackages] = useState(["Semua Package"]);

  const categories = ["Semua Produk", "Obat", "Vitamin", "Antibiotik"];
  const packages = ["Semua Package", "Tablet", "Kapsul", "Syrup"];

  // 🔹 logic toggle categories
  const toggleCategory = (cat) => {
    if (cat === "Semua Produk") {
      setSelectedCategories(["Semua Produk"]); // reset semua, hanya aktif ini
    } else {
      let newSelection = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories.filter((c) => c !== "Semua Produk"), cat];

      // kalau tidak ada yang dipilih, fallback ke "Semua Produk"
      if (newSelection.length === 0) {
        newSelection = ["Semua Produk"];
      }
      setSelectedCategories(newSelection);
    }
  };

  // 🔹 logic toggle packages
  const togglePackage = (pack) => {
    if (pack === "Semua Package") {
      setSelectedPackages(["Semua Package"]);
    } else {
      let newSelection = selectedPackages.includes(pack)
        ? selectedPackages.filter((p) => p !== pack)
        : [...selectedPackages.filter((p) => p !== "Semua Package"), pack];

      if (newSelection.length === 0) {
        newSelection = ["Semua Package"];
      }
      setSelectedPackages(newSelection);
    }
  };

  // 🔹 setiap kali filter berubah, kirim ke parent
  useEffect(() => {
    onFilterChange({ categories: selectedCategories, packages: selectedPackages });
  }, [selectedCategories, selectedPackages]);

  return (
    <div className="w-64 p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Packaging */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Packaging</h3>
        <ul className="space-y-1">
          {packages.map((pack) => (
            <li key={pack}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPackages.includes(pack)}
                  onChange={() => togglePackage(pack)}
                />
                {pack}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Harga */}
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