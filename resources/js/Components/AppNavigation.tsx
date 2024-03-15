import { Disclosure } from "@headlessui/react";

import { HTMLProps } from "react";
import NavLink from "./ui/NavLink";
import ResponsiveNavLink from "./ui/ResponsiveNavLink";

type LinkActive = boolean | (() => boolean);

export type LinkType = {
    key: string;
    href: string;
    label: string;
    active?: LinkActive;
    native?: boolean;
} & HTMLProps<HTMLAnchorElement>;

const isActive = (active?: LinkActive) => {
    if (!active) {
        return false;
    }

    return typeof active === "function" ? active() : active;
};

export const DesktopNavigation = ({ links }: { links: LinkType[] }) => {
    return (
        <>
            {links.map(({ native, active, ...link }) => {
                return (
                    <NavLink
                        key={link.key}
                        href={link.href}
                        active={isActive(active)}
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
            {links.map(({ native, active, ...link }) => (
                <Disclosure.Button
                    key={link.key}
                    className="block w-full py-2 pl-3 pr-4 text-base font-medium border-l-4 text-primary border-primary bg-primary-50 sm:pl-5 sm:pr-6"
                >
                    {
                        <ResponsiveNavLink
                            href={link.href}
                            active={isActive(active)}
                        >
                            {link.label}
                        </ResponsiveNavLink>
                    }
                </Disclosure.Button>
            ))}
        </>
    );
};
