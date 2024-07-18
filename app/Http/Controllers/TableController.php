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
use App\Exports\OrdersExport;
use App\Imports\BrandsImport;
use App\Imports\OrdersImport;
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
    #1 User 
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
    public function usersImport(Request $request)
    {
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new UsersImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }


    #2 Product
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
    public function productsImport(Request $request)
    {
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new ProductsImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }

    #3 Order
    public function ordersExport(string $type)
    {
        Debugbar::info($type);
        $fileName = 'orders' . time() . '.' . $type;
        $fileType = \Maatwebsite\Excel\Excel::XLSX;
        if ($type == 'csv') {
            $fileType = \Maatwebsite\Excel\Excel::CSV;
        }
        return Excel::download(new OrdersExport, $fileName, $fileType);
    }
    public function ordersImport(Request $request)
    {
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new OrdersImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }


    #4 Promo
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
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new PromosImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }


    #5 Brand
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
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new BrandsImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }

    #6 Category
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
        $request->validate([
            'item_upload' => [
                'required',
                'file'
            ],
        ]);

        Excel::import(new CategoriesImport, $request->file('item_upload'));
        return response()->json(['success' => 'Excel file Imported Successfully']);
    }
}
