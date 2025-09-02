<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function apotek()
    {
        return Inertia::render('Apotek/Dashboard'); 
        
    }

    public function busdev()
    {
        return Inertia::render('Busdev/Dashboard'); 
        
    }
}
