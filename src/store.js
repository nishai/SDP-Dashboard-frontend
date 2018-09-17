import Vue from 'vue';
import Vuex from 'vuex';

/* Add Vuex Plugin to Vue */

Vue.use(Vuex);

/* Create Example Data */
/* TODO: replace with backend query */

const testReportAQuery = {
  chain: [
    {
      filters: [
        {
          field: 'encrypted_student_no',
          operator: 'startswith',
          value: '02925A2B8FC1F2FC7132D155EBB4FFB7',
          exclude: true,
        },
      ],
      group: {
        by: [
          'encrypted_student_no',
          'calendar_instance_year',
          'year_of_study',
        ],
        yield: [
          {
            name: 'ave_marks',
            via: 'ave',
            from: 'average_marks',
          },
          {
            name: 'final_mark_ave',
            via: 'ave',
            from: 'final_mark',
          },
        ],
      },
    },
  ],
  limit: {
    type: 'page',
    num: 1000,
  },
};

const testReportA = {
  name: 'Test Report',
  charts: [
    {
      name: 'Test Bar Graph',
      type: 'bar',
      query: testReportAQuery,
    },
  ],
};

const testReportB = {
  name: 'Test Report',
  charts: [
    {
      name: 'Test Pie Chart',
      type: 'pie',
      query: testReportAQuery,
    },
  ],
};

/* Initialise the Vuex Store */

const store = new Vuex.Store({
  state: {
    reports: [
      testReportA,
      testReportB,
    ],
    count: 0,
  },
});

/* export the router */

export default store;
