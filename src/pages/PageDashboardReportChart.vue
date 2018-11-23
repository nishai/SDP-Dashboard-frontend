<template>
  <div>
    <StandardPageTitle title="Chart" subtitle="An Individual Chart From Your Reports"/>

    <section class="section">
      <div class="content">
        <p> This page has not yet been implemented. </p>
      </div>
    </section>

  </div>
</template>

<script>
import StandardPageTitle from '../components/StandardPageTitle.vue';

export default {
  name: 'PageDashboardReportChart',
  components: {
    StandardPageTitle,
  },

  /**
   * Redirects if this chart is not found.
   * TODO: convert to beforeRouteEnter()
   */
  beforeMount() {
    if (!this.$store.getters.hasReport(this.$route.params.reportId)) {
      this.$router.push({ name: 'reports' });
      this.$toast.open({ duration: 3000, type: 'is-danger', message: 'The report for the given chart was not found.' });
    } else if (!this.$store.getters.hasReportChart(this.$route.params.reportId, this.$route.params.chartId)) {
      this.$router.push({ name: 'report', params: { reportId: this.$route.params.reportId } });
      this.$toast.open({ duration: 3000, type: 'is-danger', message: 'The chart for the given report was not found.' });
    }
  },

};
</script>

<style scoped>

</style>
