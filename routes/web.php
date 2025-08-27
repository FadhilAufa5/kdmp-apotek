<?php

use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\ProcessOrderController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('purchase', [PurchaseOrderController::class, 'index'])->name('purchase.index');
    Route::get('purchase/show/{id}', [PurchaseOrderController::class, 'show'])->name('purchase.show');
    Route::get('process', [ProcessOrderController::class, 'index'])->name('process.index');
    Route::get('process/delivery/{id}', [ProcessOrderController::class, 'show'])->name('process.delivery');
    Route::get('process/order/{id}', [ProcessOrderController::class, 'order'])->name('process.order');
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
