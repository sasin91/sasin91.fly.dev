import { Lng } from "@/i18n/settings";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    can_access_filament: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    app: {
        name: string,
        domain: string,
        locale: Lng
    };
    auth: {
        user: User;
    };
};
