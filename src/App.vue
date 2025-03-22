<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
//     padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }
// }

.app {
  &__container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      max-width: 768px;
    }

    @media (min-width: 1024px) {
      max-width: 1024px;
    }
  }
}
</style>
