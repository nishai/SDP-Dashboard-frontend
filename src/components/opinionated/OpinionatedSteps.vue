<template>
  <b-steps :size="size">
    <b-step
      v-for="(step, i) in steps"
      :type="step.type || 'is-success'"
      :label="step.label"
      :details="step.details"
      :marker="step.icon ? undefined : (step.marker || ''+(i+1))"
      :icon="step.icon"
      :icon-pack="i < completed ? 'fa' : step.iconPack"
      :is-completed="i < completed"
      :active="i === completed"
      :key="'step_'+i"
    />
  </b-steps>
</template>

<script>
export default {
  name: 'OpinionatedSteps',
  props: {
    steps: undefined, // number or array of items
    completed: {
      type: Number,
      default: 0,
    },
    size: {
      type: String, // is-small, undefined, is-medium, is-large
      default: undefined,
    },
  },
};
</script>

<style scoped>

</style>
