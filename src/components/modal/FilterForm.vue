<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->


<!-- http://www.vue-tags-input.com/#/examples/templates -->

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
        <b-form-group
          v-if="fyear === true"
          id="YearGroup"
          label="Year:"
          label-for="Year"
          horizontal>
<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.year[i-1]"
              :tags="yearTags"
              :autocomplete-items="filteredItems1"
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => yearTags = newTags"> 
            </vue-tags-input>
          </div>
        </b-form-group>
        <!-- FACULTIES -->
        <b-form-group
          v-if="ffaculty === true"
          id="FacultyGroup"
          label="Faculty:"
          label-for="Faculty"
          description="You can choose multiple faculties"
          horizontal>
<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.faculty[i-1]"
              :tags="facultyTags"
              :autocomplete-items="derivedFaculties"
              :add-only-from-autocomplete="true"  
              @tags-changed="loadSchools($event, i-1)" >
            </vue-tags-input>
            </div>
        </b-form-group>

        <!-- SCHOOLS -->
        <b-form-group
          id="SchoolGroup"
          label="School:"
          label-for="School"
          description="You can choose multiple schools"
          horizontal>
<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.school[i-1]"
              :tags="schoolTags"
              :autocomplete-items="derivedSchools[i-1]"
              :add-only-from-autocomplete="true"    
              @tags-changed="loadCourses($event, i-1)">
            </vue-tags-input>
            </div>
        </b-form-group>
        <!-- COURSES -->
        <b-form-group
          id="CourseGroup"
          label="Course:"
          label-for="Course"
          description="You can choose multiple courses"
          horizontal>
<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.course[i-1]"
              :tags="courseTags"
              :autocomplete-items="derivedCourses[i-1]"
              @tags-changed="newTags => courseTags = newTags">
            </vue-tags-input>
            </div>
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

       // filter tags - these store the currently selected tags
      yearTags: [],    
      facultyTags:[],
      schoolTags:[],
      courseTags:[],

// Example of what autocompleteItems should look like
     // autocompleteItems: [{
     //      text: 'Spain',
     //    }, {
     //      text: 'France',
     //    }, {
     //      text: 'USA',
     //    }, {
     //      text: 'Germany',
     //    }, {
     //      text: 'China',
     //    }], 


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
        let list = this.years
          list = list.map(x => {
          return({text: x});
          });
            this.years=list; 

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


    // *** this needs fixing filtertags - Not working currently
    filteredItems1() {
      return this.years.filter((i) => new RegExp(this.form.year[i-1], 'i').test(i.text));
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
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          // can probably clean this up and reduce redundency
         
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
    loadSchools(facultyTaglits,index) {
      // gets called when form.faculty changes, so it gets called unnecessarily with created()
      console.log(facultyTaglits)

      if (facultyTaglits.length !== 0) {
        console.log(this.form.faculty)
              console.log("Hellllllllllllllllllo")

        // the query will get schools for the following faculties:
        var faculties =[];
        this.facultyTags=[];//re-init the selected tags,(user changed mind)
        for(var f =0;f<facultyTaglits.length;f++){
          faculties.push(facultyTaglits[f].text); //for the getFaculties query. shist but yea...
          this.facultyTags.push(facultyTaglits[f]);//update the taglist
        }
         
        apiQuery.getFacultySchools(faculties)
          .then((response) => response.data)
          .then((data) => {
            this.schools[index] = Object.values(data.results);
            console.log(data.results)
            this.$forceUpdate();
          });
      }
    },

    /**
     * filters courses in database that are in this.schools and puts it in this.courses
     * @param index
     */
    loadCourses(schoolTaglits,index) {

      if (schoolTaglits.length !== 0) {
        // the query will get courses for the following schools:
        var schoolz =[];
        this.schoolTags=[];//re-init the selected tags, (user changed mind)
        for(var f =0;f<schoolTaglits.length;f++){
          schoolz.push(schoolTaglits[f].text);
          this.schoolTags.push(schoolTaglits[f]);//update the taglist
        }

        // this.form.school[index]=schoolz; //caused a bug where text would appear next to tag
        apiQuery.getSchoolsCourses(schoolz)
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

// Convert FilterTags into arrays to pass into the query:

// convert years tags to an array
      var submitYears = new Array();
      for (var key in this.yearTags) {
        submitYears.push(this.yearTags[key].text);
      }
      this.form.year[0]=submitYears

// convert faculty tags to an array
      var submitFacs = new Array();
      for (var key in this.facultyTags) {
        submitFacs.push(this.facultyTags[key].text);
      }
      this.form.faculty[0]=submitFacs;

// convert schools tags to an array
      var submitSchools = new Array();
      for (var key in this.schoolTags) {
        submitSchools.push(this.schoolTags[key].text);
      }
      this.form.school[0]=submitSchools;

// convert courses tags to an array
      var submitCourses = new Array();
      for (var key in this.courseTags) {
        submitCourses.push(this.courseTags[key].text);
      }
      this.form.course[0]=submitCourses;

//end conversions: Nathan is now Jewish

//begin query :
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
