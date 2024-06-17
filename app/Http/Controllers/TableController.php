<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ProductsExport;
use App\Imports\ProductsImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Resources\ProductResource;
use Barryvdh\Debugbar\Facades\Debugbar;

class TableController extends Controller
{
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
            //return response()->json(['error' => $ex->getMessage()]);
            return abort(500, $ex->getMessage());
        }
    }

    #2 - Orders
    public function orders()
    {
    }

    public function ordersExport($type)
    {
    }

    public function ordersImport()
    {
    }
}
