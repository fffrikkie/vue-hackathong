<template>
    <NuxtLoadingIndicator :is="$loading" />
    <div>
        <!-- <div class="text-5xl p-8">Product List</div> -->
        <div class="sticky-search-container sticky top-0 z-10 transition-opacity duration-300">
            <div class="p-8">
                <div id="poda" class="">
                    <div class="glow"></div>
                    <div class="darkBorderBg"></div>
                    <div class="darkBorderBg"></div>
                    <div class="darkBorderBg"></div>

                    <div class="white"></div>

                    <div class="border"></div>

                    <div id="main">
                        <input type="text" name="text" class="input" v-model="searchQuery" @input="debounceSearch"
                            placeholder="Search products..." />
                        <div class="filterBorder"></div>
                        <div id="filter-icon">
                            <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408"
                                fill="none">
                                <path
                                    d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                                    stroke="#d6d6e6" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <div id="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2"
                                stroke-linejoin="round" stroke-linecap="round" height="24" fill="none"
                                class="feather feather-search">
                                <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                                <line stroke="url(#search)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
                                <defs>
                                    <linearGradient gradientTransform="rotate(50)" id="search">
                                        <stop stop-color="#f8e7f8" offset="0%"></stop>
                                        <stop stop-color="#b6a9b7" offset="50%"></stop>
                                    </linearGradient>
                                    <linearGradient id="search">
                                        <stop stop-color="#b6a9b7" offset="0%"></stop>
                                        <stop stop-color="#837484" offset="50%"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-4 p-8">
            <div v-for="product in productList" :key="product.id">
                <ProductListItem :id="product.id" :name="product.name" :price="product.price"
                    :imageUrl="product.primaryImage" />
            </div>
        </div>
        <div v-if="loading" class="text-center p-4">Loading more products...</div>
        <div ref="infiniteScrollTrigger"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ProductListItem from '@/components/product-list-item.vue';

const { $ProductService, $loading } = useNuxtApp();

const productList = ref([]);
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
        tags: [],
        search: searchQuery.value
    });
    productList.value = [...productList.value, ...newProducts];
    page.value++;
    loading.value = false;
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
    fetchProducts();
}, 300);

const infiniteScrollTrigger = ref(null);

onMounted(() => {
    fetchProducts();

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
</style>