
import { app } from '../main';


function getYears() {
  return app.$store.getters.apiAxios.post(
    'course_stats/query',
    {
      chain: [
        {
          group: {
            by: [
              'calendar_instance_year',
            ],
          },
        },
      ],
    },
  );
}

function getFaculties() {
  return app.$store.getters.apiAxios.post(
    'school_info/query',
    {
      chain: [
        {
          group: {
            by: [
              'faculty',
            ],
          },
        },
      ],
    },
  );
}

function getFacultySchools(faculties) {
  return app.$store.getters.apiAxios.post(
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
          },
        },
      ],
    },
  );
}

function getSchoolsCourses(schools) {
  return app.$store.getters.apiAxios.post(
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
          },
        },
      ],
    },
  );
}

function getCourseStats(groupBy, years, faculties, schools, courses) {
  return app.$store.getters.apiAxios.post(
    'course_stats/query',
    {
      chain: [
        {
          filter: [
            {
              field: 'calendar_instance_year',
              operator: 'startswith', // TODO: FIX ON FRONTEND
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
  // getLoginToken,
  // refreshToken,
  nameToColumn,
};
