
/* ========================================================================== */
/* STATE                                                                      */
/* ========================================================================== */

import mutations from '../mutations';

/* ========================================================================== */
/* REPORT MODULE                                                              */
/* ========================================================================== */

export default {

  /* ======================================================================== */
  /* STATE                                                                    */
  /*  - https://vuex.vuejs.org/guide/state.html                               */
  /*  - Vuex uses a single state tree - a single object serving as the        */
  /*    "single source of truth". There should be one store for each app,     */
  /*    making it straightforward to locate a specific piece of state, and    */
  /*    allowing us to take snapshots of the current app state for debugging. */
  /* ======================================================================== */

  state: {
    optsbarOpen: false,
    optsbarComponent: null,
  },

  /* ======================================================================== */
  /* GETTERS                                                                  */
  /*  - https://vuex.vuejs.org/guide/getters.html                             */
  /*  - You can think of getters as computed properties in vue for vuex       */
  /*    stores. Like computed properties, a getter's result is cached based   */
  /*    on its dependencies, and will only re-evaluate when some of its       */
  /*    dependencies have changed.                                            */
  /* ======================================================================== */

  getters: {
    optsbarOpen: (state) => state.optsbarOpen,
    optsbarComponent: (state) => state.optsbarComponent,
  },

  /* ======================================================================== */
  /* MUTATIONS (function contents must be SYNCHRONOUS)                        */
  /*  - https://vuex.vuejs.org/guide/mutations.html                           */
  /*  - Mutations should not care about business logic, but are the only way  */
  /*    to set or change the state (so there’s no direct changes!).           */
  /*    Furthermore — they must be synchronous. This solution drives a very   */
  /*    important functionality: mutations can be logged into devtools.       */
  /*  - Variable names are due to the commit() function.                      */
  /* ======================================================================== */

  mutations: {
    [mutations.TOGGLE_OPTSBAR](state) {
      state.optsbarOpen = !state.optsbarOpen;
    },
    [mutations.SET_OPTSBAR_COMPONENT](state, component) {
      state.optsbarComponent = component;
    },
  },

  /* ======================================================================== */
  /* ACTIONS (function contents can be ASYNCHRONOUS)                          */
  /*  - https://vuex.vuejs.org/guide/actions.html                            */
  /*  - can dispatch more than 1 mutation at a time, it just implements the   */
  /*    business logic, it doesn't care about data changing                   */
  /*    (which is manage by mutations)                                        */
  /* ======================================================================== */

  actions: {
    toggleOptsbar({ commit, state }, { component }) {
      commit(mutations.TOGGLE_OPTSBAR);
      commit(mutations.SET_OPTSBAR_COMPONENT, component);
    },
  },

};
