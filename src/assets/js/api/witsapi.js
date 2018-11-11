
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import axios from 'axios';
import { Faculty, School, Course, AsdfObj, Program, ProgressOutcome, SecondarySchool, Student, EnrolledYear, EnrolledCourse } from './witsmodels';
import { Q } from './queryset';

/* eslint-enable no-unused-vars */

const requester = axios.create({
  baseURL: `http://${process.env.VUE_APP_API}/`,
  timeout: 10000,
});


function getLoginToken(username, password) {
  return requester.post(
    'auth/token/obtain',
    {
      username,
      password,
    },
  );
}

function refreshToken(token) {
  return requester.post(
    'auth/token/refresh',
    {
      token,
    },
  );
}

function getYears() {
  return EnrolledYear.query
    .values(EnrolledYear.calendar_instance_year)
    .orderBy(EnrolledYear.calendar_instance_year)
    .distinct()
    .debug()
    .POST();
}

function getFaculties() {
  return Faculty.query
    .values(Faculty.faculty_title)
    .orderBy(Faculty.faculty_title)
    .debug()
    .POST();
}

function getSchools() {
  return School.query
    .values(School.school_title)
    .orderBy(School.school_title)
    .debug()
    .POST();
}

function getCourses() {
  return Course.query
    .values(Course.course_code)
    .orderBy(Course.course_code)
    .debug()
    .POST();
}

function getFacultySchools(faculties) {
  return School.query
    .filter(Q(School.faculty_id.faculty_title.$in, faculties))
    .values(School.school_title)
    .debug()
    .POST();
}

function getSchoolsCourses(schools) {
  return Course.query
    .filter(Q(Course.course_code, schools))
    .values(Course.course_code)
    .debug()
    .POST();
}

// function determineYield(groupBy) {
//   return groupBy;
// }

function getCourseStats(modelName, groupBy, years, faculties, schools, courses, duplicate) {
  return requester.post(
    `${modelName}/query`,
    {
      chain: [
        {
          filter: [
            {
              field: 'calendar_instance_year',
              operator: 'exact', // TODO: FIX ON FRONTEND
              value: years,
            },
            {
              field: 'faculty',
              operator: 'exact',
              value: faculties,
            },
            {
              field: 'school',
              operator: 'exact',
              value: schools,
            },
            {
              field: 'course_code',
              operator: 'exact',
              value: courses,
            },
          ],
          group: {
            by: [
              groupBy,
            ],
            yield: [
              {
                name: 'count',
                via: 'count',
                from: groupBy,
              },
            ],
            distinctGrouping: false,
            removeDuplicateCountings: duplicate,
          },
        },
      ],
    },
  );
}

// const nameToColumn = {
//   'Race': 'race_description',
//   'Gender': 'gender',
//   'Nationality': 'nationality_short_name',
//   'Home Language': 'home_language_description',
//   'Bell curve': 'final_mark',
//   'Pass rates by year': 'pass_rates_by_year',
//   'Pass rates by faculty/course': 'pass_rates_by_course',
//   'Progress outcome by faculty/course': 'progress_outcome_by_course',
// };

export default {
  getYears,
  getFaculties,
  getSchools,
  getCourses,
  getFacultySchools,
  getSchoolsCourses,
  getLoginToken,
  refreshToken,
};
