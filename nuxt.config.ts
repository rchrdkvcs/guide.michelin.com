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

  app: {
    head: {
      htmlAttrs: { lang: "fr" },
      titleTemplate: "%s · Guide MICHELIN",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "Guide MICHELIN" },
        { property: "og:locale", content: "fr_FR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@michelin_fr" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/restaurants": { prerender: true },
    "/hotels": { prerender: true },
    "/adventures": { prerender: true },
    "/escape": { prerender: true },
    "/compte": { headers: { "X-Robots-Tag": "noindex" } },
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
    prerender: {
      failOnError: false,
    },
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
