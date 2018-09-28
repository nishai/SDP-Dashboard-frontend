<template>
    <div>
    <b-modal ref="popupRef" id="popup" title="Chart Options">
        <p class="my-4">Choose your options fam!😳</p>
    </b-modal>
    <!-- <router-link class="chart_link" :to="{path: '/examples', query: {templateType: url}}">
    </router-link> -->
    </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    open() {
      this.$refs.popupRef.show();
    },
  },
};
</script>

<style>
</style>

