import AppHeader from "@/Components/AppHeader";
import Headline from "@/Components/ui/Headline";
import { useTranslation } from "@/i18n/client";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

export default function Faq() {
    const { t } = useTranslation();

    const faqs: { question: string; answer: string } = t('faq.content', { returnObjects: true });

    return (
        <main className="font-sans antialiased to-magenta-100/20 isolate bg-gradient-to-br from-background via-cyan-100/5">
            <AppHeader />

            <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 lg:py-40">
                <div className="max-w-4xl mx-auto divide-y divide-white/10">
                    <Headline>
                        {t('faq.title')}
                    </Headline>
                    <dl className="mt-10 space-y-6 divide-y divide-white/10">
                        {faqs.map((faq) => (
                            <Disclosure
                                as="div"
                                key={faq.question}
                                className="pt-6"
                            >
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex items-start justify-between w-full text-left text-white">
                                                <span className="text-base font-semibold leading-7">
                                                    {faq.question}
                                                </span>
                                                <span className="flex items-center ml-6 h-7">
                                                    {open ? (
                                                        <MinusSmallIcon
                                                            className="w-6 h-6"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <PlusSmallIcon
                                                            className="w-6 h-6"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel
                                            as="dd"
                                            className="pr-12 mt-2"
                                        >
                                            <p className="text-base leading-7 text-gray-300">
                                                {faq.answer}
                                            </p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </main>
    );
}
