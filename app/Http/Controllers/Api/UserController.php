<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function profile()
    {
        // check if logged in
        if (!auth()->check()) {
            return response()->json(["message" => "Unauthorized"], 401);
        }
        $user = auth()->user();
        $res = new UserResource($user);
        return response(new UserResource($user));
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

    public function show($id)
    {
        $user = User::find($id);
        return response(new UserResource($user));
    }

    public function store(Request $request)
    {
        $userData = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'sometimes|in:admin,customer',
        ]);
        $userInfo = $request->validate([
            'info' => 'required|array',
            'info.first_name' => 'required|string',
            'info.last_name' => 'required|string',
            'info.phone_number' => 'required|string|unique:customers,phone_number',
            'info.address' => 'required|string',
            'info.zip_code' => 'required|string',
            'info.profile_image' => 'required|image',
        ]);

        $userData['password'] = bcrypt($userData['password']);
        $user = User::create($userData);

        if (isset($userInfo['info'])) {
            $user->info()->create($userInfo['info']);
        }

        return response(new UserResource($user));
    }

    public function update(Request $request, $id)
    {
        $userData = $request->validate([
            'username' => 'required|unique:users,username,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'sometimes',
            'password_confirmation' => 'sometimes|same:password',
            'role' => 'sometimes|in:admin,customer',
        ]);
        $userInfo = $request->validate([
            'info' => 'sometimes|array',
            'info.first_name' => 'sometimes|string',
            'info.last_name' => 'sometimes|string',
            'info.phone_number' => 'sometimes|string|unique:customers,phone_number',
            'info.address' => 'sometimes|string',
            'info.zip_code' => 'sometimes|string',
            'info.profile_image' => 'sometimes|image',
        ]);

        $user = User::find($id);

        // manage password changing
        if (isset($userData['password'])) {
            $userData['password'] = bcrypt($userData['password']);
        } else {
            unset($userData['password']);
        }

        $user->update($userData);



        if (isset($userInfo['info'])) {
            $user->info()->updateOrCreate([], $userInfo['info']);
        }

        return response(new UserResource($user));
    }


    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function restore($id)
    {
        $user = User::withTrashed()->find($id);
        $user->restore();
        return response(new UserResource($user));
    }
}
