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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import ChartExampleLink from '../components/ChartExampleLink.vue';

function getTemplateCategories() {
  return [
    {
      title: 'Demographics',
      items: [
        { desc: 'Race',                                 type: 'doughnut',  src: '/img/charts/doughnut.png'   },
        { desc: 'Gender',                               type: 'doughnut',  src: '/img/charts/pie2.png'       },
        { desc: 'Nationality',                          type: 'doughnut',  src: '/img/charts/pie1.png'       },
        { desc: 'Home Language',                        type: 'doughnut',  src: '/img/charts/pie3.png'       },
        { desc: 'Demographics vs Marks',                type: 'bar',       src: '/img/charts/line2.png'      },
      ],
    },
    {
      title: 'Marks',
      items: [
        { desc: 'Pass rates by year',                   type: 'bar',       src: '/img/charts/bar1.png'       },
        { desc: 'Pass rates by faculty/course',         type: 'bar',       src: '/img/charts/bar3.png'       },
        { desc: 'Bell curve',                           type: 'line',      src: '/img/charts/bell-curve.png' },
        { desc: 'Progress Outcome by faculty/course',   type: 'bar',       src: '/img/charts/bar2.png'       },
      ],
    },
    {
      title: 'Class Sizes',
      items: [
        { desc: 'Class size vs pass rate',              type: 'line',      src: '/img/charts/line1.png'      },
        { desc: 'Average class size by faculty/course', type: 'bar',       src: '/img/charts/bar1.png'       }, // click='two'
      ],
    },
  ];
}

export default {
  name: 'ChartTemplates',
  components: {
    Heading,
    ChartExampleLink,
  },
  data() {
    return {
      categories: getTemplateCategories(),
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
