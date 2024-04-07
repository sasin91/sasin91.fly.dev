import FormField from "@/Components/ui/FormField";
import { Input } from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import { Label } from "@/Components/ui/Label";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import { useTranslation } from "@/i18n/client";
import { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import { Loader } from "lucide-react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { t } = useTranslation();
    const user = usePage<PageProps>().props.auth.user;

    const form = useForm("patch", route("profile.update"), {
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        return form.submit({
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-secondary-foreground">
                    {t("profile.information.header")}
                </h2>

                <p className="mt-1 text-sm text-secondary-background">
                    {t("profile.information.description")}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <FormField label={t('profile.information.form.name')} attribute="name" form={form} />

                <FormField label={t('profile.information.form.email')} attribute="email" form={form} /> 

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-secondary-background hover:text-secondary-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t("profile.information.resend_verification")}
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600 break-words">
                                {t(
                                    "profile.information.verification_link_sent"
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={form.processing}>
                        {form.processing ? (<Loader className="w-6 h-6" />) : t("profile.information.form.submit")}
                    </PrimaryButton>

                    <Transition
                        show={form.recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-secondary-background">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
