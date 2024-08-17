<template>
  <div class="flex justify-center">
    <ProductInfo
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script lang="ts">
import ProductInfo from '@/components/item-view/ItemDetails.vue'
import { defineComponent } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  tags: string[]
}

export default defineComponent({
  components: {
    ProductInfo
  },
  data() {
    return {
      product: 
        {
          id: 1,
          name: 'Philips Toaster Viva Collection - 950W',
          description:
            '2 Extra Wide Slots, 7 Browning Levels, Built-in Bun Warmer, Auto-Shut, Cancel Button, Defrost Function, Metal/Black - HD2637/91',
          price: 747.0,
          images: [
            'https://m.media-amazon.com/images/I/41F0QVlaViL._AC_.jpg',
            'https://m.media-amazon.com/images/I/51PUeeomc5L._AC_.jpg',
            'https://m.media-amazon.com/images/I/41slNRTbSUL._AC_.jpg',
            'https://m.media-amazon.com/images/I/41Do539zQCL._AC_.jpg'
          ],
          tags: ['Applicances', 'Toasters']
        }
    }
  },
  methods: {
    handleAddToCart(product: Product): void {
      console.log('Adding to cart:', product)
      // Implement the add-to-cart functionality here
    }
  }
})
</script>
