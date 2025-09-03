<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ProcessOrderController extends Controller
{
    public function index()
    {
        // Halaman daftar Process Orders
        return Inertia::render('Process/Index');
    }
    
    public function order($id)
    {
       
        $purchaseOrder = [
            "id" => $id,
            "koperasi" => "Koperasi Desa Purwokerto",
            "date" => "2025-08-18",
            "pengentri" => "Agus Praya",
            "qty" => 12,
            "status" => "Process",
            "delivery_address" => "Jl. Jenderal Sudirman No. 21 KAV 3, Jati, Banyuwangi",
            "products" => [
                [
                    "name" => "Paracetamol",
                    "qty" => 2,
                    "unitPrice" => 15000,
                    "subtotal" => 30000,
                ],
                [
                    "name" => "Amoxilin",
                    "qty" => 9,
                    "unitPrice" => 15000,
                    "subtotal" => 135000,
                ],
            ],
            "subtotal" => 165000,
            "ppn" => 18150,
            "price" => 183150,
            "hasDeliveryOrder" => false,
        ];

        return Inertia::render('Process/Order', [
            "purchaseOrder" => $purchaseOrder,
        ]);
    }

    public function show($id)
    {
        $purchaseOrders = [
            "PO 001" => [
                "koperasi" => "Koperasi Desa Purwokerto",
                "pengentri" => "Agus Praya",
                "kreditur" => "Kusnadie",
                "top" => 30,
                "lokasi" => [
                    "alamat" => "Jl. Jenderal Sudirman No. 21 KAV 3",
                    "kelurahan" => "Jati",
                    "kecamatan" => "Banyuwangi",
                    "provinsi" => "Jawa Tengah",
                    "rt" => "11",
                    "rw" => "12",
                    "kode_pos" => "142510",
                ],
                "items" => [
                    [
                        "nama" => "Paracetamol",
                        "exp" => "18-07-2026",
                        "qty" => 2,
                        "price_unit" => 15000,
                        "discount" => "0%",
                        "tax" => "11%",
                        "total" => 16600,
                    ],
                    [
                        "nama" => "Amoxilin",
                        "exp" => "18-07-2026",
                        "qty" => 9,
                        "price_unit" => 15000,
                        "discount" => "0%",
                        "tax" => "11%",
                        "total" => 16600,
                    ],
                ],
            ],
            "PO 002" => [
                "koperasi" => "Koperasi Desa Pejagalan",
                "pengentri" => "Agus Praya",
                "kreditur" => "Kusnadie",
                "top" => 30,
                "lokasi" => [
                    "alamat" => "Jl. Jenderal Sudirman No. 21 KAV 3",
                    "kelurahan" => "Jati",
                    "kecamatan" => "Banyuwangi",
                    "provinsi" => "Jawa Tengah",
                    "rt" => "11",
                    "rw" => "12",
                    "kode_pos" => "142510",
                ],
                "items" => [
                    [
                        "nama" => "Paracetamol",
                        "exp" => "18-07-2026",
                        "qty" => 2,
                        "price_unit" => 15000,
                        "discount" => "0%",
                        "tax" => "11%",
                        "total" => 16600,
                    ],
                    [
                        "nama" => "Amoxilin",
                        "exp" => "18-07-2026",
                        "qty" => 9,
                        "price_unit" => 15000,
                        "discount" => "0%",
                        "tax" => "11%",
                        "total" => 16600,
                    ],
                ],
            ],
        ];

        if (!isset($purchaseOrders[$id])) {
            abort(404, "Purchase Order not found");
        }

        return Inertia::render('Process/DeliveryOrder', [
            "id" => $id,
            "purchaseOrder" => $purchaseOrders[$id], 
        ]);
    }
}
