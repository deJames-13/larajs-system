<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Promos;
use Illuminate\Http\Request;


class PageController extends Controller
{
    public function home()
    {
        return view('pages.products.index', ['page' => "Home"]);
    }


    // PRODUCTS PAGES
    public function products()
    {
        return view('pages.products.index');
    }
    public function product(string $id)
    {
        $item = Product::find($id);
        return view('pages.products.show', ['item' => $item]);
    }
    public function productCreate()
    {
        return view('pages.products.create');
    }

    public function productEdit(string $id)
    {
        return view('pages.products.edit', ['id' => $id]);
    }

     // PROMOS PAGES
     public function promos()
     {
         return view('pages.promos.index', ['page' => "Promos"]);
     }

     public function promo(string $id)
     {
         $promo = Promos::find($id);
         return view('pages.promos.show', ['promo' => $promo]);
     }

     public function promoCreate()
     {
         return view('pages.promos.create');
     }

     public function promoEdit(string $id)
     {
         return view('pages.promos.edit', ['id' => $id]);
     }

    // TRANSACTIONS PAGES
    public function cart()
    {
        return view('pages.transaction.cart', ['page' => "Cart"]);
    }
    public function checkout()
    {

        $user = auth()->user();
        if (auth()->user()->products->count() == 0) {
            return redirect()->route('cart');
        }


        return view('pages.transaction.checkout', ['page' => "Checkout"]);
    }
    // ORDER

    public function orders()
    {
        return view('pages.orders.index', ['page' => "Orders"]);
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
            'page' => "Order",
            'id' => $id,
            'role' => auth()->user()->role
        ]);
    }
}
