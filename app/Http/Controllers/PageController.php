<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Promos;
use App\Models\User;

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
    public function users()
    {
        return view('pages.users.index');
    }

    public function user(string $id)
    {
        $user = User::find($id);

        return view('pages.users.show', ['item' => $user]);
    }

    public function usersCreate()
    {
        return view('pages.users.create');
    }

    public function usersEdit(string $id)
    {
        return view('pages.users.edit', ['id' => $id]);
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
        if (! $item || ! isset($item->stock->quantity)) {
            abort(404);
        }

        return view('pages.products.show', ['item' => $item]);
    }

    public function productsCreate()
    {
        return view('pages.products.create');
    }

    public function productsEdit(string $id)
    {
        return view('pages.products.edit', ['id' => $id]);
    }

    // PROMOS PAGES
    public function promos()
    {
        return view('pages.promos.index', ['page' => 'Promos']);
    }

    public function promo(string $id)
    {
        $promo = Promos::find($id);
        if (! $promo) {
            abort(404);
        }

        return view('pages.promos.show', ['promo' => $promo]);
    }

    public function promosCreate()
    {
        return view('pages.promos.create');
    }

    public function promosEdit(string $id)
    {
        return view('pages.promos.edit', ['id' => $id]);
    }

    // BRANDS PAGES
    public function brands()
    {
        return view('pages.brands.index', ['page' => 'Brands']);
    }

    public function brand(string $id)
    {
        $brand = Brand::find($id);
        if (! $brand) {
            abort(404);
        }

        return view('pages.brands.show', ['brand' => $brand]);
    }

    public function brandsCreate()
    {
        return view('pages.brands.create');
    }

    public function brandsEdit(string $id)
    {
        return view('pages.brands.edit', ['id' => $id]);
    }

    // CATEGORIES PAGES
    public function categories()
    {
        return view('pages.categories.index', ['page' => 'Categories']);
    }

    public function category(string $id)
    {
        $category = Category::find($id);
        if (! $category) {
            abort(404);
        }

        return view('pages.categories.show', ['category' => $category]);
    }

    public function categoriesCreate()
    {
        return view('pages.categories.create');
    }

    public function categoriesEdit(string $id)
    {
        return view('pages.categories.edit', ['id' => $id]);
    }

    // TRANSACTIONS PAGES
    public function cart()
    {
        return view('pages.transaction.cart', ['page' => 'Cart']);
    }

    public function checkout()
    {

        $user = auth()->user();
        if (auth()->user()->products->count() == 0) {
            return redirect()->route('cart');
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
            if (! $order) {
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
        return view('admin.dashboard', ['page' => 'Dashboard']);
    }

    // PROFILE
    public function profile()
    {
        return view('pages.profile.index', ['page' => 'Profile']);
    }
}
