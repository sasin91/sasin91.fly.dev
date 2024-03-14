import { Disclosure } from "@headlessui/react";

import { HTMLProps } from "react";
import NativeLink from "./ui/NativeLink";
import NavLink from "./ui/NavLink";
import ResponsiveNavLink from "./ui/ResponsiveNavLink";

export type LinkType = {
    key: string;
    href: string;
    label: string;
    active?: boolean;
    native?: boolean;
} & HTMLProps<HTMLAnchorElement>;

export const DesktopNavigation = ({ links }: { links: LinkType[] }) => {
    return (
        <>
            {links.map(({ native, ...link }) => {
                return native ? (
                    <NativeLink {...link}>{link.label}</NativeLink>
                ) : (
                    <NavLink
                        key={link.key}
                        href={link.href}
                        active={!!link.active}
                    >
                        {link.label}
                    </NavLink>
                );
            })}
        </>
    );
};

export const MobileNavigation = ({ links }: { links: LinkType[] }) => {
    return (
        <>
            {links.map(({ native, ...link }) => (
                <Disclosure.Button
                    key={link.key}
                    className="block w-full py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50 sm:pl-5 sm:pr-6"
                >
                    {native ? (
                        <NativeLink {...link}>{link.label}</NativeLink>
                    ) : (
                        <ResponsiveNavLink
                            href={link.href}
                            active={!!link.active}
                        >
                            {link.label}
                        </ResponsiveNavLink>
                    )}
                </Disclosure.Button>
            ))}
        </>
    );
};
