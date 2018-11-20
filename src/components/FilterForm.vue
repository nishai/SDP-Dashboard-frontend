<!-- TODO: split out singular-form -->

<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" v-if="show">

    <!-- CHART TYPE -->
    <b-row>
      <b-col>
        <b-form-group
          v-if="ftype === true"
          id="typeGroup"
          label="Chart Type:"
          label-for="Type"
          horizontal>
          <b-form-select
            id="Type"
            :options="chartTypeOptions"
            required
            v-model="chosenType"
          >
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- SELECTORS -->
    <b-row>
      <b-col v-for="i in numForms" :key="'form_' + i">

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
              @tags-changed="newTags => tagDicts.years[i-1] = newTags"
            />
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
              @tags-changed="newTags => tagDicts.faculties[i-1] = newTags"
            />
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
              @tags-changed="newTags => tagDicts.schools[i-1] = newTags"
            />
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
              @tags-changed="newTags => tagDicts.courses[i-1] = newTags"
            />
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
        <b-button variant="primary" type="submit"> Filter </b-button> <!-- linked to form above -->
      </b-col>
      <b-col>
        <b-button @click="onClose" variant="secondary"> Close </b-button>
      </b-col>
    </b-row>

  </b-form>
  <h1 v-else> Loading Data For Form, Please Wait... {{loadedPercent}}% Loaded</h1>
</template>

<script>
import { mapGetters } from 'vuex';
import VueTagsInput from '@johmun/vue-tags-input';
import { Course, EnrolledYear, Faculty, School } from '../assets/js/api/wits-models';


export default {
  name: 'FilterForm',

  props: {
    groupByDesc: { // contains the type of graph to be used (race, bell curve, etc)
      type: String,
      default: undefined,
    },
    options: {
      type: Object,
      default() { return {}; },
    },
  },

  components: {
    VueTagsInput,
  },

  computed: {
    // TODO, this should probably be moved into the FilterForm
    opts() {
      return Object.assign({
        chartTypeOptions: [], // contains the options for chart types available (pie, bar. etc)
        fyear: true, // boolean for whether form has year field
        ffaculty: true, // boolean for whether form has faculty field
        fschool: true, // boolean for whether form has school field
        fcourse: true, // boolean for whether form has course field
        ftype: true, // boolean for whether form has type field
        numForms: 1, // int for amount of side by side copies of the form for superimposing graphs
        compare: false,

        /* obtain data */
        getQueryset: () => console.log('NOT OVERRIDDEN'),
        labelField: 'UNKNOWN',
        dataField: 'UNKNOWN',
      }, this.options || {});
    },

    chartTypeOptions() { return this.opts.chartTypeOptions; },
    fyear() { return this.opts.fyear; },
    ffaculty() { return this.opts.ffaculty; },
    fschool() { return this.opts.fschool; },
    fcourse() { return this.opts.fcourse; },
    ftype() { return this.opts.ftype; },
    numForms() { return this.opts.numForms; },

    ...mapGetters([
      'numCharts',
    ]),

    loadedPercent() {
      return (100.0 * this.showCounter) / Object.keys(this.tagDicts).length;
    },
  },

  data() {
    return {
      // preselected values to be highlighted on form start
      selectedChartType: undefined,
      selectedGroupByDesc: undefined,
      selectedYear: undefined,
      selectedFaculty: undefined,
      selectedSchool: undefined,
      selectedCourse: undefined,
      selectedType: undefined,
      selectedDuplicate: undefined,

      show: false,
      showCounter: 0,

      duplicates: [],
      chosenType: undefined,

      tagStrs: { years: [], faculties: [], schools: [], courses: [] }, // arrays of strings
      tagDicts: { years: [], faculties: [], schools: [], courses: [] }, // arrays of array of dictionaries
      tagAutocompletes: { years: [], faculties: [], schools: [], courses: [] }, // arrays of array of dictionaries
    };
  },

  methods: {
    onSubmit(evt) {
      // stop browsers from appending a '?' to before the '#' in the url
      evt.preventDefault();

      // convert years tags to an array
      const filterSets = [];
      for (let i = 0; i < this.numForms; i += 1) {
        filterSets.push({
          years: this.tagDicts.years[i].map((item) => item.text),
          faculties: this.tagDicts.faculties[i].map((item) => item.text),
          schools: this.tagDicts.schools[i].map((item) => item.text),
          courses: this.tagDicts.courses[i].map((item) => item.text),
        });
      }

      const chartData = {
        type: 'commonFilterChart', // used internally to tell how to retrieve data.
        /* data */
        chartType: this.chosenType,
        labelField: this.opts.labelField,
        dataField: this.opts.dataField,
        getQueryset: this.opts.getQueryset,
        filterSets,
      };

      // add chart to store
      console.log('Adding Chart To Store:', chartData);
      this.$store.dispatch('createDashboardChart', { data: chartData });

      // close form
      try {
        this.$parent.$parent.deleteChart();
      } catch (err) {
        console.log('no delete chart function when calling from template screen');
      }

      this.$parent.$parent.hideModal();

      // go to url
      this.$router.push('dashboard');
    },
    onClose(evt) {
      evt.preventDefault();
      this.$parent.$parent.hideModal();
    },


    /**
     * Load the needed data to display all the autocomplete forms.
     */
    loadData() {
      this.loadDataPoint(EnrolledYear, EnrolledYear.calendar_instance_year, 'years');
      this.loadDataPoint(Faculty, Faculty.faculty_title, 'faculties');
      this.loadDataPoint(School, School.school_title, 'schools');
      this.loadDataPoint(Course, Course.course_code, 'courses');
    },
    /**
     * Load data for a single autocomplete form
     */
    loadDataPoint(Model, field, autoCompleteField) {
      Model.query.values(field).orderBy(field).distinct().then((results) => {
        for (let i = 0; i < this.tagAutocompletes[autoCompleteField].length; i += 1) {
          // convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]// convert to dictionary for the autocomplete tags so that autocomplete is an array of objects -> [{text: 'value'},{text:'value2'},...]
          this.tagAutocompletes[autoCompleteField][i] = results.map(({ [field]: a }) => ({ text: a }));
        }
        // Increment the show counter each time a data point is loaded
        this.showCounter += 1;
        if (this.showCounter >= Object.keys(this.tagDicts).length) {
          this.show = true;
        }
      });
    },

    /**
     * Handle what is displayed for the selection forms in the results when typing.
     */
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
  },

  /**
   * This is run when the component is first created to initialise it.
   */
  mounted() {
    if (this.compare === true) {
      this.loadData();
    }

    if (!this.selectedChartType && this.chartTypeOptions.length > 0) {
      this.selectedChartType = this.chartTypeOptions[0];
    }

    if (this.selectedChartType) {
      switch (this.selectedChartType) {
        case 'pie':
          this.chartTypeOptions.push('doughnut');
          break;
        case 'doughnut':
          this.chartTypeOptions.push('pie');
          break;
        case 'line':
          this.chartTypeOptions.push('bar');
          break;
        case 'bar':
          this.chartTypeOptions.push('line');
          break;
        default:
      }
      this.chosenType = this.selectedChartType;
    } else {
      this.chosenType = '';
    }

    // initialize data.form to have the correct amount of v-models
    const formKeys = Object.keys(this.tagDicts);
    if (this.selectedDuplicate === false) {
      this.duplicates.push(false);
    } else {
      this.duplicates.push(true);
    }

    for (let i = 0; i < formKeys.length; i += 1) {
      for (let j = 0; j < this.numForms; j += 1) {
        this.tagStrs[formKeys[i]].push('');
        this.tagAutocompletes[formKeys[i]].push([]);
        if (j === 0) {
          let selected = [];
          switch (formKeys[i]) {
            case 'years':
              if (this.selectedYear !== undefined) {
                selected = this.selectedYear;
              } else {
                selected = [];
              }
              break;
            case 'faculties':
              if (this.selectedFaculty !== undefined) {
                selected = this.selectedFaculty;
              } else {
                selected = [];
              }
              break;
            case 'schools':
              if (this.selectedSchool !== undefined) {
                selected = this.selectedSchool;
              } else {
                selected = [];
              }
              break;
            case 'courses':
              if (this.selectedCourse !== undefined) {
                selected = this.selectedCourse;
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
        }
      }
    }
  }, // end created
};
</script>
