import type { ProductListObject } from '~/components/interface/productListObject.inteface'
export const cart = ref<ProductListObject[]>([])

export const useCounterStore = () => useState('cart', () => {
  // const count = cart.value.length
  
  return {cart, addToCart}
})

export function addToCart(product: ProductListObject) {
  cart.value.push(product)
}

export function getCart() {
  return cart.value
}

export function clearCart() {
  cart.value = []
}

export function removeFromCart(id: number) {
  cart.value = cart.value.filter((product) => product.id !== id)
}