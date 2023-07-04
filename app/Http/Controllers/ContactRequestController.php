<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequestStoreRequest;
use App\Models\ContactRequest;
use Illuminate\Http\Request;

class ContactRequestController extends Controller
{
    public function store(ContactRequestStoreRequest $request)
    {
        ContactRequest::create($request->validated());

        return to_route('welcome');
    }
}
