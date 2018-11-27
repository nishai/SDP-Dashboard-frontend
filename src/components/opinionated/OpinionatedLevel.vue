
<!--
A an opinionated extension of the level from:
https://bulma.io/documentation/layout/level/

Has three props:
  startItems:  [{label, value} | [label, value]]
  centerItems: [{label, value} | [label, value]]
  endItems:    [{label, value} | [label, value]]
  valueField:  String         - the name of the field in the item to use as the label (default: label)
  itemField:   String         - the name of the field in the item to use as the label (default: value)
-->

<template>
  <BulmaLevel>
    <!-- start -->
    <template v-if="startItems" slot="start">
      <OpinionatedLevelItem :boxed="boxed" v-for="(item, i) in startItems" :key="i" :label="item.label" :value="item.value"/>
    </template>
    <!-- center -->
    <OpinionatedLevelItem :boxed="boxed" v-if="items" v-for="(item, i) in items" :key="i" :label="item.label" :value="item.value"/>
    <!-- end -->
    <template v-if="endItems" slot="end">
      <OpinionatedLevelItem :boxed="boxed" v-for="(item, i) in endItems" :key="i" :label="item.label" :value="item.value"/>
    </template>
  </BulmaLevel>
</template>

<script>
import BulmaLevel from '../global/BulmaLevel.vue';
import BulmaLevelItem from '../global/BulmaLevelItem.vue';
import OpinionatedLevelItem from './OpinionatedLevelItem.vue';

export default {
  name: 'OpinionatedLevel',
  components: {
    BulmaLevel,
    BulmaLevelItem,
    OpinionatedLevelItem,
  },
  props: {
    startItems: null, // items that will appear on the left/
    items: null, // items that will appear in the center
    endItems: null, // items that will appear on the right.
    boxed: Boolean,
  },
};
</script>

<style>
</style>
