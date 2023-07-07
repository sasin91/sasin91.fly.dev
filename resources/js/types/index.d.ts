export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    can_access_filament: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    app: { name: string, domain: string };
    auth: {
        user: User;
    };
};
