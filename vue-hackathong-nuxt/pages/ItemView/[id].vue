<template>
  <div class="flex justify-center">
    <div v-if="loading" class="loader w-1/2 mx-auto"></div>
    <ProductInfo
      v-if="product"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useNuxtApp } from "#app";
import ProductInfo from "@/components/item-view/ItemDetails.vue";
import type { Product } from "~/components/interface/product.inteface";

export default defineComponent({
  components: {
    ProductInfo,
  },
  setup() {
    const { $ProductService, $loading } = useNuxtApp();
    const route = useRoute();
    const productId = ref<number | null>(null);
    const product = ref<Product | null>(null);
    const loading = ref(false);

    onMounted(async () => {
      productId.value = parseInt(route.params.id as string, 10);

      if (productId.value !== null) {
        try {
          loading.value = true;
          product.value = await $ProductService.getProductById(productId.value);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          loading.value = false;
        }
      }
    });

    const handleAddToCart = (product: Product) => {
      console.log("Adding to cart:", product);
      // Implement the add-to-cart functionality here
    };

    return {
      product,
      loading,
      handleAddToCart,
    };
  },
});
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #41b883;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}
</style>
