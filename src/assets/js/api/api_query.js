
import axios from 'axios';
import { QuerysetFactory, Q } from './queryset';


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
  return QuerysetFactory.enrolledyear()
    .values('calendar_instance_year')
    .distinct()
    .debug()
    .POST();
}

function getFaculties() {
  return QuerysetFactory.faculty()
    .values('faculty_title')
    .debug()
    .POST();
}

function getSchools() {
  return QuerysetFactory.school()
    .values('school_title')
    .debug()
    .POST();
}

function getCourses() {
  return QuerysetFactory.course()
    .values('course_code')
    .debug()
    .POST();
}

function getFacultySchools(faculties) {
  return QuerysetFactory.school()
    .filter(Q('faculty_id__faculty_title__in', faculties))
    .values('school_title')
    .debug()
    .POST();
}

function getSchoolsCourses(schools) {
  return QuerysetFactory.school()
    .filter(Q('school_id__school_title__in', schools))
    .values('course_code')
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

const nameToColumn = {
  'Race': 'race_description',
  'Gender': 'gender',
  'Nationality': 'nationality_short_name',
  'Home Language': 'home_language_description',
  'Bell curve': 'final_mark',
  'Pass rates by year': 'pass_rates_by_year',
  'Pass rates by faculty/course': 'pass_rates_by_course',
  'Progress outcome by faculty/course': 'progress_outcome_by_course',
};

export default {
  getCourseStats,
  getYears,
  getFaculties,
  getSchools,
  getCourses,
  getFacultySchools,
  getSchoolsCourses,
  getLoginToken,
  refreshToken,
  nameToColumn,
};
