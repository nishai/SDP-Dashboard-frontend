<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->


  <b-form @submit="onSubmit" @reset="onClose" v-if="show">
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
            :options="types"
            required
            v-model="form.type[i-1]">
          </b-form-select>
        </b-form-group>
        <!-- YEARS -->
         <label for="formGroupExampleInput">Example label</label>
         <div>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              @tags-changed="newTags => tags = newTags">
            </vue-tags-input>
          </div>
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

      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <b-button type="submit" variant="primary">Filter</b-button>
        <b-button type="reset" variant="secondary">Close</b-button>
      </b-col>
    </b-row>
  </b-form>


</template>

<script>
import apiQuery from '../../api/api_query';
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
  ],

  components: {
    VueTagsInput,
  },

  data: () => ({
    form: {
      type: [],
      year: [],
      course: [],
      faculty: [],
      school: [],

    },

       // filter tags
      tag: '',
      tags: [],    
// 
     autocompleteItems: [{
          text: 'Spain',
        }, {
          text: 'France',
        }, {
          text: 'USA',
        }, {
          text: 'Germany',
        }, {
          text: 'China',
        }], 


    types: [
      { text: 'Select One', value: null },
      'bar', 'line',
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
    for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
        this.form[formKeys[i]].push([null]);
      }
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


    // filtertags
    filteredItems() {
      return this.autocompleteItems.filter((i) => new RegExp(this.tag, 'i').test(i.text));
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
      const name = apiQuery.nameToColumn[this.$props.groupByDesc];
      if (this.form.year.length > 1) {
        console.log('Only 1 form is supported at the moment, this will be fixed in future');
      }

      // go to url
      this.$router.push({
        path: '/templates/chart',
        query: {
          chartType: this.chartType,
          groupBy: name,
          // TODO: Multiple sub-charts
          years: this.form.year[0],
          faculties: this.form.faculty[0],
          schools: this.form.school[0],
          courses: this.form.course[0],
        },
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
