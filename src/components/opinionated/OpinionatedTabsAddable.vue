
<!--
Wits filter set that manages by default:
  - years
  - faculties
  - schools
  - courses

-->

<!-- TODO: for some reason this does not bind the slots to components properly for example if a thing is deleted, the data remains the same... -->

<template>
  <b-tabs v-model="activeTab" @change="handleTabClick" class="h-expander">
    <b-tab-item
      v-for="i in Math.min(numTabs + 1, maxTabs)"
      :icon="i > numTabs ? 'plus' : undefined"
      :key="'tab_'+i"
      class="h-expanded h-expander"
    >
      <template slot="header" v-if="delActive && i <= numTabs">
        <div class="level" @mouseover="showByIndex=i-1" @mouseout="showByIndex=null">
          <span># {{ i }}</span>
          <div
            class="delete is-small has-margin-left-sm has-background-danger"
            @click="handleDeleteClick(i-1)"
            v-if="showByIndex === i-1 && numTabs > 1"
          />
        </div>
      </template>
      <slot class="h-expanded h-expander" v-if="i <= numTabs" :i="i-1" :item="items[i-1]"> <!-- iteration starts at 1 not 0 -->
        {{ i-1 }} : {{ items[i-1] }}
      </slot>
    </b-tab-item>
  </b-tabs>
</template>

<script>

export default {
  name: 'OpinionatedTabs',

  props: {
    items: {
      type: Array,
      default() { return []; },
    },

    maxTabs: {
      type: Number,
      default: 5,
    },

    delActive: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      activeTab: 0,
      showByIndex: null,
      internalItems: this.items,
    };
  },

  computed: {
    numTabs() {
      return this.internalItems.length;
    },
  },

  watch: {
    numTabs() {
      if (this.activeTab >= this.numTabs) {
        this.activeTab = this.numTabs - 1;
      }
      this.$emit('update:items', this.internalItems.concat());
    },
  },

  methods: {
    handleTabClick(tabIndex) {
      if (tabIndex >= this.numTabs && this.numTabs < this.maxTabs) {
        this.$emit('add', tabIndex);
      }
    },
    handleDeleteClick(tabIndex) {
      if (tabIndex < this.numTabs && this.numTabs > 1) {
        this.$emit('delete', tabIndex);
      }
    },
  },
};
</script>

<style scoped>

/* same as extending with h-expander & h-expanded */
/deep/ .tab-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

</style>
