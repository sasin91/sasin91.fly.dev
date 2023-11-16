import { useTranslation } from "@/i18n/client";
import { useForm } from "laravel-precognition-react-inertia";
import type { PropsWithChildren } from "react";
import React from "react";
import type { InputProps } from "./Input";
import { Input } from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

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
    const { t } = useTranslation();

    const hasChildren = React.Children.count(children) !== 0;

    return (
        <div>
            <InputLabel htmlFor={attribute}>{label}</InputLabel>
            {hasChildren ? (
                children
            ) : (
                <Input
                    {...rest}
                    value={form[attribute]}
                    onChange={(e) => form.setData(attribute, e.target.value)}
                    onBlur={() => form.validate(attribute)}
                />
            )}

            {form.invalid(attribute) && (
                <InputError
                    message={t("form.errors.required", {
                        label,
                    })}
                />
            )}
        </div>
    );
}
