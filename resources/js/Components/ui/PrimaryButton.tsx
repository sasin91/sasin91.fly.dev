import { cn } from "@/utils/tailwind";
import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={cn(
                // inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150
                "block",
                "w-full",
                "rounded-md",
                "px-3.5",
                "py-2.5",
                "text-center",
                "text-sm",
                "font-semibold",
                "text-primary",
                "shadow-lg",
                "shadow-purple-600",
                "focus-visible:outline",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-2",
                "focus-visible:outline-secondary-foreground",
                "bg-gradient-to-r",
                "from-purple-500",
                "via-violet-400",
                "to-pink-300",
                "bg-no-repeat",
                "text-primary",
                "bg-[length:0%]",
                "transition-all",
                "duration-500",
                "ease-out",
                "hover:bg-[length:100%]",
                "hover:text-white",
                disabled && "opacity-25",
                className
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
