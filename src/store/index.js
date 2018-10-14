import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import auth from './modules/auth';
import reports from './modules/reports';
import ui from './modules/ui';
import dashboardCharts from './modules/dashboard_charts';


/* Add Vuex Plugin to Vue */

Vue.use(Vuex);

/* Initialise Vuex */

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    api,
    auth,
    reports,
    ui,
    dashboardCharts,
  },
  strict: debug,
});

/* Export Vuex instance */

export default store;
