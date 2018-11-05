<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit">
<!-- http://www.vue-tags-input.com/#/examples/templates -->
    <b-row>
      <!-- create numForms amount of copies of the form side by side-->
      <b-col v-for="i in numForms" :key="groupByDesc + '-' + i">
			</b-col>
		</b-row>
	</b-form>
</template>

<script>
import apiQuery from '../../api/api_query';
import { mapGetters } from 'vuex';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'FilterForm',

  props: [
    'chartType', // contains the type of graph to be used (pie, bar. etc)
    'groupByDesc', // contains the type of graph to be used (race, bell curve, etc)
    'fyear', // boolean for whether form has year field
    'ffaculty', // boolean for whether form has faculty field
    'fschool', // boolean for whether form has school field
    'fcourse', // boolean for whether form has course field
    'ftype', // boolean for whether form has type field
    'numForms', // int for amount of side by side copies of the form for superimposing graphs

    // preselected values to be hilighted on form start
    'selectedChartType',
    'selectedGroupByDesc',
    'selectedYear',
    'selectedFaculty',
    'selectedSchool',
    'selectedCourse',
    'selectedType',
    'selectedDuplicate',
  ],

	components: {
    VueTagsInput,
  },

  data: () => ({
		chartTypes = [
				{ text: 'Select One', value: null },
				'bar', 'line', 'pie', 'doughnut', 'radar',
		],
		tagStrs = {
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagDicts = {
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagAutocompletes = {
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		duplicate: [],
	}),

  /**
   * This is run when the component is first created to initialise it.
   */
  created() {
		// initialize data.form to have the correct amount of v-models
    const formKeys = Object.keys(this.tagDicts);
		if (this.$props.selectedDuplicate === false){
			duplicates.push(false);
		} else {
			duplicates.push(true);
		}
		for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
				if (if j === 0){
					
				} else {
					tagStrs[formKeys[i]].push('');
					tagDicts[formKeys[i]].push([]);
					tagAutocompletes[formKeys[i]].push([]);
				}
			}
		}
	},
