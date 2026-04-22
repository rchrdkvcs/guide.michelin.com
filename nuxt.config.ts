export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  srcDir: "app",

  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image"],

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

  nitro: {
    scanDirs: ["../server"],
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  image: {
    domains: ["static.prod.r53.tablethotels.com"],
  },

  vite: {
    optimizeDeps: {
      include: ["@vueuse/core"],
    },
  },

  eslint: false,
});
