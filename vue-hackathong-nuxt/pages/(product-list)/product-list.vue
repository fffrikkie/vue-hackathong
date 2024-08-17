<template>
    <div >
        <div class="text-5xl p-8">Product List</div class="">
        <div class="grid gap-4 grid-cols-3 p-8">
            <div v-for="product in products" :key="product.id">
                <ProductListItem :id="product.id"  :name="product.name" :price="product.price" :imageUrl="product.imageUrl" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductListItem from '@/components/product-list-item.vue';


const products = [
    { id: 1, name: 'Product 1', price: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 4', price: 40, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 5', price: 50, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 6', price: 60, imageUrl: 'https://via.placeholder.com/150' },
];


</script>

<style scoped>
h1 {
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}
</style>