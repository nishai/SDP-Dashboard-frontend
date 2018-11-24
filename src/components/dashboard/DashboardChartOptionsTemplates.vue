<!--
takes in a set of categories and items.

props:
  categories: [... , { title, items: [... , { desc, src }] }]
  isSelector: Boolean          If the component should be a selector instead.
  selectorItem.sync

has one event:
  @input="(item) => ..."
-->

<template>
  <div v-if="!isSelector">
    <div v-for="(category, i) in categories" :key="'category_'+i" class="section">

      <!-- CATEGORY GROUPING -->
      <p class="title is-5" :class="[singles ? 'has-text-centered' : '']"> {{ category.title }} </p>
      <div class="columns is-multiline">

        <!-- TEMPLATE ITEM -->
        <div
          v-for="(item, j) in category.items"
          class="column template-list-item" :class="[singles ? 'is-full' : 'is-one-third', singles ? 'is-paddingless' : '']"
          @click="() => handleClick(item)"
          :key="'category_'+i+'_item_'+j"
        >
          <section class="has-padding-md">
            <b-level class="is-marginless">
              <b-level-item>
                <figure class="image" :class="[singles ? 'is-64x64' : 'is-128x128']">
                  <img :src="item.src" alt="chart">
                </figure>
              </b-level-item>
            </b-level>
            <p class="content heading has-text-centered is-marginless has-padding-top-sm has-padding-left-sm has-padding-right-sm">
              {{ item.desc }}
            </p>
          </section>
        </div>

      </div>
    </div>

  </div>

  <!-- IF IS A SELECTOR INSTEAD -->
  <b-select
    v-else
    v-model="selectorItem"
    @input="handleClick"
    placeholder="Select a Template Type"
  >
    <optgroup v-for="(category, i) in categories" :key="'category_'+i" :label="category.title">
      <option v-for="(item, j) in category.items" :value="item" :key="'category_'+i+'_item_'+j">
        {{ item.desc }}
      </option>
    </optgroup>
  </b-select>

</template>

<script>
import { getDefaultTemplateListItems } from '../../assets/js/defaults';
import BLevelItem from '../global/BulmaLevelItem.vue';

export default {
  name: 'DashboardChartOptionsTemplates',
  components: { BLevelItem },
  props: {
    categories: {
      default: getDefaultTemplateListItems,
      type: Array,
    },
    isSelector: Boolean,
    selectorItem: undefined,
    singles: Boolean,
  },
  methods: {
    handleClick(item) {
      this.$emit('input', item);
      this.$emit('update:selectorItem', item);
    },
  },
};
</script>

<style scoped lang="scss">

.template-list-item:hover {
  background-color: whitesmoke;
}

</style>
