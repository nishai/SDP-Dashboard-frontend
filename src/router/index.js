import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';


/* Add VueRouter Plugin to Vue */

Vue.use(VueRouter);

/* Initialise VueRouter */

const router = new VueRouter({
  routes,
});

/* Export VueRouter instance */

export default router;
