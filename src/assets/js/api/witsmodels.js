/**
 * These data structures are intended to enable autocompletion
 * for models and fields inside webstorm at least.
 */

import { Queryset, Q } from './queryset';

/* ========================================================================== */
/* Standard Field                                                             */
/* ========================================================================== */

/*
 * sorry that this pollutes the global space...
 * but whatever...
 * I like auto-completion too much...
 */

/** @member {String} String.prototype.$exact */
/** @member {String} String.prototype.$iexact */
/** @member {String} String.prototype.$contains */
/** @member {String} String.prototype.$icontains */
/** @member {String} String.prototype.$startswith */
/** @member {String} String.prototype.$istartswith */
/** @member {String} String.prototype.$endswith */
/** @member {String} String.prototype.$iendswith */
/** @member {String} String.prototype.$regex */
/** @member {String} String.prototype.$iregex */
/** @member {String} String.prototype.$lt */
/** @member {String} String.prototype.$lte */
/** @member {String} String.prototype.$gt */
/** @member {String} String.prototype.$gte */
/** @member {String} String.prototype.$in */

Object.assign(String.prototype, {
  get $exact() { return `${this}__exact`; },
  get $iexact() { return `${this}__iexact`; },
  get $contains() { return `${this}__icontains`; },
  get $icontains() { return `${this}__icontains`; },
  get $startswith() { return `${this}__startswith`; },
  get $istartswith() { return `${this}__istartswith`; },
  get $endswith() { return `${this}__endswith`; },
  get $iendswith() { return `${this}__iendswith`; },
  get $regex() { return `${this}__regex`; },
  get $iregex() { return `${this}__iregex`; },
  get $lt() { return `${this}__lt`; },
  get $lte() { return `${this}__lte`; },
  get $gt() { return `${this}__gt`; },
  get $gte() { return `${this}__gte`; },
  get $in() { return `${this}__in`; },
});


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
   * @param {String} field
   * @return {T}
   * @protected
   */
  _getForeign(Cls, field) {
    return new Cls(this.parentStack.push(field));
  }

  /**
   * @template T
   * @param {T} Cls
   * @param {String} reverse
   * @return {T}
   * @protected
   */
  _getReverse(Cls, reverse) {
    return new Cls(this.parentStack.push(reverse));
  }

  /**
   * @param {String} field
   * @return {String}
   * @protected
   */
  _getField(field) {
    return `${this}${field}`;
  }

  /**
   * @override
   * @return {String}
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

export class Faculty extends FieldBuilder {
  /** @return {String} */ get faculty_id()    { return this._getField('faculty_id'); }
  /** @return {String} */ get faculty_title() { return this._getField('faculty_title'); }
  /* OVERRIDDEN BELOW */
  /** @return {School} */ get schools()       { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String} */ static get faculty_id()    { return new Faculty().faculty_id; }
  /** @return {String} */ static get faculty_title() { return new Faculty().faculty_title; }
  /** @return {School} */ static get schools()       { return new Faculty().schools; }
}

export class School extends FieldBuilder {
  /** @return {String}  */ get school_id()    { return this._getField('school_id'); }
  /** @return {String}  */ get school_title() { return this._getField('school_title'); }
  /** @return {Faculty} */ get faculty_id()   { return this._getForeign(Faculty, 'faculty_id'); }
  /* OVERRIDDEN BELOW */
  /** @return {Course}  */ get courses()      { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String}  */ static get school_id()    { return new School().school_id; }
  /** @return {String}  */ static get school_title() { return new School().school_title; }
  /** @return {Faculty} */ static get faculty_id()   { return new School().faculty_id; }
  /** @return {Course}  */ static get courses()      { return new School().courses; }
}

export class Course extends FieldBuilder {
  // course_title: 'course_title', NOT IMPLEMENTED IN BACKEND
  /** @return {String}         */ get course_code()      { return this._getField('course_code'); }
  /** @return {School}         */ get school_id()        { return this._getForeign(School, 'school_id'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledCourse} */ get enrolled_courses() { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String}         */ static get course_code()      { return new Course().course_code; }
  /** @return {School}         */ static get school_id()        { return new Course().school_id; }
  /** @return {EnrolledCourse} */ static get enrolled_courses() { return new Course().enrolled_courses; }
}

export class Program extends FieldBuilder {
  /** @return {String}       */ get program_code()   { return this._getField('program_code'); }
  /** @return {String}       */ get program_title()  { return this._getField('program_title'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledYear} */ get enrolled_years() { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String}       */ static get program_code()   { return new Program().program_code; }
  /** @return {String}       */ static get program_title()  { return new Program().program_title; }
  /** @return {EnrolledYear} */ static get enrolled_years() { return new Program().enrolled_years; }
}

export class ProgressOutcome extends FieldBuilder {
  /** @return {String}       */ get progress_outcome_type()             { return this._getField('progress_outcome_type'); }
  /** @return {String}       */ get progress_outcome_type_description() { return this._getField('progress_outcome_type_description'); }
  /* OVERRIDDEN BELOW */
  /** @return {EnrolledYear} */ get enrolled_years()                    { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String}       */ static get progress_outcome_type()             { return new ProgressOutcome().progress_outcome_type; }
  /** @return {String}       */ static get progress_outcome_type_description() { return new ProgressOutcome().progress_outcome_type_description; }
  /** @return {EnrolledYear} */ static get enrolled_years()                    { return new ProgressOutcome().enrolled_years; }
}

export class SecondarySchool extends FieldBuilder {
  /** @return {String}  */ get secondary_school_name()        { return this._getField('secondary_school_name'); }
  /** @return {String}  */ get secondary_school_quintile()    { return this._getField('secondary_school_quintile'); }
  /** @return {String}  */ get urban_rural_secondary_school() { return this._getField('urban_rural_secondary_school'); }
  /* OVERRIDDEN BELOW */
  /** @return {Student} */ get students()                     { throw Error(`Unimplemented Reverse Relation: ${this}`); }

  /** @return {String}  */ static get secondary_school_name()        { return new SecondarySchool().secondary_school_name; }
  /** @return {String}  */ static get secondary_school_quintile()    { return new SecondarySchool().secondary_school_quintile; }
  /** @return {String}  */ static get urban_rural_secondary_school() { return new SecondarySchool().urban_rural_secondary_school; }
  /** @return {Student} */ static get students()                     { return new SecondarySchool().students; }
}

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

  /** @return {String}          */ static get encrypted_student_no()      { return new Student().encrypted_student_no; }
  /** @return {String}          */ static get nationality_short_name()    { return new Student().nationality_short_name; }
  /** @return {String}          */ static get home_language_description() { return new Student().home_language_description; }
  /** @return {String}          */ static get race_description()          { return new Student().race_description; }
  /** @return {String}          */ static get gender()                    { return new Student().gender; }
  /** @return {String}          */ static get age()                       { return new Student().age; }
  /** @return {SecondarySchool} */ static get secondary_school_name()     { return new Student().secondary_school_name; }
  /** @return {EnrolledYear}    */ static get enrolled_years()            { return new Student().enrolled_years; }
}

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

  /** @return {Student}         */ static get encrypted_student_no()   { return new EnrolledYear().encrypted_student_no; }
  /** @return {Program}         */ static get program_code()           { return new EnrolledYear().program_code; }
  /** @return {String}          */ static get calendar_instance_year() { return new EnrolledYear().calendar_instance_year; }
  /** @return {String}          */ static get year_of_study()          { return new EnrolledYear().year_of_study; }
  /** @return {String}          */ static get award_grade()            { return new EnrolledYear().award_grade; }
  /** @return {String}          */ static get average_marks()          { return new EnrolledYear().average_marks; }
  /** @return {ProgressOutcome} */ static get progress_outcome_type()  { return new EnrolledYear().progress_outcome_type; }
  /** @return {EnrolledCourse}  */ static get enrolled_courses()       { return new EnrolledYear().enrolled_courses; }
}

export class EnrolledCourse extends FieldBuilder {
  /** @return {EnrolledYear} */ get enrolled_year_id() { return this._getForeign(EnrolledYear, 'enrolled_year_id'); }
  /** @return {Course} */       get course_code()      { return this._getForeign(Course, 'course_code'); }
  /** @return {String} */       get final_mark()       { return this._getField('final_mark'); }
  /** @return {String} */       get final_grade()      { return this._getField('final_grade'); }

  /** @return {EnrolledYear} */ static get enrolled_year_id() { return new EnrolledCourse().enrolled_year_id; }
  /** @return {Course} */       static get course_code()      { return new EnrolledCourse().course_code; }
  /** @return {String} */       static get final_mark()       { return new EnrolledCourse().final_mark; }
  /** @return {String} */       static get final_grade()      { return new EnrolledCourse().final_grade; }
}

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
