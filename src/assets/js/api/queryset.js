
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
/* Query & Functions                                                          */
/* ========================================================================== */

export class Q {
  constructor(meta = null, expr = null) {
    this.meta = meta;
    this.expr = expr;

    this.l = null;
    this.r = null;
    this.negated = false;
    this.operator = null;
  }

  /**
   * @param {String|Q} rOrMeta
   * @param {String|null} expr
   * @param {String} operator
   * @return {Q}
   * @private
   */
  _join(rOrMeta, expr = null, operator) {
    let r = rOrMeta;
    if (expr !== null) {
      if (typeof rOrMeta !== 'string' || typeof expr !== 'string') {
        throw Error('Two args only must both be strings, One arg only must be an instance of Q');
      }
      r = new Q(rOrMeta, expr);
    }
    if (!(r instanceof Q)) {
      throw Error('Must be another Query');
    }
    const parent = new Q();
    parent.operator = operator;
    parent.r = r;
    parent.l = this;
    return parent;
  }

  /**
   * @param {String|Q} rOrMeta
   * @param {String|null} expr
   * @return {Q}
   */
  and(rOrMeta, expr = null) {
    return this._join(rOrMeta, expr, '&');
  }

  /**
   * @param {String|Q} rOrMeta
   * @param {String|null} expr
   * @return {Q}
   */
  or(rOrMeta, expr = null) {
    return this._join(rOrMeta, expr, '|');
  }

  /**
   * @return {Q}
   */
  not() {
    this.negated = !this.negated;
    return this;
  }

  /**
   * @param {Array} stack
   * @return {Array}
   */
  toRpnArray(stack = []) {
    if (!!this.l && !!this.r) { // children present
      if (!this.l || !this.r || !(this.operator === '|' || this.operator === '&') || this.meta || this.expr) { // overly verbose, but i was too lazy to make a separate class for operators
        throw Error('Runtime Error');
      }
      this.l.toRpnArray(stack);
      this.r.toRpnArray(stack);
      stack.push(this.operator);
    } else { // no children
      if (this.l || this.r || this.operator !== null || !this.meta || !this.expr) { // overly verbose, but i was too lazy to make a separate class for operators
        throw Error('Runtime Error');
      }
      stack.push({
        'meta': this.meta,
        'expr': this.expr,
      });
    }
    if (this.negated) {
      stack.push('~');
    }
    return stack;
  }
}

/* ========================================================================== */
/* Helper                                                                     */
/* ========================================================================== */

/**
 * @param {Array} array
 * @param {Integer} minItems
 * @param {Array<Function>} functions
 * @return {Array}
 */
function checkArray(array, minItems, functions) {
  if (array.length < minItems) {
    throw new Error(`must have ${minItems} or more fields`);
  }
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    let flag = false;
    for (let j = 0; j < functions.length; j += 1) {
      const func = functions[j];
      if (func(item)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      throw new Error('Invalid Type');
    }
  }
  return array;
}

/**
 * @param {Array} array
 * @param {Integer} minItems
 * @return {Array} fields
 */
function stringOrFilterArray(array, minItems = 1) {
  return checkArray(array, minItems, [
    (x) => typeof x === 'string',
    (x) => typeof x === 'object' && 'meta' in x && 'expr' in x,
  ]);
}

/**
 * @param {Array} array
 * @param {Integer} minItems
 * @return {Array} fields
 */
function stringOrExprArray(array, minItems = 1) {
  return checkArray(array, minItems, [
    (x) => typeof x === 'string',
    (x) => typeof x === 'object' && 'field' in x && 'expr' in x,
  ]);
}

/**
 * @param {Array} array
 * @param {Integer} minItems
 * @return {Array} fields
 */
function stringArray(array, minItems = 1) {
  return checkArray(array, minItems, [
    (x) => typeof x === 'string',
  ]);
}

/**
 * @param {Array} array
 * @param {Integer} minItems
 * @return {Array} fields
 */
function exprArray(array, minItems = 1) {
  return checkArray(array, minItems, [
    (x) => typeof x === 'object' && 'field' in x && 'expr' in x,
  ]);
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
    return requester.post(`${this._endpoint}?fake=${fake ? 1 : 0}`, this.data);
  }

  /**
   * @return {AxiosPromise<any>}
   */
  OPTIONS() {
    return requester.post(this._endpoint, this.data);
  }

  /* QUERYSET BUILDER */

  /**
   * QuerySet.filter() Generates:
   * {
   *   "action": "filter",
   *   "expr": "Q(question__startswith='Who', pub_date__year=2004) | ~Q(pub_date__year=2005)"
   * }
   *
   * QuerySet.filter() Generates:
   * {
   *   "action": "filter",
   *   "expr": "Q(question__startswith='Who') & Q(pub_date__year=F('del_date__year') + 4 - 1) | ~Q(pub_date__year=2005)"
   * }
   *
   * QuerySet.filter() Generates:
   * {
   *   "action": "filter",
   *   "expr": [
   *     {
   *       "meta": "question__startswith",
   *       "expr": "Who"
   *     },
   *     {
   *       "meta": "pub_date",
   *       "expr": "2014"
   *     },
   *     "&",
   *     {
   *       "meta": "pub_date",
   *       "expr": "2005"
   *     },
   *     "~",
   *     "|"
   *   ]
   * }
   *
   * All the above should be equivalent.
   *
   * @param fields
   * @return {Queryset}
   */
  filter(...fields) {
    let array = fields;
    if (fields.length === 1 && fields[0] instanceof Q) {
      array = fields[0].toRpnArray();
    }
    this._queryset.push({
      'action': 'filter',
      'expr': stringOrFilterArray(array, 1),
    });
    return this;
  }

  /**
   * exclude() Generates:
   * <see FilterAction>
   *
   * @param fields
   * @return {Queryset}
   */
  exclude(...fields) {
    let array = fields;
    if (fields.length === 1 && fields[0] instanceof Q) {
      array = fields[0].toRpnArray();
    }
    this._queryset.push({
      'action': 'exclude',
      'expr': stringOrFilterArray(array, 1),
    });
    return this;
  }

  /**
   * annotate() Generates:
   * {
   *   "action": "annotate",
   *   "fields": [
   *     {
   *       "field": "asdf",
   *       "expr": "max('final_mark')"
   *     },
   *     {
   *         "field": "year",
   *         "expr": "-2000 + F('enrolled_year_id__calendar_instance_year')"
   *     }
   *   ]
   * }
   *
   * Use ValuesAction followed by AnnotateAction to "group_by"
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
   * values() Generates:
   * {
   *   "action": "values",
   *   "fields": [
   *     "course_code",
   *     "enrolled_year_id__progress_outcome_type"
   *   ]
   * }
   *
   * Use ValuesAction followed by AnnotateAction to "group_by"
   *
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
   """
   Action version of a QuerySet.values_list(...)
   Indicates that a QuerySet should rather be serialised as
   an array of tuples instead of an array of dictionaries
   """
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
   * order_by() Generates:
   * {
   *   "action": "order_by",
   *   "fields": [
   *     {
   *       "field": "asdf",
   *       "descending": true
   *     }
   *   ]
   * },
   *
   * NOTE: order_by does not necessarily need to be placed at the end of a queryset.
   * For example slices do not support ordering, and so this needs to be called before hand, even though values may not yet exist for this.
   *
   * {
   *   "queryset": [
   *     {
   *       "action": "order_by",                                                                   <<< take note
   *       "fields": [
   *         {
   *           "field": "asdf",                                                                <<< take note
   *           "descending": true
   *         }
   *       ]
   *     },
   *     {
   *       "action": "limit",                                                                      <<< take note
   *       "method": "first",
   *       "num": 2
   *     },
   *     {
   *       "action": "values",
   *       "fields": [
   *         "course_code",
   *         "enrolled_year_id__progress_outcome_type"
   *       ]
   *     },
   *     {
   *       "action": "annotate",                                                                   <<< take note
   *       "fields": [
   *         {
   *           "field": "asdf",                                                                <<< take note
   *           "expr": "max('final_mark')"
   *         },
   *         {
   *           "field": "year",
   *           "expr": "F('enrolled_year_id__calendar_instance_year')"
   *         }
   *       ]
   *     }
   *   ]
   * }
   *
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
   * limit() Generates:
   * {
   *   "action": "limit",
   *   "method": "first",
   *   "num": 100
   * }
   *
   * limit() Generates:
   * {
   *   "action": "limit",
   *   "method": "last",
   *   "num": 100
   * }
   *
   * limit() Generates:
   * {
   *   "action": "limit",
   *   "method": "page",
   *   "num": 10,
   *   "index": 3
   * }
   *
   * @param method
   * @param num
   * @param index
   * @return {Queryset}
   */
  limit(method, num, ...index) {
    if (index.length > 1) {
      throw new Error('At most 1 value can exist for the index');
    }
    if (method === 'page' || method === 'first' || method === 'last') {
      this._queryset.push({
        'action': 'limit',
        method,
        num,
      });
      if (method !== 'page' && index.length !== 0) {
        throw new Error('Only pagination can have index specified');
      } else if (method === 'page') {
        if (index.length === 0) {
          throw new Error('Pagination must have index specified');
        }
        this._queryset[this._queryset.length - 1].index = index[0];
      }
    } else {
      throw new Error('Invalid limit');
    }
    return this;
  }

  /**
   * distinct() Generates:
   * {
   *   "action": "distinct"
   * }
   *
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
   * reverse() Generates:
   * {
   *   "action": "reverse"
   * }
   *
   * @return {Queryset}
   */
  reverse() {
    this._queryset.push({
      'action': 'reverse',
    });
    return this;
  }

  /**
   * all() Generates:
   * {
   *   "action": "all"
   * }
   *
   * @return {Queryset}
   */
  all() {
    this._queryset.push({
      'action': 'all',
    });
    return this;
  }

  /**
   * none() Generates:
   * {
   *   "action": "none"
   * }
   *
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
  Q,
  Queryset,
  QuerysetFactory,
  nameToEndpoint,
};
