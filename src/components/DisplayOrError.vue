<template>
  <div v-if="!isError">
    <slot/>
    <b-loading
      :is-full-page="false"
      :active="active"
    />
  </div>
  <div v-else>
    <div class="section content has-text-danger has-text-centered" style="min-width: 300px">
      <p><b-icon :icon="errorIcon" :pack="errorIconPack" size="is-large"/></p>
      <p> {{ errorMessage }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayOrError',

  props: {
    active: Boolean,
    isError: Boolean,

    errorMessage: {
      type: String,
      default: 'An error occurred. Please try refreshing the page.',
    },
    errorIcon: {
      type: String,
      default: 'exclamation-triangle',
    },
    errorIconPack: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped>

</style>
