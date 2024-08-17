<template>
  <div class="product-info rounded shadow-2xl w-4/5 p-8 grid grid-cols-2 gap-5">
    <div class="shadow-2xl col-span-1">
      <ImageCarousel :images="product.images" />
    </div>
    <div class="col-span-1">
      <h2 class="text-4xl font-bold">{{ product.name }}</h2>
      <p class="text-xl p-2">{{ product.description }}</p>
      <div class="flex py-2">
        <div
          class="rounded-full p-2 m-1 bg-gray-500"
          v-for="tag in product.tags"
        >
          {{ tag }}
        </div>
      </div>
      <p class="p-2 text-xl font-semibold">{{ formattedPrice }}</p>
      <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
    </div>
    <div class="divider col-span-2"></div>
    <div class="col-span-2">
        <SimilarProducts :tags="product.tags" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

export default defineComponent({
  name: "ProductInfo",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: 0,
    };
  },
  computed: {
    formattedPrice(): string {
      return `R${this.product.price.toFixed(2)}`;
    },
  },
  methods: {
    addToCart(): void {
      this.$emit("add-to-cart", this.product);
    },
  },
});
</script>

<style scoped>

.divider {
  border: 1px solid #28a745;
  height: 1px;
}

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
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #218838;
}
</style>
