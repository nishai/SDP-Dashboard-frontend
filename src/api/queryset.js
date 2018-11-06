
import _ from 'lodash';

import axios from 'axios';

/* ========================================================================== */
/* Axios                                                                      */
/* ========================================================================== */

const requester = axios.create({
  baseURL: `http://${process.env.VUE_APP_API}/`,
  timeout: 10000,
});

/* ========================================================================== */
/* Helper                                                                     */
/* ========================================================================== */

function stringOrExprArray(fields, minItems = 1) {
  if (fields.length <= minItems) {
    throw new Error(`must have ${minItems} or more fields`);
  }
  for (let i = 0; i < fields.length; i += 1) {
    const item = fields[i];
    if (typeof item === 'string') {
      // continue
    } else if (typeof item === 'object') {
      if (!('field' in item || 'expr' in item)) {
        throw new Error("'field' and 'expr' must be in the object");
      }
    } else {
      throw new Error('Invalid Type');
    }
  }
  return fields;
}

function stringArray(fields, minItems = 1) {
  if (fields.length <= minItems) {
    throw new Error(`must have ${minItems} or more fields`);
  }
  for (let i = 0; i < fields.length; i += 1) {
    const item = fields[i];
    if (typeof item === 'string') {
      // continue
    } else {
      throw new Error('Invalid Type');
    }
  }
  return fields;
}

function exprArray(fields, minItems = 1) {
  if (fields.length <= minItems) {
    throw new Error(`must have ${minItems} or more fields`);
  }
  for (let i = 0; i < fields.length; i += 1) {
    const item = fields[i];
    if (typeof item === 'object') {
      if (!('field' in item || 'expr' in item)) {
        throw new Error("'field' and 'expr' must be in the object");
      }
    } else {
      throw new Error('Invalid Type');
    }
  }
  return fields;
}

/* ========================================================================== */
/* Queryset                                                                   */
/* ========================================================================== */

class Queryset {
  constructor(endpoint) {
    this._endpoint = endpoint.replace(/^[/]/g, '');
    this._queryset = [];
  }

  /* COMPUTED PROPS */

  get data() {
    return { 'queryset': this._queryset };
  }

  /* QUERY */

  clone() {
    return _.cloneDeep(this);
  }

  post(fake = false) {
    return requester.post(`${this._endpoint}?fake=${fake ? 1 : 0}`, { 'queryset': this.data });
  }

  options() {
    return requester.post(this._endpoint, { 'queryset': this.data });
  }

  /* QUERYSET BUILDER */

  filter(...fields) {
    this._queryset.push({
      'action': 'filter',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  exclude(...fields) {
    this._queryset.push({
      'action': 'exclude',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  annotate(...fields) {
    this._queryset.push({
      'action': 'annotate',
      'fields': exprArray(fields, 0),
    });
    return this;
  }

  values(...fields) {
    this._queryset.push({
      'action': 'values',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  valuesList(flat = false, named = false, ...fields) {
    if (flat && named) {
      throw new Error("Both 'flat' and 'named' cannot be true");
    }
    this._queryset.push({
      'action': 'values_list',
      'fields': stringArray(fields, 0),
      'flat': flat,
      'named': named,
    });
    return this;
  }

  orderBy(...fields) {
    for (let i = 0; i < fields.length; i += 1) {
      const item = fields[i];
      if (!('field' in item)) {
        throw new Error('field not present');
      }
      if (!('descending' in item)) {
        // continue
      }
    }
    this._queryset.push({
      'action': 'order_by',
      'fields': fields,
    });
    return this;
  }

  limit(type, num, index) {
    if (type === 'page' || type === 'first' || type === 'last') {
      this._queryset.push({
        'action': 'limit',
        type,
        num,
        index,
      });
    } else {
      throw new Error('Invalid limit');
    }
    return this;
  }

  distinct(...fields) {
    this._queryset.push({
      'action': 'distinct',
      'fields': stringArray(fields, 0),
    });
    return this;
  }

  reverse() {
    this._queryset.push({
      'action': 'reverse',
    });
    return this;
  }

  all() {
    this._queryset.push({
      'action': 'all',
    });
    return this;
  }

  none() {
    this._queryset.push({
      'action': 'none',
    });
    return this;
  }
}

/* ========================================================================== */
/* Vars                                                                       */
/* ========================================================================== */


const nameToEndpoint = {
  faculty: 'query/faculties',
  school: 'query/schools',
  course: 'query/courses',
  program: 'query/programs',
  outcome: 'query/outcomes',
  highschool: 'query/high-schools',
  student: 'query/students',
  enrolledyear: 'query/year-enrollment',
  enrolledcourse: 'query/course-enrollment',
};

// const nameToGenerator = {};
// Object.keys(nameToEndpoint).forEach((key) => {
//   nameToGenerator[key] = (function temp() { return Queryset(nameToEndpoint[key]); });
// });

/* EXPORT */

export default {
  Queryset,
  QueryFactory: {
    faculty() { return Queryset(nameToEndpoint.faculty); },
    school() { return Queryset(nameToEndpoint.school); },
    course() { return Queryset(nameToEndpoint.course); },
    program() { return Queryset(nameToEndpoint.program); },
    outcome() { return Queryset(nameToEndpoint.outcome); },
    highschool() { return Queryset(nameToEndpoint.highschool); },
    student() { return Queryset(nameToEndpoint.student); },
    enrolledyear() { return Queryset(nameToEndpoint.enrolledyear); },
    enrolledcourse() { return Queryset(nameToEndpoint.enrolledcourse); },
  },
  nameToEndpoint,
};
