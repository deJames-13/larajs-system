<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        if (request()->ajax()) {
        }
        return view('pages.profile.index');
    }
    public function edit()
    {
        if (request()->ajax()) {
        }
        return view('pages.profile.edit');
    }
}
