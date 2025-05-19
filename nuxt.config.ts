// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  ssr: true,
  devtools: { enabled: true },
  css: ['@/assets/sass/global.scss'],
  compatibilityDate: '2025-05-15',
  nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './.data/storage',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
