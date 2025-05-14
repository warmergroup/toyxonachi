// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/fonts'
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
        subsets: ['latin'],
        display: 'swap'
      }
    ],
    defaults: {
      weights: [400, 500, 700],
      subsets: ['latin'],
      display: 'swap'
    }
  },
  app: {
    head: {
      title: 'Venue Finder',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: 'Find the perfect venue for your event'},
      ],
    },
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  }
})