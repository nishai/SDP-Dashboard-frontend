<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" @reset="onClose" v-if="show">
    <b-row>
      <!-- create numForms amount of copies of the form side by side-->
      <b-col v-for="i in numForms" :key="i">
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
import axios from 'axios';

export default {
  name: 'FilterForm',
  data: () => ({
    form: {
      type: [],
      year: [],
      course: [],
      faculty: [],
      school: [],
    },
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

  // https://stackoverflow.com/questions/52724773/javascript-get-data-from-promise-axios
  methods: {
    // Translate graph description text to model collumn names
    textToName(name) {
      switch (name) {
        case 'Race':
          return 'Race';
        case 'Gender':
          return 'Gender';
        case 'Nationality':
          return 'nationality_short_name';
        case 'Home Language':
          return 'home_language_description';
        default:
          return null;
      }
    },

    // analyse data and make chart when submitting form
    onSubmit(evt) {
      const name = this.textToName(this.$props.text);
      let nameList;
      axios.post(
        'http://dashboard-dev.ms.wits.ac.za:4000/course_stats/query',
        {
          chain: [
            {
              group: {
                by: [
                  name,
                ],
              },
            },
          ],
        },
      )
        .then((response) => response.data)
        .then((data) => {
          nameList = Object.values(data.results);
        });

      for (let i = 0; i < this.$props.numForms; i += 1) {
        axios.post(
          'http://dashboard-dev.ms.wits.ac.za:4000/course_stats/query',
          {
            chain: [
              {
                filter: [
                  {
                    field: 'calendar_instance_year',
                    operator: 'exact',
                    value: this.form.year[i],
                  },
                  {
                    field: 'faculty',
                    operator: 'exact',
                    value: this.form.faculty[i],
                  },
                  {
                    field: 'school',
                    operator: 'exact',
                    value: this.form.school[i],
                  },
                  {
                    field: 'course_code',
                    operator: 'exact',
                    value: this.form.course[i],
                  },
                ],
                group: {
                  by: [
                    name,
                  ],
                  yield: [
                    name: "count",
                    via: "count",
                    from: nameList,
                  ],
                },
              },
            ],
          },
        )
          .then((response) => response.data)
          .then((data) => {
            this.years = Object.values(data.results);
          });
      }
      this.$router.push({ path: '/examples', query: { templateType: this.url } });
    },
    // close popup when pressing popup button
    onClose(evt) {
      this.$parent.$parent.hideModal();
    },

    // loads available years from the database into this.years
    loadYears() {
      axios.post(
        'http://dashboard-dev.ms.wits.ac.za:4000/course_stats/query',
        {
          chain: [
            {
              group: {
                by: [
                  'calendar_instance_year',
                ],
              },
            },
          ],
        },
      )
        .then((response) => response.data)
        .then((data) => {
          this.years = Object.values(data.results);
        });
    },

    // loads available faculties from the database into this.faculties
    loadFaculties() {
      axios.post(
        'http://dashboard-dev.ms.wits.ac.za:4000/school_info/query',
        {
          chain: [
            {
              group: {
                by: [
                  'faculty',
                ],
              },
            },
          ],
        },
      )
        .then((response) => response.data)
        .then((data) => {
          this.faculties = Object.values(data.results);
        });
    },

    // filters schools in database that are in this.faculty and puts it in this.schools
    loadSchools(index) {
      // gets called when form.faculty changes, so it gets called unnecessarily with created()
      if (this.form.faculty[index].length !== 0) {
        axios.post(
          'http://dashboard-dev.ms.wits.ac.za:4000/school_info/query',
          {
            chain: [
              {
                filter: [
                  {
                    field: 'faculty',
                    operator: 'exact',
                    value: this.form.faculty[index],
                  },
                ],
                group: {
                  by: [
                    'school',
                  ],
                },
              },
            ],
          },
        )
          .then((response) => response.data)
          .then((data) => {
            this.schools[index] = Object.values(data.results);
            this.$forceUpdate();
          });
      }
    },

    // filters courses in database that are in this.schools and puts it in this.courses
    loadCourses(index) {
      if (this.form.school[index].length !== 0) {
        axios.post(
          'http://dashboard-dev.ms.wits.ac.za:4000/course_info/query',
          {
            chain: [
              {
                filter: [
                  {
                    field: 'school',
                    operator: 'exact',
                    value: this.form.school[index],
                  },
                ],
                group: {
                  by: [
                    'course_name',
                  ],
                },
              },
            ],
          },
        )
          .then((response) => response.data)
          .then((data) => {
            this.courses[index] = Object.values(data.results);
            this.$forceUpdate();
          });
      }
    },
  },
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
  props: [
    'url', // contains the type of graph to be used (pie, bar. etc)
    'text', // contains the type of graph to be used (race, bell curve, etc)
    'fyear', // boolean for whether form has year field
    'ffaculty', // boolean for whether form has faculty field
    'fschool', // boolean for whether form has school field
    'fcourse', // boolean for whether form has course field
    'ftype', // boolean for whether form has type field
    'numForms', // int for amount of side by side copies of the form for superimposing graphs
  ],
};
</script>

<style>
</style>

