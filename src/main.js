import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueGridLayout from 'vue-grid-layout';


/* add miscellaneous plugins to Vue */

Vue.use(BootstrapVue);

/* Initialise Vue */

Vue.config.productionTip = false;

const app = new Vue({
  components: { App },
  template: '<App/>',
  router,
  store,
});

/* Inject App Into Page */

app.$mount('#app');
