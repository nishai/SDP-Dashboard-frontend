import App from '../App.vue';

/* Define the routes */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
    children: [
      {
        path: 'report',
        name: 'Reports',
        component: App,
      },
    ],
  },
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
];

export default routes;
