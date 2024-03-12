import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";

export default function Headline({
    className,
    ...rest
}: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) {
    return (
        <h1
            {...rest}
            className={cn(
                "font-bold",
                "tracking-tight",
                "text-transparent",
                "bg-clip-text",
                "bg-gradient-to-r",
                "from-purple-500",
                "to-pink-300",
                "text-4xl",
                "sm:text-6xl",
                className
            )}
        >
            {rest.children}
        </h1>
    );
}
