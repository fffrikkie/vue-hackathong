<template>
    <NuxtLoadingIndicator :is="$loading" />
    <div >
        <div class="text-5xl p-8">Product List</div>
        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
            <div v-for="product in productList" :key="product.id">
                <ProductListItem :id="product.id"  :name="product.name" :price="product.price" :imageUrl="product.primaryImage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductListItem from '@/components/product-list-item.vue';
const { $ProductService, $loading } = useNuxtApp()

const productList = await $ProductService.getAllProducts(
{
    page: 0,
    pageSize: 25,
    tags: [],
    search: ''
});

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