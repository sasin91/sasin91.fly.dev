import { cn } from "@/utils/tailwind";
import {
    InputHTMLAttributes,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, isFocused = false, ...props }: InputProps, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle<Partial<typeof ref>, Partial<typeof ref>>(
            ref,
            () => ({
                focus: () => localRef.current?.focus(),
            })
        );

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, []);

        return (
            <input
                type={type}
                className={cn(
                    "flex w-full h-10 px-3 py-2 text-sm",
                    "border border-gray-300 rounded-md",
                    "focus:border-indigo-500 focus:ring-indigo-500 focus-visible:ring-indigo-500",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "shadow-sm placeholder:text-muted-foreground",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
