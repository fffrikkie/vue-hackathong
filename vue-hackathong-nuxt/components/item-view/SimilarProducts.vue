<template>
  <div>
    <div class="text-5xl p-8">Similar Products</div>
    <div v-if="loading" class="loader w-1/2 mx-auto"></div>
    <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
      <div
        class="w-80 h-80"
        v-for="product in productList"
        :key="product.id"
        @click="navigateTo(`/itemview/${product.id}`)"
      >
        <img class="h-60 w-60" :src="product.primaryImage" />
        <h2 class="text-xl font-bold truncate">{{ product.name }}</h2>
        <p class="text-l font-semibold">{{ formattedPrice(product.price) }}</p>
        <button
          class="group cursor-pointer outline-none hover:rotate-90 duration-300 float-right"
          title="Add to cart"
          @click="handleAddToCart(product)"
        >
          <svg
            class="w-8 h-8 stroke-teal-500 fill-none group-hover:fill-white-200 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-width="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            ></path>
            <path stroke-width="1.5" d="M8 12H16"></path>
            <path stroke-width="1.5" d="M12 16V8"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import type { Product } from "../interface/product.inteface";
import type { ProductListObject } from "../interface/productListObject.inteface";

export default defineComponent({
  name: "SimilarProducts",
  props: {
    tags: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const { $ProductService, $loading } = useNuxtApp();
    const loading = ref(false);
    const productList = ref<Product[]>([]);

    onMounted(async () => {
      try {
          loading.value = true;
        productList.value = await $ProductService.getAllProducts({
          page: 0,
          pageSize: 4,
          search: "",
          tags: props.tags,
        });
        console.log("LIST", productList);
        
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
      } finally {
          loading.value = false;
      }
    });

    const handleAddToCart = (product: Product): void => {
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

    const formattedPrice = (price: number): string => {
      return `R${price.toFixed(2)}`;
    };

    const navigateTo = (path: string) => {
      window.location.href = path;
    };

    return {
      productList,
      loading,
      addToCart,
      formattedPrice,
      navigateTo,
      handleAddToCart
    };
  },
});
</script>

<style scoped>
.product-info {
  border: 1px solid hsla(160, 100%, 37%, 1);
}

.product-image {
  width: 800px;
  height: 600px;
  border-radius: 5px;
}

.thumbnail-image {
  opacity: 0.5;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
}

.thumbnail-image.selected {
  border: 2px solid #28a745;
  opacity: 1;
}

.image-carousel {
  overflow: auto;
  width: 800px;
  height: 200px;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-to-cart-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-to-cart-button:hover {
  background-color: #218838;
}
</style>
