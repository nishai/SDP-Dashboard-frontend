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
           <!--  <b-form-select
              multiple
              id="Year"
              :options="derivedYears"
              required
              v-model="form.year[i-1]">
          </b-form-select> -->

<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.year[i-1]"
              :tags="yearTags"
              :autocomplete-items=filteredItems1
              :add-only-from-autocomplete="true"  
              @tags-changed="newTags => yearTags = newTags">
              
            </vue-tags-input>
          </div>
<!-- @tags-changed="newTags => yearTags = newTags"> -->

              <!-- @tags-changed="update"> -->

        </b-form-group>
        <!-- FACULTIES -->
        <b-form-group
          v-if="ffaculty === true"
          id="FacultyGroup"
          label="Faculty:"
          label-for="Faculty"
          description="You can choose multiple faculties"
          horizontal>
 <!--          <b-form-select
            multiple
            id="Faculty"
            :options="derivedFaculties"
            required
            v-model="form.faculty[i-1]"
            @input="loadSchools(i-1)">
          </b-form-select> -->

<!-- Filter Tags -->
            <div>
            <vue-tags-input
              v-model="form.faculty[i-1]"
              :tags="facultyTags"
              :autocomplete-items=derivedFaculties
              :add-only-from-autocomplete="true"  
              @tags-changed="loadSchools($event, i-1)" >
            </vue-tags-input>
            </div>


        </b-form-group>

<!-- "newTags => tags2 = newTags"> -->

              <!-- @input="loadSchools(i-1)" -->




        <!-- SCHOOLS -->
        <!--           v-if="fschool === true && form.faculty[i-1][0] != null"
 -->
        <b-form-group
          id="SchoolGroup"
          label="School:"
          label-for="School"
          description="You can choose multiple schools"
          horizontal>
     <!--      <b-form-select
            multiple
            id="School"
            :options="derivedSchools[i-1]"
            required
            v-model="form.school[i-1]"
            @input="loadCourses(i-1)">
          </b-form-select> -->

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
        <!--         v-if="fcourse === true && form.school[i-1][0] != null" -->
        <b-form-group
  
          id="CourseGroup"
          label="Course:"
          label-for="Course"
          description="You can choose multiple courses"
          horizontal>
     <!--      <b-form-select
            multiple
            id="Course"
            :options="derivedCourses[i-1]"
            required
            v-model="form.course[i-1]">
          </b-form-select> -->


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

       // filter tags
      yeartag: '',
      faculytag: '',
      schooltag: '',
      coursetag: '',

      tags:[],
      yearTags: [],    
      facultyTags:[],
      schoolTags:[],
      courseTags:[],
// 
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
    // this.loadSchools();
    // this.loadCourses();
  },

  /**
   * Updated whenever their dependencies are changed.
   */
  computed: {
    derivedYears() {
      return this.years ? this.years : ['loading data from database...'];
       // return filteredItems1();
    },
    derivedFaculties() {
      console.log("FUcking Faculties") 
      console.log(this.faculties) 
      return this.faculties ? this.faculties : ['loading data from database...'];
    },
    derivedSchools() {
      console.log(this.schools)
      return this.schools ? this.schools : ['loading data from database...'];
    },
    derivedCourses() {
      console.log("rrrrrrrrrrrrrrrr FUcking courses") 
      return this.courses ? this.courses : ['loading data from database...'];
    },


    // filtertags
    filteredItems1() {
      return this.derivedYears.filter((i) => new RegExp(this.yeartag, 'i').test(i.text));
    },
    //    filteredItems2() {
    //   return this.autocompleteItems2.filter((i) => new RegExp(this.tag2, 'i').test(i.text));
    // },
  

 // filteredItems3() {
 //      return this.autocompleteItems3.filter((i) => new RegExp(this.yearTags, 'i').test(i.text));
 //    },

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
          console.log("YearQuery Returns:")
          console.log(this.years)
          
          // convert to dictionary for the
          let list = this.years
          list = list.map(x => {
          return({text: x});
          });
            console.log(list);

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
    loadSchools(newTags,index) {
      // gets called when form.faculty changes, so it gets called unnecessarily with created()

      console.log("loadSchools Tests")
      console.log("ltest1")
      console.log(newTags[0].text)
      console.log("test2")
      console.log(index) 
      console.log("test3")
      console.log(newTags) 

      if (this.form.faculty[index].length !== 0) {
        console.log("test4")
        console.log(this.form.faculty[index].length)
        
        // the query will get schools for the following faculties:
        var faculties =[];
        for(var f =0;f<newTags.length;f++){
          faculties.push(newTags[f].text);
        }
        console.log("test5")
        console.log(faculties)


        this.facultyTags=newTags;
        console.log("test6")

        console.log(facultyTags)

        
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
    loadCourses(schoolTags,index) {
      console.log("Courses Tests")
      console.log(schoolTags[0].text)
      console.log("school list length")

      console.log(this.form.school[index].length)
      console.log("zzzzzzzzzzzzz")

      console.log(this.form.school)

      if (this.form.school[index].length == 0) {
            console.log("aaaaaaaaaaaaaaaaaaaa fucking courses")

        // the query will get courses for the following schools:
        var schoolz =[];
        for(var f =0;f<schoolTags.length;f++){
          schoolz.push(schoolTags[f].text);
        }

        this.form.school[index]=schoolz;
        apiQuery.getSchoolsCourses(this.form.school[index])
          .then((response) => response.data)
          .then((data) => {
            this.courses[index] = Object.values(data.results);
            
            console.log("aaaaaaaaaaaaaaaaaaaa fucking courses")

            console.log(data.results);

            this.$forceUpdate();
          });
      }
    },

    /**
     * analyse data and make chart when submitting form
     */
    onSubmit(event) {
      console.log("ssssssssss SUBMITTED TESTS")
      console.log(this.yearTags)
      console.log(this.facultyTags)
      console.log(this.schoolTags)
      console.log(this.courseTags)

      console.log("Conversion test")
//  Convert Nathan to Judaism

//                               _.._
//                              .'    '.
//                             (____/`\ \
//                            (  |' ' )  )
//                            )  _\= _/  (
//                  __..---.(`_.'  ` \    )
//                 `;-""-._(_( .      `; (
//                 /       `-`'--'     ; )
//                /    /  .    ( .  ,| |(
// _.-`'---...__,'    /-,..___.-'--'_| |_)
// '-'``'-.._       ,'  |   / .........'
//           ``;--"`;   |   `-`
//              `'..__.'


// years
      let submitYears=[];
      for (var key in this.yearTags){
        console.log( key, this.yearTags[key].text ); //Yay it works!!
        submitYears.push(this.yearTags[key].text)
        }
      console.log(submitYears)//Yay it works!!
      this.form.year[0] = submitYears;

// faculties
      let submitFaculties=[];
      console.log("test 7")
      console.info(this.facultyTags)
      for (var i =0;i < this.facultyTags.length;i++){
        console.log("test8")
        console.log(this.facultyTags ); 
        // submitFaculties.push(this.facultyTags[i])
      }
      // console.log(submitFaculties)
      // this.form.faculty[0] = submitFaculties;



// 

//                               _.._
//                              .'    '.
//                             (____/`\ \
//                            (  |' ' )  )
//                            )  _\= _/  (
//                  __..---.(`_.'  ` \    )
//                 `;-""-._(_( .      `; (
//                 /       `-`'--'     ; )
//                /    /  .    ( .  ,| |(
// _.-`'---...__,'    /-,..___.-'--'_| |_)
// '-'``'-.._       ,'  |   / .........'
//           ``;--"`;   |   `-`
//              `'..__.'





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
          // TODO: 
          // this.form.year[i]= submitYears.... from Or's new stuff
          
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
