<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function confirmPassword()
    {
        $user = auth()->user();
        $password = request()->get('password');
        if (! auth()->guard('web')->attempt(['username' => $user->username, 'password' => $password])) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Authorized']);
    }

    public function profile()
    {
        // check if logged in
        if (! auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = auth()->user();
        $res = new UserResource($user);

        return response($res);
    }

    public function search()
    {
        $search = request()->get('search');
        $user = User::filter($search)->get();

        return response(UserResource::collection($user));
    }

    public function index()
    {
        $users = User::all();

        return response(UserResource::collection($users));
    }

    public function show(string $id)
    {
        $user = User::find($id);

        return response(new UserResource($user));
    }

    public function store(Request $request)
    {
        Debugbar::info($request);

        $userData = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'sometimes|in:admin,customer',
        ]);
        $userInfo = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|string|unique:customers,phone_number',
            'address' => 'required|string',
            'zip_code' => 'required|string',
            'profile_image' => 'sometimes|image',
        ]);
        Debugbar::info($userData);
        Debugbar::info($userInfo);

        $userData['password'] = bcrypt($userData['password']);
        $user = User::create($userData);

        if ($userInfo) {
            $user->info()->create($userInfo);
        }

        return response(new UserResource($user));
    }

    public function update(Request $request, string $id)
    {
        // dd($request->hasFile('images'));
        // dd($request);

        Debugbar::info($request);
        $userData = $request->validate([
            'username' => 'sometimes|unique:users,username,'.$id.',id',
            'email' => 'sometimes|email|unique:users,email,'.$id.',id',
            'password' => 'sometimes',
            'password_confirmation' => 'sometimes|same:password',
            'role' => 'sometimes|in:admin,customer',
            'status' => 'sometimes|in:active,inactive',
        ]);
        $userInfo = $request->validate([
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'phone_number' => 'sometimes|string|unique:customers,phone_number,'.$id.',user_id',
            'address' => 'sometimes|string',
            'zip_code' => 'sometimes|string',
            'profile_image' => 'sometimes|image',
        ]);
        // image

        $user = User::find($id);
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // manage password changing
        if (isset($userData['password'])) {
            $userData['password'] = bcrypt($userData['password']);
        } else {
            unset($userData['password']);
        }

        $user->update($userData);

        if (isset($userInfo)) {
            $user->info()->updateOrCreate([], $userInfo);
        }

        if ($user->id == auth()->id() && $user->role != 'admin') {
            auth()->logout();
        }

        $this->handleImageUpload($request, $user);

        return response(new UserResource($user->fresh()));
    }

    public function destroy($id)
    {
        $user = User::find($id);
        Debugbar::info($user);

        // $user->delete();
        return response()->json(null, 204);
    }

    public function restore($id)
    {
        $user = User::withTrashed()->find($id);
        $user->restore();

        return response(new UserResource($user));
    }

    public function status(Request $request, string $id)
    {
        if ($this->handleStatus($request, User::class, $id)) {
            auth()->logout();
            $request->session()->forget('api-token');
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    }
}
