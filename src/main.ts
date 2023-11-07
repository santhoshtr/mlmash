import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

/** Dark, Light modes */
const storageKey = 'theme-preference'
let theme = 'dark';
const root = document.documentElement;
const setTheme = (theme: string) => {
  root.setAttribute('color-scheme', theme)
  localStorage.setItem(storageKey, theme)
}

const init = () => {
  // now this script can find and listen for clicks on the control
  document.querySelector('#theme-toggle').addEventListener('click', () => {
      // flip current value
      theme = theme === 'light'
        ? 'dark'
        : 'light'

      setTheme(theme)
    })
}

window.onload = init;