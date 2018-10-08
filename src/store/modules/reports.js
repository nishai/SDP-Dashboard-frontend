
import Vue from 'vue';
import * as mutators from '../mutations';

/* ========================================================================== */
/* EXAMPLE DATA - TODO: REPLACE WITH BACKEND QUERY                            */
/* ========================================================================== */

const testReportAQuery = {
  chain: [
    {
      filters: [
        {
          field: 'encrypted_student_no',
          operator: 'startswith',
          value: '02925A2B8FC1F2FC7132D155EBB4FFB7',
          exclude: true,
        },
      ],
      group: {
        by: [
          'encrypted_student_no',
          'calendar_instance_year',
          'year_of_study',
        ],
        yield: [
          {
            name: 'ave_marks',
            via: 'ave',
            from: 'average_marks',
          },
          {
            name: 'final_mark_ave',
            via: 'ave',
            from: 'final_mark',
          },
        ],
      },
    },
  ],
  limit: {
    type: 'page',
    num: 1000,
  },
};

function uuidv4() {
  /* https://stackoverflow.com/questions/105034 */
  /* eslint-disable space-infix-ops, no-bitwise, no-mixed-operators, max-len */
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}


const testReportA = {
  name: 'Test Report',
  desc: 'Comparing the marks of students in the science faculty',
  charts: {
    [uuidv4()]: {
      name: 'Test Bar Graph',
      type: 'bar',
      query: testReportAQuery,
    },
  },
};

const testReportB = {
  name: 'Test Report',
  charts: {
    [uuidv4()]: {
      name: 'Test Pie Chart',
      type: 'pie',
      query: testReportAQuery,
    },
    [uuidv4()]: {
      name: 'Test Pie Chart 1',
      type: 'pie',
      query: testReportAQuery,
    },
    [uuidv4()]: {
      name: 'Test Pie Chart 2',
      type: 'pie',
      query: testReportAQuery,
    },
  },
};

/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

const stateData = {
  reports: {
    '1d090475-3c50-4075-bcf2-1b7f23a2a5cd': testReportA,
    '1d2d04f5-7c50-74b5-acf2-9b7f33a2adcd': testReportB,
  },
};

/* ========================================================================== */
/* GETTERS                                                                    */
/* ========================================================================== */

const getters = {
  get: (state, id) => state.reports[id],
  num: (state) => state.reports.length,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

const mutations = {
  [mutators.CREATE_REPORT](state) {
    const uuid = uuidv4();
    const report = {
      name: uuid,
      desc: 'This report has not yet been customised',
      charts: {},
    };
    Vue.set(state.reports, uuid, report);
  },
  [mutators.CREATE_REPORT_CHART](state, { reportId }) {
    const uuid = uuidv4();
    const chart = {
      name: uuid,
      type: 'pie',
      query: {},
    };
    Vue.set(state.reports[reportId].charts, uuid, chart);
  },
  [mutators.DELETE_REPORT_CHART](state, { reportId, chartId }) {
    if (!(reportId in state.reports)) {
      throw new Error(`Report ID not found: "${reportId}"`);
    }
    if (!(chartId in state.reports[reportId].charts)) {
      throw new Error(`Chart ID not found: "${chartId}" under Report ID: "${reportId}"`);
    }
    Vue.delete(state.reports[reportId].charts, chartId);
  },
};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actions = {
  createReport({ commit, state }) {
    commit(mutators.CREATE_REPORT);
  },
  createReportChart({ commit, state }, { reportId }) {
    commit(mutators.CREATE_REPORT_CHART, { reportId });
  },
  deleteReportChart({ commit, state }, { reportId, chartId }) {
    commit(mutators.DELETE_REPORT_CHART, { reportId, chartId });
  },
};

/* ========================================================================== */
/* EXPORT MODULE                                                              */
/* ========================================================================== */

export default {
  state: stateData,
  getters,
  actions,
  mutations,
};
