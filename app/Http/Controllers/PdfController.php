<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Promos;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


class PdfController extends Controller
{
    public function ordersPdf()
    {
        $data = [
            'title' => 'Orders Table',
            'data' => Order::take(50)->get()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }
    public function usersPdf()
    {
        $data = [
            'title' => 'Products Table',
            'data' => User::all()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }
    public function productsPdf()
    {
        $data = [
            'title' => 'Products Table',
            'data' => Product::all()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }

    public function promosPdf()
    {
        $data = [
            'title' => 'Promos Table',
            'data' => Promos::all()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }

    public function brandsPdf()
    {
        $data = [
            'title' => 'Brands Table',
            'data' => Brand::all()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }

    public function categoriesPdf()
    {
        $data = [
            'title' => 'Categories Table',
            'data' => Category::all()->toArray(),
        ];
        $pdf = Pdf::loadView('pdf.print', $data)->setPaper('a4', 'landscape');
        $fileName = time() . '_pdf.pdf';

        return $pdf->download($fileName);
    }
}
