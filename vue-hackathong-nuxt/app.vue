<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="flex w-screen bg-gray-800 p-2 z-50">
    <div class="logo-wrapper">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="75" height="75" />
      <p>Nuxt to nothing prices</p>
    </div>

    <div class="wrapper flex-grow">
      <nav class="flex justify-between content-center">
        <div>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </div>
        <h1> Temp CART</h1>
      </nav>
    </div>
  </header>
  <div class="body">
    <NuxtPage />
  </div>
</template>

<style scoped>
header {
  top: 0;
  display: absolute;
  position: fixed;
  line-height: 1.5;
  max-height: 100vh;
}

.navbar {
  width: 100%;
  font-size: 20px;
  text-align: center;
}

.wrapper { 
  justify-content: center;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

.body {
  margin-top: 8rem;
}

.logo {
  text-align: center;
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
