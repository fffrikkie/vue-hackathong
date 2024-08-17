<template>
  <div class="rounded w-full h-1/2">
    <img :src="images[selectedImage]" class="rounded w-full h-full" />
  </div>

  <div class="image-carousel flex justify-center">
    <img
      v-for="(image, index) in images"
      @click="selectedImage = index"
      :src="image"
      class="thumbnail-image"
      :class="{ selected: selectedImage === index }"
    />
  </div>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "ImageCarousel",
  props: {
    images: {
      type: Array<string>,
      required: true,
    },
  },
  data() {
    return {
      selectedImage: 0,
    };
  },
});
</script>

<style scoped>
.product-info {
  border: 1px solid hsla(160, 100%, 37%, 1);
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
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
