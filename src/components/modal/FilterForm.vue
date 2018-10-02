<template>
  <!--https://bootstrap-vue.js.org/docs/components/form/-->
  <b-form @submit="onSubmit" @reset="onClose" v-if="show">
    <b-form-group v-if="fyear === true" id="raceYearGroup" label="Year:" label-for="raceYear" horizontal>
      <b-form-select id="raceYear" :options="years" required v-model="form.year">
      </b-form-select>
    </b-form-group>
    <b-form-group v-if="fcourse === true" id="raceCourseGroup" label="Course:" label-for="raceCourse" horizontal>
      <b-form-select id="raceCourse" :options="courses" required v-model="form.course">
      </b-form-select>
    </b-form-group>
    <b-form-group v-if="ffaculty === true" id="raceFacultyGroup" label="Faculty:" label-for="raceFaculty" horizontal>
      <b-form-select id="raceFaculty" :options="faculties" required v-model="form.faculty">
      </b-form-select>
    </b-form-group>
    <b-form-group v-if="fschool === true" id="raceSchoolGroup" label="School:" label-for="raceSchool" horizontal>
      <b-form-select id="raceSchool" :options="schools" required v-model="form.school">
      </b-form-select>
    </b-form-group>
    <b-button type="submit" variant="primary">Filter</b-button>
    <b-button type="reset" variant="secondary">Close</b-button>
  </b-form>
</template>

<script>

export default {
  name: 'FilterForm',
  data() {
    return {
      form: {
        year: null,
        course: null,
        faculty: null,
        school: null,
      },
      years: [
        { text: 'Select One', value: null },
        '2013', '2014', '2015', '2016', '2017',
      ],
      courses: [
        { text: 'Select One', value: null },
        'All', 'Course1', 'Course2', 'Course3', 'Course4',
      ],
      faculties: [
        { text: 'Select One', value: null },
        'All', 'Science', 'Arts',
      ],
      schools: [
        { text: 'Select One', value: null },
        'All', 'CSAM', 'Physics', 'Chemistry',
      ],
      show: true,
    };
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
  ],
};
</script>

<style>
</style>

