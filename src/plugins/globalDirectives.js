import onFocus from '../directives/focus';
import onClickOutside from '../directives/click_outside';

/**
 * Register global directives here that can be
 * used across the vue app without importing them.
 *
 * Directives can be used in html tags, for example:
 *   <div v-click-outside="delete"> </div>
 */
export default {
  install(Vue) {
    Vue.directive('focus', onFocus);
    Vue.directive('click-outside', onClickOutside);
  },
};
