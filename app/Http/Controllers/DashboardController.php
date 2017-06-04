<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
        $this->middleware('jwt.auth', ['except' => ['']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dateSync = '';
        
        return view('dashboard', compact('dateSync'));
    }
    public function syncPayroll()
    {
        Log::info('It Works!');
        $dateSync = date('d-m-Y H:i');
        return  $dateSync;
    }
}
