<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    // 🔹 List semua Purchase Order
    public function index()
    {
        // ambil orders + relasi products
        $orders = Order::with('products')->get();

        return Inertia::render('Purchase/Index', [
            'orders' => $orders,
        ]);
    }

    // 🔹 Detail Purchase Order
    public function show($id_transaksi)
{
    $order = Order::with('products')->where('id_transaksi', $id_transaksi)->firstOrFail();

    return Inertia::render('Purchase/Show', [
        'purchaseOrder' => $order,
    ]);
}

}
