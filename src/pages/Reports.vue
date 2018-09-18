<template>
<div>
  <Heading heading_text="Reports"></Heading>
  <b-list-group>
    <!-- List Reports -->
    <b-list-group-item v-for="(report, id) in reports" :key="id" :to="'/reports/' + id">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1"> {{ report.name }} </h5>
        <small class="text-muted"> chart count: {{ report.charts.length }} </small>
        <small class="text-muted"> id: {{ id }} </small>
      </div>
      <p v-if="report.desc" class="mb-1">
        {{ report.desc }}
      </p>
      <small class="text-muted"></small>
    </b-list-group-item>
    <!-- Display If No Reports Exist -->
    <b-list-group-item v-if="Object.keys(reports).length <= 0" disabled>
      <h5 class="mb-1"> No Reports Exist </h5>
    </b-list-group-item>
    <!-- Add Report Button -->
    <b-list-group-item>
      <b-button variant="success" @click="create"> Create </b-button>
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';

export default {
  name: 'Report',
  components: {
    Heading,
  },
  computed: {
    reports() {
      return this.$store.state.reports.reports;
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createReport');
    },
  },
};
</script>

<style>
</style>
