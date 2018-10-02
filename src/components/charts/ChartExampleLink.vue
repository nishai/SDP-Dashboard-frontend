<template>
  <div class="chart_link_bounds">
    <Modal ref="templatePopup" v-bind:url="url" v-bind:text="text"></Modal>

    <div class="chart_link">
      <img :src="url" alt="chart" width="120" @click="openPopup" >
      <div class="chart_link_text"> {{ text }} </div>
    </div>

  </div>
</template>

<script>
import Modal from '../modal/Modal.vue';

export default {
  name: 'ChartExampleLink',
  props: [
    'url',
    'text',
  ],
  components: {
    Modal,
  },
  methods: {
    openPopup() {
      this.$refs.templatePopup.showModal();
    },
  },
};
</script>

<style>
.chart_link_bounds {
  width: calc(120px + 10px*2);
}

.chart_link {
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  /* border */
  border-width: 1px;
  border-style: dashed;
  border-radius: 7px;
  border-color: rgba(0,0,0,0); /* invisible */
}

.chart_link:hover {
  font-weight: bold;
  /* border */
  border-color: var(--border-color);
}

.chart_link_text {
  color: #536c85;
  text-align: center;
  font-size: 16px;
}
</style>
