import axios from 'axios';
import type { ProductListRequest } from '~/components/interface/productListRequest.interface';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'https://abfrontendhackerthon.onrender.com/products',
  });

  const loading = ref(false);

  const ProductService = {
    async getAllProducts(request: ProductListRequest) {
      try {
        loading.value = true;
        const response = await axiosInstance.post('/list', request);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      } finally {
        loading.value = false
      }
    },
    async getProductById(id: number) {
      try {
        loading.value = true;
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      } finally {
        loading.value = false
      }
    },
  }
  return {
    provide: {
      ProductService,
      loading
    }
  }
});