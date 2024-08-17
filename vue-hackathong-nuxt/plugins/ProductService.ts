import axios from 'axios';
import type { ProductListRequest } from '~/components/interface/productListRequest.interface';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5283/products',
  });
  const ProductService = {
    async getAllProducts(request: ProductListRequest) {
      try {
        const response = await axiosInstance.post('/list', request);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      }
    },
    async getProductById(id: number) {
      try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      }
    },
  }

  return {
    provide: {
      ProductService
    }
  }
});