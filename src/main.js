/*
 * The javascript entry point for the application
 */

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* Check Mode */ /* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  console.log(`NODE_ENV: "${process.env.NODE_ENV}"`);
  console.log(`BASE_URL: "${process.env.BASE_URL}"`);
  console.log(`VUE_APP_URL: "${process.env.VUE_APP_URL}"`);
  console.log(`VUE_APP_API: "${process.env.VUE_APP_API}"`);
}

/* add miscellaneous plugins to Vue */

Vue.use(BootstrapVue);

/* Initialise Vue */

Vue.config.productionTip = false;

export const app = new Vue({
  components: { App },
  template: '<App/>',
  router,
  store,
});

/* Inject App Into Page */

app.$mount('#app');

/* poll for the backend, possibly to display an error message when not connected */

app.$store.dispatch('apiConnectionPollingStart');

