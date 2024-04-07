import { useForm } from "laravel-precognition-react-inertia";
import type { PropsWithChildren } from "react";
import React from "react";
import type { InputProps } from "./Input";
import { Input } from "./Input";
import InputError from "./InputError";
import { Label } from "./Label";

export default function FormField({
    label,
    attribute,
    form,
    children,
    ...rest
}: PropsWithChildren<
    {
        label: string;
        attribute: string;
        form: ReturnType<typeof useForm>;
    } & InputProps
>) {
    const hasChildren = React.Children.count(children) !== 0;

    return (
        <div>
            <Label htmlFor={attribute}>{label}</Label>
            {hasChildren ? (
                children
            ) : (
                <Input
                    {...rest}
                    name={attribute}
                    value={form.data[attribute]}
                    onChange={(e) => form.setData(attribute, e.target.value)}
                    onBlur={() => form.validate(attribute)}
                />
            )}

            {form.invalid(attribute) && (
                <InputError message={form.errors[attribute]} />
            )}
        </div>
    );
}
