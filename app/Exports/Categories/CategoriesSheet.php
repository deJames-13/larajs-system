<?php


namespace App\Exports\Categories;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class CategoriesSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $categories = [];

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $categories
         *
         * This maps the Category Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This make sures that whatever is exported,
         * It can easily imported back, by using logic with headings
         *
         */
        $this->categories = Category::all()->map(function ($category) {
            return [
                $category->id,
                $category->name,
                $category->slug,
                $category->description,
                $category->status,

            ];
        });

        return $this->categories->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'slug',
            'description',
            'status',
        ];
    }

    public function getCsvSettings(): array
    {
        return [
            'writer' => 'stream',
            'heading_row' => 1,
            'cache_size' => 1000,
            'pre_calculate_formulas' => false,
        ];
    }

    public function title(): string
    {
        return 'Categories';
    }
}
