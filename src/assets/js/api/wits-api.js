
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import { axiosInstance as axios } from '../plugins/vue-axios';
import {
  Faculty,
  School,
  Course,
  Program,
  ProgressOutcome,
  SecondarySchool,
  Student,
  EnrolledYear,
  EnrolledCourse,
  Field,
  CLASS_NAME_TO_MODEL,
} from './wits-models';
import { Q, Queryset } from './queryset';
import commonFilters from './wits-common-filter';

/* eslint-enable no-unused-vars */


/* ========================================================================== */
/* USER DATA                                                                  */
/* ========================================================================== */


export function getUser() {
  return axios.get('user/');
}

export function getProfile() {
  return axios.get('profile/');
}

export function getProfileData() {
  return axios.get('profile/data/');
}

export function patchProfileData(data) {
  return axios.patch('profile/data/', data);
}


/* ========================================================================== */
/* QUERIES - Q object factories                                               */
/* ========================================================================== */


/**
 * @return {Queryset}
 */
export function querysetYears() {
  return EnrolledYear.query
    .values(EnrolledYear.calendar_instance_year)
    .orderBy(EnrolledYear.calendar_instance_year)
    .distinct();
}

/**
 * @return {Queryset}
 */
export function querysetFaculties() {
  return Faculty.query
    .values(Faculty.faculty_title)
    .orderBy(Faculty.faculty_title);
}

/**
 * @return {Queryset}
 */
export function querysetSchools() {
  return School.query
    .values(School.school_title)
    .orderBy(School.school_title);
}

/**
 * @return {Queryset}
 */
export function querysetCourses() {
  return Course.query
    .values(Course.course_code)
    .orderBy(Course.course_code);
}

/**
 * @return {Queryset}
 */
export function querysetFacultySchools(faculties) {
  return School.query
    .filter(Q(School.faculty_id.faculty_title.$in, faculties))
    .values(School.school_title);
}

/**
 * @return {Queryset}
 */
export function querysetSchoolCourses(schools) {
  return Course.query
    .filter(Q(Course.school_id.school_title.$in, schools))
    .values(Course.course_code);
}


/* ========================================================================== */
/* CHART TEMPLATES - UTIL                                                     */
/* ========================================================================== */


function checkArrays(...arrays) {
  arrays.forEach((array) => {
    if ((array && !Array.isArray(array)) || (Array.isArray(array) && array.length > 0 && typeof array[0] === 'object')) {
      throw Error(`array type is invalid, must contain values not objects: ${array}`);
    }
  });
}


function veryifyCommonInput(model, { years = null, faculties = null, schools = null, courses = null }) {
  checkArrays(years, faculties, schools, courses);
  const modelClass = (typeof model === 'string') ? CLASS_NAME_TO_MODEL[model] : model;
  if (!commonFilters[modelClass]) {
    throw new Error(`Model seems to be invalid: ${model}`);
  }
  return modelClass;
}


/* ========================================================================== */
/* CHART TEMPLATES                                                            */
/* ========================================================================== */


/**
 * 'Race'
 * 'Gender'
 * 'Nationality'
 * 'Home Language'
 * @return {Queryset}
 */
export function querysetCommonAnnotateCount(model, annotate, { years = null, faculties = null, schools = null, courses = null }, distinct = false) {
  const m = veryifyCommonInput(model, { years, faculties, schools, courses });
  return m.query
    .filter(commonFilters[m]({ years, faculties, schools, courses }))
    .values(annotate)
    .annotate({ field: 'count', expr: `count('${annotate}'${distinct ? ', distinct=True' : ''})` })
    .orderBy(annotate);
}

/**
 * 'Demographics vs Marks'
 * @return {Queryset}
 */
export function querysetCommonGroupAveOf(model, group, aveOf, { years = null, faculties = null, schools = null, courses = null }) {
  const m = veryifyCommonInput(model, { years, faculties, schools, courses });
  return m.query
    .filter(commonFilters[m]({ years, faculties, schools, courses }))
    .values(group)
    .distinct()
    .annotate({ field: 'ave', expr: `ave('${aveOf}')` })
    .orderBy(group);
}


export function querysetCommonPassFail(model, marks, { years = null, faculties = null, schools = null, courses = null }, markSep = 50) {
  const m = veryifyCommonInput(model, { years, faculties, schools, courses });
  return m.query
    .filter(commonFilters[m]({ years, faculties, schools, courses }))
    .annotate({
      field: 'outcome',
      expr: `
            Case(
              When(${marks.$gte()}=${markSep}, then=Value('>= ${markSep}%')),
              When(${marks.$lt()}=${markSep}, then=Value('< ${markSep}%')),
              default=Value('< ${markSep}%'),
              output_field=CharField(),
            )
          `, // this is all valid python (limited in functionality, only a single value expression)
    })
    .values('outcome')
    .annotate({ field: 'count', expr: 'count(F("outcome"))' })
    .orderBy('outcome');
}

export function resultPromiseCommonBellCurve(model, marks, { years = null, faculties = null, schools = null, courses = null }) {
  const m = veryifyCommonInput(model, { years, faculties, schools, courses });

  const queryBase = m.query
    .filter(commonFilters[m]({ years, faculties, schools, courses }))
    .exclude(Q(marks.$isnull(), 'True'));

  return Promise.all([
    queryBase.clone().count().RESULT(),
    queryBase.clone()
      .annotate({ field: 'mark', expr: `Round('${marks}')` })
      .values('mark')
      .annotate({ field: 'count', expr: `Count('mark')` })
      .orderBy('mark')
      .RESULT(),
  ]).then(([{ count }, results]) => {
    return results/* .sort((a, b) => a.mark - b.mark) */.map((obj) => {
      obj.percent = Math.round((obj.count / count) * 100 * 100) / 100;
      return obj;
    }); // sort properly...
  });
}
