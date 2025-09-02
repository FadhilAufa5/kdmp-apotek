<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MappingController extends Controller
{
  public function index()
  {
    return inertia('Mapping/Index');
  }

  public function account()
  { 
    return inertia('Mapping/Account');
  }
}