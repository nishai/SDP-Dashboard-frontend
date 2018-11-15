/*
 * The javascript entry point for the application
 */

import Vue from 'vue';
import plugins from './plugins';
import router from './router';
import store from './store';
import App from './App.vue';

/* Check Mode */ /* eslint-disable */
console.log(`NODE_ENV: "${process.env.NODE_ENV}"`);
console.log(`BASE_URL: "${process.env.BASE_URL}"`);
console.log(`VUE_APP_URL: "${process.env.VUE_APP_URL}"`);
console.log(`VUE_APP_API: "${process.env.VUE_APP_API}"`);

/* Use plugins */

Vue.use(plugins);

/* Initialise Vue */

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
