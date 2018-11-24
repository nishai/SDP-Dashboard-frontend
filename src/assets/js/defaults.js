
import { Q } from './api/queryset';
import {
  querysetCommon,
  querysetCommonGroupByAve,
  querysetCommonGroupByCount,
} from './api/wits-api';
import { Student, Faculty, EnrolledYear, EnrolledCourse } from './api/wits-models';


/* ========================================================================== */
/* Navbar                                                                     */
/* ========================================================================== */


export function getDefaultNavbarStartItems() {
  return [
    { icon: 'certificate', name: 'About', type: 'is-warning', to: '/about' },
    { icon: 'chart-pie', name: 'Dashboard', type: 'is-bulma', to: '/dashboard' },
  ];
}


/* ========================================================================== */
/* Sidebar                                                                    */
/* ========================================================================== */


export function getDefaultSidebarSections() {
  return [
    {
      name: 'Reports',
      routes: [
        { name: 'Active Report',     icon: 'star', type: 'is-warning', to: '/dashboard/active' },
        { name: 'Reports', icon: 'chart-pie',  type: 'is-bulma', to: '/dashboard/reports' },
      ],
    },
    {
      name: 'Overview',
      routes: [
        { name: 'University', icon: 'landmark',           type: 'is-primary', to: '/dashboard/overview/university' },
        { name: 'Faculties',  icon: 'building',           type: 'is-info',    to: '/dashboard/overview/faculties' },
        { name: 'Schools',    icon: 'school',             type: 'is-bulma', to: '/dashboard/overview/schools' },
        { name: 'Courses',    icon: 'chalkboard-teacher', type: 'is-warning', to: '/dashboard/overview/courses' },
      ],
    },
  ];
}


/* ========================================================================== */
/* VueChart.vue                                                               */
/* ========================================================================== */


/* usefull for different things */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-len */
export function getDefaultChartInfo() {
  return {
    'bar':      { type: 'bar',     name: 'Bar Chart',            icon: 'chart-bar',                iconPack: 'mdi' },
    'hbar':     { type: 'hbar',    name: 'Horizontal Bar Chart', icon: 'chart-timeline',           iconPack: 'mdi' },
    'donut':    { type: 'donut',   name: 'Doughnut Chart',       icon: 'chart-donut',              iconPack: 'mdi' },
    'line':     { type: 'line',    name: 'Line Chart',           icon: 'chart-line',               iconPack: 'mdi' },
    'pie':      { type: 'pie',     name: 'Pie Chart',            icon: 'chart-pie',                iconPack: 'mdi' },
    'polar':    { type: 'polar',   name: 'Polar Chart',          icon: 'chart-pie',                iconPack: 'mdi' },
    'radar':    { type: 'radar',   name: 'Radar Plot',           icon: 'hexagon-outline',          iconPack: 'mdi' },
    'bubble':   { type: 'bubble',  name: 'Bubble Plot',          icon: 'chart-bubble',             iconPack: 'mdi' },
    'scatter':  { type: 'scatter', name: 'Scatter Plot',         icon: 'chart-scatterplot-hexbin', iconPack: 'mdi' },
  };
}
/* eslint-enable no-multi-spaces */
/* eslint-enable max-len */


/* ========================================================================== */
/* DashboardChartOptionsTemplates.vue                                                  */
/* ========================================================================== */


export function getDefaultTemplateListItems() {
  return [
    {
      title: 'Demographics',
      items: [
        {
          desc: 'Race',
          src: '/img/charts/doughnut.png',
          chartTypes: ['donut', 'pie'],
          type: 'commonFilterChart', /* influences fields below */
          getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.race_description, { years, faculties, schools, courses }),
          fieldLabel: Student.race_description,
          fieldData: 'count',
        },
        {
          desc: 'Gender',
          src: '/img/charts/pie2.png',
          chartTypes: ['donut', 'pie'],
          type: 'commonFilterChart', /* influences fields below */
          getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.gender, { years, faculties, schools, courses }),
          fieldLabel: Student.gender,
          fieldData: 'count',
        },
        {
          desc: 'Nationality',
          src: '/img/charts/pie1.png',
          chartTypes: ['donut', 'pie'],
          type: 'commonFilterChart', /* influences fields below */
          getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.nationality_short_name, { years, faculties, schools, courses }),
          fieldLabel: Student.nationality_short_name,
          fieldData: 'count',
        },
        {
          desc: 'Home Language',
          src: '/img/charts/pie3.png',
          chartTypes: ['donut', 'pie'],
          type: 'commonFilterChart', /* influences fields below */
          getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.home_language_description, { years, faculties, schools, courses }),
          fieldLabel: Student.home_language_description,
          fieldData: 'count',
        },
        {
          desc: 'Demographics vs Marks',
          src: '/img/charts/line2.png',
          chartTypes: ['bar', 'line'],
          type: 'commonFilterChart', /* influences fields below */
          getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByAve(Student, Student.race_description, Student.enrolled_years.enrolled_courses.final_mark, { years, faculties, schools, courses }),
          fieldLabel: Student.race_description,
          fieldData: 'ave',
        },
      ],
    },
    {
      title: 'Marks',
      items: [
        { desc: 'Pass rates by year',
          src: '/img/charts/bar1.png',
          chartTypes: ['bar', 'line'],
        },
        { desc: 'Pass rates by faculty/course',
          src: '/img/charts/bar3.png',
          chartTypes: ['bar', 'line'],
        },
        { desc: 'Bell curve',
          src: '/img/charts/bell-curve.png',
          chartTypes: ['line', 'bar'],
        },
        { desc: 'Progress Outcome by faculty/course',
          src: '/img/charts/bar2.png',
          chartTypes: ['bar', 'line'],
        },
      ],
    },
    {
      title: 'Class Sizes',
      items: [
        {
          desc: 'Class size vs pass rate',
          src: '/img/charts/line1.png',
          chartTypes: ['line', 'bar'],
        },
        {
          desc: 'Average class size by faculty/course',
          src: '/img/charts/bar1.png',
          chartTypes: ['bar', 'line'],
        }, // click='two'
      ],
    },
  ];
}

/* ========================================================================== */
/* DashboardChartOptionsFilterForm.vue                                             */
/* ========================================================================== */


// todo, maybe make library function, immediately accessible on models.
function getFlatDataPromise(model, ...fields) {
  return model.query.values(...fields).distinct().orderBy(...fields).thenStripPrefixes();
}

export function getDefaultFilterables() {
  return [
    {
      label: 'Years',
      field: 'calendar_instance_year',
      itemsPromise: getFlatDataPromise(this.$wits.EnrolledYear, this.$wits.EnrolledYear.calendar_instance_year),
    },
    {
      label: 'Faculties',
      field: 'faculty_title',
      itemsPromise: getFlatDataPromise(this.$wits.Faculty, this.$wits.Faculty.faculty_title),
    },
    {
      label: 'Schools',
      field: 'school_title',
      dependsOn: ['faculty_title'],
      itemsPromise: getFlatDataPromise(this.$wits.School, this.$wits.School.school_title, this.$wits.School.faculty_id.faculty_title),
    },
    {
      label: 'Course',
      field: 'course_code',
      dependsOn: ['school_title', 'faculty_title'],
      itemsPromise: getFlatDataPromise(this.$wits.Course, this.$wits.Course.course_code, this.$wits.Course.school_id.school_title, this.$wits.Course.school_id.faculty_id.faculty_title),
    },
  ];
}
