<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class PurchaseOrderController extends Controller
{
   public function index(){
       return Inertia::render('Purchase/Index', []);
      
   }

 public function show($id)
    {
        // Dummy data
        $purchaseOrders = [
            "PO 001" => [
                "id" => "PO 001",
                "koperasi" => "Koperasi Desa Purwokerto",
                "pengentri" => "Agus Praya",
                "date" => "18-08-2025",
                "qty" => 12,
                "price" => 199800,
                "status" => "Pending",
                "products" => [
                    ["name" => "Paracetamol 500ml", "qty" => 7, "unitPrice" => 15000, "subtotal" => 105000],
                    ["name" => "Amoxilin 500ml", "qty" => 5, "unitPrice" => 15000, "subtotal" => 75000],
                ],
            ],
            "PO 002" => [
                "id" => "PO 002",
                "koperasi" => "Koperasi Sehat Makmur",
                "pengentri" => "Budi Santoso",
                "date" => "20-08-2025",
                "qty" => 8,
                "price" => 125000,
                "status" => "Accepted",
                "products" => [
                    ["name" => "Vitamin C 1000mg", "qty" => 3, "unitPrice" => 25000, "subtotal" => 75000],
                    ["name" => "Masker Medis", "qty" => 5, "unitPrice" => 10000, "subtotal" => 50000],
                ],
            ],
        ];

        // Cari PO berdasarkan ID
        $purchaseOrder = $purchaseOrders[$id] ?? null;

        if (!$purchaseOrder) {
            abort(404, "Purchase Order not found");
        }

        return inertia('Purchase/Show', [
            'purchaseOrder' => $purchaseOrder
        ]);
    }




}
