import { cn } from "@/utils/tailwind";
import { LabelHTMLAttributes } from "react";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={cn(`block font-medium text-sm text-primary`, className)}
        >
            {value ? value : children}
        </label>
    );
}
