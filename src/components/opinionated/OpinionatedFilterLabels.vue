<!-- eslint-disable max-len -->

<!--

Opinionated implementation of:
https://buefy.github.io/documentation/taginput

Intended for use for searching through items.

This component provides 5 properties:
  - items: Array            All the selectable items
  - selected?: Array        All the selected items, use :selected.sync to update parent values.
  - icon?: String           Name of the icon to use
  - placeholder?: String    Text to display if nothing is selected
  - field?: String          :leave blank if input items are strings and not objects, otherwise set to the value of the field in the object, default is "label"

This component provides 3 events:
  - "removed": Item           (ie. @removed="handler")
  - "added": Item             (ie. @adder="handler")
  - "change": Array         (ie. @adder="handler")
  - "update:selected": Array  (ie. :selected.sync="selectedProperty")

REFERNCE FOR b-taginput:
  Properties:
      v-model             Binding value                                                                  Array<String|Number|Object> —                                   —
      maxlength           Limits the length of each tag, plus character counter                          String, Number              —                                   —
      maxtags             Limits the number of tags, plus tag counter                                    String, Number              —                                   —
      type                Type (color) of the tags, optional                                             String                      any is-color                        is-light
      size                Tag and input size, optional                                                   String                      is-small, is-medium, is-large       is-medium
      rounded             Makes the tags rounded, optional                                               Boolean                      —                                  false
      attached            Makes the tags attached instead of having an appended delete button, optional  Boolean                      —                                  false
      ellipsis            Adds ellipsis on tags to not overflow the text                                 Boolean                      —                                  false
      closable            Add close/delete button to the tag                                             Boolean                      —                                  true
      field               Property of the object (if data is array of objects) to use as display text    String                       —                                  value
      autocomplete        Add autocomplete feature                                                       Boolean                      —                                  false
      allow-new           When autocomplete, it allow to add new tags                                    Boolean                      —                                  false
      remove-on-keys      Allow removing last tag when pressing given keys, if input is empty            Array                        —                                  [8]
      confirm-key-codes   Array of key codes which will add a tag when typing (default comma and enter)  Array                        —                                  [13, 188]
      on-paste-separators Array of chars used to split when pasting a new string                         Array                        —                                  [',']
      before-adding       Function to validate the value of the tag before adding                        Function                     —                                  () => true
      allow-duplicates    Allows adding the same tag multiple times                                      Boolean                      —                                  false
  Events:
      input     Triggers when tags are added/removed    value: Array
      typing    User started typing a tag               value: String
      add       Triggers when a tag has been added      value: String|Object
      remove    Triggers when a tag has been removed    value: String|Object
-->

<template>
  <b-taginput
    v-model="selected"
    :data="filtered"
    :field="field"

    @typing="onTyping"
    @add="onAdd"
    @remove="onRemove"
    @input="onInput"

    :icon="icon"
    :placeholder="placeholder"

    :allow-new="false"
    :autocomplete="true"
    :open-on-focus="true"
  />
</template>

<script>
export default {
  name: 'OpinionatedFilterLabels',
  props: {
    items: { // all the available items.
      type: Array,
      default() { return []; },
    },
    selected: { // all the selected items, used     :selected.sync   to update parent values.
      type: Array,
      default() { return []; },
    },
    icon: { // the icon to display.
      type: String,
      default: 'caret-right',
    },
    placeholder: { // text to display if no items are selected
      type: String,
      default: 'Select Items',
    },
    field: { // leave blank if input items are strings and not objects, otherwise set to the value of the field in the object.
      type: String,
      default: 'label',
    },
    filter: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      filtered: [],
      /* private - add and remove tags dont have access to last filter text */
      lastFilterText: '',
    };
  },
  mounted() {
    this.updateFilteredTags();
  },
  watch: {
    selected() {
      this.$emit('update:selected', this.selected);
      this.$emit('change', this.selected);
    },
  },
  methods: {
    /**
     * When the user types:
     * store the current text, and update the displayed items.
     */
    onTyping(text) {
      if (typeof text === 'string') {
        this.lastFilterText = text;
      }
      this.updateFilteredTags();
    },
    /**
     * When the user removes a tag/item,
     * the displayed items need to be updated
     * based on the previously typed text.
     */
    onRemove(item) {
      // this.updateFilteredTags();
      this.$emit('removed', item);
    },

    onAdd(item) {
      this.$emit('added', item);
    },

    onInput(items) {
      this.selected = items;
      this.$emit('input', items);
    },

    /**
     * Get the field from an item, based on the passed field property,
     * if the item is an object,
     */
    getItemField(item) {
      if (!this.field || this.field.length < 1) {
        return item;
      }
      return item[this.field];
    },
    /**
     * Update the displayed list based on the current typed text.
     * Make sure to leave out items already added as tags.
     */
    updateFilteredTags() {
      this.filtered = this.items.filter((option) => {
        const matchesText = this.getItemField(option)
          .toString()
          .toLowerCase()
          .indexOf(this.lastFilterText.toLowerCase()) >= 0;
        const alreadySelected = this.selected.filter(
          (item) => this.getItemField(item) === this.getItemField(option),
        ).length > 0;
        return matchesText && !alreadySelected;
      });
    },
  },
};
</script>


<style scoped lang="scss">
</style>
