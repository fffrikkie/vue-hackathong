<template>
    <div class="float-center">
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                <ProductListItem :id="product.id"  :name="product.name" :price="product.price" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import ProductListItem from '@/components/product-list-item.vue';


const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
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