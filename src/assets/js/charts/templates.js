import clonedeep from 'lodash.clonedeep';
import {
  querysetCommonGroupAveOf,
  querysetCommonAnnotateCount,
  querysetCommonPassFail,
  resultPromiseCommonBellCurve,
} from '../api/wits-api';
import { Student, EnrolledCourse, EnrolledYear } from '../api/wits-models';
import {
  getMapperColorizeChartData,
  getMapperLabelsValuesListToChartData,
  getMapperListToLabelsValues, getMapperStripPrefixes,
} from '../util/arrays';
import { getOptionsTooltipsCallbacks } from './charts';

/* ========================================================================== */
/* UTIL                                                                       */
/* ========================================================================== */


/**
 * 1. Set the key field of any values in the object/dict to the key of the value.
 * 2. Freeze the object to prevent modifications.
 * @type {Object} T
 * @param {T} obj
 * @return {T}
 */
function freezeAndSetKeys(obj) {
  Object.entries(obj).forEach(([key, value]) => { value.key = key; });
  Object.freeze(obj);
  return obj;
}


/* ========================================================================== */
/* TEMPLATE HANDLERS                                                          */
/* ========================================================================== */


/**
 * Used to retrieve the coloring information for different chart types.
 */
export const CHART_TYPE_COLORING = {
  'bar': { colorPalette: 'tol-rainbow', datasetNotLabels: true, shade: true, borders: false },
  'line': { colorPalette: 'tol-rainbow', datasetNotLabels: true, shade: true, borders: true },
  'pie': { colorPalette: 'tol-rainbow', datasetNotLabels: false, shade: true, borders: false },
  'donut': { colorPalette: 'tol-rainbow', datasetNotLabels: false, shade: true, borders: true },
};

freezeAndSetKeys(CHART_TYPE_COLORING);


/* ========================================================================== */
/* TEMPLATE HANDLERS                                                          */
/* ========================================================================== */


const CHART_TEMPLATE_HANDLERS = {
  /**
   * Requires extra fields on templates:
   *  - fieldLabel: {String}
   *  - fieldData: {String}
   *  - getQueryset: ({{years, faculties, schools, courses}}) => {Queryset}
   */
  commonFilterChart(template, meta) {
    // Resolve promises for data.

    const allPromises = meta.subsets.map(
      ({ label, selected }) => {
        if (template.getPromise && template.getQueryset) {
          throw Error('template cannot have both getPromise & getQueryset');
        }

        const promise = (template.getPromise)
          ? template.getPromise(selected)
          : template.getQueryset(selected).RESULT();

        return promise
          .then(getMapperStripPrefixes())
          .then((results) => {
            return results;
          })
          .then(getMapperListToLabelsValues(template.fieldLabel, template.fieldData));
      },
    );

    const labels = template.labels || {};
    const colors = Object.assign(
      clonedeep(CHART_TYPE_COLORING[meta.chartType]),
      template.colors || {},
    );

    return Promise.all(allPromises)
      .then(getMapperLabelsValuesListToChartData( /* TODO: DOES NOT MAINTAIN ORDER */
        meta.subsets.map((subset) => subset.label),
        ((typeof labels.ordered === 'boolean' && labels.ordered) ? (a, b) => a - b : labels.ordered) || null,
      ))
      .then(getMapperColorizeChartData({
        colorPalette: colors.colorPalette || 'tol-rainbow',
        datasetNotLabels: colors.datasetNotLabels || false,
        shade: colors.shade || false,
        borders: colors.borders || false,
      }))
      .then((chartData) => ({
        data: chartData,
        options: {
          tooltips: {
            callbacks: getOptionsTooltipsCallbacks({
              postfix: labels.postfix || '',
              rounding: labels.rounding || -1,
              percent: labels.percent || false,
            }),
          },
        },
      }));
  },
};

freezeAndSetKeys(CHART_TEMPLATE_HANDLERS);


/* ========================================================================== */
/* Mixins                                                                     */
/* ========================================================================== */


// const commonMetaDatasets = {
//   colors: {
//     colorPalette: 'tol-rainbow',
//     datasetNotLabels: true,
//     shade: true,
//     borders: true,
//   },
// };

// const commonMetaLabeled = {
//   colors: {
//     colorPalette: 'tol-rainbow',
//     datasetNotLabels: false,
//     shade: true,
//     borders: false,
//   },
// };


/* ========================================================================== */
/* TEMPLATES                                                                  */
/* ========================================================================== */


export const CHART_TEMPLATES = {

  /* ===== ===== ===== Demographics ===== ===== ===== */

  race: {
    /* template */
    desc: 'Race',
    src: '/img/charts/doughnut.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' students', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.race_description,
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonAnnotateCount(Student, Student.race_description, filters),
  },

  gender: {
    /* template */
    desc: 'Gender',
    src: '/img/charts/pie2.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' students', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.gender,
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonAnnotateCount(Student, Student.gender, filters),
  },

  nationality: {
    /* template */
    desc: 'Nationality',
    src: '/img/charts/pie1.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' students', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.nationality_short_name,
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonAnnotateCount(Student, Student.nationality_short_name, filters),
  },

  home_language: {
    /* template */
    desc: 'Home Language',
    src: '/img/charts/pie3.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' students', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.home_language_description,
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonAnnotateCount(Student, Student.home_language_description, filters),
  },

  /* ===== ===== ===== Marks ===== ===== ===== */


  demographics_vs_marks: {
    /* template */
    desc: 'Demographics vs Marks',
    src: '/img/charts/bar2.png',
    chartTypes: ['bar', 'line'],
    labels: { postfix: ' of 100', rounding: 2 },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.race_description,
    fieldData: 'ave',
    getQueryset: (filters) => querysetCommonGroupAveOf(Student, Student.race_description, Student.enrolled_years.enrolled_courses.final_mark, filters),
  },

  gender_vs_marks: {
    /* template */
    desc: 'Gender vs Marks',
    src: '/img/charts/bar3.png',
    chartTypes: ['bar', 'line'],
    labels: { postfix: ' of 100', rounding: 2 },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: Student.gender,
    fieldData: 'ave',
    getQueryset: (filters) => querysetCommonGroupAveOf(Student, Student.gender, Student.enrolled_years.enrolled_courses.final_mark, filters),
  },

  year_pass_rates: {
    /* template */
    desc: 'Year Pass Rates',
    src: '/img/charts/pie1.png',
    chartTypes: ['pie', 'donut'],
    labels: { postfix: ' year enrollments', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'outcome',
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonPassFail(EnrolledYear, EnrolledYear.average_marks, filters, 50),
  },

  course_pass_rates: {
    desc: 'Course Pass Rates',
    src: '/img/charts/pie2.png',
    chartTypes: ['pie', 'donut'],
    labels: { postfix: ' course enrollments', percent: true },
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'outcome',
    fieldData: 'count',
    getQueryset: (filters) => querysetCommonPassFail(EnrolledCourse, EnrolledCourse.final_mark, filters, 50),
  },

  year_mark_bell_curve: {
    desc: 'Year Mark Bell Curve',
    src: '/img/charts/bell-curve.png',
    chartTypes: ['line', 'bar'],
    labels: { postfix: '% of year enrollments', ordered: true }, // percent=true not working, when fieldData is count instead of percent
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'mark',
    fieldData: 'percent',
    getPromise: (filters) => resultPromiseCommonBellCurve(EnrolledYear, EnrolledYear.average_marks, filters),
  },

  course_mark_bell_curve: {
    desc: 'Course Mark Bell Curve',
    src: '/img/charts/bell-curve.png',
    chartTypes: ['line', 'bar'],
    labels: { postfix: '% of course enrollments', ordered: true }, // percent=true not working, when fieldData is count instead of percent
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'mark',
    fieldData: 'percent',
    getPromise: (filters) => resultPromiseCommonBellCurve(EnrolledCourse, EnrolledCourse.final_mark, filters),
  },

  /* TODO: FIX */
  year_progress_outcomes: {
    desc: 'Year Progress Outcomes',
    src: '/img/charts/pie2.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' count' }, // percent=true not working, when fieldData is count instead of percent
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'progress_outcome_type',
    fieldData: 'count',
    getPromise: (filters) => querysetCommonAnnotateCount(EnrolledYear, EnrolledYear.progress_outcome_type, filters),
  },

  /* TODO: FIX */
  course_effect_on_progress_outcomes: {
    desc: 'Course Effect on Progress Outcomes',
    src: '/img/charts/pie1.png',
    chartTypes: ['donut', 'pie'],
    labels: { postfix: ' count' }, // percent=true not working, when fieldData is count instead of percent
    /* type */
    type: CHART_TEMPLATE_HANDLERS.commonFilterChart.key,
    /* type meta */
    fieldLabel: 'progress_outcome_type',
    fieldData: 'count',
    getPromise: (filters) => querysetCommonAnnotateCount(EnrolledCourse, EnrolledCourse.enrolled_year_id.progress_outcome_type, filters),
  },


  /* ===== ===== ===== Class Sizes ===== ===== ===== */

  /* TODO: FIX */
  course_size_vs_course_pass_rate: {
    desc: 'Course Size vs. Course Pass Rate',
    src: '/img/charts/line1.png',
  },

  /* TODO: FIX */
  average_class_sizes: {
    desc: 'Average Course Sizes',
    src: '/img/charts/bar1.png',
  },

};

freezeAndSetKeys(CHART_TEMPLATES);


/* ========================================================================== */
/* CHART DATA LOADER                                                          */
/* ========================================================================== */


/**
 * Returns a promise that will result in a set of chartData
 *
 * @param {{meta: {template: {type}}}} chart
 * @return {Promise}
 */
export function CHART_LOAD_HANDLER(chart) {
  if (!chart) {
    return Promise.reject(Error('Chart is not instantiated'));
  }
  if (!chart.meta) {
    return Promise.reject(Error('Chart does not have meta attribute'));
  }

  const template = CHART_TEMPLATES[chart.meta.template];

  if (!template) {
    return Promise.reject(Error('Chart does not have meta.template attribute'));
  }
  if (!template.type) {
    return Promise.reject(Error('Chart does not have meta.template.type attribute'));
  }

  const handler = CHART_TEMPLATE_HANDLERS[template.type];

  if (!handler) {
    return Promise.reject(Error('The handler type is invalid.'));
  }

  try {
    return handler(template, chart.meta);
  } catch (e) {
    return Promise.reject(Error('An unexpected error occurred during the call to the handler.'));
  }
}
