import './assets/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp, isProxy, toRaw } from 'vue'
import { createPinia } from 'pinia'

import "vuetify/styles"
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')

function compare(a, b) {
  if (a > b) {
      return 1
  } else if (a < b) {
      return -1
  } else {
      return 0
  }
}

export function sortByKey(arr, key) {
  return arr.sort((a, b) => compare(key(a), key(b)))
}

export function sum(items, prop) {
  return items?.reduce((a, b) => {
      return a + b[prop];
  }, 0);
}

export function upperFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function stripProxy(obj, level=0) {
  // Arbitrary limit to prevent loops
  if (level < 5) {
    for(const key in obj) {
      if (isProxy(obj[key])) {
        obj[key] = toRaw(obj[key]);
      }

      // Recursively strip members too
      stripProxy(obj[key], level + 1);
    }
  }

  return toRaw(obj);
}