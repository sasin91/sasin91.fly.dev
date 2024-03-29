import { LinkType } from "@/Components/AppNavigation";
import { Lng } from "@/i18n/settings";

export interface Character {
    id: number;
    name: string;
    health: number;
    mana: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
    character?: Character;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    app: {
        links: LinkType[];
        name: string;
        domain: string;
        locale: Lng;
    };
    auth: {
        user: User;
    };
};
