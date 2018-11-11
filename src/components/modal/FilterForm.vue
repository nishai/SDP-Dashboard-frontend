<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" v-if="show">
<!-- http://www.vue-tags-input.com/#/examples/templates -->
    <b-row>
      <!-- create numForms amount of copies of the form side by side-->
      <b-col v-for="i in numForms" :key="groupByDesc + '-' + i">
        <!-- CHART TYPE -->
        <b-form-group
          v-if="ftype === true"
          id="typeGroup"
          label="Chart Type:"
          label-for="Type"
          horizontal>
          <b-form-select
            id="Type"
            :options="chartTypeOptions[i-1]"
            required
            v-model="chosenType[i-1]">
          </b-form-select>
        </b-form-group>

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
              @tags-changed="newTags => tagDicts.years[i-1] = newTags">
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
              @tags-changed="newTags => tagDicts.faculties[i-1] = newTags">
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
              @tags-changed="newTags => tagDicts.schools[i-1] = newTags">
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
              @tags-changed="newTags => tagDicts.courses[i-1] = newTags">
            </vue-tags-input>
          </div>
        </b-form-group>

        <!-- Duplicate Data Checkbox-->
        <b-form-group
          checked=true
          id="DuplicateGroup">
          <b-form-checkbox
            v-model="duplicates[i-1]">
            Don't Duplicate data across fields
          </b-form-checkbox>
        </b-form-group>

      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="primary" type="primary">Filter</b-button>
      </b-col>
      <b-col>
        <b-button @click="onClose" variant="secondary">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
  <h1 v-else> Loading Data For Form, Please Wait... {{loadedPercent}}% Loaded</h1>
</template>

<script>
import { mapGetters } from 'vuex';
import VueTagsInput from '@johmun/vue-tags-input';
import apiQuery from '../../assets/js/api/witsapi';


export default {
  name: 'FilterForm',
  props: [
    'chartTypeOptions', // contains the options for chart types available (pie, bar. etc)
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

    'compare',
  ],

  components: {
    VueTagsInput,
  },

  data: () => ({
    show: false,
    showCounter: 0,
    //    chartTypes: [
    //        { text: 'Select One', value: null },
    //        'bar', 'line', 'pie', 'doughnut', 'radar',
    //    ],
    tagStrs: { // arrays of strings
      years: [],
      faculties: [],
      schools: [],
      courses: [],
    },
    tagDicts: { // arrays of array of dictionaries
      years: [],
      faculties: [],
      schools: [],
      courses: [],
    },
    tagAutocompletes: { // arrays of array of dictionionaries
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
    if (this.$props.compare === true) {
      this.loadYears();
      this.loadFaculties();
      this.loadSchools();
      this.loadCourses();
    }
    for (let i = 0; i < this.$props.numForms; i += 1) {
      if (i !== 0) {
        this.$props.chartTypeOptions.push([this.$props.selectedChartType]);
      }
      switch (this.$props.selectedChartType) {
        case 'pie':
          this.$props.chartTypeOptions[i].push('doughnut');
          break;
        case 'doughnut':
          this.$props.chartTypeOptions[i].push('pie');
          break;
        case 'line':
          this.$props.chartTypeOptions[i].push('bar');
          break;
        case 'bar':
          this.$props.chartTypeOptions[i].push('line');
          break;
      }
    }
    // initialize data.form to have the correct amount of v-models
    const formKeys = Object.keys(this.tagDicts);
    if (this.$props.selectedDuplicate === false) {
      this.duplicates.push(false);
    } else {
      this.duplicates.push(true);
    }

    for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
        this.tagStrs[formKeys[i]].push('');
        this.tagAutocompletes[formKeys[i]].push([]);
        if (j === 0) {
          if (this.$props.selectedChartType !== undefined) {
            this.chosenType.push(this.$props.selectedChartType);
          } else {
            this.chosenType.push('');
          }

          let selected = [];
          switch (formKeys[i]) {
            case 'years':
              if (this.$props.selectedYear !== undefined) {
                selected = this.$props.selectedYear;
              } else {
                selected = [];
              }
              break;
            case 'faculties':
              if (this.$props.selectedFaculty !== undefined) {
                selected = this.$props.selectedFaculty;
              } else {
                selected = [];
              }
              break;
            case 'schools':
              if (this.$props.selectedSchool !== undefined) {
                selected = this.$props.selectedSchool;
              } else {
                selected = [];
              }
              break;
            case 'courses':
              if (this.$props.selectedCourse !== undefined) {
                selected = this.$props.selectedCourse;
              } else {
                selected = [];
              }
              break;
            default:
              selected = [];
          }
          if (typeof selected === 'string') {
            selected = [selected];
          }
          const dicts = [];
          for (let k = 0; k < selected.length; k += 1) {
            dicts.push({ text: selected[k] });
          }
          this.tagDicts[formKeys[i]].push(dicts);
        } else {
          this.tagDicts[formKeys[i]].push([]);
          this.chosenType.push('');
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'numCharts',
    ]),
    loadedPercent() {
      return (100.0 * this.showCounter) / Object.keys(this.tagDicts).length;
    },
  },
  methods: {
    filteredItemsYears(index) {
      return this.tagAutocompletes.years[index].filter(
        (i) => new RegExp(this.tagStrs.years[index], 'i').test(i.text),
      ).slice(0, 10);
    },
    filteredItemsFaculties(index) {
      return this.tagAutocompletes.faculties[index].filter(
        (i) => new RegExp(this.tagStrs.faculties[index], 'i').test(i.text),
      ).slice(0, 10);
    },
    filteredItemsSchools(index) {
      return this.tagAutocompletes.schools[index].filter(
        (i) => new RegExp(this.tagStrs.schools[index], 'i').test(i.text),
      ).slice(0, 10);
    },
    filteredItemsCourses(index) {
      return this.tagAutocompletes.courses[index].filter(
        (i) => new RegExp(this.tagStrs.courses[index], 'i').test(i.text),
      ).slice(0, 10);
    },

    makeShow() {
      this.showCounter += 1;
      if (this.showCounter === Object.keys(this.tagDicts).length) {
        console.log('Finished loading data for form');
        this.show = true;
      }
    },
    loadData() {
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
          for (let i = 0; i < this.tagAutocompletes.years.length; i += 1) {
            this.tagAutocompletes.years[i] =
              Object.values(data.results).map(({ 'calendar_instance_year': a }) => ({ text: a }));
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
          for (let i = 0; i < this.tagAutocompletes.faculties.length; i += 1) {
            this.tagAutocompletes.faculties[i] =
              Object.values(data.results).map(({ 'faculty_title': a }) => ({ text: a }));
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
          for (let i = 0; i < this.tagAutocompletes.schools.length; i += 1) {
            this.tagAutocompletes.schools[i] =
              Object.values(data.results).map(({ 'school_title': a }) => ({ text: a }));
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
          for (let i = 0; i < this.tagAutocompletes.courses.length; i += 1) {
            this.tagAutocompletes.courses[i] =
              Object.values(data.results).map(({ 'course_code': a }) => ({ text: a }));
          }
          this.makeShow();
        });
    },
    onSubmit() {
      let name;
      if (apiQuery.nameToColumn[this.$props.groupByDesc] !== undefined) {
        name = apiQuery.nameToColumn[this.$props.groupByDesc];
      } else {
        name = this.$props.groupByDesc;
      }

      // Convert FilterTags into arrays to pass into the query:

      // convert years tags to an array
      const submitYears = [];
      const submitFaculties = [];
      const submitSchools = [];
      const submitCourses = [];
      for (let i = 0; i < this.$props.numForms; i += 1) {
        submitYears.push([]);
        submitFaculties.push([]);
        submitSchools.push([]);
        submitCourses.push([]);
        for (const key in this.tagDicts.years[i]) {
          submitYears[i].push(this.tagDicts.years[i][key].text);
        }
        // convert faculty tags to an array
        for (const key in this.tagDicts.faculties[i]) {
          submitFaculties[i].push(this.tagDicts.faculties[i][key].text);
        }

        // convert schools tags to an array
        for (const key in this.tagDicts.schools[i]) {
          submitSchools[i].push(this.tagDicts.schools[i][key].text);
        }

        // convert courses tags to an array
        for (const key in this.tagDicts.courses[i]) {
          submitCourses[i].push(this.tagDicts.courses[i][key].text);
        }
      }
      // end conversions

      const chartArr = [];
      for (let i = 0; i < this.$props.numForms; i += 1) {
        chartArr.push({
          chartType: this.chosenType[i],
          groupBy: name,
          years: submitYears[i],
          faculties: submitFaculties[i],
          schools: submitSchools[i],
          courses: submitCourses[i],
          duplicate: (this.duplicates[i] === true),
        });
      }

      // add chart to store
      this.$store.dispatch({
        type: 'createDashboardChart',
        charts: chartArr,
        layout: {
          x: 0,
          y: 0,
          w: 27,
          h: 1,
          i: this.numCharts + 1,
        },
      });

      // close form
      try {
        this.$parent.$parent.deleteChart();
      } catch (err) {
        console.log('no delete chart function when calling from template screen');
      }
      this.$parent.$parent.hideModal();
      // go to url
      this.$router.push({
        path: '/dashboard',
      });
    },
    onClose(event) {
      this.$parent.$parent.hideModal();
    },
  },
};


</script>
