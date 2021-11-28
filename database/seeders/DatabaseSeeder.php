<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        collect(
            [
                [
                    'username' => "mrezafahleta",
                    'name' => "M.Reza Fahleta",
                    'email' => "mrezafahleta@gmail.com",
                    'password' => bcrypt('password'),

                ],
                [
                    'username' => "jajak",
                    'name' => "Jajak Fahleta",
                    'email' => "jajak@gmail.com",
                    'password' => bcrypt('password'),

                ],
            ]
        )->each(function ($user) {
            \App\Models\User::create($user);
        });

        \App\Models\User::factory(15)->create();
    }
}
