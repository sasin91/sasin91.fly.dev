import './bootstrap';
import '../css/app.css';

import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import Cloudinary from './Plugins/Cloudinary';
import i18n from './Plugins/i18n';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} :: ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const lang = props.initialPage.props.app.locale || navigator.language.split('-', 2)[0];

        createApp({
            render: () => h(App, props),
        })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(Cloudinary)
            .use(i18n(
                ['en', 'da'].includes(lang) 
                    ? lang 
                    : 'en'
            ))
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
