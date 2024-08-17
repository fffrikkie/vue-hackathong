<template>
    <div >
        <div class="text-5xl p-8">Product List</div class="">
        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
            <div v-for="product in products" :key="product.id">
                <ProductListItem :id="product.id"  :name="product.name" :price="product.price" :imageUrl="product.imageUrl" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductListItem from '@/components/product-list-item.vue';


const products = [
    { id: 1, name: 'Product 1', price: 49, imageUrl: 'https://media.takealot.com/covers_images/7ee4f95677f14d23bd52b29a2d3bc387/s-pdpxl.file' },
    { id: 2, name: 'GetUp Pro Boxing Mask', price: 399, imageUrl: 'https://media.takealot.com/covers_images/624bd5e138424b20a77c55d0b269c1a9/s-zoom.file' },
    { id: 3, name: 'Call of Duty Black Ops 6 for PS5 - PRE ORDER', price: 1629, imageUrl: 'https://media.takealot.com/covers_images/ea1f0cbee8b74b9ebaf0dc93fbd5dda8/s-zoom.file' },
    { id: 3, name: '3-in-1 Handheld Strong Suction Vacuum Cleaner 600W', price: 850, imageUrl: 'https://media.takealot.com/covers_images/dc7a8054062a4be0a515ecbc27875b1b/s-zoom.file' },
    { id: 3, name: 'Product 5', price: 50, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 6', price: 60, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 5', price: 50, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 6', price: 60, imageUrl: 'https://via.placeholder.com/150' },
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