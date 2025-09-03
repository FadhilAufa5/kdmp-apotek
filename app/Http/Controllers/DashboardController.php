<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function super()
    {
        return Inertia::render('Super/Dashboard');
    }

    public function apotek()
    {
        return Inertia::render('Apotek/Dashboard');
    }

    public function busdev()
    {
        return Inertia::render('Busdev/Dashboard');
    }
}
