<template>
    <div class="relative h-96 overflow-hidden rounded-xl bg-[#3d3c3d] hover:scale-105 transition-transform duration-300 ease-in-out shadow-xl"
        @click="navigateTo('/itemview')">
        <div
            class="absolute inset-0.5 flex flex-col items-start justify-start text-white z-[1] rounded-xl bg-[#323132] bg-opacity-90">
            <div class="w-full h-48 flex items-center justify-center overflow-hidden rounded-t-xl bg-white">
                <img :src="product.imageUrl" :alt="product.name" class="w-full h-full object-contain">
            </div>
            <div class="p-4 w-full">
                <h3 class="text-lg font-semibold mb-2 text-left">{{ product.name }}</h3>
                <p class="mb-4 text-left">R {{ product.price }}</p>
            </div>
            <button class="group cursor-pointer outline-none hover:rotate-90 duration-300 absolute bottom-4 right-4"
                title="Add to cart">
                <svg class="w-8 h-8 stroke-teal-500 fill-none group-hover:fill-white-200 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-width="1.5"
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z">
                    </path>
                    <path stroke-width="1.5" d="M8 12H16"></path>
                    <path stroke-width="1.5" d="M12 16V8"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const product = defineProps<Product>()

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
}
</script>

<style scoped>
.product-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
}

.product-details {
    flex-grow: 1;
}

.product-name {
    font-size: 18px;
    margin-bottom: 5px;
}

.product-price {
    font-size: 16px;
    color: #888;
    margin-bottom: 10px;
}

.add-to-cart-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>