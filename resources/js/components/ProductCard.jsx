import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { name, price, stock, category, image } = product;
  const [quantity, setQuantity] = useState(0);

  const isVitamin = category.toLowerCase().includes("vitamin");

  return (
    <div
      className="border rounded-lg p-3 shadow-sm transition-colors"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <div className="flex justify-between gap-5 mb-2">
      <h3 className="font-semibold">{name}</h3>
      <span className={`text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full ${isVitamin ? "bg-yellow-300 text-yellow-800" : ""}`}>
        {category}
      </span>
      </div>
      <p className="text-sm text-muted-foreground">Stock: {stock > 0 ? stock : "HABIS"}</p>
      <p className="font-bold text-blue-600">Rp{price.toLocaleString()}</p>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => setQuantity(Math.max(0, quantity - 1))}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => stock > quantity && setQuantity(quantity + 1)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
        <button
          disabled={stock <= 0}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
            stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          }`}
        >
          <ShoppingCart size={16} /> Add
        </button>
      </div>
    </div>
  );
}