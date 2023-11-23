import "../css/app.css";
import "./bootstrap";

import { flare } from "@flareapp/flare-client";
import { FlareErrorBoundary } from "@flareapp/flare-react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

flare.light(import.meta.env.VITE_FLARE_KEY);

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <FlareErrorBoundary>
                <App {...props} />
            </FlareErrorBoundary>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
