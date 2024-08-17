<template>
  <div class="flex">
    <img
      :src="product.images[selectedImage]"
      :alt="product.name"
      class="product-image"
    />
    <div class="image-carousel">
      <img
        v-for="(image, index) in product.images"
        @click="selectedImage = index"
        :src="image"
        :alt="product.name"
        class="thumbnail-image"
        :class="{ selected: selectedImage === index }"
      />
    </div>
    <h2 class="product-name">{{ product.name }}</h2>
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">{{ formattedPrice }}</p>
    <button @click="addToCart" class="add-to-cart-button">Add to Cart</button>
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
.product-info {
  border: 1px solid hsla(160, 100%, 37%, 1);
  padding: 20px;
  width: 100%;
  border-radius: 5px;
}

.product-image {
  width: 800px;
  height: 600px;
  border-radius: 5px;
}

.thumbnail-image {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
}

.thumbnail-image.selected {
  border: 2px solid #28a745;
}

.image-carousel {
  display: flex;
  justify-content: center;
  overflow: auto;
  width: 800px;
  height: 200px;
}

.product-name {
  font-size: 1.5rem;
  margin: 10px 0;
}

.product-description {
  font-size: 1rem;
  margin-bottom: 10px;
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
