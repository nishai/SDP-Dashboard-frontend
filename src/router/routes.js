import ChartExamples from '../pages/ChartExamples.vue';
import ChartTemplates from '../pages/ChartTemplates.vue';
import Query from '../pages/Query.vue';
import Reports from '../pages/Reports.vue';
import Report from '../pages/Report.vue';
import GridExample from '../pages/GridExample.vue';

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
  {
    name: 'Chart Examples',
    path: '/examples',
    component: ChartExamples,
    /* not part of route definitions, used by navbar */
    query: { templateType: '' },
  },
  {
    name: 'Queries',
    path: '/query',
    component: Query,
  },
  {
    name: 'Reports',
    path: '/reports',
    component: Reports,
  },
  {
    name: 'GridExample',
    path: '/grid',
    component: GridExample,
  },
];

export const hiddenRoutes = [
  {
    name: 'Report',
    path: '/reports/:id',
    component: Report,
  },
  {
    name: 'Reports 404',
    path: '/reports/*',
    redirect: '/reports',
  },
  {
    name: '404',
    path: '*',
    redirect: '/',
  },
];

/* export the routes */

export default navRoutes.concat(hiddenRoutes);
