
import cloneDeep from 'lodash.clonedeep';
import { cachiosInstance as cachios } from '../plugins/vue-axios';


/* ========================================================================== */
/* Query & Functions                                                          */
/* ========================================================================== */

class QBuilder {
  /**
   * @param {QBuilder|String|null} meta
   * @param {any|null} expr
   */
  constructor(meta = null, expr = null) {
    // nullable
    this.meta = meta;
    this.expr = expr;
    this.l = null;
    this.r = null;
    this.operator = null;
    // other
    this.negated = false;
  }

  isEmpty() {
    return this.meta == null && this.expr == null && this.l == null && this.r == null && this.operator == null;
  }

  /**
   * @param {String|QBuilder} rOrMeta
   * @param {String|null} expr
   * @param {String} operator
   * @return {QBuilder}
   * @private
   */
  _join(rOrMeta, expr = null, operator) {
    let r = rOrMeta;
    // normalise for one or two args.
    if (expr !== null) {
      if (typeof rOrMeta !== 'string') {
        throw Error('For two args, the meta must be a string. For one arg only, it must be an instance of Q');
      }
      r = new QBuilder(rOrMeta, expr);
    }
    if (!(r instanceof QBuilder)) {
      throw Error('Must be another Query');
    }
    // exit early
    if (this.isEmpty()) {
      return r;
    }
    const parent = new QBuilder();
    parent.operator = operator;
    parent.r = r;
    parent.l = this;
    return parent;
  }

  /**
   * @param {String|QBuilder} rOrMeta
   * @param {String|null} expr
   * @return {QBuilder}
   */
  and(rOrMeta, expr = null) {
    return this._join(rOrMeta, expr, '&');
  }

  /**
   * @param {String|QBuilder} rOrMeta
   * @param {String|null} expr
   * @return {QBuilder}
   */
  or(rOrMeta, expr = null) {
    return this._join(rOrMeta, expr, '|');
  }

  /**
   * @return {QBuilder}
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

/**
 * @param {QBuilder|String} meta
 * @param {null|any} expr
 * @return {QBuilder}
 * @constructor
 */
export function Q(meta = null, expr = null) {
  return new QBuilder(meta, expr);
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
   * @param {FieldBuilder} sourceModel
   */
  constructor(sourceModel) {
    this._queryset = [];
    if (!sourceModel) {
      throw new Error('Queryset source model not specified');
    }
    if (typeof sourceModel.endpoint !== 'string' || sourceModel.endpoint.length < 1) {
      throw new Error('SourceModel does not have a valid endpoint defined.');
    }
    this._sourceModel = sourceModel;
    this._endpoint = sourceModel.endpoint.replace(/^[/]/g, '');
    /* options */
    this._debug = false;
    this._fake = false;
    this._explain = false;
    /* if the queryset has come to an end, due to certain operations */
    this._lockedBy = null;
  }

  get isLocked() {
    return !!this._lockedBy;
  }

  _assertNotLocked() {
    if (this.isLocked) {
      throw Error(`The Queryset was locked by: ${this._lockedBy}`);
    }
  }

  _lock(by) {
    this._assertNotLocked();
    if (typeof by !== 'string' || by.length < 1) {
      throw Error('lock string cannot be empty or null');
    }
    this._lockedBy = by;
  }

  /* COMPUTED PROPS */

  /**
   * @return {{queryset: Array}}
   */
  get data() {
    return {
      'explain': this._explain,
      'queryset': this._queryset,
    };
  }

  /* QUERY */

  /**
   * @return {Queryset}
   */
  clone() {
    return cloneDeep(this);
  }

  /**
   * Print out the current state.
   * @return {Queryset}
   */
  log() {
    console.log('Queryset: ', this._queryset);
    return this;
  }

  /**
   * Make the POST or OPTIONS methods log debug data.
   * @return {Queryset}
   */
  debug() {
    this._debug = true;
    return this;
  }

  /**
   * @return {Queryset}
   */
  fake() {
    this._fake = true;
    return this;
  }

  /**
   * @return {Queryset}
   */
  explain() {
    this._explain = true;
    return this;
  }

  /**
   * @param {boolean} fake
   * @return {AxiosPromise<any>}
   */
  POST() {
    let promise = cachios.post(`${this._endpoint}?fake=${this._fake ? 1 : 0}`, this.data);
    if (this._debug) {
      promise = promise.then((response) => {
        console.log('Queryset: ', this._queryset, 'Response: ', response);
        return response;
      });
    }
    return promise;
  }

  /**
   * Accepts a query, returns a promise for the result
   * - the result is api specific, in this case. (request.data.results)
   * @return {Promise<any>}
   */
  RESULT() {
    return new Promise((accept, reject) => {
      this.POST()
        .then((response) => {
          if (!response.data) {
            reject(new Error('Response has no data'));
          }
          if (!response.data.results) {
            reject(new Error('Response data has no results'));
          }
          accept(response.data.results);
        })
        .catch((error) => {
          reject(error, undefined);
        });
    });
  }

  /**
   * @param {Function} callback
   * @return {Promise<any>}
   */
  then(callback) {
    return this.RESULT().then((results) => {
      const val = callback(results);
      if (val !== undefined) {
        return val;
      }
      return results;
    });
  }

  /**
   * @param {Function|null} callback
   * @return {Promise<any>}
   */
  thenStripPrefixes(callback = null) {
    return this.RESULT().then((results) => {
      let items = results;
      if (Array.isArray(items) && items.length > 0) {
        /* get key map */
        const keysMap = {};
        let renameCount = 0;
        /* get new names */
        Object.keys(items[0]).forEach((key) => {
          const indexOf = key.lastIndexOf('__');
          const renamed = indexOf < 0 ? key : key.substring(indexOf + 2);
          if (renamed !== key) {
            renameCount += 1;
          }
          keysMap[key] = renamed;
        });
        /* rename entries */
        if (renameCount > 0) {
          items = items.map((item) => {
            const temp = {};
            Object.entries(keysMap).forEach(([key, renamed]) => { temp[renamed] = item[key]; });
            return temp;
          });
        }
      }
      if (callback) {
        const val = callback(items);
        if (val !== undefined) {
          return val;
        }
      }
      return items;
    });
  }

  /**
   * @return {AxiosPromise<any>}
   */
  OPTIONS() {
    return cachios.post(this._endpoint, this.data);
  }

  /* QUERYSET BUILDER - NON LOCKING OPERATIONS */
  /* QUERYSET BUILDER - NON LOCKING OPERATIONS */
  /* QUERYSET BUILDER - NON LOCKING OPERATIONS */

  /**
   * QuerySet.filter(
   *   Q('question__startswith, 'Who').and(Q('pub_date__year', 2004)).or(Q('pub_date__year', 2005).not())
   * ) Generates:
   *
   * {
   *   "action": "filter",
   *   "expr": "Q(question__startswith='Who', pub_date__year=2004) | ~Q(pub_date__year=2005)"
   * }
   *
   * QuerySet.filter Generates:
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
   * @param {QBuilder|{meta: string, expr: any}|'&'|'l'} fields
   * @return {Queryset}
   */
  filter(...fields) {
    this._assertNotLocked();
    let array = fields;
    if (fields.length === 1 && fields[0] instanceof QBuilder) {
      if (fields[0].isEmpty()) { // exit early
        return this;
      }
      array = fields[0].toRpnArray();
    } else if (fields.length > 1 && fields[0] instanceof QBuilder) {
      throw Error('Only one item Q can be passed');
    }
    this._queryset.push({
      'action': 'filter',
      'expr': stringOrFilterArray(array, 1), // RPN formatted - array of {meta: string, expr: any}) and ('&' or '|')
    });
    return this;
  }

  /**
   * exclude() Generates:
   * <see FilterAction>
   *
   * @param {QBuilder|{meta: string, expr: any}|'&'|'l'} fields
   * @return {Queryset}
   */
  exclude(...fields) {
    this._assertNotLocked();
    this.filter(...fields);
    this._queryset[this._queryset.length - 1].action = 'exclude';
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
   * @param { {field: string, expr: any|String} } fields
   * @return {Queryset}
   */
  annotate(...fields) {
    this._assertNotLocked();
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
   * @param {String|{field: string, expr: any}} fields
   * @return {Queryset}
   */
  values(...fields) {
    this._assertNotLocked();
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
   * @param {boolean} flat
   * @param {boolean} named
   * @param {String} fields
   * @return {Queryset}
   */
  valuesList(flat = false, named = false, ...fields) {
    this._assertNotLocked();
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
   *       "descending": false,
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
   * @param {String|{field: string, descending: boolean}} fields
   * @return { Queryset }
   */
  orderBy(...fields) {
    this._assertNotLocked();
    for (let i = 0; i < fields.length; i += 1) {
      if (typeof fields[i] === 'string') {
        fields[i] = { 'field': fields[i] };
      }
      if (!('field' in fields[i])) {
        throw new Error('field not present');
      }
      if (!('descending' in fields[i])) {
        fields[i].descending = false;
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
   * @param {'page'|'first'|'last'} method
   * @param {number} num
   * @param {number|null} index
   * @return {Queryset}
   */
  limit(method, num, ...index) {
    this._assertNotLocked();
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
   * @param {String} fields
   * @return {Queryset}
   */
  distinct(...fields) {
    this._assertNotLocked();
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
    this._assertNotLocked();
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
    this._assertNotLocked();
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
    this._assertNotLocked();
    this._queryset.push({
      'action': 'none',
    });
    return this;
  }

  /* LOCKING OPERATIONS */
  /* LOCKING OPERATIONS */
  /* LOCKING OPERATIONS */

  /**
   * count() Generates:
   * {
   *   "action": "count"
   * }
   *
   * @return {Queryset}
   */
  count() {
    this._assertNotLocked();
    this._lock('count');
    this._queryset.push({
      'action': 'count',
    });
    return this;
  }

  /**
   * first() Generates:
   * {
   *   "action": "first"
   * }
   *
   * @return {Queryset}
   */
  first() {
    this._assertNotLocked();
    this._lock('first');
    this._queryset.push({
      'action': 'first',
    });
    return this;
  }

  /**
   * last() Generates:
   * {
   *   "action": "last"
   * }
   *
   * @return {Queryset}
   */
  last() {
    this._assertNotLocked();
    this._lock('last');
    this._queryset.push({
      'action': 'last',
    });
    return this;
  }

  /**
   * aggregate is like annotate but works on the current model.
   *
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
   * @param {{field: string, expr: any}} fields
   * @return {Queryset}
   */
  aggregate(...fields) {
    this._assertNotLocked();
    this._lock('aggregate');
    this._queryset.push({
      'action': 'aggregate',
      'fields': exprArray(fields, 1),
    });
    return this;
  }

  /* TODO: exists */
  /* TODO: explain */
  /* TODO: in_bulk */
}

/* export everything */

export default {
  Q,
  Queryset,
};
