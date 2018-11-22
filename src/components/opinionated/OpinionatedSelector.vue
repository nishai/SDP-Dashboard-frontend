<!--

Simple chart type selector for vue

has 5 props:
  :items               Array<{ icon?, iconPack?, labelField }>  of all items
  :labelField?         string      The field of the items to use as a label, if null uses the items themselves.
  :itemsEnabled?       Array<{ icon?, iconPack?, labelField }>  does not count empty array or null
  :itemsDisabled?      Array<{ icon?, iconPack?, labelField }>  does not count empty array or null
  :initiallySelected?  { icon?, iconPack?, labelField }         the initial selected item.
  :placeholder?        Text to be shown.

has one event.
  @input="handleItemSelected"  The item currently selected.
  @filter="handleItemsShown"    The items currently being shown if there was an update.

-->

<template>
    <b-select
      @input="onSelectedChanged"
      :placeholder="placeholder"
      :icon="selectedIcon"
      :icon-pack="selectedIconPack"
    >
      <!-- kinda expensive, re renders list on each selection change... -->
      <option v-for="(item, i) in showing" :value="item" :key="'option_'+i">
        {{ getItemLabel(item) }}
      </option>
    </b-select>
</template>

<script>
export default {
  name: 'OpinionatedSelector',

  props: {
    placeholder: { type: String, default: 'Select an Item' }, // the text shown in the selector
    items: { type: Array, default() { return []; } }, // array of all items.
    itemsEnabled: { type: Array, default: undefined }, // array of enabled items (items to show), if null shows everything.
    itemsDisabled: { type: Array, default: undefined }, // array of disabled items (items not to show), if null shows everything.
    initiallySelected: undefined,
    labelField: { type: String, default: undefined }, // the field of the item to show as the label in the options, otherwise if null uses the item itself, eg for integers.
  },

  data() {
    return {
      showing: null,
      selectedIcon: null,
      selectedIconPack: null,
    };
  },

  // TODO: fix initially selected & convert to computed, im dumb.

  methods: {
    getItemLabel(item) {
      return this.labelField ? item[this.labelField] : item;
    },
    /**
     * If a item is disabled,
     * or present in the itemsDisabled list.
     */
    isDisabled(type) {
      if (!type) {
        return true;
      }
      if (!this.itemsDisabled || this.itemsDisabled.length < 1) {
        return false;
      }
      // TODO, for efficiency could be converted to a Set.
      return this.itemsDisabled.indexOf(type) >= 0;
    },
    /**
     * If a item is enabled,
     * or present in the itemsEnabled list.
     */
    isEnabled(item) {
      if (!item) {
        return false;
      }
      if (!this.itemsEnabled || this.itemsEnabled.length < 1) {
        return true;
      }
      // TODO, for efficiency could be converted to a Set.
      return this.itemsEnabled.indexOf(item) >= 0;
    },
    /**
     * If a type should be shown.
     * isEnabled && !isDisabled.
     */
    isShowing(item) {
      return this.isEnabled(item) && !this.isDisabled(item);
    },
    /**
     * Update the list of items currently being shown.
     */
    updateShowing() {
      this.showing = Object.values(this.items).filter(this.isShowing);
      this.$emit('filter');
    },
    /**
     * Internal method use to set the selected
     * Icon and Selected Icon pack from the passed type.
     * - setting these fields updates the icon on the selector.
     */
    onSelectedChanged(item) {
      this.selectedIcon = typeof item.icon === 'string' ? item.icon : null;
      this.selectedIconPack = typeof item.iconPack === 'string' ? item.iconPack : null;
      this.$emit('input', item);
    },
  },

  mounted() {
    this.updateShowing();
    if (this.initiallySelected) {
      this.onSelectedChanged(this.initiallySelected);
    }
  },

  watch: {
    items() {
      this.updateShowing();
    },
    itemsEnabled() {
      this.updateShowing();
    },
    itemsDisabled() {
      this.updateShowing();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
