import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { responsiveLinkClasses } from "./ResponsiveNavLink";

export default function ResponsiveNativeLink({
    children,
    active = false,
    className = "",
    ...props
}: PropsWithChildren<
    AnchorHTMLAttributes<{ href: string }> & { active?: boolean }
>) {
    return (
        <a {...props} className={responsiveLinkClasses(active, className)}>
            {children}
        </a>
    );
}
