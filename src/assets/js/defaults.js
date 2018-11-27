
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import Color from 'color';
import { Q } from './api/queryset';
import {
  querysetCommon,
  querysetCommonGroupAveOf,
  querysetCommonAnnotateCount,
} from './api/wits-api';
import { Student, Faculty, EnrolledYear, EnrolledCourse } from './api/wits-models';
import { CHART_TEMPLATES } from './charts/templates';

/* eslint-enable no-unused-vars */


/* ========================================================================== */
/* NAVBAR                                                                     */
/* ========================================================================== */


export function getDefaultNavbarStartItems() {
  return [
    { icon: 'certificate', name: 'About', type: 'is-warning', to: '/about' },
    { icon: 'chart-pie', name: 'Dashboard', type: 'is-bulma', to: '/dashboard' },
  ];
}


/* ========================================================================== */
/* SIDEBAR                                                                    */
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
/* CHART TYPES                                                                */
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
/* CHART TEMPLATES                                                             */
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
        CHART_TEMPLATES.year_pass_rates.key,
        CHART_TEMPLATES.course_pass_rates.key,
        CHART_TEMPLATES.year_mark_bell_curve.key,
        CHART_TEMPLATES.course_mark_bell_curve.key,
        CHART_TEMPLATES.progress_outcomes.key,
      ],
    },
    {
      title: 'Class Sizes',
      items: [
        CHART_TEMPLATES.course_size_vs_course_pass_rate.key,
        CHART_TEMPLATES.average_class_sizes.key,
      ],
    },
  ];
}
