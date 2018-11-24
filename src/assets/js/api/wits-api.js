
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

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
  CLASS_NAME_TO_MODEL
} from './wits-models';
import { Q, Queryset } from './queryset';
import commonFilters from './wits-common-filter';

/* eslint-enable no-unused-vars */


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


function checkArrays(...arrays) {
  arrays.forEach((array) => {
    if ((array && !Array.isArray(array)) || (Array.isArray(array) && array.length > 0 && typeof array[0] === 'object')) {
      throw Error(`array type is invalid, must contain values not objects: ${array}`);
    }
  });
}

/**
 * @return {Queryset}
 */
export function querysetCommonGroupByCount(model, groupBy, { years = null, faculties = null, schools = null, courses = null }, distinct = false) {
  checkArrays(years, faculties, schools, courses);

  const modelClass = (typeof model === 'string') ? CLASS_NAME_TO_MODEL[model] : model;

  if (!commonFilters[modelClass]) {
    throw new Error(`Model seems to be invalid: ${model}`);
  }

  return modelClass.query
    .filter(commonFilters[modelClass]({ years, faculties, schools, courses }))
    .values(groupBy)
    .annotate({ field: 'count', expr: `count('${groupBy}'${distinct ? ', distinct=True' : ''})` });
}

export function querysetCommonGroupByAve(Model, groupBy, aveBy, { years = null, faculties = null, schools = null, courses = null }) {
  return Model.query
    .filter(commonFilters[Model]({ years, faculties, schools, courses }))
    .values(groupBy)
    .distinct()
    .annotate({ field: 'ave', expr: `ave('${aveBy}')` });
}
