import { Disclosure } from "@headlessui/react";

import NavLink from "./ui/NavLink";
import { Link } from "@inertiajs/react";

export type LinkType = {
    key: string;
    href: string;
    label: string;
    active: boolean;
};

export const DesktopNavigation = ({ links }: { links: LinkType[] }) => {
    return (
        <>
            {links.map((link) => (
                <NavLink key={link.key} href={link.href} active={link.active}>
                    {link.label}
                </NavLink>
            ))}
        </>
    );
};

export const MobileNavigation = ({ links }: { links: LinkType[] }) => {
    return (
        <>
            {links.map((link) => (
                <Disclosure.Button
                    key={link.key}
                    as={Link}
                    href={link.href}
                    active={link.active}
                    className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50 sm:pl-5 sm:pr-6"
                >
                    {link.label}
                </Disclosure.Button>
            ))}
        </>
    );
};
