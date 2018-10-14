
import mutations from '../mutations';


// TODO: Move into class, this is too slow

/* ========================================================================== */
/* AUTH MODULE                                                                */
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
    authToken: localStorage.getItem('authToken'),
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
    authorized: (state) => state.authToken !== null,
    authTokenData: (state) => {
      if (state.authToken == null) {
        return null;
      }
      try {
        const base64Url = state.authToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      } catch (e) {
        return null;
      }
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
    [mutations.AUTH_SET_JWT_TOKEN]: (state, token) => {
      state.authToken = token;
      localStorage.setItem('authToken', token);
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
    /**
     * Attempt to log in and start a new session with the associated username and password.
     * TODO: cookies & session events
     * @param username
     * @param password
     */
    authLogIn({ commit, state, getters }, { username, password }) {
      if (getters.authorized) {
        throw new Error('Already logged in!');
      }
      getters.apiAxios
        .post('auth/token/obtain', { username, password })
        .then((response) => {
          if (typeof response.data.token === 'string') {
            commit(mutations.AUTH_SET_JWT_TOKEN, response.data.token);
          } else {
            throw new Error('Invalid Login!');
          }
        })
        .catch((error) => {
          commit(mutations.AUTH_SET_JWT_TOKEN, null);
        });
    },
    /**
     * Log out and end the current session.
     */
    authLogOut({ commit, state, getters }) {
      if (!getters.authorized) {
        throw new Error('Already logged out!');
      }
      commit(mutations.AUTH_SET_JWT_TOKEN, null);
    },
    /**
     * Refresh the current session, by obtaining a new JWT token from the existing one.
     */
    authRefresh({ commit, state, getters }) {
      if (!getters.authorized) {
        throw new Error('Cannot refresh token if not logged in!');
      }
      getters.apiAxios
        .post('auth/token/refresh', { token: state.authToken })
        .then((response) => {
          if (typeof response.data.token === 'string') {
            commit(mutations.AUTH_SET_JWT_TOKEN, response.data.token);
          } else {
            throw new Error('Invalid Refresh!');
          }
        })
        .catch((error) => {
          commit(mutations.AUTH_SET_JWT_TOKEN, null);
        });
    },
  }, /* >>> END ACTIONS <<< */

};
