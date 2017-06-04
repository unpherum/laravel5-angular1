<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            'name' => "Admin",
            'email' => 'admin@camsian.com',
            'password' => bcrypt('admin'),
            'type' => 'admin',
            'is_active' => true,
        ]);
    }
}
