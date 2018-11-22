
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

import { Faculty, School, Course, Program, ProgressOutcome, SecondarySchool, Student, EnrolledYear, EnrolledCourse, Field } from './wits-models';
import { Q, Queryset } from './queryset';

/* eslint-enable no-unused-vars */

/* ========================================================================== */
/* FILTERS - Q object factories                                               */
/* ========================================================================== */


// TODO, add more pathways.
export function makeCommonFilterGetter(pathYear, pathFaculties, pathSchools, pathCourses) {
  return (years, faculties, schools, courses) => {
    let q = Q();
    if (pathYear && Array.isArray(years) && years.length > 0) q = q.and(pathYear.$in(), years);
    if (pathFaculties && Array.isArray(faculties) && faculties.length > 0) q = q.and(pathFaculties.$in(), faculties);
    if (pathSchools && Array.isArray(schools) && schools.length > 0) q = q.and(pathSchools.$in(), schools);
    if (pathCourses && Array.isArray(courses) && courses.length > 0) q = q.and(pathCourses.$in(), courses);
    return q;
  };
}

export const commonFilterFaculty = makeCommonFilterGetter(
  Student.enrolled_years.calendar_instance_year,
  Student.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  Student.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  Student.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterSchool = makeCommonFilterGetter(
  Student.enrolled_years.calendar_instance_year,
  Student.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  Student.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  Student.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterCourse = makeCommonFilterGetter(
  Student.enrolled_years.calendar_instance_year,
  Student.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  Student.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  Student.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterProgram = makeCommonFilterGetter(
  Program.enrolled_years.calendar_instance_year,
  Program.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  Program.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  Program.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterProgressOutcome = makeCommonFilterGetter(
  ProgressOutcome.enrolled_years.calendar_instance_year,
  ProgressOutcome.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  ProgressOutcome.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  ProgressOutcome.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterSecondarySchool = makeCommonFilterGetter(
  SecondarySchool.students.enrolled_years.calendar_instance_year,
  SecondarySchool.students.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  SecondarySchool.students.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  SecondarySchool.students.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterStudent = makeCommonFilterGetter(
  Student.enrolled_years.calendar_instance_year,
  Student.enrolled_years.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  Student.enrolled_years.enrolled_courses.course_code.school_id.school_title,
  Student.enrolled_years.enrolled_courses.course_code.course_code,
);

export const commonFilterEnrolledYear = makeCommonFilterGetter(
  EnrolledYear.calendar_instance_year,
  EnrolledYear.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  EnrolledYear.enrolled_courses.course_code.school_id.school_title,
  EnrolledYear.enrolled_courses.course_code.course_code,
);

export const commonFilterEnrolledCourse = makeCommonFilterGetter(
  EnrolledCourse.enrolled_year_id.calendar_instance_year,
  EnrolledYear.enrolled_courses.course_code.school_id.faculty_id.faculty_title,
  EnrolledYear.enrolled_courses.course_code.school_id.school_title,
  EnrolledYear.enrolled_courses.course_code.course_code,
);

export default {
  [Faculty]: commonFilterFaculty,
  [School]: commonFilterSchool,
  [Course]: commonFilterCourse,
  [Program]: commonFilterProgram,
  [ProgressOutcome]: commonFilterProgressOutcome,
  [SecondarySchool]: commonFilterSecondarySchool,
  [Student]: commonFilterStudent,
  [EnrolledYear]: commonFilterEnrolledYear,
  [EnrolledCourse]: commonFilterEnrolledCourse,
};
