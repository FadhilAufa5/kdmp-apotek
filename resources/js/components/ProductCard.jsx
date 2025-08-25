import React from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, addToCart }) {
  const { name, price, stock, category, image, packaging, qty } = product;

  const isVitamin = category.toLowerCase().includes("vitamin");
  const isAntibiotik = category.toLowerCase().includes("antibiotik");

  return (
    <div className="border rounded-lg p-3 shadow-sm transition-colors">
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <div className="flex justify-between gap-5">
        <h3 className="font-semibold">{name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full
            ${isVitamin ? "bg-yellow-300 text-yellow-800" : ""}
            ${isAntibiotik ? "bg-green-300 text-green-800" : "bg-blue-100 text-blue-600"}`}
        >
          {category}
        </span>
      </div>

      <span className="text-xs text-muted-foreground">
        {packaging} - {qty}
      </span>

      <p className="text-base text-gray-500">
        Stok:{" "}
        {stock > 0 ? (
          <span className="text-sm font-semibold text-blue-600">{stock}</span>
        ) : (
          <span className="text-sm font-semibold text-red-600">HABIS</span>
        )}
      </p>

      <p className="text-xl font-bold text-blue-600 mt-2">
        Rp {price.toLocaleString()}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <button
          disabled={stock <= 0}
          onClick={() => addToCart(product)}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
            stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          }`}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}