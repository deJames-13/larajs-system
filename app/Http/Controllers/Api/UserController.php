<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Barryvdh\Debugbar\Facades\Debugbar;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function confirmPassword()
    {
        $user = auth()->user();
        $password = request()->get('password');
        if (!auth()->guard('web')->attempt(['username' => $user->username, 'password' => $password])) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Authorized']);
    }

    public function profile()
    {
        // check if logged in
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::find(auth()->id());
        $user->load([
            'products',
            'info',
            'images'
        ]);
        $res = new UserResource($user);

        return response($res);
    }

    public function search()
    {
        $search = request()->get('search');
        $user = User::filter($search)->get();
        $user->load([
            'info',
            'images'
        ]);

        return response(UserResource::collection($user));
    }

    public function index()
    {
        try {
            return $this->getResources(User::class, UserResource::class, [
                'info',
                'images'
            ]);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 404);
        }
    }

    public function show(string $id)
    {
        try {
            return $this->getResource($id, User::class, UserResource::class, [
                'info',
                'images'
            ]);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 404);
        }
    }

    public function store(Request $request)
    {
        Debugbar::info($request);

        $userData = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'sometimes|in:admin,customer,staff',
        ]);
        $userInfo = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone_number' => 'required|string|unique:customers,phone_number',
            'address' => 'required|string',
            'zip_code' => 'required|string',
            'profile_image' => 'sometimes|image',
            'birthdate' => 'sometimes|date',
        ]);
        Debugbar::info($userData);
        Debugbar::info($userInfo);

        $userData['password'] = bcrypt($userData['password']);
        $user = User::create($userData);
        $user->load([
            'info',
            'images'
        ]);

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
            'username' => 'sometimes|unique:users,username,' . $id . ',id',
            'email' => 'sometimes|email|unique:users,email,' . $id . ',id',
            'password' => 'sometimes',
            'password_confirmation' => 'sometimes|same:password',
            'role' => 'sometimes|in:admin,customer,staff',
            'status' => 'sometimes|in:active,inactive',
        ]);
        $userInfo = $request->validate([
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'phone_number' => 'sometimes|string|unique:customers,phone_number,' . $id . ',user_id',
            'address' => 'sometimes|string',
            'zip_code' => 'sometimes|string',
            'profile_image' => 'sometimes|image',
            'birthdate' => 'sometimes|date',
        ]);
        // image

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // manage password changing
        if (isset($userData['password'])) {
            $userData['password'] = bcrypt($userData['password']);
        } else {
            unset($userData['password']);
        }

        $user->update($userData);
        $user->load([
            'info',
            'images'
        ]);
        if (isset($userInfo)) {
            $user->info()->updateOrCreate([], $userInfo);
        }

        // if ($user->id == auth()->id() && $user->role != 'admin') {
        //     auth()->logout();
        // }

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

    public function thrashed()
    {
        $page = request('page') ?? 1;
        $limit = request('limit') ?? 20;
        $order = request('order') ?? 'desc';
        $search = request(['search']) ?? null;

        $users = User::onlyTrashed()
            ->filter($search)
            ->with(['info', 'images'])
            ->orderBy('updated_at', $order)
            ->paginate($limit, ['*'], 'page', $page);


        return UserResource::collection($users);
    }

    public function status(Request $request, string $id)
    {
        if (!$this->handleStatus($request, User::class, $id)) {
            return;
        }
        if (auth()->user()->id == $id && $request->status == 'inactive') {
            $accessToken = $request->bearerToken();
            $token = PersonalAccessToken::findToken($accessToken);
            if ($token) {
                $token->delete();
            }
        }

        if (request()->ajax()) {
            return response(new UserResource(User::find($id)));
        }

        return redirect('/');
    }
}
