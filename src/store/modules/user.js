import Vue from 'vue';
import { uuidv4 } from '../../assets/js/util/uuid';
import * as m from '../mutations';

/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

const defaultReportData = {
  isReport: true,
  id: uuidv4(),
  name: 'default',
  charts: [],
  layout: [],
};

const stateMap = {
  defaultReport: defaultReportData.id,
  reports: {
    [defaultReportData.id]: defaultReportData,
  },
};

/* ========================================================================== */
/* GETTERS                                                                    */
/* ========================================================================== */

const getterMap = {

  getReports: (state) => state.reports,

  getReport: (state) => (reportId) => state.reports[reportId],

  hasReport: (state) => (reportId) => !!state.reports[reportId],

  getReportChart: (state) => (reportId, chartId) => {
    const chart = state.reports[reportId].charts[chartId];
    if (!chart) {
      throw new Error(`The specified chart (${chartId}) does not exist for report: ${reportId}`);
    }
    return chart;
  },

  hasReportChart: (state) => (reportId, chartId) => !!state.reports[reportId] && !!state.reports[reportId].charts[chartId],

  getReportCharts: (state) => (reportId) => state.reports[reportId].charts,

  getDefaultReport: (state) => () => state.reports[state.defaultReport],

  hasDefaultReport: (state) => () => !!state.defaultReport && !!state.reports[state.defaultReport],

  isDefaultReport: (state) => (reportId) => reportId && reportId === state.defaultReport,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

const mutationMap = {

  [m.SET_DEFAULT_REPORT](state, { reportId }) {
    if (!state.reports[reportId]) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    state.defaultReport = reportId;
  },

  [m.CREATE_REPORT](state, { reportId, name }) {
    if (state.reports[reportId]) {
      throw new Error(`The specified report already exists: ${reportId}`);
    }
    Vue.set(state.reports, reportId, {
      isReport: true,
      id: reportId,
      name,
      charts: [/* ordered set of charts */],
      layout: [/* ordered set of {x, y, w, h, i=chartId}, corresponds to elements in charts */],
    });
  },

  [m.CREATE_REPORT_CHART](state, { reportId, chartId }) {
    const report = state.reports[reportId];
    if (!report) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    if (report.charts[chartId]) {
      throw new Error(`The specified chart already exists: ${chartId}`);
    }

    Vue.set(report.charts, chartId, {
      isChart: true,
      id: chartId,
      name: chartId,
      meta: {
        template: {},
        subsets: [],
      },
    });

    // TODO: no magic variables.
    const col = report.layout.length % 3;

    // shift all upwards
    report.layout.forEach((l, i) => {
      if (l.x === col) {
        l.y += 1;
      }
    });

    report.layout.push({
      x: col, y: 0, w: 1, h: 1, i: chartId,
    });
  },

  [m.DELETE_REPORT](state, { reportId }) {
    if (!state.reports[reportId]) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    if (reportId && reportId === state.defaultReport) {
    //   throw new Error(`Cannot delete report as it is the default: ${reportId}`);
      state.defaultReport = null;
    }

    Vue.delete(state.reports, reportId);
  },

  [m.DELETE_REPORT_CHART](state, { reportId, chartId }) {
    const report = state.reports[reportId];
    if (!report) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    if (!report.charts[chartId]) {
      throw new Error(`The specified chart does not exist: ${chartId}`);
    }
    Vue.delete(report.charts, chartId);
    Vue.set(report, 'layout', report.layout.filter((meta) => meta.i !== chartId));
  },

  [m.RENAME_REPORT](state, { reportId, name }) {
    if (!state.reports[reportId]) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    // TODO not already exists name
    Vue.set(state.reports[reportId], 'name', name);
  },

  [m.RENAME_REPORT_CHART](state, { reportId, chartId, name }) {
    const report = state.reports[reportId];
    if (!report) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    const chart = report.charts[chartId];
    if (!chart) {
      throw new Error(`The specified chart does not exist: ${chartId}`);
    }
    /* update */
    Vue.set(chart, 'name', name);
  },

  [m.UPDATE_REPORT_CHART](state, { reportId, chartId, meta }) {
    const report = state.reports[reportId];
    if (!report) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    const chart = report.charts[chartId];
    if (!chart) {
      throw new Error(`The specified chart does not exist: ${chartId}`);
    }

    /* { desc, src, type } */
    if (!meta.template || !meta.template.type || !Array.isArray(meta.template.chartTypes) || meta.template.chartTypes.length < 1) {
      throw new Error(`meta.template is invalid, ${meta.template}`);
    }

    if (!meta.chartType || meta.template.chartTypes.indexOf(meta.chartType) < 0) {
      throw new Error(`Chart type is invalid "${meta.chartType}", allowedTypes are: [${meta.template.chartTypes}]`);
    }

    if (!Array.isArray(meta.subsets)) {
      throw new Error(`meta.subsets is invalid, ${meta.subsets}`);
    }

    /* { label, selected: [{courses:[], faculties:[], schools:[], years:[]}] } */
    const valid = meta.subsets.reduce((flag, item) => (
      flag
      && item.label
      && item.selected.years && item.selected.courses
      && item.selected.schools && item.selected.faculties
    ), true);

    if (!valid) {
      throw new Error(`items in meta.subsets are invalid, ${meta.subsets}`);
    }

    Vue.set(chart, 'meta', meta);

    console.log(m.UPDATE_REPORT_CHART, 'updated chart:', chart);
  },


  [m.UPDATE_REPORT_LAYOUT](state, { reportId, layout }) {
    const report = state.reports[reportId];
    if (!report) {
      throw new Error(`The specified report does not exist: ${reportId}`);
    }
    if (layout.length !== Object.keys(report.charts).length) {
      throw new Error('layout length mismatch');
    }
    // TODO: position evaluation and resolution
    if (!layout.every((l) => l.i
      && report.charts[l.i]
      && typeof l.x === 'number'
      && typeof l.y === 'number'
      && typeof l.w === 'number'
      && typeof l.h === 'number',
    )) {
      throw Error(`layout objects are invalid: ${layout}`);
    }
    Vue.set(report, 'layout', layout);
  },

};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actionMap = {
  setDefaultReport({ commit, state, getters }, { reportId }) {
    commit(m.SET_DEFAULT_REPORT, { reportId });
  },

  createReport({ commit, state, getters }, { name }) {
    const newReportId = uuidv4();
    commit(m.CREATE_REPORT, { reportId: newReportId, name });
    if (!getters.getDefaultReport()) {
      commit(m.SET_DEFAULT_REPORT, { reportId: newReportId });
    }
    return newReportId;
  },

  createReportChart({ commit, state, getters }, { reportId, name, meta }) {
    const newChartId = uuidv4();
    commit(m.CREATE_REPORT_CHART, { reportId, chartId: newChartId });
    if (name) {
      commit(m.RENAME_REPORT_CHART, { reportId, chartId: newChartId, name });
    }
    if (meta) {
      commit(m.UPDATE_REPORT_CHART, { reportId, chartId: newChartId, meta });
    }
    return newChartId;
  },

  updateReportChart({ commit, state, getters }, { reportId, chartId, name = undefined, meta = undefined }) {
    if (name) {
      commit(m.RENAME_REPORT_CHART, { reportId, chartId, name });
    }
    if (meta) {
      commit(m.UPDATE_REPORT_CHART, { reportId, chartId, meta });
    }
  },

  deleteReport({ commit, state, getters }, { reportId }) {
    commit(m.DELETE_REPORT, { reportId });
  },

  deleteReportChart({ commit, state, getters }, { reportId, chartId }) {
    commit(m.DELETE_REPORT_CHART, { reportId, chartId });
  },

  renameReport({ commit, state, getters }, { reportId, name }) {
    commit(m.RENAME_REPORT, { reportId, name });
  },

  renameReportChart({ commit, state, getters }, { reportId, chartId, name }) {
    commit(m.RENAME_REPORT_CHART, { reportId, chartId, name });
  },

  updateReportLayout({ commit, state, getters }, { reportId, layout }) {
    commit(m.UPDATE_REPORT_LAYOUT, { reportId, layout });
  },
};

/* ========================================================================== */
/* EXPORT MODULE                                                              */
/* ========================================================================== */

export default {
  state: stateMap,
  getters: getterMap,
  actions: actionMap,
  mutations: mutationMap,
};
