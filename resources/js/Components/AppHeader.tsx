"use client";

import { Disclosure } from "@headlessui/react";
import {
    Bars3Icon,
    SparklesIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { useTranslation } from "@/i18n/client";
import { Link, usePage } from "@inertiajs/react";
import { DesktopNavigation, MobileNavigation } from "./AppNavigation";
import Logo from "./ui/Logo";
import Dropdown from "./ui/Dropdown";

export default function AppHeader() {
    const page = usePage();
    const { t, i18n } = useTranslation();

    const links = [
        {
            key: "blog",
            href: route("blog"),
            label: t("navigation.global.blog"),
            active: route().current("blog"),
        },
        {
            key: "projects",
            href: route("projects"),
            label: t("navigation.global.projects"),
            active: route().current("projects"),
        },
    ];

    return (
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
                                    <DesktopNavigation links={links} />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link
                                        as="a"
                                        type="button"
                                        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        href={route("projects.game")}
                                    >
                                        <SparklesIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        {t("navigation.global.game")}
                                    </Link>
                                </div>
                                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                                >
                                                    {page.props.app.locale}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {['en', 'da'].map((locale) => (
                                                <Dropdown.Link
                                                    key={`locale-${locale}`}
                                                    href={`/locale/${locale}`}
                                                >
                                                    {locale}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown>
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
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            <MobileNavigation links={links} />
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4 sm:px-6">
                                {/* <button
                  type="button"
                  className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button> */}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}