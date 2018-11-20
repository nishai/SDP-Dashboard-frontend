
import Vue from 'vue';
import * as mutators from '../mutations';

/* ========================================================================== */
/* EXAMPLE DATA - TODO: REPLACE WITH BACKEND QUERY                            */
/* ========================================================================== */

// const testDashboardAQuery = {
//   chain: [
//     {
//       filters: [
//         {
//           field: 'encrypted_student_no',
//           operator: 'startswith',
//           value: '02925A2B8FC1F2FC7132D155EBB4FFB7',
//           exclude: true,
//         },
//       ],
//       group: {
//         by: [
//           'encrypted_student_no',
//           'calendar_instance_year',
//           'year_of_study',
//         ],
//         yield: [
//           {
//             name: 'ave_marks',
//             via: 'ave',
//             from: 'average_marks',
//           },
//           {
//             name: 'final_mark_ave',
//             via: 'ave',
//             from: 'final_mark',
//           },
//         ],
//       },
//     },
//   ],
//   limit: {
//     type: 'page',
//     num: 1000,
//   },
// };

function uuidv4() {
  /* https://stackoverflow.com/questions/105034 */
  /* eslint-disable space-infix-ops, no-bitwise, no-mixed-operators, max-len */
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

const stateData = {
  dashboardCharts: {
    // '1d090475-3c50-4075-bcf2-1b7f23a2a7cd': testDashboardChart,
  },
};

/* ========================================================================== */
/* GETTERS                                                                    */
/* ========================================================================== */

const getters = {
  getChart: (state) => (id) => state.dashboardCharts[id],
  numCharts: (state) => Object.keys(state.dashboardCharts).length,
  getCharts: (state) => state.dashboardCharts,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

const mutations = {
  [mutators.CREATE_DASHBOARD_CHART](state, { data, layout }) {
    const uuid = uuidv4();
    const dashboardChart = {
      name: uuid,
      data,
      layout,
    };
    Vue.set(state.dashboardCharts, uuid, dashboardChart);
    console.log('CREATED CHART', state.dashboardCharts);
  },
  [mutators.DELETE_DASHBOARD_CHART](state, { dashboardChartId }) {
    if (!(dashboardChartId in state.dashboardCharts)) {
      throw new Error(`Chart ID not found: "${dashboardChartId}"`);
    }
    Vue.delete(state.dashboardCharts, dashboardChartId);
  },
  [mutators.RENAME_DASHBOARD_CHART](state, { name, id }) {
    state.dashboardCharts[id].name = name;
  },
  [mutators.UPDATE_CHART_LAYOUT](state, { newLayout }) {
    for (const chartId in state.dashboardCharts) {
      for (let j = 0; j < newLayout.length; j += 1) {
        if (state.dashboardCharts[chartId].layout.i === newLayout[j].i) {
          if (newLayout[j].x === -1) {
            newLayout[j].x = state.dashboardCharts[chartId].layout.x;
          }
          if (newLayout[j].y === -1) {
            newLayout[j].y = state.dashboardCharts[chartId].layout.y;
          }
          if (newLayout[j].w === -1) {
            newLayout[j].w = state.dashboardCharts[chartId].layout.w;
          }
          if (newLayout[j].h === -1) {
            newLayout[j].h = state.dashboardCharts[chartId].layout.h;
          }
          state.dashboardCharts[chartId].layout = {
            x: newLayout[j].x,
            y: newLayout[j].y,
            w: newLayout[j].w,
            h: newLayout[j].h,
            i: newLayout[j].i,
          };
        }
      }
    }
  },
};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actions = {
  createDashboardChart({ commit, state }, { data }) {
    commit(
      mutators.CREATE_DASHBOARD_CHART,
      { data, layout: { x: 0, y: 0, w: 1, h: 1, i: state.numCharts + 1 } },
    );
  },
  deleteDashboardChart({ commit, state }, { dashboardChartId }) {
    commit(mutators.DELETE_DASHBOARD_CHART, { dashboardChartId });
  },
  renameChart({ commit, state }, { name, id }) {
    commit(mutators.RENAME_DASHBOARD_CHART, { name, id });
  },
  updateChartLayout({ commit, state }, { newLayout }) {
    commit(mutators.UPDATE_CHART_LAYOUT, { newLayout });
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
