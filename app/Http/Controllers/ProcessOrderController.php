<?php

namespace App\Http\Controllers;

use Inertia\Inertia; // tambahkan ini
use Illuminate\Http\Request;

class ProcessOrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Process/Index', []);
    }
    
    public function order($id)
    {
        return Inertia::render('Process/Order', ['id' => $id]);
    }

    public function show($id)
    {
        // Dummy data (sementara hardcode dulu, nanti bisa ambil dari DB)
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

        return Inertia::render('Process/DeliveryOrder', [ // perbaiki typo: "DeleveryOrder" -> "DeliveryOrder"
            "id" => $id,
            "po" => $purchaseOrders[$id]
        ]);
    }
}
