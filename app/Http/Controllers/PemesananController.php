<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class PemesananController extends Controller
{
    public function index(){
        return Inertia::render('Pemesanan/Index', []);
    }

    public function cart(){
        return Inertia::render('Pemesanan/Cart', []);
    }

    public function po(){
        return Inertia::render('Pemesanan/PO', []);
    }

}
