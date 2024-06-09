<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
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
            $user = \Laravel\Sanctum\PersonalAccessToken::findToken($token)->tokenable;
            if ($user) {
                auth()->login($user);
            }
        }


        return $next($request);
    }
}
