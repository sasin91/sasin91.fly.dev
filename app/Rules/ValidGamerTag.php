<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ValidGamerTag implements ValidationRule
{
    public function __construct(public Model|string|null $model = null, public string $attribute = 'gamer_tag')
    {

    }

    /**
     * Run the validation rule.
     *
     * @param \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $data = [];

        Arr::set($data, $attribute, $value);

        $validator = Validator::make(
            $data,
            [
                $this->attribute => [
                    'required',
                    'string',
                    'min:1',
                    'max:42',
                    'alpha_num',
                    Rule::unique($this->model, $this->attribute)->when(
                        $this->model instanceof Model,
                        fn($rule) => $rule->ignoreModel($this->model)
                    )
                ]
            ],
            $this->messages()
        );

        if ($validator->fails()) {
            $fail($validator->getMessageBag()->first());
        }
    }

    /**
     * Defines custom error messages for the validation rules defined at {@see rules()}.
     * @return array error messages.
     * @since 1.2.0
     *
     */
    protected function messages(): array
    {
        return [];
    }
}
