import Vue from 'vue';
import Vuex from 'vuex';
import reports from './modules/reports';
import ui from './modules/ui';
import dashboardCharts from './modules/dashboard_charts';

/* enable plugin, TODO: move to plugin folder */

Vue.use(Vuex);

/* Export Vuex instance */

export default new Vuex.Store({
  modules: {
    ui,
    reports,
    dashboardCharts,
  },
  strict: process.env.NODE_ENV !== 'production',
});
