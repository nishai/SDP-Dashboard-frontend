
/* ========================================================================== */
/* CSS                                                                        */
/* ========================================================================== */


/* external CSS */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/* our CSS */
import '@/assets/css/defaults.css';
import '@/assets/css/bootstrapExtensions.css';
import '@/assets/css/dashboard.css';
import '@/assets/css/vue.css';
import '@/assets/css/wits.css';


/* eslint-disable import/first */

/* ========================================================================== */
/* VENDOR PLUGINS                                                             */
/* ========================================================================== */


// import Buefy from 'buefy';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';

/**
 * Register global plugins here
 * that will be used across the app.
 *
 * This can include stylesheets.
 */
function installVendorPlugins(Vue) {
  Vue.use(VueRouter);
  Vue.use(Vuex);
  Vue.use(BootstrapVue);
  // Vue.use(Buefy, { // options - https://buefy.github.io/documentation/constructor-options
  //   defaultIconPack: 'fa', // font-awesome ('fa') | material-design-icons ('mdi')
  // });
}


/* ========================================================================== */
/* OUR PLUGINS                                                                */
/* ========================================================================== */


import VueAuth from '../assets/js/plugins/vue-auth';
import VueAxios from '../assets/js/plugins/vue-axios';
import VueWitsModels from '../assets/js/plugins/vue-wits-models';

/**
 * Register global plugins here
 * that will be used across the app.
 *
 * This can include style sheets.
 */
function installGlobalPlugins(Vue) {
  Vue.use(VueWitsModels);
  Vue.use(VueAuth);
  Vue.use(VueAxios);
}


/* ========================================================================== */
/* OUR DIRECTIVES                                                             */
/* ========================================================================== */


import onFocus from '../directives/focus';
import onClickOutside from '../directives/click-outside';

/**
 * Register global directives here that can be
 * used across the vue app without importing them.
 *
 * Directives can be used in html tags, for example:
 *   <div v-click-outside="delete"> </div>
 */
function installGlobalDirectives(Vue) {
  /* define */
  const directives = {
    'focus': onFocus,
    'click-outside': onClickOutside,
  };

  /* TODO: move names into respective components */

  /* regsiter */
  Object.entries(directives).forEach(([key, directive]) => {
    console.log(`Globally installed directive: ${key}`);
    Vue.directive(key, directive);
  });
}


/* ========================================================================== */
/* OUR COMPONENTS                                                             */
/*   - Why global components are bad:                                         */
/*     frontendsociety.com/why-you-shouldnt-use-vue-component-ff019fbcac2e    */
/* ========================================================================== */

/* install */

// import GlobalComponents from '../components/global/install';

/**
 * WARNING: this makes it hard to debug/refactor components :WARNING
 * WARNING: this makes it hard to debug/refactor components :WARNING
 * WARNING: this makes it hard to debug/refactor components :WARNING
 *
 * Register global components here that can be
 * used across the vue app without importing them.
 *
 * For example:
 *   <MyGlobalComponent/>
 */
function installGlobalComponents(Vue) {
  // Vue.use(GlobalComponents);
}


/* ========================================================================== */
/* MODULE EXPORT - INSTALL ALL                                                */
/* ========================================================================== */


/* install function */
export default {
  install: function installAll(Vue) {
    if (installAll.installed) { return; }
    installAll.installed = true;

    /* vendor - plugins */
    installVendorPlugins(Vue);
    /* our - plugins */
    installGlobalPlugins(Vue);
    /* our - components */
    installGlobalComponents(Vue);
    /* our - directives */
    installGlobalDirectives(Vue);
  },
};
