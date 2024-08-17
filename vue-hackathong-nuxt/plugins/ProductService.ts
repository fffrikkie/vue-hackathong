export default defineNuxtPlugin((nuxtApp) => {
  const ProductService = $fetch.create({
    baseURL: 'http://localhost:5283/products',
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