<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" v-if="show">
<!-- http://www.vue-tags-input.com/#/examples/templates -->
    <b-row>
      <!-- create numForms amount of copies of the form side by side-->
      <b-col v-for="i in numForms" :key="groupByDesc + '-' + i">



<!-- YEARS -->
        <b-form-group
          v-if="fyear === true"
          id="YearGroup"
          label="Year:"
          label-for="Year"
          horizontal>
<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="tagStrs.years[i]"
              :tags="tagDicts.years[i]"
              :autocomplete-items="tagAutocompletes.years[i]"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => tagDicts.years[i] = newTags"> 
            </vue-tags-input>
          </div>
        </b-form-group>




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
		show = false,
		chartTypes = [
				{ text: 'Select One', value: null },
				'bar', 'line', 'pie', 'doughnut', 'radar',
		],
		tagStrs = {   //arrays of strings
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagDicts = {	// arrays of array of dictionaries
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagAutocompletes = {	//arrays of array of dictionionaries
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		duplicate = [],
		chosenType = [],
	}),

  /**
   * This is run when the component is first created to initialise it.
   */
  mounted() {
		show = true;
		// initialize data.form to have the correct amount of v-models
    const formKeys = Object.keys(this.tagDicts);
		if (this.$props.selectedDuplicate === false){
			this.duplicates.push(false);
		} else {
			this.duplicates.push(true);
		}
    if(this.$props.selectedChartType !== undefined){
	    this.chosenType = this.$props.selectedChartType;
    } else {
			this.chosenType = this.$props.chartType
		}

		for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
				this.tagStrs[formKeys[i]].push('');
				this.tagAutocompletes[formKeys[i]].push([]);
				if (j === 0){
					let selected = [];
          switch(formKeys[i]){
						case 'year':
							if(this.$props.selectedYear !== undefined){
								selected = this.$props.selectedYear;
							} else {
								selected = [];
							}
							break;
						case 'faculty':
							if(this.$props.selectedFaculty !== undefined){
								selected = this.$props.selectedFaculty;
							} else {
								selected = [];
							}
							break;
						case 'school':
							if(this.$props.selectedSchool !== undefined){
								selected = this.$props.selectedSchool;
							} else {
								selected = [];
							}
							break;
						case 'course':
							if(this.$props.selectedCourse !== undefined){
								selected = this.$props.selectedCourse;
							} else {
								selected = [];
							}
							break;
						default:
							selected = []
					}
				  if(typeof selected === "string"){
            selected = [selected];
          }

					dicts = []
					for (let k = 0; i < selected.length; k += 1){
						dicts.push({text: selected[k]});
					}
					this.tagDicts[formKeys[i]].push(dicts)


				} else {
					this.tagDicts[formKeys[i]].push([]);
				}
			}
		}
		this.loadYears();
		this.loadFaculties();
		this.loadSchools();
		this.loadCoureses();
	},
  computed: {
    ...mapGetters([
      'numCharts',
    ]),           


