import FormField from "@/Components/ui/FormField";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { useTranslation } from "@/i18n/client";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export default function Register() {
    const { t } = useTranslation();

    const form = useForm("post", route("register"), {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            form.reset("password", "password_confirmation");
        };
    }, []);

    return (
        <GuestLayout>
            <Head title={t("register.title")} />

            <div className="container mx-auto mt-14">
                <form
                    onSubmit={(e) => {
                        return form.submit({
                            preserveScroll: true,
                            onSuccess: () => {
                                form.reset();
                            },
                        });
                    }}
                >
                    <FormField
                        form={form}
                        attribute="name"
                        label={t("register.form.name")}
                        autoComplete="name"
                        isFocused={true}
                        required
                    />

                    <FormField
                        form={form}
                        attribute="email"
                        label={t("register.form.email")}
                        autoComplete="username"
                        required
                    />

                    <FormField
                        form={form}
                        attribute="password"
                        label={t("register.form.password")}
                        autoComplete="new-password"
                        type="password"
                        required
                    />

                    <FormField
                        form={form}
                        attribute="password_confirmation"
                        label={t("register.form.password_confirmation")}
                        autoComplete="new-password"
                        type="password"
                        required
                    />

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t("register.login_link")}
                        </Link>

                        <PrimaryButton
                            className="ms-4"
                            disabled={form.processing}
                        >
                            {t("register.submit")}
                            {form.loading && <Loader />}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
