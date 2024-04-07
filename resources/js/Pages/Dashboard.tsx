import Headline from "@/Components/ui/Headline";
import AppLayout from "@/Layouts/AppLayout";
import { useTranslation } from "@/i18n/client";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <header className="bg-background shadow">
                <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Headline>{t('navigation.authenticated.dashboard')}</Headline>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-secondary-foreground">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
