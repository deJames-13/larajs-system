<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Promos;
use App\Models\Brand;
use App\Models\Category;


class PdfController extends Controller
{
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
