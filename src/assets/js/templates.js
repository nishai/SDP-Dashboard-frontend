import Color from 'color';
import { querysetCommonGroupByAve, querysetCommonGroupByCount } from './api/wits-api';
import { Student } from './api/wits-models';


/* ========================================================================== */
/* DashboardReportChart.vue                                                   */
/* ========================================================================== */


// options.tooltips.callbacks
export const getDefaultChartTooltipCallbacks = ({ postfix = '', rounding = -1, percent = true }) => ({
  beforeTitle(tooltipItems, data) {
    const dataset = data.datasets[tooltipItems[0].datasetIndex];
    return dataset.label ? `${dataset.label}` : undefined;
  },
  label(tooltipItem, data) {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const currentValue = dataset.data[tooltipItem.index];
    let currVal = (rounding >= 0 && typeof currentValue === 'number') ? currentValue.toFixed(rounding) : currentValue;
    if (postfix) {
      currVal = `${currVal}${postfix}`;
    }
    if (percent && typeof currentValue === 'number') {
      const meta = dataset._meta[Object.keys(dataset._meta)[0]];
      const { total } = meta;
      const percentage = parseFloat(((currentValue / total) * 100).toFixed(2));
      if (percentage) {
        return `${currVal} (${percentage}%)`;
      }
    }
    return currVal;
  },
  title(tooltipItem, data) {
    return data.labels[tooltipItem[0].index];
  },
  labelColor(tooltipItem, chart) {
    const cs = chart.data.datasets[tooltipItem.datasetIndex].backgroundColor;
    const c = (Array.isArray(cs)) ? cs[tooltipItem.index] : ((typeof cs === 'string') ? cs : undefined);
    return {
      backgroundColor: Color(c).hex(),
    };
  },
});


/* ========================================================================== */
/* Common                                                                     */
/* ========================================================================== */


export const commonMetaDatasets = {
  type: 'commonFilterChart', /* influences fields below */
  chartTypes: ['line', 'bar'],
  colors: {
    colorPalette: 'tol-rainbow',
    datasetNotLabels: true,
    shade: true,
    borders: true,
  },
};

export const commonMetaLabeled = {
  type: 'commonFilterChart', /* influences fields below */
  chartTypes: ['donut', 'pie'],
  colors: {
    colorPalette: 'tol-rainbow',
    datasetNotLabels: false,
    shade: true,
    borders: false,
  },
};

// freeze
Object.freeze(commonMetaDatasets);
Object.freeze(commonMetaLabeled);


/* ========================================================================== */
/* Common                                                                     */
/* ========================================================================== */


export const CHART_TEMPLATES = {

  // title: 'Demographics',

  race: {
    ...commonMetaLabeled,
    desc: 'Race',
    src: '/img/charts/doughnut.png',
    labels: { postfix: ' students', percent: true },
    fieldLabel: Student.race_description,
    fieldData: 'count',
    getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.race_description, { years, faculties, schools, courses }),
  },

  gender: {
    ...commonMetaLabeled,
    desc: 'Gender',
    src: '/img/charts/pie2.png',
    labels: { postfix: ' students', percent: true },
    fieldLabel: Student.gender,
    fieldData: 'count',
    getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.gender, { years, faculties, schools, courses }),
  },

  nationality: {
    ...commonMetaLabeled,
    desc: 'Nationality',
    src: '/img/charts/pie1.png',
    labels: { postfix: ' students', percent: true },
    fieldLabel: Student.nationality_short_name,
    fieldData: 'count',
    getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.nationality_short_name, { years, faculties, schools, courses }),
  },

  home_language: {
    ...commonMetaLabeled,
    desc: 'Home Language',
    src: '/img/charts/pie3.png',
    labels: { postfix: ' students', percent: true },
    fieldLabel: Student.home_language_description,
    fieldData: 'count',
    getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.home_language_description, { years, faculties, schools, courses }),
  },

  demographics_vs_marks: {
    ...commonMetaDatasets,
    desc: 'Demographics vs Marks',
    src: '/img/charts/line2.png',
    labels: { postfix: ' of 100', rounding: 2 },
    fieldLabel: Student.race_description,
    fieldData: 'ave',
    getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByAve(Student, Student.race_description, Student.enrolled_years.enrolled_courses.final_mark, { years, faculties, schools, courses }),
  },

  // title: 'Marks',

  pass_rates_by_year: {
    ...commonMetaDatasets,
    desc: 'Pass rates by year',
    src: '/img/charts/bar1.png',
  },

  pass_rates_by_faculty_or_course: {
    ...commonMetaDatasets,
    desc: 'Pass rates by faculty/course',
    src: '/img/charts/bar3.png',
  },

  bell_curve: {
    ...commonMetaDatasets,
    desc: 'Bell curve',
    src: '/img/charts/bell-curve.png',
  },

  progress_outcome_by_faculty_or_couse: {
    ...commonMetaDatasets,
    desc: 'Progress Outcome by faculty/course',
    src: '/img/charts/bar2.png',
  },

  // title: 'Class Sizes',

  class_size_vs_pass_rate: {
    ...commonMetaDatasets,
    desc: 'Class size vs pass rate',
    src: '/img/charts/line1.png',
  },

  average_class_size_by_faculty_or_course: {
    ...commonMetaDatasets,
    desc: 'Average class size by faculty/course',
    src: '/img/charts/bar1.png',
  },

};


Object.entries(CHART_TEMPLATES).forEach(([key, value]) => {
  value.key = key;
});

// freeze
Object.freeze(CHART_TEMPLATES);
