<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (PermissionEnum::cases() as $permission) {
            $permission->toModel(create: true);
        }

        foreach (RoleEnum::cases() as $role) {
            $roleModel = $role->toModel(create: true);

            $roleModel->syncPermissions($role->permissions());

            $user = User::factory()->role($role)->create([
                'name' => $role->label(),
                'email' => $role->value . '@example.com',
                'password' => bcrypt('password'),
            ]);

            $this->command->info("Created {$role->label()} user: {$user->email} : password");
        }
    }
}
