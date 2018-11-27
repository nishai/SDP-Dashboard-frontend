/* dependencies */
import Vue from 'vue';
import { Queryset } from '../api/queryset';
import { Q, Faculty, School, Course, Program, ProgressOutcome, SecondarySchool, Student, EnrolledYear, EnrolledCourse } from '../api/wits-models';

/**
 * Companion to queryset.RESULT()
 *
 * Accepts a query, returns a promise for the result
 * - the result is api specific, in this case. (request.data.results)
 *
 * @name queryResult
 * @param {Queryset} query
 * @return {Promise<any>}
 */
function queryResult(query) {
  if (!query || !(query instanceof Queryset)) {
    throw Error('arg must be a valid Queryset');
  }
  return query.RESULT();
}

/**
 * Companion to queryset.RESULT()
 * except returns an array.
 *
 * @name queryResults
 * @param {Object|Array<Queryset>} queries
 * @return {Promise<Object|Array<any>>}
 */
function queryResults(queries) {
  if (!Array.isArray(queries) && typeof a !== 'object') {
    throw new Error('array or dictionary of Querysets was not passed');
  }

  let results;
  let keys;

  if (Array.isArray(queries)) {
    results = new Array(queries.length);
    keys = results.keys();
  } else {
    results = {};
    keys = Object.keys(queries);
  }

  return new Promise((accept, reject) => {
    Promise.all(keys.map(
      // append results for each query to array
      (key) => queries[key]
        .then((result) => { results[key] = result; })
        .catch((error) => { results[key] = undefined; }),
    ))
      // return results as array
      .then(() => { accept(results); })
      .catch((error) => { reject(error); });
  });
}

/**
 * Accepts an item with a queryset and a handler. Performs the
 * request from the queryset and updated the item by setting
 * its value property to whatever is returned by the handler.
 *
 * @name updateReactiveItem
 * @param {{query: Queryset, handler: Function, value?, errorHandler?}} item
 */
function updateReactiveItem(item) {
  if (!item.query || !(item.query instanceof Queryset) || !item.handler) {
    throw Error('item must have valid "query" and "handler" properties');
  }
  queryResult(item.query)
    .then((results) => {
      Vue.set(item, 'value', item.handler(results, item));
    })
    .catch((error) => {
      if (item.errorHandler) {
        item.errorHandler(error, item);
      } else {
        Vue.set(item, 'value', undefined);
      }
    });
}

/**
 * Like "doItemRequest" but operates on each element in a list.
 *
 * @name updateReactiveItems
 * @param {Array<{query: Queryset, handler: Function, value?, errorHandler?}>} items
 */
function updateReactiveItems(items) {
  items.map(updateReactiveItem);
}

/**
 * @type {{
 * Faculty: Faculty,
 * School: School,
 * Course: Course,
 * Program: Program,
 * ProgressOutcome: ProgressOutcome,
 * SecondarySchool: SecondarySchool,
 * Student: Student,
 * EnrolledYear: EnrolledYear,
 * EnrolledCourse: EnrolledCourse,
 * Q: Function,
 * queryResult: queryResult,
 * queryResults: queryResults,
 * updateReactiveItem: updateReactiveItem,
 * updateReactiveItems: updateReactiveItems,
 * }} Models
 */
const installables = {
  Faculty,
  School,
  Course,
  Program,
  ProgressOutcome,
  SecondarySchool,
  Student,
  EnrolledYear,
  EnrolledCourse,
  Q,
  /* functions */
  queryResult,
  queryResults,
  updateReactiveItem,
  updateReactiveItems,
};

Object.freeze(installables);

/**
 * @param {Vue} vue
 */
function installVueWitsModels(vue) {
  if (installVueWitsModels.installed) {
    return;
  }
  installVueWitsModels.installed = true;

  /**
   * @memberOf {Vue}
   * TODO: fix type def
   * @member {{
   * Faculty: Faculty,
   * School: School,
   * Course: Course,
   * Program: Program,
   * ProgressOutcome: ProgressOutcome,
   * SecondarySchool: SecondarySchool,
   * Student: Student,
   * EnrolledYear: EnrolledYear,
   * EnrolledCourse: EnrolledCourse,
   * Q: Function
   * queryResult: queryResult,
   * queryResults: queryResults,
   * updateReactiveItem: updateReactiveItem,
   * updateReactiveItems: updateReactiveItems,
   * }} $wits
   */
  Object.defineProperties(vue, {
    $wits: { get() { return installables; } },
  });

  /**
   * @memberOf {Vue.prototype}
   * TODO: fix type def
   * @member {{Faculty: Faculty,
   * School: School,
   * Course: Course,
   * Program: Program,
   * ProgressOutcome: ProgressOutcome,
   * SecondarySchool: SecondarySchool,
   * Student: Student,
   * EnrolledYear: EnrolledYear,
   * EnrolledCourse: EnrolledCourse,
   * Q: Function
   * queryResult: queryResult,
   * queryResults: queryResults,
   * updateReactiveItem: updateReactiveItem,
   * updateReactiveItems: updateReactiveItems,
   * }} $wits
   */
  Object.defineProperties(vue.prototype, {
    $wits: { get() { return installables; } },
  });
}

export default {
  install: installVueWitsModels,
};
