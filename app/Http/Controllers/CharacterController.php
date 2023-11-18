<?php

namespace App\Http\Controllers;

use App\Http\Requests\CharacterStoreRequest;

class CharacterController
{
    public function store(CharacterStoreRequest $request)
    {
        $request->user()->character()->create($request->validated());

        return back();
    }
}
