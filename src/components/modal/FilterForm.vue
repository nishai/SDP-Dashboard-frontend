<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" @reset="onClose" v-if="show">
    <b-row>
      <b-col v-for="i in numForms" :key="i">
        <b-form-group
          v-if="ftype === true"
          id="typeGroup"
          label="Chart Type:"
          label-for="Type"
          horizontal>
          <b-form-select id="Type" :options="types" required v-model="form.type[i-1]">
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="fyear === true"
          id="YearGroup"
          label="Year:"
          label-for="Year"
          horizontal>
          <b-form-select id="Year" :options="years" required v-model="form.year[i-1]">
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="ffaculty === true"
          id="FacultyGroup"
          label="Faculty:"
          label-for="Faculty"
          description="You can choose multiple faculties using Ctrl key"
          horizontal>
          <b-form-select multiple id="Faculty" :options="faculties" required v-model="form.faculty[i-1]">
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="fschool === true && form.faculty[i-1] !== null"
          id="SchoolGroup"
          label="School:"
          label-for="School"
          description="You can choose multiple schools using Ctrl key"
          horizontal>
          <b-form-select multiple id="School" :options="schools" required v-model="form.school[i-1]">
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="fcourse === true && form.school[i-1] !== null"
          id="CourseGroup"
          label="Course:"
          label-for="Course"
          description="You can choose multiple courses using Ctrl key"
          horizontal>
          <b-form-select multiple id="Course" :options="courses" required v-model="form.course[i-1]">
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

export default {
  name: 'FilterForm',
  data() {
    return {
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
      years: [
        { text: 'Select One', value: null },
        '2013', '2014', '2015', '2016', '2017',
      ],
      courses: [
      //  { text: 'Select One', value: null },
        'All', 'Course1', 'Course2', 'Course3', 'Course4',
      ],
      faculties: [
      //  { text: 'Select One', value: null },
        'All', 'Science', 'Arts',
      ],
      schools: [
      //  { text: 'Select One', value: null },
        'All', 'CSAM', 'Physics', 'Chemistry',
      ],
      show: true,
    };
  },
  mounted() {
    const keys = Object.keys(this.form);
    for (let i = 0; i < keys.length; i += 1) {
      for (let j = 0; j < this.$props.numForms; j += 1) {
        this.form.keys[i].push(null);
      }
    }
  },
  methods: {
    onSubmit(evt) {
      this.$router.push({ path: '/examples', query: { templateType: this.url } });
    },
    onClose(evt) {
      this.$parent.$parent.hideModal();
    },
  },
  props: [
    'url',
    'fyear',
    'fcourse',
    'ffaculty',
    'fschool',
    'ftype',
    'numForms',
  ],
};
</script>

<style>
</style>

