
import axios from 'axios';


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
  return requester.post(
    'course_stats/query',
    {
      chain: [
        {
          group: {
            by: [
              'calendar_instance_year',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function getFaculties() {
  return requester.post(
    'school_info/query',
    {
      chain: [
        {
          group: {
            by: [
              'faculty',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function getSchools() {
  return requester.post(
    'school_info/query',
    {
      chain: [
        {
          group: {
            by: [
              'school',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function getCourses(schools) {
  return requester.post(
    'course_info/query',
    {
      chain: [
        {
          group: {
            by: [
              'course_name',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function getFacultySchools(faculties) {
  return requester.post(
    'school_info/query',
    {
      chain: [
        {
          filter: [
            {
              field: 'faculty',
              operator: 'exact',
              value: faculties,
            },
          ],
          group: {
            by: [
              'school',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function getSchoolsCourses(schools) {
  return requester.post(
    'course_info/query',
    {
      chain: [
        {
          filter: [
            {
              field: 'school',
              operator: 'exact',
              value: schools,
            },
          ],
          group: {
            by: [
              'course_name',
            ],
            distinctGrouping: true,
            removeDuplicateCountings: false,
          },
        },
      ],
    },
  );
}

function determineYield(groupBy) {
  return groupBy;
}

function getCourseStats(modelName ,groupBy, years, faculties, schools, courses, duplicate) {
  const yieldBy = determineYield(groupBy);
  return requester.post(
    modelName + '/query',
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
                from: yieldBy,
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
