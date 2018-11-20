<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>

    <div id="check" class="d-none">
      <input type="checkbox" value="always_show" checked> Always show this page on login<br>
    </div>

    <div v-for="(category, i) in categories" :key="'category_'+i">
      <div class="subheading">
        <h3> {{ category.title }}</h3>
      </div>

      <div class="grid-container">
        <div v-for="(item, j) in category.items" class="grid-item" :key="'category_'+i+'item_'+j">
          <ChartExampleLink
            :desc="item.desc"
            :chartType="item.type"
            :src="item.src"
            :filter-options="item.filterOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultTemplateCategories } from '../assets/js/defaults';
import Heading from '../components/Heading.vue';
import ChartExampleLink from '../components/ChartExampleLink.vue';


export default {
  name: 'ChartTemplates',
  components: {
    Heading,
    ChartExampleLink,
  },
  data() {
    return {
      categories: getDefaultTemplateCategories(),
    };
  },
};

/* eslint-disable global-require */
</script>

<style>
.subheading {
  padding-left: 35px;
  color: #536c85;
  /* font-size: 25px; */
}

#check {
  top: 10px;
  right: 10px;
  position: absolute;
  color: #2c3e50;
  font-size: 16px;
}

.grid-container {
  grid-template-columns: 150px 150px 150px 150px 150px ;
  padding-left: 30px;
  /* alignment */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.grid-item {
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
</style>
