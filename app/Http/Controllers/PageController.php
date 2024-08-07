<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use App\Http\Resources\ProductResource;

class PageController extends Controller
{
    public function search()
    {
        return view('pages.search.index', ['page' => 'Search']);
    }

    public function home()
    {
        return view('pages.home.index', ['page' => 'Home']);
    }


    // PRODUCTS PAGES
    public function products()
    {
        return view('pages.products.index');
    }

    public function product(string $id)
    {
        $item = Product::find($id);
        // dd($item->stock());
        if (!$item || !isset($item->stock->quantity)) {
            abort(404);
        }
        $item->load([
            'images',
            'brands',
            'categories',
            'promos',
        ]);

        return view('pages.products.show', ['item' => ProductResource::make($item)]);
    }



    public function checkout()
    {

        $user = auth()->user();
        if (auth()->user()->products->count() == 0) {
            return abort(404);
        }

        return view('pages.transaction.checkout', ['page' => 'Checkout', 'user' => $user]);
    }

    // ORDER
    public function orders()
    {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('tables.orders');
        }

        return view('pages.orders.index', ['page' => 'Orders']);
    }

    public function order(string $id)
    {
        // if customer
        if (auth()->user()->role == 'customer') {
            $order = Order::where('id', $id)->where('user_id', auth()->user()->id)->first();
            if (!$order) {
                return redirect()->route('orders');
            }
        }

        return view('pages.orders.show', [
            'page' => 'Order',
            'id' => $id,
            'role' => auth()->user()->role,
        ]);
    }

    // ADMIN DASHBOARD
    public function dashboard()
    {

        $metaDatas = Order::metadata();

        return view('admin.dashboard', ['page' => 'Dashboard', 'metaDatas' => $metaDatas]);
    }

    // PROFILE
    public function profile()
    {
        return view('pages.profile.index', ['page' => 'Profile']);
    }
}
