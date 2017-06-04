<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SettingsController extends Controller
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

    public function save(){
    	Log::info('It Works!');

    	return "It's TRUE";
    }
}
