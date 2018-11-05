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
              v-model="tagStrs.years[i-1]"
              :tags="tagDicts.years[i-1]"
              :autocomplete-items="filteredItemsYears(i-1)"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => tagDicts.years[0] = newTags"> 
            </vue-tags-input>
          </div>
        </b-form-group>
				<!-- FACULTY -->
        <b-form-group
          v-if="ffaculty === true"
          id="FacultyGroup"
          label="Faculty:"
          label-for="Faculty"
          horizontal>
					<!-- Filter Tags -->
          <div>
            <vue-tags-input
              v-model="tagStrs.faculties[i-1]"
              :tags="tagDicts.faculties[i-1]"
              :autocomplete-items="filteredItemsFaculties(i-1)"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => tagDicts.faculties[0] = newTags"> 
            </vue-tags-input>
          </div>
        </b-form-group>
				<!-- SCHOOL -->
        <b-form-group
          v-if="fschool === true"
          id="SchoolGroup"
          label="School:"
          label-for="School"
          horizontal>
					<!-- Filter Tags -->
          <div>
            <vue-tags-input
              v-model="tagStrs.schools[i-1]"
              :tags="tagDicts.schools[i-1]"
              :autocomplete-items="filteredItemsSchools(i-1)"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => tagDicts.schools[0] = newTags"> 
            </vue-tags-input>
          </div>
        </b-form-group>
				<!-- COURSES -->
        <b-form-group
          v-if="fcourse === true"
          id="CourseGroup"
          label="Course:"
          label-for="Course"
          horizontal>
					<!-- Filter Tags -->
          <div>
            <vue-tags-input
              v-model="tagStrs.courses[i-1]"
              :tags="tagDicts.courses[i-1]"
              :autocomplete-items="filteredItemsCourses(i-1)"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => tagDicts.courses[0] = newTags"> 
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
		show: false,
		showCounter: 0,
		chartTypes: [
				{ text: 'Select One', value: null },
				'bar', 'line', 'pie', 'doughnut', 'radar',
		],
		tagStrs: {   //arrays of strings
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagDicts: {	// arrays of array of dictionaries
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		tagAutocompletes: {	//arrays of array of dictionionaries
			years: [],
			faculties: [],
			schools: [],
			courses: [],
		},
		duplicates: [],
		chosenType: [],
	}),

  /**
   * This is run when the component is first created to initialise it.
   */
  created() {
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

					let dicts = []
					for (let k = 0; i < selected.length; k += 1){
						dicts.push({text: selected[k]});
					}
					this.tagDicts[formKeys[i]].push(dicts)


				} else {
					this.tagDicts[formKeys[i]].push([]);
				}
			}
		}
	},
  computed: {
    ...mapGetters([
      'numCharts',
    ]),     

  },
	methods: {
    filteredItemsYears(index) {
      return this.tagAutocompletes.years[0].filter((i) => new RegExp(this.tagStrs.years[0], 'i').test(i.text));
    },
    filteredItemsFaculties(index) {
      return this.tagAutocompletes.faculties[0].filter((i) => new RegExp(this.tagStrs.faculties[0], 'i').test(i.text));
    },
    filteredItemsSchools(index) {
      return this.tagAutocompletes.schools[0].filter((i) => new RegExp(this.tagStrs.schools[0], 'i').test(i.text));
    },
    filteredItemsCourses(index) {
      return this.tagAutocompletes.courses[0].filter((i) => new RegExp(this.tagStrs.courses[0], 'i').test(i.text)).slice(0,10);
    },

		makeShow() {
			this.showCounter += 1;
			if (this.showCounter === 4){
				console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
				this.show = true;
			}
		},
		loadData(){
			this.loadYears();
			this.loadFaculties();
			this.loadSchools();
			this.loadCourses();
		},
		loadYears() {
      apiQuery.getYears()
        .then((response) => response.data)
        .then((data) => {
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          // can probably clean this up and reduce redundency
					for (let i = 0; i < this.tagAutocompletes.years.length; i += 1){
          	this.tagAutocompletes.years[i] = 
							Object.values(data.results).map(a => {return { text: a};  });      
					}
					this.makeShow();
        });
    },
		loadFaculties() {
      apiQuery.getFaculties()
        .then((response) => response.data)
        .then((data) => {
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          // can probably clean this up and reduce redundency
					for (let i = 0; i < this.tagAutocompletes.faculties.length; i += 1){
          	this.tagAutocompletes.faculties[i] = 
							Object.values(data.results).map(a => {return { text: a};  });      
					}
					this.makeShow();
        });
    },
		loadSchools() {
      apiQuery.getSchools()
        .then((response) => response.data)
        .then((data) => {
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          // can probably clean this up and reduce redundency
					for (let i = 0; i < this.tagAutocompletes.schools.length; i += 1){
          	this.tagAutocompletes.schools[i] = 
							Object.values(data.results).map(a => {return { text: a};  });      
					}
					this.makeShow();
        });
    },
		loadCourses() {
      apiQuery.getCourses()
        .then((response) => response.data)
        .then((data) => {
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          // can probably clean this up and reduce redundency
					for (let i = 0; i < this.tagAutocompletes.courses.length; i += 1){
          	this.tagAutocompletes.courses[i] = 
							Object.values(data.results).map(a => {return { text: a};  });      
					}
					this.makeShow();
        });
    },
		onSubmit(){
			console.log("ggggggggggggggggggggggggggggggggg")
		},
	},
};    


</script>
