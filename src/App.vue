<template>
  <header>
    <router-link to="/" class="title"
      ><h1>Learn to write Malayalam</h1></router-link
    >
  </header>
  <main class="container">
    <router-view />
    <nav class="nav">
      <h3>Letters</h3>
      <div v-for="letter in letters" :key="letter">
        <router-link :to="`/letter/${letter}`">{{ letter }}</router-link>
      </div>
      <br />
      <h3>Conjuncts</h3>
      <div v-for="conjunct in conjuncts" :key="conjunct">
        <router-link :to="`/conjunct/${conjunct}`">{{ conjunct }}</router-link>
      </div>
    </nav>
  </main>
</template>

<script>
import malayalam from "./assets/malayalam.json";

export default {
  name: "App",
  data: () => ({
    letters: malayalam.letters,
    conjuncts: malayalam.conjuncts,
  }),
  created() {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      this.$router.push(redirect);
    }
  },
};
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
  font-family: Helvetica, "Manjari", Arial, sans-serif;
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
  .title {
    color: #ffffff;
    text-decoration: none;
  }
  .title h1 {
    display: inline-flex;
  }
}

main {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  padding: 0;
  margin: 0;
  min-height: 90vh;
}

footer {
  min-height: fit-content;
  a {
    color: #ffffff;
  }
}

.nav {
  order: -1;
  flex: 0 0 10%;
}

.nav {
  padding: 8px;
  overflow: auto;
  max-width: 100vw;
  border-bottom: 1px solid var(--primary-color--dark);
  h3 {
    margin: 0;
    color: var(--primary-color);
  }
  div {
    display: inline-flex;
    padding: 2px 4px;
  }
  a {
    text-decoration: none;
    color: var(--primary-color--dark);
    font-size: 1.2em;
  }
  a:hover {
    color: var(--primary-color);
  }
}

.content {
  flex: 1;
  padding: 8px;
  margin: 0;
}

@media (max-width: 600px) {
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
</style>
