<template>
  <header>
    <router-link to="/" class="title"
      ><h1>Learn to write മലയാളം</h1></router-link
    >
  </header>
  <main class="container">
    <router-view />
    <nav class="nav">
      <div v-for="letter in letters" :key="letter">
        <router-link class="letter-link" :to="`/letter/${letter}`">{{ letter }}</router-link>
      </div>
      <br />

    </nav>
  </main>
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
@import url(https://smc.org.in/fonts/manjari.css);

:root {
  --primary-color-h: 192;
  --primary-color-s: 100%;
  --primary-color-l: 41%;
  /* default */
  --primary-color: hsl(
    var(--primary-color-h),
    var(--primary-color-s),
    var(--primary-color-l)
  );

  /* darken */
  --primary-color--dark: hsl(
    var(--primary-color-h),
    var(--primary-color-s),
    calc(var(--primary-color-l) - 30%)
  );
}

body {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Helvetica, "Nupuram", "Manjari", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary-color--dark);
}

header,
footer {
  flex: 1;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 4px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  .title {
    color: #ffffff;
    text-decoration: none;
    font-family: 'Nupuram Color', sans-serif;
  }
  .title h1 {
    display: inline-flex;
  }
}

main {
  display: grid;
  grid-template-columns: 3fr 9fr;
  padding: 0;
  margin: 0;
  min-height: 80vh;
  padding: 1em;
}

footer {
  min-height: fit-content;
  a {
    color: #ffffff;
  }
  min-height: 10vh;
  padding: 1em;
}

.nav {
  order: -1;
  flex: 0 0 10%;
}
.letter-link {
    text-decoration: none;
    color: var(--primary-color--dark);
    font-size: 1.2em;
    display: inline-flex;
    padding: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
  }
.letter-link:hover {
    color: var(--primary-color);
  }
.nav {
  overflow: auto;
  max-width: 100vw;
  min-width: 20vw;
  // border-bottom: 1px solid var(--primary-color--dark);
  h3 {
    margin: 0;
    color: var(--primary-color);
  }
  div {
    display: inline-flex;
    padding: 0;
  }

}

.content {
  padding: 8px;
  margin: 0;
}

@media (max-width: 450px) {

main {
  display: grid;
  grid-template-columns:none;
}

  .content {
    flex: 0;
    h1 {
      margin: 0;
      padding: 0;
    }
  }
  .nav {
    h3 {
      display: inline-flex;
    }
  }


}

@font-face {
    font-family: 'Nupuram Regular';
    font-display: swap;
    font-weight: 400;
    src: url(https://smc.gitlab.io/fonts/Nupuram/fonts/Nupuram/webfonts/Nupuram-VF.woff2) format('woff2-variations');
}

@supports not (font-palette: --custom) {
    @font-face {
      font-family: 'Nupuram Color';
      font-display: swap;
      font-weight: 400;
      src: url(https://smc.gitlab.io/fonts/Nupuram/fonts/Nupuram-Color/webfonts/Nupuram-Color.colrv0.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Nupuram Arrows Color';
      font-display: swap;
      font-weight: 400;
      src: url(https://smc.gitlab.io/fonts/Nupuram/fonts/Nupuram-Arrows-Color/webfonts/Nupuram-Arrows-Color.colrv0.woff2) format('woff2');
    }
  }
  @supports (font-palette: --custom) {
    @font-face {
      font-family: 'Nupuram Color';
      font-display: swap;
      font-weight: 400;
      src: url(https://smc.gitlab.io/fonts/Nupuram/fonts/Nupuram-Color/webfonts/Nupuram-Color.colrv1.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Nupuram Arrows Color';
      font-display: swap;
      font-weight: 400;
      src: url(https://smc.gitlab.io/fonts/Nupuram/fonts/Nupuram-Arrows-Color/webfonts/Nupuram-Arrows-Color.colrv1.woff2) format('woff2');
    }
  }
</style>
