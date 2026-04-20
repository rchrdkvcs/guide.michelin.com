export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  ui: {
    colorMode: false,
    experimental: {
      componentDetection: true,
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  eslint: false,
});