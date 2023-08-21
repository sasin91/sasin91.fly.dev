import { createI18n, useI18n as forwardUseI18n } from 'vue-i18n'

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

const ctx = {
    legacy: false,
    locale: 'da',
    fallbackLocale: 'en',
    messages: {
        'en': en,
        'da': da
    },
    datetimeFormats: {
        'da': {
            short: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
                timezone: 'Europe/Copenhagen'
            }
        }
    },
    numberFormats: {
        'da': {
            currency: {
                style: 'currency',
                currencyDisplay: 'symbol',
                currency: 'DKK'
            }
        }
    }
};

export const useI18n = () => forwardUseI18n(ctx);

export default createI18n(ctx);
