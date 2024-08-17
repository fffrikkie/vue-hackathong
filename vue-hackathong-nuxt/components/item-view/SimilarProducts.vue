<template>
  <div class="text-5xl p-8">Similar Products</div>
  <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
    <div class="w-80 h-80" v-for="product in products" :key="product.id">
      <img class="h-60 w-60" :src="product.images[0]" />
      <h2 class="tooltip text-xl font-bold truncate overflow-ellipsis">
        {{ product.name }}
      </h2>
      <p class="text-l font-semibold">{{ formattedPrice(product.price) }}</p>
      <button
        class="group cursor-pointer outline-none hover:rotate-90 duration-300 float-right"
        title="Add to cart"
        @click="addToCart(product)"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Product } from "../interface/product.inteface";

export default defineComponent({
  name: "SimilarProducts",
  props: {
    tags: {
      type: Array<string>,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: 0,
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "",
          price: 49,
          tags: [],
          images: [
            "https://media.takealot.com/covers_images/7ee4f95677f14d23bd52b29a2d3bc387/s-pdpxl.file",
          ],
        },
        {
          id: 2,
          name: "GetUp Pro Boxing Mask",
          description: "",
          price: 399,
          tags: [],
          images: [
            "https://media.takealot.com/covers_images/624bd5e138424b20a77c55d0b269c1a9/s-zoom.file",
          ],
        },
        {
          id: 3,
          name: "Call of Duty Black Ops 6 for PS5 - PRE ORDER",
          description: "",
          price: 1629,
          tags: [],
          images: [
            "https://media.takealot.com/covers_images/ea1f0cbee8b74b9ebaf0dc93fbd5dda8/s-zoom.file",
          ],
        },
        {
          id: 3,
          name: "3-in-1 Handheld Strong Suction Vacuum Cleaner 600W",
          description: "",
          price: 850,
          tags: [],
          images: [
            "https://media.takealot.com/covers_images/dc7a8054062a4be0a515ecbc27875b1b/s-zoom.file",
          ],
        },
      ],
    };
  },
  methods: {
    addToCart(product: Product): void {
      this.$emit("add-to-cart", product);
    },
    formattedPrice(price: number): string {
      return `R${price.toFixed(2)}`;
    },
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
