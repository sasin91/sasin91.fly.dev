import './bootstrap';
import '../css/app.css';

import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import Cloudinary from './Plugins/Cloudinary';
import { createI18n } from 'vue-i18n'

import da from '../lang/da.json';


// define message schema for Vue component
type MessageSchema = typeof da

// define number format schema for Vue component
type NumberSchema = {
    currency: {
        style: 'currency',
        currencyDisplay: 'symbol'
        currency: string
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'da-DK',
    // fallbackLocale: 'en-US',
    messages: {
        //   'en-US': enUS,
        'da-DK': da
    },
    datetimeFormats: {
        'da-DK': {
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
        'da-DK': {
            currency: {
                style: 'currency',
                currencyDisplay: 'symbol',
                currency: 'DKK'
            }
        }
    }
});

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} :: ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({
            render: () => h(App, props),
        })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(Cloudinary)
            .use(i18n)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
