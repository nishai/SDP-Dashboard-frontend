
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


// const testDashboardChart = {
  // name: 'Test Bar Graph',
  // type: 'bar',
  // query: testDashboardAQuery,
  // query: {},
// };

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
  getChart: (state, id) => state.dashboardCharts[id],
  numChart: (state) => state.dashboardCharts.length,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

const mutations = {
  [mutators.CREATE_DASHBOARD_CHART](
    state,
    {
      chartType,
      groupBy,
      years,
      faculties,
      schools,
      courses,
      duplicates,
    }
  ) {
    const uuid = uuidv4();
    const dashboardChart = {
      name: uuid,
      chartType: chartType,
      groupBy: groupBy,
      years: years,
      faculties: faculties,
      schools: schools,
      courses: courses,
      duplicates: duplicates,
    };
    Vue.set(state.dashboardCharts, uuid, dashboardChart);
  },
  [mutators.DELETE_DASHBOARD_CHART](state, { dashboardChartId }) {
    if (!(dashboardChartId in state.dashboardCharts)) {
      throw new Error(`Chart ID not found: "${dashboardChartId}"`);
    }
    Vue.delete(state.dashboardCharts, dashboardChartId);
  },
};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actions = {
  createDashboardChart(
    {
      commit,
      state,
    },
    {
      chartType,
      groupBy,
      years,
      faculties,
      schools,
      courses,
      duplicates,
    }
  ) {
    commit(
      mutators.CREATE_DASHBOARD_CHART,
      {
        chartType,
        groupBy,
        years,
        faculties,
        schools,
        courses,
        duplicates,
      }
    );
  },
  deleteDashboardChart({ commit, state }, { dashboardChartId }) {
    commit(mutators.DELETE_DASHBOARD_CHART, { dashboardChartId });
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
