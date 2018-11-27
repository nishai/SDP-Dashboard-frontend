
<!--

This page is only show if a default/active report does not exit.

-->

<template>
  <div>
    <StandardPageTitle title="Active Report" subtitle="Your Dashboard's Default Report"/>
    <section class="section">
      <div class="content has-text-grey has-text-centered">
        <p><b-icon icon="sad-tear" pack="far" size="is-large"/></p>
        <p> Default report does not exist - Select a default or create a new one. </p>
        <p> <router-link :to="{ name: 'reports' }"> <a class="button is-success"> Go To Reports </a> </router-link> </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StandardPageTitle from '../components/StandardPageTitle.vue';
import PageDashboardReport from './PageDashboardReport.vue';
import store from '../store';
import router from '../router';

export default {
  name: 'PageDashboardHome',
  components: {
    StandardPageTitle,
    PageDashboardReport,
  },

  computed: {
    ...mapGetters(['getDefaultReport', 'hasDefaultReport']),
  },

  beforeRouteEnter(to, from, next) {
    if (store.getters.hasDefaultReport()) {
      router.push({ name: 'report', params: { reportId: store.getters.getDefaultReport().id } });
      return;
    }
    next(() => { next(); }); // continue going.
  },

};
</script>
