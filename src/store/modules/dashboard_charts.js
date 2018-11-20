
import Vue from 'vue';
import { uuidv4 } from '../../assets/js/util/uuid';
import * as mutators from '../mutations';

/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

const stateData = {
  dashboardCharts: {},
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
  [mutators.CREATE_DASHBOARD_CHART](state, { name, data, layout }) {
    const uuid = uuidv4();
    const dashboardChart = {
      uuid,
      name,
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
  createDashboardChart({ commit, state }, { name, data }) {
    commit(
      mutators.CREATE_DASHBOARD_CHART,
      { name, data, layout: { x: 0, y: 0, w: 1, h: 1, i: state.numCharts + 1 } },
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
