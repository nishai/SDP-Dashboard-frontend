
import Color from 'color';
import { Q } from './api/queryset';
import {
  querysetCommon,
  querysetCommonGroupByAve,
  querysetCommonGroupByCount,
} from './api/wits-api';
import { Student, Faculty, EnrolledYear, EnrolledCourse } from './api/wits-models';
import { CHART_TEMPLATES } from './templates.js';


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
/* DashboardChartOptionsTemplates.vue                                         */
/* ========================================================================== */


/* ACTUAL DEFAULTS */

export function getDefaultTemplateListItems() {
  return [
    {
      title: 'Demographics',
      items: [
        CHART_TEMPLATES.race.key,
        CHART_TEMPLATES.gender.key,
        CHART_TEMPLATES.nationality.key,
        CHART_TEMPLATES.home_language.key,
        CHART_TEMPLATES.demographics_vs_marks.key,
      ],
    },
    {
      title: 'Marks',
      items: [
        CHART_TEMPLATES.pass_rates_by_year.key,
        CHART_TEMPLATES.pass_rates_by_faculty_or_course.key,
        CHART_TEMPLATES.bell_curve.key,
        CHART_TEMPLATES.progress_outcome_by_faculty_or_couse.key,
      ],
    },
    {
      title: 'Class Sizes',
      items: [
        CHART_TEMPLATES.class_size_vs_pass_rate.key,
        CHART_TEMPLATES.average_class_size_by_faculty_or_course.key,
      ],
    },
  ];
}

// /* ========================================================================== */
// /* DashboardChartOptionsFilterForm.vue                                             */
// /* ========================================================================== */
//
//
// // todo, maybe make library function, immediately accessible on models.
// function getFlatDataPromise(model, ...fields) {
//   return model.query.values(...fields).distinct().orderBy(...fields).thenStripPrefixes();
// }
//
// export function getDefaultFilterables() {
//   return [
//     {
//       label: 'Years',
//       field: 'calendar_instance_year',
//       itemsPromise: getFlatDataPromise(this.$wits.EnrolledYear, this.$wits.EnrolledYear.calendar_instance_year),
//     },
//     {
//       label: 'Faculties',
//       field: 'faculty_title',
//       itemsPromise: getFlatDataPromise(this.$wits.Faculty, this.$wits.Faculty.faculty_title),
//     },
//     {
//       label: 'Schools',
//       field: 'school_title',
//       dependsOn: ['faculty_title'],
//       itemsPromise: getFlatDataPromise(this.$wits.School, this.$wits.School.school_title, this.$wits.School.faculty_id.faculty_title),
//     },
//     {
//       label: 'Course',
//       field: 'course_code',
//       dependsOn: ['school_title', 'faculty_title'],
//       itemsPromise: getFlatDataPromise(this.$wits.Course, this.$wits.Course.course_code, this.$wits.Course.school_id.school_title, this.$wits.Course.school_id.faculty_id.faculty_title),
//     },
//   ];
// }
