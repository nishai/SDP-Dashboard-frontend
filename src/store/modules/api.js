
import axios from 'axios';
import mutations from '../mutations';

/* ========================================================================== */
/* API MODULE                                                                 */
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
    /* polling */
    apiPollInterval: 10000,
    apiPollEnabled: false,
    apiConnected: false,
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
    url(state) {
      return process.env.VUE_APP_API;
    },
    apiAxios(state, getters, rootState) {
      console.log('RECALCULATING AXIOS');
      const options = {
        baseURL: `http://${process.env.VUE_APP_API}/`,
        timeout: 10000,
      };
      if (getters.authorized) {
        if (typeof rootState.auth.authToken !== 'string') {
          throw new Error(`Auth token is not valid: ${rootState.auth.authToken}`);
        }
        options.headers = {
          'Authorization': `JWT ${rootState.auth.authToken}`,
          'Content-Type': 'application/json',
        };
      }
      console.log('RECALCULATED AXIOS', options);
      return axios.create(options);
    },
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
    /* polling */
    [mutations.API_POLLING_SET_ENABLED]: (state, enabled) => {
      state.apiPollEnabled = enabled;
    },
    [mutations.API_POLLING_SET_CONNECTED]: (state, connected) => {
      state.apiConnected = connected;
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
    /* polling */
    apiConnectionPollingStart({ commit, state, getters }) {
      function doPoll() {
        getters.apiAxios.get('api/status')
          .then((response) => {
            commit(mutations.API_POLLING_SET_CONNECTED, response.data.status === 'active');
          }).catch((error) => {
            commit(mutations.API_POLLING_SET_CONNECTED, false);
          });
        if (state.apiPollEnabled) {
          setTimeout(doPoll, state.apiPollInterval);
        }
      }
      if (!state.apiPollEnabled) {
        commit(mutations.API_POLLING_SET_ENABLED, true);
        doPoll();
      } else {
        throw new Error(`API connectivity polling is already running every ${state.apiPollInterval}ms!`);
      }
    },
    apiConnectionPollingStop({ commit, state }) {
      if (state.apiPollEnabled) {
        commit(mutations.API_POLLING_SET_ENABLED, false);
      } else {
        throw new Error('API connectivity polling is already stopped!');
      }
    },
  }, /* >>> END ACTIONS <<< */

};
