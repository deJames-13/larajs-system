<?php

namespace App\Http\Controllers;

use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register()
    {
        return view('auth.register');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = \App\Models\User::create($data);
        $token = $user->createToken('api-token')->plainTextToken;
        $request->session()->put('api-token', $token);
        auth()->login($user);

        // EMAIL CODE HERE

        if (request()->ajax()) {
            return response()->json([
                'message' => 'success',
                'user' => $user,
            ], 200);
        }

        return redirect('/');
    }

    public function login()
    {
        return view('auth.login');
    }

    public function authenticate(Request $request)
    {

        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (auth()->attempt($data)) {
            $user = \App\Models\User::where('email', $data['email'])->first();

            $token = $user->createToken('api-token')->plainTextToken; // laravel sanctum
            $request->session()->regenerate();
            $request->session()->put('api-token', $token);

            // dd(session('api-token'));
            Debugbar::info($token);

            if (request()->ajax()) {
                return response()->json([
                    'message' => 'success',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            }

            return redirect()->intended('/');
        }

        if (request()->ajax()) {
            return response()->json([
                'message' => 'The provided credentials do not match our records.',
            ], 422);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        // dd($request);
        auth()->logout();
        $request->session()->forget('api-token');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if (request()->ajax()) {
            return response()->json([
                'message' => 'success',
            ], 200);
        }

        return redirect('/');
    }
}
