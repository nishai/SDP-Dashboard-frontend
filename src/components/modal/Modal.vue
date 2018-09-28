<template>
    <div>
    <router-link :to="{path: '/examples', query: {templateType: url}}">
      <b-modal ref="popupRef" id="popup" title="Chart Options">
          <p class="my-4">Choose your options fam!😳</p>
      </b-modal>
    </router-link>
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
  props: [
    'url',
  ],
};
</script>

<style>
</style>

