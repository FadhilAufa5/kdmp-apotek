<?php

use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\ProcessOrderController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MappingController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();

        if ($user->role === 'apotek') {
            return redirect()->route('dashboard.apotek');
        }

        if ($user->role === 'busdev') {
            return redirect()->route('dashboard.busdev');
        }

        return redirect()->route('home');
    })->name('dashboard');

    // Dashboard Apotek
    Route::get('dashboard/apotek', [DashboardController::class, 'apotek'])->name('dashboard.apotek');

    // Dashboard Busdev
    Route::get('dashboard/busdev', [DashboardController::class, 'busdev'])->name('dashboard.busdev');

    // Pemesanan
    Route::get('purchase', [PurchaseOrderController::class, 'index'])->name('purchase.index');
    Route::get('purchase/{id}', [PurchaseOrderController::class, 'show'])->name('purchase.show');

    // Proses Order
    Route::get('process', [ProcessOrderController::class, 'index'])->name('process.index');
    Route::get('process/delivery/{id}', [ProcessOrderController::class, 'show'])->name('process.delivery');
    Route::get('process/order/{id}', [ProcessOrderController::class, 'order'])->name('process.order');

    // Busdev
    Route::get('mapping', [MappingController::class, 'index'])->name('mapping.index');
    Route::get('account', [MappingController::class, 'account'])->name('mapping.account');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
