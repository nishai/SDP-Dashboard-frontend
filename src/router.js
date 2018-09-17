import VueRouter from 'vue-router';
import Vue from 'vue';
import ChartExamples from './pages/ChartExamples.vue';
import ChartTemplates from './pages/ChartTemplates.vue';
import Query from './pages/Query.vue';
import Report from './pages/Report.vue';
import Home from './pages/Home.vue';

/* Add VueRouter Plugin to Vue */

Vue.use(VueRouter);

/* Define the routes */

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Chart Examples',
    path: '/examples',
    component: ChartExamples,
  },
  {
    name: 'Chart Templates',
    path: '/templates',
    component: ChartTemplates,
  },
  {
    name: 'Queries',
    path: '/query',
    component: Query,
  },
  {
    name: 'Report',
    path: '/report',
    component: Report,
  },
  {
    name: '404',
    path: '*',
    redirect: '/',
  },
];

/* Initialise router */

const router = new VueRouter({
  routes,
});

/* export the router */

export default router;
