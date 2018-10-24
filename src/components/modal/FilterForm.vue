<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit"  v-if="show">
    <b-row>
      <!-- create numForms amount of copies of the form side by side-->
      <b-col v-for="i in numForms" :key="groupByDesc + '-' + i">
        <!-- CHART TYPE -->
        <b-form-group
          v-if="chartType === true"
          id="typeGroup"
          label="Chart Type:"
          label-for="Type"
          horizontal>
          <b-form-select
            id="Type"
            :options="types"
            required
            v-model="form.type[i-1]">
          </b-form-select>
        </b-form-group>
        <!-- YEARS -->
        <b-form-group
          v-if="fyear === true"
          id="YearGroup"
          label="Year:"
          label-for="Year"
          horizontal>
            <b-form-select
              multiple
              id="Year"
              :options="derivedYears"
              required
              v-model="form.year[i-1]">
          </b-form-select>
        </b-form-group>
        <!-- FACULTIES -->
        <b-form-group
          v-if="ffaculty === true"
          id="FacultyGroup"
          label="Faculty:"
          label-for="Faculty"
          description="You can choose multiple faculties using Ctrl or Shift key"
          horizontal>
          <b-form-select
            multiple
            id="Faculty"
            :options="derivedFaculties"
            required
            v-model="form.faculty[i-1]"
            @input="loadSchools(i-1)">
          </b-form-select>
        </b-form-group>
        <!-- SCHOOLS -->
        <b-form-group
          v-if="fschool === true && form.faculty[i-1][0] != null"
          id="SchoolGroup"
          label="School:"
          label-for="School"
          description="You can choose multiple schools using Ctrl or Shift key"
          horizontal>
          <b-form-select
            multiple
            id="School"
            :options="derivedSchools[i-1]"
            required
            v-model="form.school[i-1]"
            @input="loadCourses(i-1)">
          </b-form-select>
        </b-form-group>
        <!-- COURSES -->
        <b-form-group
          v-if="fcourse === true && form.school[i-1][0] != null"
          id="CourseGroup"
          label="Course:"
          label-for="Course"
          description="You can choose multiple courses using Ctrl or Shift key"
          horizontal>
          <b-form-select
            multiple
            id="Course"
            :options="derivedCourses[i-1]"
            required
            v-model="form.course[i-1]">
          </b-form-select>
        </b-form-group>
        <!-- Duplicate Data Checkbox-->
        <b-form-group
          checked=true
          id="DuplicateGroup">
          <b-form-checkbox
            v-model="form.duplicate[i-1]">
            Don't Duplicate data across fields
          </b-form-checkbox>
        </b-form-group>

      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button type="primary">Filter</b-button>
        <b-button @click="onClose" variant="secondary">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import apiQuery from '../../api/api_query';

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

  data: () => ({
    form: {
      type: [],
      year: [],
      course: [],
      faculty: [],
      school: [],
      duplicate: [],
    },
    types: [
      { text: 'Select One', value: null },
      'bar', 'line', 'pie', 'doughnut', 'radar',
    ],
    years: [],
    faculties: [],
    schools: [],
    courses: [],
    show: true,
  }),

  /**
   * This is run when the component is first created to initialise it.
   */
  created() {
    // initialize data.form to have the correct amount of v-models
    const formKeys = Object.keys(this.form);
    let sflag = false;
    let cflag = false;

    for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
        if (formKeys[i] === 'duplicate') {
          if(j === 0 && this.$props.selectedDuplicate === false){
            this.form[formKeys[i]].push(false);
          } else {
            this.form[formKeys[i]].push(true);
          }
        } else {
          if(j === 0){
            let selected = [null];
            switch(formKeys[i]){
              case 'type':
                if(this.$props.selectedChartType !== undefined){
                  selected = this.$props.selectedChartType;
                } else {
                  selected = [null];
                }
                break;
              case 'year':
                if(this.$props.selectedYear !== undefined){
                  selected = this.$props.selectedYear;
                } else {
                  selected = [null];
                }
                break;
              case 'faculty':
                if(this.$props.selectedFaculty !== undefined){
                  selected = this.$props.selectedFaculty;
                } else {
                  selected = [null];
                }
                break;
              case 'school':
                if(this.$props.selectedSchool !== undefined){
                  selected = this.$props.selectedSchool;
                  sflag = true;
                } else {
                  selected = [null];
                }
                break;
              case 'course':
                if(this.$props.selectedCourse !== undefined){
                  selected = this.$props.selectedCourse;
                  cflag = true;
                } else {
                  selected = [null];
                }
                break;
              default:
                selected = [null]
            }
            if(typeof selected === "string" && formKeys[i] !== 'type'){
              selected = [selected];
            }
            this.form[formKeys[i]].push(selected);
          } else {
            this.form[formKeys[i]].push([null]);
          }
        }
      }
    }
    if(sflag){
      this.loadSchools(0);
    }
    if(cflag){
      this.loadCourses(0);
    }

    // initialize data arrays to fit the amount of tables being displayed
    for (let j = 0; j < this.$props.numForms; j += 1) {
      this.schools.push([]);
      this.courses.push([]);
    }

    // Load years and faculties for basic form
    this.loadYears();
    this.loadFaculties();
  },

  /**
   * Updated whenever their dependencies are changed.
   */
  computed: {
    derivedYears() {
      return this.years ? this.years : ['loading data from database...'];
    },
    derivedFaculties() {
      return this.faculties ? this.faculties : ['loading data from database...'];
    },
    derivedSchools() {
      return this.schools ? this.schools : ['loading data from database...'];
    },
    derivedCourses() {
      return this.courses ? this.courses : ['loading data from database...'];
    },
  },

  // https://stackoverflow.com/questions/52724773/javascript-get-data-from-promise-axios
  methods: {
    /**
     * loads available years from the database into this.years
     */
    loadYears() {
      apiQuery.getYears()
        .then((response) => response.data)
        .then((data) => {
          this.years = Object.values(data.results);
        });
    },

    /**
     * loads available faculties from the database into this.faculties
     */
    loadFaculties() {
      apiQuery.getFaculties()
        .then((response) => response.data)
        .then((data) => {
          this.faculties = Object.values(data.results);
        });
    },

    /**
     * filters schools in database that are in this.faculty and puts it in this.schools
     * @param index
     */
    loadSchools(index) {
      // gets called when form.faculty changes, so it gets called unnecessarily with created()
      if (this.form.faculty[index].length !== 0) {
        apiQuery.getFacultySchools(this.form.faculty[index])
          .then((response) => response.data)
          .then((data) => {
            this.schools[index] = Object.values(data.results);
            this.$forceUpdate();
          });
      }
    },

    /**
     * filters courses in database that are in this.schools and puts it in this.courses
     * @param index
     */
    loadCourses(index) {
      if (this.form.school[index].length !== 0) {
        apiQuery.getSchoolsCourses(this.form.school[index])
          .then((response) => response.data)
          .then((data) => {
            this.courses[index] = Object.values(data.results);
            this.$forceUpdate();
          });
      }
    },

    /**
     * analyse data and make chart when submitting form
     */
    onSubmit(event) {
      let name;
      if(apiQuery.nameToColumn[this.$props.groupByDesc] !== undefined){
        name = apiQuery.nameToColumn[this.$props.groupByDesc];
      } else{
        name = this.$props.groupByDesc;
      }
      // if (this.form.year.length > 1) {
      //   console.log('Only 1 form is supported at the moment, this will be fixed in future');
      // }

      let chartArr = []
      for (let i = 0; i < this.$props.numForms; i += 1) {
        chartArr.push({
          chartType: this.form.type[i],
          groupBy: name,
          years: this.form.year[i],
          faculties: this.form.faculty[i],
          schools: this.form.school[i],
          courses: this.form.course[i],
          duplicate: (this.form.duplicate[i] === true),
        })
      }
      // add chart to store
      // TODO: Multiple sub-charts
      this.$store.dispatch({
        type: 'createDashboardChart',
        charts: chartArr,
      });
      // go to url
      this.$parent.$parent.hideModal();
      this.$router.push({
        path: '/dashboard',
      });
    },

    /**
     * close popup when pressing popup button
     */
    onClose(event) {
      this.$parent.$parent.hideModal();
    },
  }, /* >>> END METHODS <<< */
};
</script>

<style>
</style>
