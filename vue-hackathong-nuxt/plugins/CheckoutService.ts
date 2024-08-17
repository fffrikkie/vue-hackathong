import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'https://abfrontendhackerthon.onrender.com/purchase',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjU2ZjRlZmIzLTE4ZTQtNDFhYy05YmIwLTRmMjMyOWNlYWU2OCIsInN1YiI6ImFkbWluIiwic2lkIjoiMSIsImVtYWlsIjoiYWRtaW4iLCJqdGkiOiIxZTlkYzFlZS04YzIxLTQ4MmYtOTQzOC1kYzM1ZDdiZDQwOTAiLCJuYmYiOjE3MjM5MDQ1MDYsImV4cCI6MTcyMzkwNDgwNiwiaWF0IjoxNzIzOTA0NTA2LCJpc3MiOiJodHRwczovL2pveWRpcGthbmppbGFsLmNvbS8iLCJhdWQiOiJodHRwczovL2pveWRpcGthbmppbGFsLmNvbS8ifQ.y5hPTlNPIxthlb-nF7V2aw38S8egCAoxsx0ezp-V48uK0mrI6NWLBHnRBxAnElf8G3rRimupb4TyiGT8VZvP_A'
    }
  });
  const CheckoutService = {
    async purchaseProducts(request: {productIds:number[]}) {
      try {
        const response = await axiosInstance.put('/create', request);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      }
    },
    async getPurchaseList() {
      try {
        const response = await axiosInstance.get(`/list`);
        return response.data;
      } catch (error) {
        console.log({error});
        throw error;
      }
    },
  }

  return {
    provide: {
      CheckoutService
    }
  }
});