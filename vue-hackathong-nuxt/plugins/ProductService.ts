export default defineNuxtPlugin((nuxtApp) => {
  const ProductService = $fetch.create({
    baseURL: 'https://api.nuxt.com',
    onRequest({ request, options, error }) {
    },
    async onResponseError({ response }) {
    }
  })

  return {
    provide: {
      ProductService
    }
  }
});