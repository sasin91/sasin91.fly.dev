<?php

namespace App\Domains\Projects\Controllers;

use Illuminate\Support\Facades\Storage;
use Inertia\ResponseFactory;

class GameController
{
    public function __invoke(ResponseFactory $inertia)
    {
        $disk = Storage::disk('game_assets');

        $inertia->setRootView('game');
    
        return $inertia->render('Projects/Game', [
            'assets' => [
                'root' => $disk->url('/'),
                // 'map' => $disk->url('maps/scene-transformed.glb'),
                'map' => $disk->url('maps/collision-world.glb'),
                'character' => $disk->url('models/Xbot.glb')
            ]
        ]);
    }
}