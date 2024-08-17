// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // pages: false,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/pages',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/main.css','~/assets/base.css'],
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
