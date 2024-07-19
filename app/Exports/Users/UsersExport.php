<?php

namespace App\Exports\Users;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersExport implements WithMultipleSheets
{
    use Exportable;
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new UsersSheet(),
            new UserImagesSheet(),
        ];
    }
}
