export default defineNuxtPlugin((nuxtApp) => {
  const ProductService = $fetch.create({
    baseURL: 'https://abfrontendhackerthon.onrender.com',
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