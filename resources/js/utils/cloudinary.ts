import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME ?? "sasin91",
    apiKey: import.meta.env.CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
  },
});

export default cld;
