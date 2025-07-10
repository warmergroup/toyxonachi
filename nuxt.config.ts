// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: false},

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    // Server tomonida mavjud bo'lgan muhit o'zgaruvchilari
    apiKey: process.env.NUXT_API_KEY,

    // Client tomonida ham mavjud bo'lgan muhit o'zgaruvchilari
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      yandexMapsApiKey: process.env.YANDEX_MAPS_API_KEY,
      imageUrl: process.env.NUXT_PUBLIC_IMG_URL,
      vapidKey: process.env.PUBLIC_VAPID_KEY,
    }
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons/custom'
      },
    ],
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 700],
        subsets: ['latin']
      }
    ],
    defaults: {
      weights: [400, 500, 700],
      subsets: ['latin']
    }
  },
  app: {
    head: {
      title: 'toyxonachi.uz',
      link: [
        // Faviconlar
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
        { rel: 'icon', type: 'image/png', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: 'Find the perfect venue for your event'},
      ]
    },
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  i18n: {
    locales: [{
      code: 'uz',
      name: 'O\'zbek',
      file: 'uz.json'
    }, {
      code: 'ru',
      name: 'Русский',
      file: 'ru.json'
    }, {
      code: 'en',
      name: 'English',
      file: 'en.json'
    }],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'uz',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  vite: {
    build: {
      target: 'esnext'
    }
  }
})