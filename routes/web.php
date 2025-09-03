<?php

use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\ProcessOrderController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MappingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserManagementController;

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

        if ($user->role === 'super') {
            return redirect()->route('dashboard.super');
        }

        return redirect()->route('home');
    })->name('dashboard');

    // Dashboard Super Admin
    Route::get('dashboard/super', [DashboardController::class, 'super'])->name('dashboard.super');

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

    // Super Admin - User Management
    Route::get('users', [UserManagementController::class, 'index'])->name('super.users');

    Route::post('users', [UserManagementController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
