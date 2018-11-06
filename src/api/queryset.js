
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

/**
 * @param {Array} fields
 * @param {Integer} minItems
 * @return {Array} fields
 */
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

/**
 * @param {Array} fields
 * @param {Integer} minItems
 * @return {Array} fields
 */
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

/**
 * @param {Array} fields
 * @param {Integer} minItems
 * @return {Array} fields
 */
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

export class Queryset {
  /**
   * @param endpoint
   */
  constructor(endpoint) {
    this._endpoint = endpoint.replace(/^[/]/g, '');
    this._queryset = [];
  }

  /* COMPUTED PROPS */

  /**
   * @return {{queryset: Array}}
   */
  get data() {
    return { 'queryset': this._queryset };
  }

  /* QUERY */

  /**
   * @return {Queryset}
   */
  clone() {
    return _.cloneDeep(this);
  }

  /**
   * @param fake
   * @return {AxiosPromise<any>}
   */
  POST(fake = false) {
    return requester.post(`${this._endpoint}?fake=${fake ? 1 : 0}`, { 'queryset': this.data });
  }

  /**
   * @return {AxiosPromise<any>}
   */
  OPTIONS() {
    return requester.post(this._endpoint, { 'queryset': this.data });
  }

  /* QUERYSET BUILDER */

  /**
   * @param fields
   * @return {Queryset}
   */
  filter(...fields) {
    this._queryset.push({
      'action': 'filter',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  /**
   * @param fields
   * @return {Queryset}
   */
  exclude(...fields) {
    this._queryset.push({
      'action': 'exclude',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  /**
   * @param fields
   * @return {Queryset}
   */
  annotate(...fields) {
    this._queryset.push({
      'action': 'annotate',
      'fields': exprArray(fields, 0),
    });
    return this;
  }

  /**
   * @param fields
   * @return {Queryset}
   */
  values(...fields) {
    this._queryset.push({
      'action': 'values',
      'fields': stringOrExprArray(fields, 1),
    });
    return this;
  }

  /**
   * @param flat
   * @param named
   * @param fields
   * @return {Queryset}
   */
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

  /**
   * @param fields
   * @return {Queryset}
   */
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

  /**
   * @param type
   * @param num
   * @param index
   * @return {Queryset}
   */
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

  /**
   * @param fields
   * @return {Queryset}
   */
  distinct(...fields) {
    this._queryset.push({
      'action': 'distinct',
      'fields': stringArray(fields, 0),
    });
    return this;
  }

  /**
   * @return {Queryset}
   */
  reverse() {
    this._queryset.push({
      'action': 'reverse',
    });
    return this;
  }

  /**
   * @return {Queryset}
   */
  all() {
    this._queryset.push({
      'action': 'all',
    });
    return this;
  }

  /**
   * @return {Queryset}
   */
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


export const nameToEndpoint = {
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

export const QuerysetFactory = {
  /** @return {Queryset} */
  faculty() { return new Queryset(nameToEndpoint.faculty); },
  /** @return {Queryset} */
  school() { return new Queryset(nameToEndpoint.school); },
  /** @return {Queryset} */
  course() { return new Queryset(nameToEndpoint.course); },
  /** @return {Queryset} */
  program() { return new Queryset(nameToEndpoint.program); },
  /** @return {Queryset} */
  outcome() { return new Queryset(nameToEndpoint.outcome); },
  /** @return {Queryset} */
  highschool() { return new Queryset(nameToEndpoint.highschool); },
  /** @return {Queryset} */
  student() { return new Queryset(nameToEndpoint.student); },
  /** @return {Queryset} */
  enrolledyear() { return new Queryset(nameToEndpoint.enrolledyear); },
  /** @return {Queryset} */
  enrolledcourse() { return new Queryset(nameToEndpoint.enrolledcourse); },
};

export default {
  Queryset,
  QuerysetFactory,
  nameToEndpoint,
};
