import Dashboard from '../pages/Dashboard.vue';
import Reports from '../pages/Reports.vue';
import Home from '../pages/Home.vue';

/* Define the routes */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
];

export default routes;
