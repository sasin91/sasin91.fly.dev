import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { flare } from "@flareapp/flare-client";
import { FlareErrorBoundary } from '@flareapp/flare-react';

flare.light(import.meta.env.VITE_FLARE_KEY);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <FlareErrorBoundary>
                <App {...props} />
            </FlareErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
