
<!--
Simpler implementation of a modal.

Has two properties:
    title
    active - THIS PROPERTY SHOULD USE THE SYNC DIRECTIVE WHEN V-BOUND
             ie. :active.sync="active"
                 this means that the property listends to events
                 emmitted by the child in the form "update:active",
                 and sets the value of the parent to whatever is
                 sent on events in this form.
   scroll

Has three events:
  :active.sync
  v-on:cancel
  v-on:accept

has one slot for content
-->

<template>
  <b-modal
    :active.sync="internalActive"
    :canCancel="canCancel"
    has-modal-card
    :scroll="scroll ? 'keep' : 'clip'"
  >
    <div class="modal-card" style="width: auto; min-height: 400px">
      <header v-if="title" class="modal-card-head">
        <p class="modal-card-title"> {{ title }} </p>
      </header>

      <section class="modal-card-body">
        <slot/>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-danger" @click="cancel">Cancel</button>
        <button class="button is-primary" :disabled="acceptDisabled" @click="accept">Accept</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'OpinionatedModal',
  props: {
    active: Boolean,
    title: String,
    canCancel: { type: Array, default() { return ['escape', 'x', 'outside']; } },
    acceptDisabled: Boolean,
    scroll: Boolean,
  },
  data() {
    return {
      internalActive: this.active,
    };
  },
  watch: {
    active() {
      this.internalActive = this.active;
    },
    internalActive() {
      this.$emit('update:active', this.internalActive);
    },
  },
  methods: {
    cancel() {
      // this.$emit('update:active', false); // YOU NEED TO HANDLE THIS
      this.$emit('cancel');
    },
    accept() {
      // this.$emit('update:active', false); // YOU NEED TO HANDLE THIS
      this.$emit('accept');
    },
  },
};
</script>

<style scoped lang="scss">
</style>
