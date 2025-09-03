<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder user dummy (random 10)
        User::factory(10)->create();

        // Seeder user test (biasa)
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seeder user apotek
        User::create([
            'name' => 'Admin Apotek',
            'email' => 'apotek@example.com',
            'password' => Hash::make('password'),
            'role' => 'apotek',
        ]);

        // Seeder user busdev
        User::create([
            'name' => 'Admin Busdev',
            'email' => 'busdev@example.com',
            'password' => Hash::make('password'),
            'role' => 'busdev',
        ]);

        // Seeder user super admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'super@admin.com',
            'password' => Hash::make('password'),
            'role' => 'super',
        ]);
    }
}
