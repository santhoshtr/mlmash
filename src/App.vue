<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

if (sessionStorage.redirect) {
  const router = useRouter();
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  router.push(redirect);
}
</script>

<style lang="less">
#app {
  font-family: Helvetica, "Nupuram", "Manjari", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
