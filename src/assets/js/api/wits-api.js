
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import { Faculty, School, Course, Program, ProgressOutcome, SecondarySchool, Student, EnrolledYear, EnrolledCourse, Field } from './wits-models';
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

/**
 * @return {Queryset}
 */
export function querysetCommonGroupByCount(Model, groupBy, { years = null, faculties = null, schools = null, courses = null }) {
  return Model.query
    .filter(commonFilters[Model]({ years, faculties, schools, courses }))
    .values(groupBy)
    .annotate({ field: 'count', expr: `count(F('${groupBy}'))` });
}
