<?php

namespace App\Http\Requests;

use App\Models\ContactRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class ContactRequestStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', ContactRequest::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'companyName' => ['required', 'string', 'max:255'],
            'contactPerson' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ];
    }
}
