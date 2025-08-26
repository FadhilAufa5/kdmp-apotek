<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PenerimaanController extends Controller
{
   public function index()
   {
      return Inertia::render("Penerimaan/Index", []);
   }
   public function create()
   {
      return Inertia::render("Penerimaan/History", []);
   }
}
