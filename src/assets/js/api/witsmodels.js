/**
 * These data structures are intended to enable autocompletion
 * for models and fields inside webstorm at least.
 */

/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */

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
 *
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {FieldBuilder}
 * @constructor
 */
function FieldBuilder(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof FieldBuilder)) { return new FieldBuilder(parentStack); }
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
FieldBuilder.prototype._getForeign = function (Cls, field) {
  return new Cls(this.parentStack.push(field));
};

/**
 * @template T
 * @param {T} Cls
 * @param {string} reverse
 * @return {T}
 * @protected
 */
FieldBuilder.prototype._getReverse = function (Cls, reverse) {
  return new Cls(this.parentStack.push(reverse));
};

/**
 * @param {string} field
 * @return {string}
 * @protected
 */
FieldBuilder.prototype._getField = function (field) {
  return this + field;
};

/**
 * @override
 * @return {string}
 */
FieldBuilder.prototype.toString = function () {
  return this.parentStack.join('__');
};


/* ========================================================================== */
/* Models                                                                     */
/* ========================================================================== */

// DEFINE BEFOREHAND BECAUSE THERE ARE CYCLIC RELATIONSHIPS BETWEEN THEM
// es6 classes will not work in this situation. (too my knowledge)

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {Faculty}
 * @constructor
 */
export function Faculty(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof Faculty)) { return new Faculty(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {School}
 * @constructor
 */
export function School(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof School)) { return new School(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {Course}
 * @constructor
 */
export function Course(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof Course)) { return new Course(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {Program}
 * @constructor
 */
export function Program(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof Program)) { return new Program(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {ProgressOutcome}
 * @constructor
 */
export function ProgressOutcome(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof ProgressOutcome)) { return new ProgressOutcome(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {SecondarySchool}
 * @constructor
 */
export function SecondarySchool(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof SecondarySchool)) { return new SecondarySchool(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {Student}
 * @constructor
 */
export function Student(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof Student)) { return new Student(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {EnrolledYear}
 * @constructor
 */
export function EnrolledYear(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof EnrolledYear)) { return new EnrolledYear(parentStack); }
  FieldBuilder.call(this, parentStack);
}

/**
 * Do not set parent stack manually, this field is only used internally.
 * @param {Array<string>} parentStack
 * @return {EnrolledCourse}
 * @constructor
 */
export function EnrolledCourse(parentStack = []) {
  // Check if "new" keyword is not used on this constructor.
  if (!(this instanceof EnrolledCourse)) { return new EnrolledCourse(parentStack); }
  FieldBuilder.call(this, parentStack);
}


// INHERIT FROM FIELD_BUILDER

Faculty.prototype = Object.create(FieldBuilder.prototype);
School.prototype = Object.create(FieldBuilder.prototype);
Course.prototype = Object.create(FieldBuilder.prototype);
Program.prototype = Object.create(FieldBuilder.prototype);
ProgressOutcome.prototype = Object.create(FieldBuilder.prototype);
SecondarySchool.prototype = Object.create(FieldBuilder.prototype);
Student.prototype = Object.create(FieldBuilder.prototype);
EnrolledYear.prototype = Object.create(FieldBuilder.prototype);
EnrolledCourse.prototype = Object.create(FieldBuilder.prototype);

// Object.setPrototypeOf(Faculty,         FieldBuilder);
// Object.setPrototypeOf(School,          FieldBuilder);
// Object.setPrototypeOf(Course,          FieldBuilder);
// Object.setPrototypeOf(Program,         FieldBuilder);
// Object.setPrototypeOf(ProgressOutcome, FieldBuilder);
// Object.setPrototypeOf(SecondarySchool, FieldBuilder);
// Object.setPrototypeOf(Student,         FieldBuilder);
// Object.setPrototypeOf(EnrolledYear,    FieldBuilder);
// Object.setPrototypeOf(EnrolledCourse,  FieldBuilder);

// STATIC - ENDPOINTS

Faculty.endpoint         = 'query/faculties';
School.endpoint          = 'query/schools';
Course.endpoint          = 'query/courses';
Program.endpoint         = 'query/programs';
ProgressOutcome.endpoint = 'query/outcomes';
SecondarySchool.endpoint = 'query/high-schools';
Student.endpoint         = 'query/students';
EnrolledYear.endpoint    = 'query/year-enrollment';
EnrolledCourse.endpoint  = 'query/course-enrollment';

// STATIC - QUERYSETS

/** @return {Queryset} */ Faculty.query         = function () { return new Queryset(Faculty.endpoint); };
/** @return {Queryset} */ School.query          = function () { return new Queryset(School.endpoint); };
/** @return {Queryset} */ Course.query          = function () { return new Queryset(Course.endpoint); };
/** @return {Queryset} */ Program.query         = function () { return new Queryset(Program.endpoint); };
/** @return {Queryset} */ ProgressOutcome.query = function () { return new Queryset(ProgressOutcome.endpoint); };
/** @return {Queryset} */ SecondarySchool.query = function () { return new Queryset(SecondarySchool.endpoint); };
/** @return {Queryset} */ Student.query         = function () { return new Queryset(Student.endpoint); };
/** @return {Queryset} */ EnrolledYear.query    = function () { return new Queryset(EnrolledYear.endpoint); };
/** @return {Queryset} */ EnrolledCourse.query  = function () { return new Queryset(EnrolledCourse.endpoint); };

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Faculty                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new Faculty(). | Faculty().

Object.defineProperties(Faculty.prototype, {
  /** @return {string} */ faculty_id:    { get() { return this._getField('faculty_id'); } },
  /** @return {string} */ faculty_title: { get() { return this._getField('faculty_title'); } },
  /** @return {School} */ schools:       { get() { return this._getReverse(School, 'schools'); } },
});

// Faculty.

Object.defineProperties(Faculty, {
  /** @return {string} */ faculty_id:    { get() { return new Faculty().faculty_id; } },
  /** @return {string} */ faculty_title: { get() { return new Faculty().faculty_title; } },
  /** @return {School} */ schools:       { get() { return new Faculty().schools; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* School                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new School(). | School().

Object.defineProperties(School.prototype, {
  /** @return {string}  */ school_id:    { get() { return this._getField('school_id'); } },
  /** @return {string}  */ school_title: { get() { return this._getField('school_title'); } },
  /** @return {Faculty} */ faculty_id:   { get() { return this._getForeign(Faculty, 'faculty_id'); } },
  /** @return {Course}  */ courses:      { get() { return this._getReverse(Course, 'courses'); } },
});

// School.

Object.defineProperties(School, {
  /** @return {string}  */ school_id:    { get() { return new School().school_id; } },
  /** @return {string}  */ school_title: { get() { return new School().school_title; } },
  /** @return {Faculty} */ faculty_id:   { get() { return new School().faculty_id; } },
  /** @return {Course}  */ courses:      { get() { return new School().courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Course                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new Course(). | Course().

Object.defineProperties(Course.prototype, {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {string}         */ course_code:      { get() { return this._getField('course_code'); } },
  /** @return {School}         */ school_id:        { get() { return this._getForeign(School, 'school_id'); } },
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } },
});

// Course.

Object.defineProperties(Course, {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {string}         */ course_code:      { get() { return new Course().course_code; } },
  /** @return {School}         */ school_id:        { get() { return new Course().school_id; } },
  /** @return {EnrolledCourse} */ enrolled_courses: { get() { return new Course().enrolled_courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Program                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new Program(). | Program().

Object.defineProperties(Program.prototype, {
  /** @return {string}       */ program_code:   { get() { return this._getField('program_code'); } },
  /** @return {string}       */ program_title:  { get() { return this._getField('program_title'); } },
  /** @return {EnrolledYear} */ enrolled_years: { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});

// Program.

Object.defineProperties(Program, {
  /** @return {string}       */ program_code:   { get() { return new Program().program_code; } },
  /** @return {string}       */ program_title:  { get() { return new Program().program_title; } },
  /** @return {EnrolledYear} */ enrolled_years: { get() { return new Program().enrolled_years; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* ProgressOutcome                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new ProgressOutcome(). | ProgressOutcome().

Object.defineProperties(ProgressOutcome.prototype, {
  /** @return {string}       */ progress_outcome_type:             { get() { return this._getField('progress_outcome_type'); } },
  /** @return {string}       */ progress_outcome_type_description: { get() { return this._getField('progress_outcome_type_description'); } },
  /** @return {EnrolledYear} */ enrolled_years:                    { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});

// ProgressOutcome.

Object.defineProperties(ProgressOutcome, {
  /** @return {string}       */ progress_outcome_type:             { get() { return new ProgressOutcome().progress_outcome_type; } },
  /** @return {string}       */ progress_outcome_type_description: { get() { return new ProgressOutcome().progress_outcome_type_description; } },
  /** @return {EnrolledYear} */ enrolled_years:                    { get() { return new ProgressOutcome().enrolled_years; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* SecondarySchool                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new SecondarySchool(). | SecondarySchool().

Object.defineProperties(SecondarySchool.prototype, {
  /** @return {string}  */ secondary_school_name:        { get() { return this._getField('secondary_school_name'); } },
  /** @return {string}  */ secondary_school_quintile:    { get() { return this._getField('secondary_school_quintile'); } },
  /** @return {string}  */ urban_rural_secondary_school: { get() { return this._getField('urban_rural_secondary_school'); } },
  /** @return {Student} */ students:                     { get() { return this._getReverse(Student, 'students'); } },
});

// SecondarySchool.

Object.defineProperties(SecondarySchool, {
  /** @return {string}  */ secondary_school_name:        { get() { return new SecondarySchool().secondary_school_name; } },
  /** @return {string}  */ secondary_school_quintile:    { get() { return new SecondarySchool().secondary_school_quintile; } },
  /** @return {string}  */ urban_rural_secondary_school: { get() { return new SecondarySchool().urban_rural_secondary_school; } },
  /** @return {Student} */ students:                     { get() { return new SecondarySchool().students; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Student                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new Student(). | Student().

Object.defineProperties(Student.prototype, {
  /** @return {string}          */ encrypted_student_no:      { get() { return this._getField('encrypted_student_no'); } },
  /** @return {string}          */ nationality_short_name:    { get() { return this._getField('nationality_short_name'); } },
  /** @return {string}          */ home_language_description: { get() { return this._getField('home_language_description'); } },
  /** @return {string}          */ race_description:          { get() { return this._getField('race_description'); } },
  /** @return {string}          */ gender:                    { get() { return this._getField('gender'); } },
  /** @return {string}          */ age:                       { get() { return this._getField('age'); } },
  /** @return {SecondarySchool} */ secondary_school_name:     { get() { return this._getForeign(SecondarySchool, 'secondary_school_name'); } },
  /** @return {EnrolledYear}    */ enrolled_years:            { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } },
});

// Student.

Object.defineProperties(Student, {
  /** @return {string}          */ encrypted_student_no:      { get() { return new Student().encrypted_student_no; } },
  /** @return {string}          */ nationality_short_name:    { get() { return new Student().nationality_short_name; } },
  /** @return {string}          */ home_language_description: { get() { return new Student().home_language_description; } },
  /** @return {string}          */ race_description:          { get() { return new Student().race_description; } },
  /** @return {string}          */ gender:                    { get() { return new Student().gender; } },
  /** @return {string}          */ age:                       { get() { return new Student().age; } },
  /** @return {SecondarySchool} */ secondary_school_name:     { get() { return new Student().secondary_school_name; } },
  /** @return {EnrolledYear}    */ enrolled_years:            { get() { return new Student().enrolled_years; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* EnrolledYear                                                               */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new EnrolledYear(). | EnrolledYear().

Object.defineProperties(EnrolledYear.prototype, {
  /** @return {Student}         */ encrypted_student_no:   { get() { return this._getForeign(Student, 'encrypted_student_no'); } },
  /** @return {Program}         */ program_code:           { get() { return this._getForeign(Program, 'program_code'); } },
  /** @return {string}          */ calendar_instance_year: { get() { return this._getField('calendar_instance_year'); } },
  /** @return {string}          */ year_of_study:          { get() { return this._getField('year_of_study'); } },
  /** @return {string}          */ award_grade:            { get() { return this._getField('award_grade'); } },
  /** @return {string}          */ average_marks:          { get() { return this._getField('average_marks'); } },
  /** @return {ProgressOutcome} */ progress_outcome_type:  { get() { return this._getForeign(ProgressOutcome, 'progress_outcome_type'); } },
  /** @return {EnrolledCourse}  */ enrolled_courses:       { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } },
});

// EnrolledYear.

Object.defineProperties(EnrolledYear, {
  get encrypted_student_no() { return new EnrolledYear().encrypted_student_no; },
  /** @return {Student}         */ program_code:           { get() { return new EnrolledYear().program_code; } },
  /** @return {Program}         */ calendar_instance_year: { get() { return new EnrolledYear().calendar_instance_year; } },
  /** @return {string}          */ year_of_study:          { get() { return new EnrolledYear().year_of_study; } },
  /** @return {string}          */ award_grade:            { get() { return new EnrolledYear().award_grade; } },
  /** @return {string}          */ average_marks:          { get() { return new EnrolledYear().average_marks; } },
  /** @return {string}          */ progress_outcome_type:  { get() { return new EnrolledYear().progress_outcome_type; } },
  /** @return {ProgressOutcome} */ enrolled_courses:       { get() { return new EnrolledYear().enrolled_courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* EnrolledCourse                                                             */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

// new EnrolledCourse(). | EnrolledCourse().

Object.defineProperties(EnrolledCourse.prototype, {
  /** @return {Student} */ enrolled_year_id: { get() { return this._getForeign(EnrolledYear, 'enrolled_year_id'); } },
  /** @return {Course}  */ course_code:      { get() { return this._getForeign(Course, 'course_code'); } },
  /** @return {string}  */ final_mark:       { get() { return this._getField('final_mark'); } },
  /** @return {string}  */ final_grade:      { get() { return this._getField('final_grade'); } },
});

// EnrolledCourse.

Object.defineProperties(EnrolledCourse, {
  /** @return {Student} */ enrolled_year_id: { get() { return new EnrolledCourse().enrolled_year_id; } },
  /** @return {Course}  */ course_code:      { get() { return new EnrolledCourse().course_code; } },
  /** @return {string}  */ final_mark:       { get() { return new EnrolledCourse().final_mark; } },
  /** @return {string}  */ final_grade:      { get() { return new EnrolledCourse().final_grade; } },
});

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
  // Field,
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
