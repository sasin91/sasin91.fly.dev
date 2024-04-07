import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import Headline from '@/Components/ui/Headline';
import { useTranslation } from '@/i18n/client';

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const { t } = useTranslation();

    return (
        <AppLayout>
            <Head title={t('navigation.authenticated.profile')} />

            <header className="bg-background shadow">
                <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Headline>{t('navigation.authenticated.profile')}</Headline>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-background shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-background shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-background shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
