import Dashboard from './pages/Dashboard.vue';
import Queries from './pages/Query.vue';
import Home from './pages/Home.vue';
import TemplateScreen from './pages/TemplateScreen.vue';

/* Define the routes */

const routes = [
  {
    path: '/',
    name: 'Templates',
    component: TemplateScreen,
  },
  {
    path: '/queries',
    name: 'Queries',
    component: Queries,
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
