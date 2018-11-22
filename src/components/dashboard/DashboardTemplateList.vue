<!--
takes in a set of categories and items.

has one event:
  @input="(item) => ..."
-->

<template>
  <div>
    <div v-for="(category, i) in categories" :key="'category_'+i" class="section">
      <p class="title is-5">{{ category.title }}</p>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="(item, j) in category.items" :key="'category_'+i+'_item_'+j"  @click="() => handleClick(item)">
          <DashboardTemplateListItem :src="item.src" :label="item.desc"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultTemplateListItems } from '../../assets/js/defaults';
import DashboardTemplateListItem from './DashboardTemplateListItem.vue';

export default {
  name: 'DashboardTemplateList',
  components: { DashboardTemplateListItem },
  props: {
    categories: {
      default: getDefaultTemplateListItems,
      type: Array,
    },
  },
  methods: {
    handleClick(item) {
      this.$emit('input', item);
    },
  },
};
</script>

<style scoped>
</style>
