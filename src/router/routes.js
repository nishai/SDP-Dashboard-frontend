
/* Layouts */
import LayoutMain from '../layout/LayoutMain.vue';
import LayoutSingle from '../layout/LayoutSingle.vue';
import LayoutDashboard from '../layout/LayoutDashboard.vue';
import LayoutOverview from '../layout/LayoutOverview.vue';

/* MainLayout pages */
import PageMainAbout from '../pages/PageSingleAbout.vue';

/* DashboardLayout pages */
import PageDashboardActive from '../pages/PageDashboardActive.vue';
import PageDashboardTemplates from '../pages/PageDashboardTemplates.vue';
import PageDashboardReports from '../pages/PageDashboardReports.vue';
import PageDashboardReport from '../pages/PageDashboardReport.vue';

/* OverviewLayout pages */
import PageOverviewUniversity from '../pages/PageOverviewUniversity.vue';
import PageOverviewFaculties from '../pages/PageOverviewFaculties.vue';
import PageOverviewSchools from '../pages/PageOverviewSchools.vue';
import PageOverviewCourses from '../pages/PageOverviewCourses.vue';


/* todo: remove */


const overviewRoutes = [
  {
    path: '/dashboard/overview/university',
    name: 'university',
    component: PageOverviewUniversity,
  },
  {
    path: '/dashboard/overview/faculties',
    name: 'faculties',
    component: PageOverviewFaculties,
  },
  {
    path: '/dashboard/overview/schools',
    name: 'school',
    component: PageOverviewSchools,
  },
  {
    path: '/dashboard/overview/courses',
    name: 'course',
    component: PageOverviewCourses,
  },
];

const dashboardRoutes = [
  /* dashboard */
  {
    path: '/dashboard/active',
    name: 'dashboard',
    component: PageDashboardActive,
  },
  {
    path: '/dashboard/templates',
    name: 'templates',
    component: PageDashboardTemplates,
  },
  {
    path: '/dashboard/reports',
    name: 'reports',
    component: PageDashboardReports,
  },
  /* non-visible pages */
  {
    path: '/dashboard/reports/:reportId',
    name: 'report',
    component: PageDashboardReport,
  },
  /* CHILDREN are OVERVIEWS */
  {
    path: '/dashboard/overview',
    redirect: '/dashboard/overview/university', /* linked to above */
    component: LayoutOverview,
    children: overviewRoutes,
  },
];

const singleRoutes = [
  /* about */
  {
    path: '/about',
    name: 'about',
    component: PageMainAbout,
  },
];

const mainRoutes = [
  /* CHILDREN are DASHBOARDS */
  {
    path: '/dashboard',
    redirect: '/dashboard/active', /* linked to above */
    component: LayoutDashboard,
    children: dashboardRoutes,
  },
  {
    path: '/', /* duplicate name allowed for children only */
    component: LayoutSingle,
    children: singleRoutes,
  },
];

const routes = [
  /* entrypoint */
  {
    path: '/',
    redirect: '/dashboard',
    component: LayoutMain,
    children: mainRoutes,
  },
  /* redirect everything thats wrong */
  {
    name: '404',
    path: '*',
    redirect: '/',
  },
];


/* export the routes */

export default routes;
