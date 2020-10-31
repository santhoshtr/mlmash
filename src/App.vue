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
      <ul>
        <li v-for="letter in letters" :key="letter">
          <router-link :to="`/letter/${letter}`">{{ letter }}</router-link>
        </li>
      </ul>
      <h3>Conjuncts</h3>
      <ul>
        <li v-for="conjunct in conjuncts" :key="conjunct">
          <router-link :to="`/conjunct/${conjunct}`">{{
            conjunct
          }}</router-link>
        </li>
      </ul>
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
  --primary-color-h: 200;
  --primary-color-s: 320%;
  --primary-color-l: 21%;
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
    calc(var(--primary-color-l) - 15%)
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
  color: #2c3e50;
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
  flex-direction: row;
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
  overflow-y: scroll;
  max-height: 90vh;
  h3 {
    margin: 0;
  }
  ul {
    padding: 0;
    margin: 4px 8px;
  }
  li {
    list-style: none;
    text-decoration: none;
    padding: 4px;
    a {
      text-decoration: none;
      color: var(--primary-color--dark);
    }
  }
}

.content {
  flex: 1;
  padding: 8px;
  margin: 0;
}

@media (min-width: 601px) {
  .nav {
    border-right: 1px solid var(--primary-color);
  }
  li:hover {
    border-left: 2px solid var(--primary-color);
  }
}

@media (max-width: 600px) {
  main {
    flex-direction: column;
  }
  .content {
    flex: 0;
    h1 {
      margin: 0;
      padding: 0;
    }
  }
  .nav {
    overflow: hidden;
    order: 2;
    border-bottom: 1px solid var(--primary-color);

    ul {
      margin: 0;
    }
    li {
      display: inline-flex;
    }
    li:hover {
      border-bottom: 2px solid var(--primary-color);
    }
  }
}
</style>
