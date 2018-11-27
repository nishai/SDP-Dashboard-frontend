<!--

https://wikiki.github.io/components/steps/

-->

<template>
  <li :class="['step-item', type, { 'is-completed': isCompleted, 'is-active': active }]">
    <div class="step-marker">
      <p v-if="marker"> {{ marker }} </p>
      <b-icon v-if="icon" :icon="icon" :pack="iconPack"/>
    </div>
    <div v-if="label||details" class="step-details is-primary is-completed">
      <p v-if="label" class="step-title"> {{ label }} </p>
      <p v-if="details"> {{ details }} </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'b-step',
  props: {
    label: { type: String, default: undefined },
    details: { type: String, default: undefined },
    type: { type: String, default: 'is-success' },
    marker: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    iconPack: { type: String, default: undefined },
    active: Boolean,
    isCompleted: Boolean,
  },
};
</script>

<style scoped>

</style>
