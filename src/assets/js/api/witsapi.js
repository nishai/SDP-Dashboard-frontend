
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import axios from 'axios';
import { Faculty, School, Course, Program, ProgressOutcome, SecondarySchool, Student, EnrolledYear, EnrolledCourse, Field } from './witsmodels';
import { Q, Queryset } from './queryset';

/* eslint-enable no-unused-vars */

/* ========================================================================== */
/* AXIOS                                                                      */
/* ========================================================================== */

const requester = axios.create({
  baseURL: `http://${process.env.VUE_APP_API}/`,
  timeout: 10000,
});

/* ========================================================================== */
/* AUTH                                                                       */
/* ========================================================================== */

export function getLoginToken(username, password) {
  return requester.post(
    'auth/token/obtain',
    {
      username,
      password,
    },
  );
}

export function refreshToken(token) {
  return requester.post(
    'auth/token/refresh',
    {
      token,
    },
  );
}

/* ========================================================================== */
/* FILTERS - Q object factories                                               */
/* ========================================================================== */

export function commonFilterFaculty({ years = null, faculties = null, schools = null, courses = null }) {
  const q = Q();
  if (faculties !== null) q.and(Faculty.faculty_title.$in, faculties);
  if (schools !== null) q.and(Faculty.schools.school_title.$in, schools);
  if (courses !== null) q.and(Faculty.schools.courses.course_code.$in, courses);
  if (years !== null) q.and(Faculty.schools.courses.enrolled_courses.enrolled_year_id.calendar_instance_year.$in, years);
  return q;
}

export function commonFilterSchool({ years = null, faculties = null, schools = null, courses = null }) {
  const q = Q();
  if (faculties !== null) q.and(School.faculty_id.faculty_title.$in, faculties);
  if (schools !== null) q.and(School.school_title.$in, schools);
  if (courses !== null) q.and(School.courses.course_code.$in, courses);
  if (years !== null) q.and(School.courses.enrolled_courses.enrolled_year_id.calendar_instance_year.$in, years);
  return q;
}

export function commonFilterCourse({ years = null, faculties = null, schools = null, courses = null }) {
  const q = Q();
  if (faculties !== null) q.and(Course.school_id.faculty_id.faculty_title.$in, faculties);
  if (schools !== null) q.and(Course.school_id.school_title.$in, schools);
  if (courses !== null) q.and(Course.course_code.$in, courses);
  if (years !== null) q.and(Course.enrolled_courses.enrolled_year_id.calendar_instance_year.$in, years);
  return q;
}

export function commonFilterEnrolledYear({ years = null, faculties = null, schools = null, courses = null }) {
  const q = Q();
  if (faculties !== null) q.and(EnrolledYear.enrolled_courses.course_code.school_id.faculty_id.faculty_title.$in, faculties);
  if (schools !== null) q.and(EnrolledYear.enrolled_courses.course_code.school_id.school_title.$in, schools);
  if (courses !== null) q.and(EnrolledYear.enrolled_courses.course_code.course_code.$in, courses);
  if (years !== null) q.and(EnrolledYear.calendar_instance_year.$in, years);
  return q;
}

export function commonFilterEnrolledCourse({ years = null, faculties = null, schools = null, courses = null }) {
  const q = Q();
  if (faculties !== null) q.and(EnrolledCourse.course_code.school_id.faculty_id.faculty_title.$in, faculties);
  if (schools !== null) q.and(EnrolledCourse.course_code.school_id.school_title.$in, schools);
  if (courses !== null) q.and(EnrolledCourse.course_code.course_code.$in, courses);
  if (years !== null) q.and(EnrolledCourse.enrolled_year_id.calendar_instance_year.$in, years);
  return q;
}

/* ========================================================================== */
/* QUERIES - Q object factories                                               */
/* ========================================================================== */

export function queryYears() {
  return EnrolledYear.query
    .values(EnrolledYear.calendar_instance_year)
    .orderBy(EnrolledYear.calendar_instance_year)
    .distinct()
    .debug()
    .POST();
}

export function queryFaculties() {
  return Faculty.query
    .values(Faculty.faculty_title)
    .orderBy(Faculty.faculty_title)
    .debug()
    .POST();
}

export function querySchools() {
  return School.query
    .values(School.school_title)
    .orderBy(School.school_title)
    .debug()
    .POST();
}

export function queryCourses() {
  return Course.query
    .values(Course.course_code)
    .orderBy(Course.course_code)
    .debug()
    .POST();
}

export function queryFacultySchools(faculties) {
  return School.query
    .filter(Q(School.faculty_id.faculty_title.$in, faculties))
    .values(School.school_title)
    .debug()
    .POST();
}

export function querySchoolCourses(schools) {
  return Course.query
    .filter(Q(Course.school_id.school_title.$in, schools))
    .values(Course.course_code)
    .debug()
    .POST();
}

export function queryCommon(Model, groupBy, { years = null, faculties = null, schools = null, courses = null }) {
  return Model.query.filter(
    {
      Faculty: commonFilterFaculty,
      School: commonFilterSchool,
      Course: commonFilterCourse,
      Program: () => { throw Error('Not Implemented Error'); },
      ProgressOutcome: () => { throw Error('Not Implemented Error'); },
      SecondarySchool: () => { throw Error('Not Implemented Error'); },
      Student: () => { throw Error('Not Implemented Error'); },
      EnrolledYear: commonFilterEnrolledYear,
      EnrolledCourse: commonFilterEnrolledCourse,
    }[Model]({ years, faculties, schools, courses }),
  )
    .values(groupBy)
    .annotate({
      field: 'count',
      expr: `count(F('${groupBy}'))`,
    })
    .POST();
}

/* ========================================================================== */
/* Export                                                                     */
/* ========================================================================== */

export const nameToColumn = {
  'Race': 'race_description',
  'Gender': 'gender',
  'Nationality': 'nationality_short_name',
  'Home Language': 'home_language_description',
  'Bell curve': 'final_mark',
  'Pass rates by year': 'pass_rates_by_year',
  'Pass rates by faculty/course': 'pass_rates_by_course',
  'Progress outcome by faculty/course': 'progress_outcome_by_course',
};

// export default {
//   nameToColumn,
//   getYears: queryYears,
//   getFaculties: queryFaculties,
//   getSchools: querySchools,
//   getCourses: queryCourses,
//   getFacultySchools: queryFacultySchools,
//   getSchoolCourses: querySchoolCourses,
//   getLoginToken,
//   refreshToken,
// };
