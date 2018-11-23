/* eslint-disable import/first */

/* ========================================================================== */
/* VENDOR PLUGINS                                                             */
/* ========================================================================== */

import Buefy from 'buefy';
import { VueSlideoutPanel, vueSlideoutPanelService } from 'vue2-slideout-panel';

/**
 * Register global plugins here
 * that will be used across the app.
 *
 * This can include stylesheets.
 *
 * Note: vuex and vue-router don't count as they are instantiated.
 */
function installVendorPlugins(Vue) {
  // options - https://buefy.github.io/documentation/constructor-options
  // font-awesome ('fa') | material-design-icons ('mdi')
  Vue.use(Buefy, {
    defaultIconPack: 'fa',
  });

  // https://vue2-slideout-panel.wrkflows.io/en/articles/1001
  // has component placed inside of LayoutMain
  Vue.component('slideout-panel', VueSlideoutPanel);
  // TODO: fix this, it should not be needed.
  /**
   * @memberOf {Vue}
   * @member {vueSlideoutPanelService} $showPanel
   */
  Object.defineProperties(Vue, {
    $showPanel: { get() { return vueSlideoutPanelService; } },
  });
  /**
   * @memberOf {Vue.prototype}
   * @member {vueSlideoutPanelService} $showPanel
   */
  Object.defineProperties(Vue.prototype, {
    $showPanel: { get() { return vueSlideoutPanelService; } },
  });
  // TODO: disable debugging
  window.vue2PanelDebug = true;
}


/* ========================================================================== */
/* OUR PLUGINS                                                                */
/* ========================================================================== */


// font awesome imported here
// material design icons imported here
import '@/assets/scss/all.scss';
import VueAuth from '../assets/js/plugins/vue-auth';
import VueAxios, { cachiosInstance } from '../assets/js/plugins/vue-axios';
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
/* OUR COMPONENTS                                                             */
/*   - Why global components are bad:                                         */
/*     frontendsociety.com/why-you-shouldnt-use-vue-component-ff019fbcac2e    */
/* ========================================================================== */

/* install */

import GlobalComponents from '../components/global/install';

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
  Vue.use(GlobalComponents);
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
  },
};
