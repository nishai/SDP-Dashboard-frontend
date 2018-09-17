import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import routes from './routes';

/* add plugins to Vue */

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);

/* Initialise router */

const router = new VueRouter({
  routes,
});

/* Initialise Vue */

Vue.config.productionTip = false;

const app = new Vue({
  components: { App },
  template: '<App/>',
  router,
});

/* Inject App Into Page */

app.$mount('#app');
