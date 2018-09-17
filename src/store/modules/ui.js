
/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

import * as mutators from '../mutations';


const stateData = {
  /* right sidebar */
  optsbarOpen: false,
  optsbarComponent: null,
};

/* ========================================================================== */
/* GETTERS                                                                    */
/* ========================================================================== */

const getters = {
  /* right sidebar */
  optsbarOpen: (state) => state.optsbarOpen,
  optsbarComponent: (state) => state.optsbarComponent,
};

/* ========================================================================== */
/* MUTATORS                                                                   */
/* ========================================================================== */

/*
 * Defines synchronous methods for modifying the Vuex state.
 * These methods are run using commit('<name>', ...params)
 */

const mutations = {
  [mutators.TOGGLE_OPTSBAR](state) {
    state.optsbarOpen = !state.optsbarOpen;
  },
  [mutators.SET_OPTSBAR_COMPONENT](state, component) {
    state.optsbarComponent = component;
  },
};

/* ========================================================================== */
/* ACTIONS                                                                    */
/* ========================================================================== */

const actions = {
  toggleOptsbar({ commit, state }, { component }) {
    commit(mutators.TOGGLE_OPTSBAR);
    commit(mutators.SET_OPTSBAR_COMPONENT, component);
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
