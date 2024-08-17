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
import type { ProductListObject } from "~/components/interface/productListObject.inteface";

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
      // Implement the add-to-cart functionality here
      const cartProduct : ProductListObject = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.primaryImage,
        description: product.description,
        tags: []
      }
      addToCart(cartProduct);
    };

    return {
      product,
      loading,
      handleAddToCart,
    };
  },
});
</script>
