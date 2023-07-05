import { Cloudinary } from "@cloudinary/url-gen";
import { App, inject } from "vue";

export const injectCloudinary = () => inject("cloudinary") as Cloudinary;

export default {
    install(app: App) {
        // Create a Cloudinary instance and set your cloud name.
        const cld = new Cloudinary({
            cloud: {
                cloudName: 'sasin91',
                // cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
                // apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
                // apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
            },
        });

        app.provide("cloudinary", cld);
    }
}