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
  /* OVERRIDDEN BELOW */
  /** @return {School} */ get schools()       { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String} Faculty.faculty_id */
/** @member {String} Faculty.faculty_title */
/** @member {School} Faculty.schools */
Object.defineProperties(Faculty, {
  faculty_id:    { get() { return new Faculty().faculty_id; } },
  faculty_title: { get() { return new Faculty().faculty_title; } },
  schools:       { get() { return new Faculty().schools; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* School                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


export class School extends FieldBuilder {
  /** @return {String}  */ get school_id()    { return this._getField('school_id'); }
  /** @return {String}  */ get school_title() { return this._getField('school_title'); }
  /** @return {Faculty} */ get faculty_id()   { return this._getForeign(Faculty, 'faculty_id'); }
  /* OVERRIDDEN BELOW */
  /** @return {Course}  */ get courses()      { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}  School.school_id */
/** @member {String}  School.school_title */
/** @member {Faculty} School.faculty_id */
/** @member {Course}  School.courses */
Object.defineProperties(School, {
  school_id:    { get() { return new School().school_id; } },
  school_title: { get() { return new School().school_title; } },
  faculty_id:   { get() { return new School().faculty_id; } },
  courses:      { get() { return new School().courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Course                                                                     */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


export class Course extends FieldBuilder {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {String}         */ get course_code()      { return this._getField('course_code'); }
  /** @return {School}         */ get school_id()        { return this._getForeign(School, 'school_id'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledCourse} */ get enrolled_courses() { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}         Course.course_code */
/** @member {School}         Course.school_id */
/** @member {EnrolledCourse} Course.enrolled_courses */
Object.defineProperties(Course, {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  course_code:      { get() { return new Course().course_code; } },
  school_id:        { get() { return new Course().school_id; } },
  enrolled_courses: { get() { return new Course().enrolled_courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Program                                                                    */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class Program extends FieldBuilder {
  /** @return {String}       */ get program_code()   { return this._getField('program_code'); }
  /** @return {String}       */ get program_title()  { return this._getField('program_title'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledYear} */ get enrolled_years() { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}       Program.program_code */
/** @member {String}       Program.program_title */
/** @member {EnrolledYear} Program.enrolled_years */
Object.defineProperties(Program, {
  program_code:   { get() { return new Program().program_code; } },
  program_title:  { get() { return new Program().program_title; } },
  enrolled_years: { get() { return new Program().enrolled_years; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* ProgressOutcome                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class ProgressOutcome extends FieldBuilder {
  /** @return {String}       */ get progress_outcome_type()             { return this._getField('progress_outcome_type'); }
  /** @return {String}       */ get progress_outcome_type_description() { return this._getField('progress_outcome_type_description'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledYear} */ get enrolled_years()                    { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}       ProgressOutcome.progress_outcome_type */
/** @member {String}       ProgressOutcome.progress_outcome_type_description */
/** @member {EnrolledYear} ProgressOutcome.enrolled_years */
Object.defineProperties(ProgressOutcome, {
  progress_outcome_type:             { get() { return new ProgressOutcome().progress_outcome_type; } },
  progress_outcome_type_description: { get() { return new ProgressOutcome().progress_outcome_type_description; } },
  enrolled_years:                    { get() { return new ProgressOutcome().enrolled_years; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* SecondarySchool                                                            */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

export class SecondarySchool extends FieldBuilder {
  /** @return {String}  */ get secondary_school_name()        { return this._getField('secondary_school_name'); }
  /** @return {String}  */ get secondary_school_quintile()    { return this._getField('secondary_school_quintile'); }
  /** @return {String}  */ get urban_rural_secondary_school() { return this._getField('urban_rural_secondary_school'); }
  /* OVERRIDDEN BELOW */
  /** @return {Student} */ get students()                     { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}  SecondarySchool.secondary_school_name */
/** @member {String}  SecondarySchool.secondary_school_quintile */
/** @member {String}  SecondarySchool.urban_rural_secondary_school */
/** @member {Student} SecondarySchool.students */
Object.defineProperties(SecondarySchool, {
  secondary_school_name:        { get() { return new SecondarySchool().secondary_school_name; } },
  secondary_school_quintile:    { get() { return new SecondarySchool().secondary_school_quintile; } },
  urban_rural_secondary_school: { get() { return new SecondarySchool().urban_rural_secondary_school; } },
  students:                     { get() { return new SecondarySchool().students; } },
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
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledYear}    */ get enrolled_years()            { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {String}          Student.encrypted_student_no */
/** @member {String}          Student.nationality_short_name */
/** @member {String}          Student.home_language_description */
/** @member {String}          Student.race_description */
/** @member {String}          Student.gender */
/** @member {String}          Student.age */
/** @member {SecondarySchool} Student.secondary_school_name */
/** @member {EnrolledYear}    Student.enrolled_years */
Object.defineProperties(Student, {
  encrypted_student_no:      { get() { return new Student().encrypted_student_no; } },
  nationality_short_name:    { get() { return new Student().nationality_short_name; } },
  home_language_description: { get() { return new Student().home_language_description; } },
  race_description:          { get() { return new Student().race_description; } },
  gender:                    { get() { return new Student().gender; } },
  age:                       { get() { return new Student().age; } },
  secondary_school_name:     { get() { return new Student().secondary_school_name; } },
  enrolled_years:            { get() { return new Student().enrolled_years; } },
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
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledCourse}  */ get enrolled_courses()       { throw Error(`Unimplemented Reverse Relation: ${this}`); }
}

/** @member {Student}         EnrolledYear.encrypted_student_no */
/** @member {Program}         EnrolledYear.program_code */
/** @member {String}          EnrolledYear.calendar_instance_year */
/** @member {String}          EnrolledYear.year_of_study */
/** @member {String}          EnrolledYear.award_grade */
/** @member {String}          EnrolledYear.average_marks */
/** @member {ProgressOutcome} EnrolledYear.progress_outcome_type */
/** @member {EnrolledCourse}  EnrolledYear.enrolled_courses */
Object.defineProperties(EnrolledYear, {
  encrypted_student_no:   { get() { return new EnrolledYear().encrypted_student_no; } },
  program_code:           { get() { return new EnrolledYear().program_code; } },
  calendar_instance_year: { get() { return new EnrolledYear().calendar_instance_year; } },
  year_of_study:          { get() { return new EnrolledYear().year_of_study; } },
  award_grade:            { get() { return new EnrolledYear().award_grade; } },
  average_marks:          { get() { return new EnrolledYear().average_marks; } },
  progress_outcome_type:  { get() { return new EnrolledYear().progress_outcome_type; } },
  enrolled_courses:       { get() { return new EnrolledYear().enrolled_courses; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* EnrolledCourse                                                             */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


export class EnrolledCourse extends FieldBuilder {
  /** @return {EnrolledYear} */ get enrolled_year_id() { return this._getForeign(EnrolledYear, 'enrolled_year_id'); }
  /** @return {Course} */       get course_code()      { return this._getForeign(Course, 'course_code'); }
  /** @return {String} */       get final_mark()       { return this._getField('final_mark'); }
  /** @return {String} */       get final_grade()      { return this._getField('final_grade'); }
}

/** @member {EnrolledYear} EnrolledCourse.enrolled_year_id */
/** @member {Course}       EnrolledCourse.course_code */
/** @member {String}       EnrolledCourse.final_mark */
/** @member {string}       EnrolledCourse.final_grade */
Object.defineProperties(EnrolledCourse, {
  enrolled_year_id: { get() { return new EnrolledCourse().enrolled_year_id; } },
  course_code:      { get() { return new EnrolledCourse().course_code; } },
  final_mark:       { get() { return new EnrolledCourse().final_mark; } },
  final_grade:      { get() { return new EnrolledCourse().final_grade; } },
});

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Reverse Relations                                                          */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

/* FACULTY */          Object.defineProperties(Faculty.prototype,         { /** @return {School} */         schools:          { get() { return this._getReverse(School, 'schools'); } } });
/* SCHOOL */           Object.defineProperties(School.prototype,          { /** @return {Course} */         courses:          { get() { return this._getReverse(Course, 'courses'); } } });
/* COURSE */           Object.defineProperties(Course.prototype,          { /** @return {EnrolledCourse} */ enrolled_courses: { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } } });
/* PROGRAM */          Object.defineProperties(Program.prototype,         { /** @return {EnrolledYear} */   enrolled_years:   { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } } });
/* PROGRESS OUTCOME */ Object.defineProperties(ProgressOutcome.prototype, { /** @return {EnrolledYear} */   enrolled_years:   { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } } });
/* SECONDARY SCHOOL */ Object.defineProperties(SecondarySchool.prototype, { /** @return {Student} */        students:         { get() { return this._getReverse(Student, 'students'); } } });
/* STUDENT */          Object.defineProperties(Student.prototype,         { /** @return {EnrolledYear} */   enrolled_years:   { get() { return this._getReverse(EnrolledYear, 'enrolled_years'); } } });
/* ENROLLED YEAR */    Object.defineProperties(EnrolledYear.prototype,    { /** @return {EnrolledCourse} */ enrolled_courses: { get() { return this._getReverse(EnrolledCourse, 'enrolled_courses'); } } });

/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
/* Properties                                                                 */
/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

/** @member {String} Faculty        .endpoint */ Object.defineProperty(Faculty,         'endpoint', { get() { return 'query/faculties'; } });
/** @member {String} School         .endpoint */ Object.defineProperty(School,          'endpoint', { get() { return 'query/schools'; } });
/** @member {String} Course         .endpoint */ Object.defineProperty(Course,          'endpoint', { get() { return 'query/courses'; } });
/** @member {String} Program        .endpoint */ Object.defineProperty(Program,         'endpoint', { get() { return 'query/programs'; } });
/** @member {String} ProgressOutcome.endpoint */ Object.defineProperty(ProgressOutcome, 'endpoint', { get() { return 'query/outcomes'; } });
/** @member {String} SecondarySchool.endpoint */ Object.defineProperty(SecondarySchool, 'endpoint', { get() { return 'query/high-schools'; } });
/** @member {String} Student        .endpoint */ Object.defineProperty(Student,         'endpoint', { get() { return 'query/students'; } });
/** @member {String} EnrolledYear   .endpoint */ Object.defineProperty(EnrolledYear,    'endpoint', { get() { return 'query/year-enrollment'; } });
/** @member {String} EnrolledCourse .endpoint */ Object.defineProperty(EnrolledCourse,  'endpoint', { get() { return 'query/course-enrollment'; } });

/** @member {Queryset} Faculty        .query */ Object.defineProperty(Faculty,         'query', { get() { return new Queryset(Faculty.endpoint); } });
/** @member {Queryset} School         .query */ Object.defineProperty(School,          'query', { get() { return new Queryset(School.endpoint); } });
/** @member {Queryset} Course         .query */ Object.defineProperty(Course,          'query', { get() { return new Queryset(Course.endpoint); } });
/** @member {Queryset} Program        .query */ Object.defineProperty(Program,         'query', { get() { return new Queryset(Program.endpoint); } });
/** @member {Queryset} ProgressOutcome.query */ Object.defineProperty(ProgressOutcome, 'query', { get() { return new Queryset(ProgressOutcome.endpoint); } });
/** @member {Queryset} SecondarySchool.query */ Object.defineProperty(SecondarySchool, 'query', { get() { return new Queryset(SecondarySchool.endpoint); } });
/** @member {Queryset} Student        .query */ Object.defineProperty(Student,         'query', { get() { return new Queryset(Student.endpoint); } });
/** @member {Queryset} EnrolledYear   .query */ Object.defineProperty(EnrolledYear,    'query', { get() { return new Queryset(EnrolledYear.endpoint); } });
/** @member {Queryset} EnrolledCourse .query */ Object.defineProperty(EnrolledCourse,  'query', { get() { return new Queryset(EnrolledCourse.endpoint); } });

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
