
import BulmaBox from './BulmaBox.vue';

import BulmaBreadcrumb from './BulmaBreadcrumb.vue';

import BulmaCard from './BulmaCard.vue';
import BulmaCardHeader from './BulmaCardHeader.vue';
import BulmaCardContent from './BulmaCardContent.vue';
import BulmaCardImage from './BulmaCardImage.vue';
import BulmaCardFooter from './BulmaCardFooter.vue';

import BulmaLevel from './BulmaLevel.vue';
import BulmaLevelItem from './BulmaLevelItem.vue';

import BulmaNavbar from './BulmaNavbar.vue';
import BulmaNavbarItem from './BulmaNavbarItem.vue';

import BulmaStep from './BulmaStep.vue';
import BulmaSteps from './BulmaSteps.vue';

import VueChart from './VueChart.vue';

/*
 * REFRAIN FROM WIDE USE, this makes it hard to keep track of things and refactor
 *   - webstorm doesnt know whats going on
 *   - https://frontendsociety.com/why-you-shouldnt-use-vue-component-ff019fbcac2e
 */

const components = [
  BulmaBox,

  BulmaBreadcrumb,

  BulmaCard,
  BulmaCardHeader,
  BulmaCardImage,
  BulmaCardContent,
  BulmaCardFooter,

  BulmaLevel,
  BulmaLevelItem,

  BulmaNavbar,
  BulmaNavbarItem,

  BulmaStep,
  BulmaSteps,

  VueChart,
];

/* installer */

export default {
  install: function installGlobalComponents(Vue) {
    if (installGlobalComponents.installed) { return; }
    installGlobalComponents.installed = true;
    /* install */
    components.forEach((component) => {
      Vue.component(component.name, component);
      console.log(`Globally installed component: ${component.name}`);
    });
  },
};
