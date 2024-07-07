<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (empty($row['email']) || empty($row['username']) || empty($row['password']) || empty($row['role'])) {
                continue;
            }

            $user = User::updateOrCreate(
                ['email' => $row['email']],
                [
                    'username' => $row['username'],
                    'password' => Hash::make($row['password']),
                    'role' => $row['role'],
                    'status' => $row['status'] ?? 'active',
                ]
            );

                // Extract first name and last name from the username
                $nameParts = explode(' ', $row['username']);
                $firstName = $nameParts[0];
                $lastName = isset($nameParts[1]) ? $nameParts[1] : '';

                Customer::updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'phone_number' => $row['phone_number'] ?? null,
                        'address' => $row['address'] ?? null,
                        'zip_code' => $row['zip_code'] ?? null,
                    ]
                );

        }
    }
}
