import { ClassValue } from "clsx";
import { PropsWithChildren } from "react";
import Underline from "../Underline";
import { navLinkClasses } from "./NavLink";

export default function NativeLink({
    children,
    active = false,
    className = "",
    ...rest
}: PropsWithChildren<{
    className?: ClassValue;
    href: string;
    active?: boolean;
}>) {
    return (
        <a className={navLinkClasses(active, className)} {...rest}>
            <Underline>{children}</Underline>
        </a>
    );
}
