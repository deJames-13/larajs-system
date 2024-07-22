<?php

namespace App\Exports\Users;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithTitle;

class UsersSheet implements FromArray, WithHeadings, WithCustomCsvSettings, WithTitle
{
    private $users = [];

    public function array(): array
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $users
         *
         * This maps the User Model to get an array of array with the COLUMNS that we want from the
         * HEADINGS.
         * This ensures that whatever is exported,
         * It can easily be imported back, by using logic with headings
         *
         */
        $this->users = User::all()->map(function ($user) {
            return [
                $user->id,
                $user->username,
                $user->email,
                $user->password,
                $user->role,
                $user->status,
            ];
        });

        return $this->users->toArray();
    }

    public function headings(): array
    {
        return [
            'id',
            'username',
            'email',
            'password',
            'role',
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
        return 'Users';
    }
}
