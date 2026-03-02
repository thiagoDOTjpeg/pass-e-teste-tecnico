<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'teste@dasilva.com',
            'password' => bcrypt('senha123'),
        ]);

        Todo::factory(10)->create([
            'user_id' => $user->id,
        ]);

        User::factory(5)->create()->each(function ($user) {
            Todo::factory(5)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
