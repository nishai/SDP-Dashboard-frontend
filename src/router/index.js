import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

/* Register the router */

Vue.use(VueRouter);

/* Initialise the router */

export default new VueRouter({
  routes,
});
