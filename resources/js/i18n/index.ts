import type { FlatNamespace, KeyPrefix } from "i18next";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import type { FallbackNs } from "react-i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import type { Lng } from "./settings";
import { getOptions } from "./settings";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const initI18next = async (lng: Lng, ns: string | string[]) => {
    // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string) => import(`../../lang/${language}.json`)
            )
        )
        // .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init(getOptions(lng, ns));
    return i18nInstance;
};

export async function useTranslation<
    Ns extends FlatNamespace,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(lng?: Lng, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
    if (!lng) {
        const { props } = usePage<PageProps>();

        lng = props.app.locale;
    }

    const i18nextInstance = await initI18next(
        lng,
        Array.isArray(ns) ? (ns as string[]) : (ns as string)
    );
    return {
        t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
        i18n: i18nextInstance,
    };
}
