<template>
    <div class="product-item">
        <img :src="product.imageUrl" :alt="product.name" class="product-image">
        <div class="product-details">
            <h3  class="text-red-500 text-base">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}</p>
            <button class="add-to-cart-button">Add to Cart</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const product = defineProps < Product > ()


interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl ?: string;
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