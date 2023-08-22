import { createI18n } from 'vue-i18n'

import en from '../../lang/en.json';
import da from '../../lang/da.json';


// define message schema for Vue component
export type MessageSchema = typeof da

// define number format schema for Vue component
export type NumberSchema = {
    currency: {
        style: 'currency',
        currencyDisplay: 'symbol'
        currency: string
    }
}

export const i18nCtx = {
    fallbackLocale: 'en',
    messages: {
        da,
        en
    },
    numberFormats: {
        'da': {
            currency: {
                style: 'currency',
                currencyDisplay: 'symbol',
                currency: 'DKK'
            }
        },
    }
};

export default (locale?: string) => createI18n({
    ...i18nCtx,
    locale: locale || 'da'
});
