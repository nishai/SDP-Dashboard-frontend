<template>
    <div>
    <b-modal ref="popupRef" id="popup" title="Chart Options">
        <p class="my-4">Choose your options fam!😳</p>
    </b-modal>
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

