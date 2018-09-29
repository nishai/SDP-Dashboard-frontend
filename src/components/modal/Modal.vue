<template>
    <div>

      <b-modal ref="popupRef" id="popup" title="Chart Options">
          <p class="my-4">Choose your options fam!😳</p>

          <div slot="modal-footer" class="w-100">
            <b-btn variant="secondary" @click="hideModal">Close</b-btn>

            <router-link :to="{path: '/examples', query: {templateType: url}}">
              <b-btn variant="primary">Filter</b-btn>
            </router-link>
          </div>
      </b-modal>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    showModal() {
      this.$refs.popupRef.show();
    },
    hideModal() {
      this.$refs.popupRef.hide();
    },
  },
  props: [
    'url',
  ],
};
</script>

<style>
</style>

