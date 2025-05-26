<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Strip out any HTML tags so no markup (including <script>, <img>, etc.)
     * ever makes it into the database.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'title'   => strip_tags((string) $this->input('title')),
            'content' => strip_tags((string) $this->input('content')),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'min:10', 'max:255'],
            'content'     => ['required', 'string', 'min:400', 'max:2000'],
            'categories'  => ['required', 'array', 'min:1'],
            'categories.*' => ['integer', 'exists:categories,id'],
        ];
    }
}
