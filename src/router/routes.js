import Dashboard from '../pages/PageDashboard.vue';
import ChartTemplates from '../pages/PageDashboardTemplates.vue';

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
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
];

/* not part of route definitions, used by navbar */

export const hiddenRoutes = [
  {
    name: '404',
    path: '*',
    redirect: '/',
  },
];

/* export the routes */

export default navRoutes.concat(hiddenRoutes);


/**
 * GOALS
 */

// const overviewRoutes = [
//   {
//     path: '/dashboard/overview/university',
//     name: 'university',
//     component: PageOverviewUniversity,
//   },
//   {
//     path: '/dashboard/overview/faculties',
//     name: 'faculties',
//     component: PageOverviewFaculties,
//   },
//   {
//     path: '/dashboard/overview/schools',
//     name: 'school',
//     component: PageOverviewSchools,
//   },
//   {
//     path: '/dashboard/overview/courses',
//     name: 'course',
//     component: PageOverviewCourses,
//   },
// ];
//
// const dashboardRoutes = [
//   // ...legacyRoutes,
//   /* dashboard */
//   {
//     path: '/dashboard/home',
//     name: 'dashboard-home',
//     component: PageDashboardHome,
//   },
//   {
//     path: '/dashboard/templates',
//     name: 'dashboard-templates',
//     component: PageDashboardTemplates,
//   },
//   {
//     path: '/dashboard/reports',
//     name: 'reports',
//     component: PageDashboardReports,
//   },
//   /* non-visible pages */
//   {
//     path: '/dashboard/reports/:reportId',
//     name: 'report',
//     component: PageDashboardReport,
//   },
//   /* CHILDREN are OVERVIEWS */
//   {
//     path: '/dashboard/overview',
//     redirect: '/dashboard/overview/university', /* linked to above */
//     component: LayoutOverview,
//     children: overviewRoutes,
//   },
// ];
//
// const mainRoutes = [
//   /* about */
//   {
//     path: '/about',
//     name: 'about',
//     component: PageMainAbout,
//   },
//   /* CHILDREN are DASHBOARDS */
//   {
//     path: '/dashboard',
//     redirect: '/dashboard/home', /* linked to above */
//     component: LayoutDashboard,
//     children: dashboardRoutes,
//   },
//
// ];
//
// const routes = [
//   /* entrypoint */
//   {
//     path: '/',
//     redirect: '/dashboard',
//     component: LayoutMain,
//     children: mainRoutes,
//   },
//   /* redirect everything thats wrong */
//   {
//     name: '404',
//     path: '*',
//     redirect: '/',
//   },
// ];
//
//
// /* export the routes */
//
// export default routes;
