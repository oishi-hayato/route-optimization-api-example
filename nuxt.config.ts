// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    googleProjectKey: process.env.GOOGLE_PROJECT_KEY,
    public: {
      googleMapKey: process.env.GOOGLE_MAP_KEY,
    },
  },
  app: {
    head: {
      script: [
        {
          hid: "google-maps",
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`,
          async: true,
          defer: true,
        },
      ],
    },
  },
});
