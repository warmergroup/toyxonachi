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
    '@nuxt/fonts',
    '@nuxtjs/i18n',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false
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
      title: 'Venue Finder',
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
    detectBrowserLanguage: false
  }
})