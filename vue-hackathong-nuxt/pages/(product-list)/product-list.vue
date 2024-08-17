<template>
    <div>
        <div class="sticky-search-container sticky top-0 z-10 transition-opacity duration-300">
            <div class="p-8">
                <div class="ml-4 flex flex-wrap">
                    <div v-for="tag in matchedTags" :key="tag.id"
                        class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center">
                        {{ tag.name }}
                        <button @click="removeTag(tag)"
                            class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <button v-if="searchQuery || matchedTags.length" @click="clearSearch"
                    class="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <input v-model="searchQuery" @input="debounceSearch"
                    class="bg-[#222630] px-4 py-3 outline-none w-5/6 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                    name="text" placeholder="Search products" type="text" />

            </div>

        </div>

        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
            <div v-for="product in productList" :key="product.id">
                <ProductListItem :id="product.id" :name="product.name" :price="product.price"
                    :imageUrl="product.primaryImage" />
            </div>
        </div>
        <div v-if="loading" class="loader w-1/2 mx-auto"></div>
        <div ref="infiniteScrollTrigger"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductListItem from '@/components/product-list-item.vue';

const { $ProductService, $loading, $TagService } = useNuxtApp();

const productList = ref([]);
const tags = ref([]);
const matchedTags = ref([]);
const page = ref(0);
const pageSize = 25;
const searchQuery = ref('');
const loading = ref(false);
const observer = ref(null);

const stickySearchContainer = ref(null);
let lastScrollTop = 0;

const fetchProducts = async () => {
    loading.value = true;
    const newProducts = await $ProductService.getAllProducts({
        page: page.value,
        pageSize,
        tags: matchedTags.value.map(tag => tag.name),
        search: searchQuery.value
    });
    productList.value = [...productList.value, ...newProducts];
    page.value++;
    loading.value = false;
};

const fetchTags = async () => {
    tags.value = await $TagService.getAllTags();
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const debounceSearch = debounce(() => {
    productList.value = [];
    page.value = 0;
    matchedTags.value = tags.value.filter(tag =>
        tag.name.toLowerCase() == searchQuery.value.toLowerCase()
    );
    fetchProducts();
}, 300);

const removeTag = (tag) => {
    matchedTags.value = matchedTags.value.filter(t => t !== tag);
};

const infiniteScrollTrigger = ref(null);

const clearSearch = () => {
    searchQuery.value = '';
    matchedTags.value = [];
    productList.value = [];
    page.value = 0;
    fetchProducts();
};

onMounted(() => {
    fetchProducts();
    fetchTags();

    observer.value = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !loading.value) {
            fetchProducts();
        }
    }, { threshold: 1.0 });

    stickySearchContainer.value = document.querySelector('.sticky-search-container');
    window.addEventListener('scroll', handleScroll);


    if (infiniteScrollTrigger.value) {
        observer.value.observe(infiniteScrollTrigger.value);
    }
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (observer.value) {
        observer.value.disconnect();
    }
});

function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        stickySearchContainer.value.style.opacity = '0';
    } else {
        stickySearchContainer.value.style.opacity = '1';
    }
    lastScrollTop = st <= 0 ? 0 : st;
}
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

.white,
.border,
.darkBorderBg,
.glow {
    max-height: 70px;
    max-width: 314px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    /* Border Radius */
    border-radius: 12px;
    filter: blur(3px);
}

#poda {
    display: flex;
    align-items: center;
    justify-content: center;
}

.input {
    background-color: #010201;
    border: none;
    height: 56px;
    border-radius: 10px;
    color: white;
    padding-inline: 59px;
    font-size: 18px;
    width: 301px;
}

.input::placeholder {
    color: #c0b9c0;
}

.input:focus {
    outline: none;
}

#main:focus-within>#input-mask {
    display: none;
}

#input-mask {
    pointer-events: none;
    width: 100px;
    height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, black);
    top: 18px;
    left: 70px;
}

#pink-mask {
    pointer-events: none;
    width: 30px;
    height: 20px;
    position: absolute;
    background: #cf30aa;
    top: 10px;
    left: 5px;
    filter: blur(20px);
    opacity: 0.8;
    transition: all 2s;
}

#main:hover>#pink-mask {
    opacity: 0;
}

.white {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
}

.white::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(rgba(0, 0, 0, 0) 0%,
            #83e6e6,
            rgba(0, 0, 0, 0) 8%,
            rgba(0, 0, 0, 0) 50%,
            #184177,
            rgba(0, 0, 0, 0) 58%);

    transition: all 2s;
}

.border {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
}

.border::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px;
    height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(#1c191c,
            #008080 5%,
            #1c191c 14%,
            #1c191c 50%,
            #154f9b 60%,
            #1c191c 64%);
    transition: all 2s;
}

.darkBorderBg {
    max-height: 65px;
    max-width: 312px;
}

.darkBorderBg::before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(rgba(0, 0, 0, 0),
            #008080,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 50%,
            #145fc1,
            rgba(0, 0, 0, 0) 60%);
    transition: all 2s;
}

#poda:hover>.darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(262deg);
}

#poda:hover>.glow::before {
    transform: translate(-50%, -50%) rotate(240deg);
}

#poda:hover>.white::before {
    transform: translate(-50%, -50%) rotate(263deg);
}

#poda:hover>.border::before {
    transform: translate(-50%, -50%) rotate(250deg);
}

#poda:hover>.darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(-98deg);
}

#poda:hover>.glow::before {
    transform: translate(-50%, -50%) rotate(-120deg);
}

#poda:hover>.white::before {
    transform: translate(-50%, -50%) rotate(-97deg);
}

#poda:hover>.border::before {
    transform: translate(-50%, -50%) rotate(-110deg);
}

#poda:focus-within>.darkBorderBg::before {
    transform: translate(-50%, -50%) rotate(442deg);
    transition: all 4s;
}

#poda:focus-within>.glow::before {
    transform: translate(-50%, -50%) rotate(420deg);
    transition: all 4s;
}

#poda:focus-within>.white::before {
    transform: translate(-50%, -50%) rotate(443deg);
    transition: all 4s;
}

#poda:focus-within>.border::before {
    transform: translate(-50%, -50%) rotate(430deg);
    transition: all 4s;
}

.glow {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
}

.glow:before {
    content: "";
    z-index: -2;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px;
    height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    /*border color, change middle color*/
    background-image: conic-gradient(#000,
            #008080 5%,
            #000 38%,
            #000 50%,
            #1f477b 60%,
            #000 87%);
    transition: all 2s;
}

@keyframes rotate {
    100% {
        transform: translate(-50%, -50%) rotate(450deg);
    }
}

@keyframes leftright {
    0% {
        transform: translate(0px, 0px);
        opacity: 1;
    }

    49% {
        transform: translate(250px, 0px);
        opacity: 0;
    }

    80% {
        transform: translate(-40px, 0px);
        opacity: 0;
    }

    100% {
        transform: translate(0px, 0px);
        opacity: 1;
    }
}

#filter-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    max-height: 40px;
    max-width: 38px;
    height: 100%;
    width: 100%;

    isolation: isolate;
    overflow: hidden;
    /* Border Radius */
    border-radius: 10px;
    background: linear-gradient(180deg, #161329, black, #1d1b4b);
    border: 1px solid transparent;
}

.filterBorder {
    height: 42px;
    width: 40px;
    position: absolute;
    overflow: hidden;
    top: 7px;
    right: 7px;
    border-radius: 10px;
}

.filterBorder::before {
    content: "";

    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px;
    height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(rgba(0, 0, 0, 0),
            #3d3a4f,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 50%,
            #3d3a4f,
            rgba(0, 0, 0, 0) 100%);
    animation: rotate 4s linear infinite;
}

#main {
    position: relative;
}

#search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

/* Heading */
</style>