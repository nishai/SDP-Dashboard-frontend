import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

/* enable plugin, TODO: move to plugin folder */

Vue.use(Vuex);

/* Export Vuex instance */

const store = new Vuex.Store({
  modules: {
    user,
  },
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
});

store.watch(
  (state) => {
    return state.user;
  },
  (value) => {
    try {
      // NOTE: You cannot store functions or classes in the store.
      // It needs to be directly serialisable json objects.
      const string = JSON.stringify(value);
      console.log('Updating Local Storage:', { value, string: { string } });
      localStorage.setItem('userState', string);
    } catch (e) {
      console.error('Failed to save session to local storage', e);
    }
  },
  { deep: true },
);

export default store;
