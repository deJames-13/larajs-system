<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

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
}
