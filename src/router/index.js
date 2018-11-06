import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

/* enable plugin, TODO: move to plugin folder */

Vue.use(VueRouter);

/* Export VueRouter instance */

export default new VueRouter({
  routes,
});
