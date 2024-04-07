"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "@/i18n/client";
import { cn } from "@/utils/tailwind";
import { Head, Link, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronUp, LogInIcon } from "lucide-react";
import { Fragment } from "react";
import { DesktopNavigation, LinkType, MobileNavigation } from "./AppNavigation";
import Underline from "./Underline";
import Logo from "./ui/Logo";
import ThemeSwitch from "./ui/ThemeSwitch";

const localeLink = (locale: string) => {
    const url = new URL(window.location.href);

    url.searchParams.set("locale", locale);

    return url.href;
};

export default function AppHeader({ links }: { links?: LinkType[] }) {
    const { app, user } = usePage().props;
    const { t } = useTranslation();

    return (
        <>
            <Head title={t("app.title")} />
            <Disclosure
                as="nav"
                className="sticky top-0 z-40 flex-none w-full transition-colors duration-500 rounded-lg shadow-lg backdrop-blur supports-backdrop-blur:bg-white/95 bg-luminary"
            >
                {({ open }) => (
                    <>
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex items-center mr-2 -ml-2 md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                {t("menus.main.open")}
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex items-center flex-shrink-0">
                                        <Logo className="w-auto h-8" />
                                    </div>
                                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                                        <DesktopNavigation
                                            links={links || app.links}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {user ? (
                                            <Link
                                                as="a"
                                                href={route("dashboard")}
                                            >
                                                <HomeIcon className="h-6 w-6" />
                                            </Link>
                                        ) : (
                                            <Link
                                                as="a"
                                                className="flex"
                                                href={route("login")}
                                            >
                                                <LogInIcon
                                                    className="-ml-0.5 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                {t(`login.link`)}
                                            </Link>
                                        )}
                                    </div>
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex items-center">
                                                {({ open }) => {
                                                    return (
                                                        <>
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">
                                                                {t(
                                                                    "menus.locale.open"
                                                                )}
                                                            </span>
                                                            {app.locale}
                                                            {open ? (
                                                                <ChevronUp className="ml-2 -mr-0.5 h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                                            )}
                                                        </>
                                                    );
                                                }}
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-background ring-1 ring-primary ring-opacity-5 focus:outline-none">
                                                {["en", "da"].map((locale) => (
                                                    <Menu.Item
                                                        key={`locale-${locale}`}
                                                    >
                                                        {({ active }) => (
                                                            <Link
                                                                href={localeLink(
                                                                    locale
                                                                )}
                                                                className={cn(
                                                                    "block",
                                                                    "px-4",
                                                                    "py-2",
                                                                    "text-sm",
                                                                    "group"
                                                                )}
                                                            >
                                                                <Underline
                                                                    active={
                                                                        app.locale ===
                                                                        locale
                                                                    }
                                                                >
                                                                    {locale}
                                                                </Underline>
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    <ThemeSwitch />
                                    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                        {/* <button
                    type="button"
                    className="relative p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="pt-2 pb-3 space-y-1">
                                <MobileNavigation links={links || app.links} />
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
