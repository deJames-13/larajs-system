<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Exports\BrandsExport;
use App\Exports\PromosExport;
use App\Imports\BrandsImport;
use App\Imports\PromosImport;
use App\Exports\ProductsExport;
use App\Imports\ProductsImport;
use App\Exports\CategoriesExport;
use App\Exports\UsersExport;
use App\Imports\CategoriesImport;
use App\Http\Resources\UserResource;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Resources\BrandResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\PromoResource;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;
use App\Http\Resources\CategoryResource;
use App\Imports\UsersImport;

class TableController extends Controller
{

    #1 - Products
    public function users()
    {
        if (request()->ajax()) {

            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order =    request('order') ?? 'desc';


            $user = User::filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);


            $response = UserResource::collection($user);

            // Debugbar::info($response);
            return $response;
        }
        return view('admin.tables.products');
    }
    public function usersExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'users' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }


        return Excel::download(new UsersExport, $fileName, $fileType);
    }
    public function usersImport()
    {
        try {
            Excel::import(new UsersImport, request()->file('item_upload'));
            return redirect()->back()->with('success', 'Excel file Imported Successfully');
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
            // return abort(500, $ex->getMessage());
        }
    }


    #1 - Products
    public function products()
    {
        if (request()->ajax()) {

            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order =    request('order') ?? 'desc';


            $products = Product::filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);


            $response = ProductResource::collection($products);

            // Debugbar::info($response);
            return $response;
        }
        return view('admin.tables.products');
    }
    public function productsExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'products' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }


        return Excel::download(new ProductsExport, $fileName, $fileType);
    }
    public function productsImport()
    {
        try {
            Excel::import(new ProductsImport, request()->file('item_upload'));
            return redirect()->back()->with('success', 'Excel file Imported Successfully');
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
            // return abort(500, $ex->getMessage());
        }
    }

    #2 - Orders
    public function orders()
    {
        if (request()->ajax()) {

            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order =    request('order') ?? 'desc';


            $orders = Order::query()
                ->with([
                    'products' => function ($query) {
                        $query->withPivot('quantity');
                    },
                    'customer',
                    'customer.info'
                ])
                ->filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);


            $response = OrderResource::collection($orders);

            Debugbar::info($response);
            return $response;
        }
        return view('admin.tables.orders');
    }

    public function ordersExport($type)
    {
    }

    public function ordersImport()
    {
    }

    #3 - Promos

    public function promos()
    {
        if (request()->ajax()) {
            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order = request('order') ?? 'desc';

            $promos = Promos::filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);

            return PromoResource::collection($promos);
        }

        return view('admin.tables.promos');
    }
    public function promosExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'promos' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }


        return Excel::download(new PromosExport, $fileName, $fileType);
    }

    public function promosImport(Request $request)
    {
        try {
            Excel::import(new PromosImport, request()->file('item_upload'));
            return redirect()->back()->with('success', 'Excel file Imported Successfully');
        } catch (Exception $ex) {
            //return response()->json(['error' => $ex->getMessage()]);
            return abort(500, $ex->getMessage());
        }
    }


    #4 - Brands

    public function brands()
    {
        if (request()->ajax()) {
            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order = request('order') ?? 'desc';

            $brands = Brand::filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);

            return BrandResource::collection($brands);
        }

        return view('admin.tables.brands');
    }
    public function brandsExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'brands' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }


        return Excel::download(new BrandsExport, $fileName, $fileType);
    }

    public function brandsImport(Request $request)
    {
        try {
            Excel::import(new BrandsImport, request()->file('item_upload'));
            return redirect()->back()->with('success', 'Excel file Imported Successfully');
        } catch (Exception $ex) {
            //return response()->json(['error' => $ex->getMessage()]);
            return abort(500, $ex->getMessage());
        }
    }

    #5 - Categories

    public function categories()
    {
        if (request()->ajax()) {
            $page = request('page') ?? 1;
            $limit = request('limit') ?? 10;
            $order = request('order') ?? 'desc';

            $categories = Category::filter(request(['search']))
                ->orderBy('updated_at', $order)
                ->paginate($limit, ['*'], 'page', $page);

            return CategoryResource::collection($categories);
        }

        return view('admin.tables.categories');
    }
    public function categoriesExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'categories' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }


        return Excel::download(new CategoriesExport, $fileName, $fileType);
    }

    public function categoriesImport(Request $request)
    {
        try {
            Excel::import(new CategoriesImport, request()->file('item_upload'));
            return redirect()->back()->with('success', 'Excel file Imported Successfully');
        } catch (Exception $ex) {
            //return response()->json(['error' => $ex->getMessage()]);
            return abort(500, $ex->getMessage());
        }
    }
}
