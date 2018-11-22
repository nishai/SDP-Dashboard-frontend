import Vue from 'vue';
import Vuex from 'vuex';
import ui from './modules/ui';
import user from './modules/user';

/* enable plugin, TODO: move to plugin folder */

Vue.use(Vuex);

/* Export Vuex instance */

export default new Vuex.Store({
  modules: {
    ui,
    user,
  },
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
});
