// import ChartExamples from '../pages/ChartExamples.vue';
// import Query from '../pages/Query.vue';
// import Reports from '../pages/PageReportList.vue';
// import Report from '../pages/PageReport.vue';
// import GridExample from '../pages/PageGridExample.vue';
import Dashboard from '../pages/Dashboard.vue';
import ChartTemplates from '../pages/ChartTemplates.vue';

/* Define the routes */

export const navRoutes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/templates',
  },
  {
    name: 'Chart Templates',
    path: '/templates',
    component: ChartTemplates,
  },
  // {
  //   name: 'Chart Examples',
  //   path: '/examples',
  //   component: ChartExamples,
  //   query: {
  //     templateType: '',
  //   },
  // },
  // {
  //   name: 'Queries',
  //   path: '/query',
  //   component: Query,
  // },
  // {
  //   name: 'Reports',
  //   path: '/reports',
  //   component: Reports,
  // },
  // {
  //   name: 'GridExample',
  //   path: '/grid',
  //   component: GridExample,
  // },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
];

/* not part of route definitions, used by navbar */

export const hiddenRoutes = [
  // {
  //   name: 'Report',
  //   path: '/reports/:id',
  //   component: Report,
  // },
  // {
  //   name: 'Reports 404',
  //   path: '/reports/*',
  //   redirect: '/reports',
  // },
  {
    name: '404',
    path: '*',
    redirect: '/',
  },
];

/* export the routes */

export default navRoutes.concat(hiddenRoutes);
