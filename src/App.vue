<template>
  <nav class="card letter-nav col-3@lg col-12">
    <template v-for="letter in letters" :key="letter">
      <router-link class="letter-link" :to="`/letter/${letter}`">{{
        letter
      }}</router-link>
    </template>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import malayalam from "./assets/malayalam.json";
import { useRouter } from "vue-router";

const letters = malayalam.letters;

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

.letter-link {
  text-decoration: none;
  color: var(--brand);
  font-size: 1.2em;
  padding: var(--size-3);
  place-content: center;

}

.letter-nav {
  padding: var(--size-fluid-1) var(--size-fluid-2);
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  min-width: 20vw;
  line-height: 1.25;
}

.content {
  padding: var(--size-fluid-2);
  margin: 0;
}
</style>
