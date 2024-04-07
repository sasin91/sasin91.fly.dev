import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/ui/Checkbox";
import FormField from "@/Components/ui/FormField";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import GuestLayout from "@/Layouts/AppLayout";
import { useTranslation } from "@/i18n/client";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import { Loader } from "lucide-react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { t } = useTranslation();
    const form = useForm("post", route("login"), {
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            form.reset("password");
        };
    }, []);

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
        <GuestLayout>
            <Head title={t("login.title")} />

            <div className="container mx-auto mt-14">
                <form onSubmit={submit} className="space-y-4">
                    <FormField
                        form={form}
                        attribute="email"
                        label={t("login.form.email")}
                        autoComplete="username"
                        isFocused={true}
                    />

                    <FormField
                        form={form}
                        attribute="password"
                        label={t("login.form.password")}
                        required
                        autoComplete="current-password"
                        type="password"
                    />

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={form.remember}
                                onChange={(e) =>
                                    form.setData("remember", e.target.checked)
                                }
                            />
                            <span className="text-sm text-gray-600 ms-2">
                                {t("login.form.remember")}
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t("login.reset_password")}
                            </Link>
                        )}

                        <Link
                            href={route("register")}
                            className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t("login.register")}
                        </Link>

                        <PrimaryButton
                            className="ms-4"
                            disabled={form.processing}
                        >
                            {t("login.form.submit")}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
