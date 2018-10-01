
import Vue from 'vue';
import * as mutators from '../mutations';

/* ========================================================================== */
/* EXAMPLE DATA - TODO: REPLACE WITH BACKEND QUERY                            */
/* ========================================================================== */

const testDashboardAQuery = {
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


const testDashboard = {
  name: 'Test Dashboard',
  desc: 'Comparing the marks of students in the science faculty',
  charts: {
    [uuidv4()]: {
      name: 'Test Bar Graph',
      type: 'bar',
      query: testDashboardAQuery,
    },
  },
};

/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

const stateData = {
  Dashboards: {
    '1d090475-3c50-4075-bcf2-1b7f23a2a5cd': testDashboard,
  },
};

/* ========================================================================== */
/* GETTERS                                                                    */
/* ========================================================================== */

const getters = {
  get: (state, id) => state.dashboards[id],
  num: (state) => state.dashboards.length,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

const mutations = {
  [mutators.CREATE_DASHBOARD](state) {
    const uuid = uuidv4();
    const dashboard = {
      name: uuid,
      desc: 'This dashboard has not yet been customised',
      charts: {},
    };
    Vue.set(state.dashboards, uuid, dashboard);
  },
  [mutators.CREATE_DASHBOARD_CHART](state, { dashID }) {
    const uuid = uuidv4();
    const chart = {
      name: uuid,
      type: 'pie',
      query: {},
    };
    Vue.set(state.dashboards[dashID].charts, uuid, chart);
  },
  [mutators.DELETE_DASHBOARD_CHART](state, { dashID, chartId }) {
    if (!(dashID in state.dashboard)) {
      throw new Error(`Dashboard ID not found: "${dashID}"`);
    }
    if (!(chartId in state.dashboards[dashID].charts)) {
      throw new Error(`Chart ID not found: "${chartId}" under Dashboard ID: "${dashID}"`);
    }
    Vue.delete(state.dashboards[dashID].charts, chartId);
  },
};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actions = {
  createDashboard({ commit, state }) {
    commit(mutators.CREATE_DASHBOARD);
  },
  createDashboardChart({ commit, state }, { dashID }) {
    commit(mutators.CREATE_DASHBOARD_CHART, { dashID });
  },
  deleteDashboardChart({ commit, state }, { dashID, chartId }) {
    commit(mutators.DELETE_DASHBOARD_CHART, { dashID, chartId });
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
