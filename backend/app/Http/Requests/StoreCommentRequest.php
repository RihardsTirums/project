<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
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
            'content' => ['required', 'string', 'min:5', 'max:500'],
        ];
    }
}
