

import vueCharts from 'vue-chartjs';
import { generateChart } from 'vue-chartjs/src';


/* ========================================================================== */
/* CustomChart.vue                                                                  */
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
/* DashboardTemplateList.vue                                                  */
/* ========================================================================== */


export function getDefaultTemplateListItems() {
  return [
    {
      title: 'Demographics',
      items: [
        { label: 'Race',                                 type: 'doughnut',  src: '/img/charts/doughnut.png'  },
        { label: 'Gender',                               type: 'doughnut',  src: '/img/charts/pie2.png'      },
        { label: 'Nationality',                          type: 'doughnut',  src: '/img/charts/pie1.png'      },
        { label: 'Home Language',                        type: 'doughnut',  src: '/img/charts/pie3.png'      },
        { label: 'Demographics vs Marks',                type: 'bar',       src: '/img/charts/line2.png'     },
      ],
    },
    {
      title: 'Marks',
      items: [
        { label: 'Pass rates by year',                   type: 'bar',       src: '/img/charts/bar1.png'      },
        { label: 'Pass rates by faculty/course',         type: 'bar',       src: '/img/charts/bar3.png'      },
        { label: 'Bell curve',                           type: 'line',      src: '/img/charts/bell-curve.png' },
        { label: 'Progress Outcome by faculty/course',   type: 'bar',       src: '/img/charts/bar2.png'      },
      ],
    },
    {
      title: 'Class Sizes',
      items: [
        { label: 'Class size vs pass rate',              type: 'line',      src: '/img/charts/line1.png'     },
        { label: 'Average class size by faculty/course', type: 'bar',       src: '/img/charts/bar1.png'      }, // click='two'
      ],
    },
  ];
}

/* ========================================================================== */
/* DashboardCommonFiltersForm.vue                                             */
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
