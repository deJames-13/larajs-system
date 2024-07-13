<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        if ($header) {
            $token = substr($header, 7);
            $pat = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
            if ($pat) {
                $user = $pat->tokenable;
                auth()->login($user);
            } else {
                Auth::guard('web')->logout();
                Session::flush();

                return abort(403, 'Forbidden');

            }
        }

        return $next($request);
    }
}
