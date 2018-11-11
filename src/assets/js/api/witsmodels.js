/**
 * These data structures are intended to enable autocompletion
 * for models and fields inside webstorm at least.
 */

import { Queryset, Q } from './queryset';

/* ========================================================================== */
/* Standard Field                                                             */
/* ========================================================================== */


// /**
//  * @param {String} name
//  * @return {Field}
//  * @constructor
//  * @extends {String}
//  */
// export function Field(name) {
//   if (!(this instanceof Field)) { return new Field(name); }
//   String.call(this, name);
// }
//
// /* extends strings */
// Field.prototype = Object.create(String.prototype);
//
// Object.defineProperties(Field, {
//   /** @type {string} */ exact: { value: 'exact', writable: false },
//   /** @type {string} */ iexact: { value: 'iexact', writable: false },
//   /** @type {string} */ contains: { value: 'contains', writable: false },
//   /** @type {string} */ icontains: { value: 'icontains', writable: false },
//   /** @type {string} */ startswith: { value: 'startswith', writable: false },
//   /** @type {string} */ istartswith: { value: 'istartswith', writable: false },
//   /** @type {string} */ endswith: { value: 'endswith', writable: false },
//   /** @type {string} */ iendswith: { value: 'iendswith', writable: false },
//   /** @type {string} */ regex: { value: 'regex', writable: false },
//   /** @type {string} */ iregex: { value: 'iregex', writable: false },
//   /** @type {string} */ lt: { value: 'lt', writable: false },
//   /** @type {string} */ lte: { value: 'lte', writable: false },
//   /** @type {string} */ gt: { value: 'gt', writable: false },
//   /** @type {string} */ gte: { value: 'gte', writable: false },
//   /** @type {string} */ in: { value: 'in', writable: false },
// });
//
// Object.defineProperties(Field.prototype, {
//   /** @return {string} */ exact: { get() { return `${this}__exact`; } },
//   /** @return {string} */ iexact: { get() { return `${this}__iexact`; } },
//   /** @return {string} */ contains: { get() { return `${this}__icontains`; } },
//   /** @return {string} */ icontains: { get() { return `${this}__icontains`; } },
//   /** @return {string} */ startswith: { get() { return `${this}__startswith`; } },
//   /** @return {string} */ istartswith: { get() { return `${this}__istartswith`; } },
//   /** @return {string} */ endswith: { get() { return `${this}__endswith`; } },
//   /** @return {string} */ iendswith: { get() { return `${this}__iendswith`; } },
//   /** @return {string} */ regex: { get() { return `${this}__regex`; } },
//   /** @return {string} */ iregex: { get() { return `${this}__iregex`; } },
//   /** @return {string} */ lt: { get() { return `${this}__lt`; } },
//   /** @return {string} */ lte: { get() { return `${this}__lte`; } },
//   /** @return {string} */ gt: { get() { return `${this}__gt`; } },
//   /** @return {string} */ gte: { get() { return `${this}__gte`; } },
//   /** @return {string} */ in: { get() { return `${this}__in`; } },
// });


/* ========================================================================== */
/* Field Builder                                                              */
/* ========================================================================== */

/**
 * Used to construct field relationship.
 * eg. school_id__faculty_id__faculty_title
 */
class FieldBuilder {
  /**
   * Do not set parent stack manually, this field is only used internally.
   * @param {Array<String>} parentStack
   */
  constructor(parentStack = []) {
    // no need to check all values, as parentStack is only used internally.
    if (parentStack.length > 0 && parentStack[parentStack.length - 1].includes('__')) {
      throw Error('double underscores "__" should not appear in parent stack');
    }
    this.parentStack = parentStack;
  }

  /**
   * @template T
   * @param {T} Cls
   * @param {string} field
   * @return {T}
   * @protected
   */
  _getForeign(Cls, field) {
    console.log(Cls, typeof Cls, field);
    return new Cls(this.parentStack.push(field));
  }

  /**
   * @template T
   * @param {T} Cls
   * @param {string} reverse
   * @return {T}
   * @protected
   */
  _getReverse(Cls, reverse) {
    console.log(Cls, typeof Cls, reverse);
    return new Cls(this.parentStack.push(reverse));
  }

  /**
   * @param {String} field
   * @return {String}
   * @protected
   */
  _getField(field) {
    return this + field;
  }

  /**
   * @override
   * @return {string}
   */
  toString() {
    return this.parentStack.join('__');
  }
}

/* ========================================================================== */
/* Models                                                                     */
/* ========================================================================== */

/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Faculty                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class Faculty extends FieldBuilder {
  /** @return {String} */ get faculty_id()    { return this._getField('faculty_id'); }
  /** @return {String} */ get faculty_title() { return this._getField('faculty_title'); }
}

Object.defineProperties(Faculty, {
  /** @return {String} */ faculty_id:    { get() { return new Faculty().faculty_id; } },
  /** @return {String} */ faculty_title: { get() { return new Faculty().faculty_title; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* School                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class School extends FieldBuilder {
  /** @return {String}  */ get school_id()    { return this._getField('school_id'); }
  /** @return {String}  */ get school_title() { return this._getField('school_title'); }
  /** @return {Faculty} */ get faculty_id()   { return this._getForeign(Faculty, 'faculty_id'); }
}

Object.defineProperties(School, {
  /** @return {String}  */ school_id:    { get() { return new School().school_id; } },
  /** @return {String}  */ school_title: { get() { return new School().school_title; } },
  /** @return {Faculty} */ faculty_id:   { get() { return new School().faculty_id; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Course                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class Course extends FieldBuilder {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {String}         */ get course_code()      { return this._getField('course_code'); }
  /** @return {School}         */ get school_id()        { return this._getForeign(School, 'school_id'); }
}

Object.defineProperties(Course, {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {String}         */ course_code:      { get() { return new Course().course_code; } },
  /** @return {School}         */ school_id:        { get() { return new Course().school_id; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Program                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class Program extends FieldBuilder {
  /** @return {String}       */ get program_code()   { return this._getField('program_code'); }
  /** @return {String}       */ get program_title()  { return this._getField('program_title'); }
}

Object.defineProperties(Program, {
  /** @return {String}       */ program_code:   { get() { return new Program().program_code; } },
  /** @return {String}       */ program_title:  { get() { return new Program().program_title; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* ProgressOutcome                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class ProgressOutcome extends FieldBuilder {
  /** @return {String}       */ get progress_outcome_type()             { return this._getField('progress_outcome_type'); }
  /** @return {String}       */ get progress_outcome_type_description() { return this._getField('progress_outcome_type_description'); }
}

Object.defineProperties(ProgressOutcome, {
  /** @return {String}       */ progress_outcome_type:             { get() { return new ProgressOutcome().progress_outcome_type; } },
  /** @return {String}       */ progress_outcome_type_description: { get() { return new ProgressOutcome().progress_outcome_type_description; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* SecondarySchool                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class SecondarySchool extends FieldBuilder {
  /** @return {String}  */ get secondary_school_name()        { return this._getField('secondary_school_name'); }
  /** @return {String}  */ get secondary_school_quintile()    { return this._getField('secondary_school_quintile'); }
  /** @return {String}  */ get urban_rural_secondary_school() { return this._getField('urban_rural_secondary_school'); }
}

Object.defineProperties(SecondarySchool, {
  /** @return {String}  */ secondary_school_name:        { get() { return new SecondarySchool().secondary_school_name; } },
  /** @return {String}  */ secondary_school_quintile:    { get() { return new SecondarySchool().secondary_school_quintile; } },
  /** @return {String}  */ urban_rural_secondary_school: { get() { return new SecondarySchool().urban_rural_secondary_school; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Student                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class Student extends FieldBuilder {
  /** @return {String}          */ get encrypted_student_no()      { return this._getField('encrypted_student_no'); }
  /** @return {String}          */ get nationality_short_name()    { return this._getField('nationality_short_name'); }
  /** @return {String}          */ get home_language_description() { return this._getField('home_language_description'); }
  /** @return {String}          */ get race_description()          { return this._getField('race_description'); }
  /** @return {String}          */ get gender()                    { return this._getField('gender'); }
  /** @return {String}          */ get age()                       { return this._getField('age'); }
  /** @return {SecondarySchool} */ get secondary_school_name()     { return this._getForeign(SecondarySchool, 'secondary_school_name'); }
}

Object.defineProperties(Student, {
  /** @return {String}          */ encrypted_student_no:      { get() { return new Student().encrypted_student_no; } },
  /** @return {String}          */ nationality_short_name:    { get() { return new Student().nationality_short_name; } },
  /** @return {String}          */ home_language_description: { get() { return new Student().home_language_description; } },
  /** @return {String}          */ race_description:          { get() { return new Student().race_description; } },
  /** @return {String}          */ gender:                    { get() { return new Student().gender; } },
  /** @return {String}          */ age:                       { get() { return new Student().age; } },
  /** @return {SecondarySchool} */ secondary_school_name:     { get() { return new Student().secondary_school_name; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* EnrolledYear                                                               */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class EnrolledYear extends FieldBuilder {
  /** @return {Student}         */ get encrypted_student_no()   { return this._getForeign(Student, 'encrypted_student_no'); }
  /** @return {Program}         */ get program_code()           { return this._getForeign(Program, 'program_code'); }
  /** @return {String}          */ get calendar_instance_year() { return this._getField('calendar_instance_year'); }
  /** @return {String}          */ get year_of_study()          { return this._getField('year_of_study'); }
  /** @return {String}          */ get award_grade()            { return this._getField('award_grade'); }
  /** @return {String}          */ get average_marks()          { return this._getField('average_marks'); }
  /** @return {ProgressOutcome} */ get progress_outcome_type()  { return this._getForeign(ProgressOutcome, 'progress_outcome_type'); }
}

Object.defineProperties(EnrolledYear, {
  /** @return {Student}         */ encrypted_student_no:   { get() { return new EnrolledYear().encrypted_student_no; } },
  /** @return {Program}         */ program_code:           { get() { return new EnrolledYear().program_code; } },
  /** @return {String}          */ calendar_instance_year: { get() { return new EnrolledYear().calendar_instance_year; } },
  /** @return {String}          */ year_of_study:          { get() { return new EnrolledYear().year_of_study; } },
  /** @return {String}          */ award_grade:            { get() { return new EnrolledYear().award_grade; } },
  /** @return {String}          */ average_marks:          { get() { return new EnrolledYear().average_marks; } },
  /** @return {ProgressOutcome} */ progress_outcome_type:  { get() { return new EnrolledYear().progress_outcome_type; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* EnrolledCourse                                                             */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class EnrolledCourse extends FieldBuilder {
  /** @return {Student} */ get enrolled_year_id() { return this._getForeign(EnrolledYear, 'enrolled_year_id'); }
  /** @return {Course}  */ get course_code()      { return this._getForeign(Course, 'course_code'); }
  /** @return {String}  */ get final_mark()       { return this._getField('final_mark'); }
  /** @return {String}  */ get final_grade()      { return this._getField('final_grade'); }
}

Object.defineProperties(EnrolledCourse, {
  /** @return {Student} */ enrolled_year_id: { get() { return new EnrolledCourse().enrolled_year_id; } },
  /** @return {Course}  */ course_code:      { get() { return new EnrolledCourse().course_code; } },
  /** @return {String}  */ final_mark:       { get() { return new EnrolledCourse().final_mark; } },
  /** @return {String}  */ final_grade:      { get() { return new EnrolledCourse().final_grade; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Reverse Relations                                                          */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// FACULTY

Object.defineProperties(Faculty.prototype, {
  /** @return {School} */ schools: { get() { return this._getReverse(School, 'schools'); } },
});
Object.defineProperties(Faculty, {
  /** @return {School} */ schools: { get() { return new Faculty().schools; } },
});

// SCHOOL

Object.defineProperties(School.prototype, {
  /** @return {Course}  */ courses: { get() { return this._getReverse(Course, 'courses'); } },
});
Object.defineProperties(School, {
  /** @return {Course}  */ courses: { get() { return new School().courses; } },
});

// COURSE

Object.defineProperties(Course.prototype, {
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } },
});
Object.defineProperties(Course, {
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return new Course().enrolled_courses; } },
});

// PROGRAM

Object.defineProperties(Program.prototype, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});
Object.defineProperties(Program, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return new Program().enrolled_years; } },
});

// PROGRESS OUTCOME

Object.defineProperties(ProgressOutcome.prototype, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});
Object.defineProperties(ProgressOutcome, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return new ProgressOutcome().enrolled_years; } },
});

// SECONDARY SCHOOL

Object.defineProperties(SecondarySchool.prototype, {
  /** @return {Student} */ students: { get() { return this._getReverse(Student, 'students'); } },
});
Object.defineProperties(SecondarySchool, {
  /** @return {Student} */ students: { get() { return new SecondarySchool().students; } },
});

// STUDENT

Object.defineProperties(Student.prototype, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});
Object.defineProperties(Student, {
  /** @return {EnrolledYear} */ enrolled_years: { get() { return new Student().enrolled_years; } },
});

// ENROLLED YEAR

Object.defineProperties(EnrolledYear.prototype, {
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } },
});
Object.defineProperties(EnrolledYear, {
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return new EnrolledYear().enrolled_courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Properties                                                                 */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

Object.defineProperties(Faculty,         { endpoint: { writable: false, value: 'query/faculties' } });
Object.defineProperties(School,          { endpoint: { writable: false, value: 'query/schools' } });
Object.defineProperties(Course,          { endpoint: { writable: false, value: 'query/courses' } });
Object.defineProperties(Program,         { endpoint: { writable: false, value: 'query/programs' } });
Object.defineProperties(ProgressOutcome, { endpoint: { writable: false, value: 'query/outcomes' } });
Object.defineProperties(SecondarySchool, { endpoint: { writable: false, value: 'query/high-schools' } });
Object.defineProperties(Student,         { endpoint: { writable: false, value: 'query/students' } });
Object.defineProperties(EnrolledYear,    { endpoint: { writable: false, value: 'query/year-enrollment' } });
Object.defineProperties(EnrolledCourse,  { endpoint: { writable: false, value: 'query/course-enrollment' } });

Object.defineProperties(Faculty,         { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(Faculty.endpoint); } } });
Object.defineProperties(School,          { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(School.endpoint); } } });
Object.defineProperties(Course,          { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(Course.endpoint); } } });
Object.defineProperties(Program,         { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(Program.endpoint); } } });
Object.defineProperties(ProgressOutcome, { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(ProgressOutcome.endpoint); } } });
Object.defineProperties(SecondarySchool, { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(SecondarySchool.endpoint); } } });
Object.defineProperties(Student,         { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(Student.endpoint); } } });
Object.defineProperties(EnrolledYear,    { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(EnrolledYear.endpoint); } } });
Object.defineProperties(EnrolledCourse,  { /** @return {Queryset} */ query: { writable: false, value() { return new Queryset(EnrolledCourse.endpoint); } } });

/* ========================================================================== */
/* Factory                                                                    */
/* ========================================================================== */

export const MODELS = {
  faculty: Faculty,
  school: School,
  course: Course,
  program: Program,
  progress_outcome: ProgressOutcome,
  secondary_school: SecondarySchool,
  student: Student,
  enrolled_year: EnrolledYear,
  enrolled_course: EnrolledCourse,
};

/* ========================================================================== */
/* Default Export                                                             */
/* ========================================================================== */

export default {
  // forwarded from queryset
  Q,
  // classes
  Faculty,
  School,
  Course,
  Program,
  ProgressOutcome,
  SecondarySchool,
  Student,
  EnrolledYear,
  EnrolledCourse,
};
