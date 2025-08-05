import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
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

// JS defaults to converting arrays to strings when comparing
function compareArrays(a, b) {
  for (let i = 0; i < a.length; i++) {
    const result = compare(a[i], b[i]);
    if (result !== 0) {
      return result;
    }
  }

  return 0;
}

export function sortByKey(arr, key, sortAsc = true) {
  let result = arr.sort((a, b) => Array.isArray(key(a)) ? compareArrays(key(a), key(b)) : compare(key(a), key(b)));
  return sortAsc ? result : result.reverse();
}

export function sum(items, prop) {
  return items?.reduce((a, b) => {
      return a + b[prop];
  }, 0);
}

export function upperFirst(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function getFile(element) {
    if (element.files.length == 0) {
        return;
    }

    let file = element.files[0];
    return file.text();
}