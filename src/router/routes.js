import Dashboard from '../pages/Dashboard.vue';
import Reports from '../pages/Reports.vue';
import Home from '../pages/Home.vue';
import TemplateScreen from '../pages/TemplateScreen.vue';

/* Define the routes */

const routes = [
  {
    path: '/',
    name: 'Templates',
    component: TemplateScreen,
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
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
];

export default routes;
