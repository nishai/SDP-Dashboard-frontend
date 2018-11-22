<template>
  <div>
    <StandardPageTitle title="University" subtitle="Overview"/>

    <!-- TOTALS -->
    <div class="section">
      <b-card>
        <b-card-header title="Totals Over The Years"/>
        <b-card-content>
          <OpinionatedLevel :boxed="false" :items="categoryCounts"/>
        </b-card-content>
      </b-card>
    </div>

    <!-- BASIC GRAPHS -->
    <div class="section">
      <b-card>
        <b-card-header title="University - Student Count Per Year"/>
        <b-card-content class="has-text-centered">
          <v-chart
            class="university-chart"
            :type="chartUniversityStudentCountPerYear.type"
            :data="chartUniversityStudentCountPerYear.data"
            :options="chartUniversityStudentCountPerYear.options"
          />
        </b-card-content>
      </b-card>
    </div>


    <div class="section">
      <b-card centered>
        <b-card-header title="Faculties - School Count Per Year"/>
        <b-card-content>
          <v-chart
            class="university-chart"
            :type="chartFacultiesSchoolCountPerYear.type"
            :data="chartFacultiesSchoolCountPerYear.data"
            :options="chartFacultiesSchoolCountPerYear.options"
          />
        </b-card-content>
      </b-card>
    </div>

    <div class="section">
      <b-card>
        <b-card-header title="Faculties - Course Count Per Year"/>
        <b-card-content class="has-text-centered">
          <v-chart
            class="university-chart"
            :type="chartFacultiesCourseCountPerYear.type"
            :data="chartFacultiesCourseCountPerYear.data"
            :options="chartFacultiesCourseCountPerYear.options"
          />
        </b-card-content>
      </b-card>
    </div>

    <div class="section">
      <b-card>
        <b-card-header title="Faculties - Student Count Per Year"/>
        <b-card-content class="has-text-centered">
          <v-chart
            class="university-chart"
            :type="chartFacultiesStudentCountPerYear.type"
            :data="chartFacultiesStudentCountPerYear.data"
            :options="chartFacultiesStudentCountPerYear.options"
          />
        </b-card-content>
      </b-card>
    </div>

  </div>
</template>


<script>
import StandardPageTitle from '../components/StandardPageTitle.vue';
import OpinionatedLevel from '../components/opinionated/OpinionatedLevel.vue';
import {
  getMapperGroupByFieldToColumns,
  getMapperLabelsValuesToChart,
  getMapperListToLabelsValues,
  getMapperFilter,
  groupsColumnsToStackedChart,
} from '../assets/js/util/arrays';

export default {
  name: 'PageOverviewUniversity',
  components: {
    StandardPageTitle,
    OpinionatedLevel,
  },
  data() {
    return {
      categoryCounts: null,
      chartUniversityStudentCountPerYear: {},
      chartFacultiesSchoolCountPerYear: {},
      chartFacultiesCourseCountPerYear: {},
      chartFacultiesStudentCountPerYear: {},
    };
  },
  mounted() {
    // general count information...

    this.categoryCounts = [
      { label: '# Faculties', query: this.$wits.Faculty.query.all().count(), handler: (result) => result.count },
      { label: '# Schools', query: this.$wits.School.query.all().count(), handler: (result) => result.count },
      { label: '# Programs', query: this.$wits.Program.query.all().count(), handler: (result) => result.count },
      { label: '# Courses', query: this.$wits.Course.query.all().count(), handler: (result) => result.count },
      { label: '# Students', query: this.$wits.Student.query.all().count(), handler: (result) => result.count },
    ];
    this.$wits.updateReactiveItems(this.categoryCounts);

    // student count at wits per year...  we should do a lot of this in the backend... but...

    this.$wits.EnrolledYear.query
      .values(this.$wits.EnrolledYear.calendar_instance_year)
      .annotate({ field: 'count', expr: `count('${this.$wits.EnrolledYear.calendar_instance_year}')` })
      .orderBy(this.$wits.EnrolledYear.calendar_instance_year)
      .thenStripPrefixes()
      .then(getMapperListToLabelsValues(this.$wits.EnrolledYear.calendar_instance_year, 'count'))
      .then(getMapperLabelsValuesToChart())
      .then((chart) => { this.chartUniversityStudentCountPerYear = chart; });

    // TODO: ADD FACULTY COLOURS TO BACKEND
    // faculty info per year at wits... we should do a lot of this in the backend... but...
    // otherwise maybe there is a better way to do this?

    this.$wits.Faculty.query
      .values(this.$wits.Faculty.faculty_title, this.$wits.Faculty.schools.courses.enrolled_courses.enrolled_year_id.calendar_instance_year)
      .annotate(
        { field: 'school_count', expr: `count('${this.$wits.Faculty.schools}', distinct=True)` },
        { field: 'course_count', expr: `count('${this.$wits.Faculty.schools.courses}', distinct=True)` },
        { field: 'student_count', expr: `count('${this.$wits.Faculty.schools.courses.enrolled_courses.enrolled_year_id.encrypted_student_no}', distinct=True)` },
      )
      .thenStripPrefixes()
      .then(getMapperFilter((item) => !!item.calendar_instance_year))
      .then(getMapperGroupByFieldToColumns(this.$wits.Faculty.faculty_title))
      .then((groups) => {
        this.chartFacultiesSchoolCountPerYear = groupsColumnsToStackedChart(groups, 'calendar_instance_year', 'school_count');
        this.chartFacultiesCourseCountPerYear = groupsColumnsToStackedChart(groups, 'calendar_instance_year', 'course_count');
        this.chartFacultiesStudentCountPerYear = groupsColumnsToStackedChart(groups, 'calendar_instance_year', 'student_count');
      });

    // race demographics
  },
};

</script>
<style scoped lang="scss">

.university-chart {
  max-width: 1000px;
  min-height: 400px;
}

</style>

