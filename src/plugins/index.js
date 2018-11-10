
/* external CSS */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/* our CSS */
import '@/assets/css/defaults.css';
import '@/assets/css/bootstrapExtensions.css';
import '@/assets/css/dashboard.css';
import '@/assets/css/vue.css';
import '@/assets/css/wits.css';

/* external plugins */
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

/* our plugins */
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';


/* initialise on export */

export default {
  install(Vue) {
    /* others */
    Vue.use(BootstrapVue);
    Vue.use(VueRouter); // TODO, this still exists in respective folder
    Vue.use(Vuex); // TODO, this still exists in respective folder
    /* ours */
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
  },
};
