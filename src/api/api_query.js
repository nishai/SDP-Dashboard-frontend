
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

function getCourseStats(groupBy, years, faculties, schools, courses, duplicate) {
  return requester.post(
    'course_stats/query',
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
            removeDuplicateCountings: (duplicate === 'true'),
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
};

export default {
  getCourseStats,
  getYears,
  getFaculties,
  getFacultySchools,
  getSchoolsCourses,
  getLoginToken,
  refreshToken,
  nameToColumn,
};
