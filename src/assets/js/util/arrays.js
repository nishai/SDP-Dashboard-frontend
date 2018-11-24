import palette from 'google-palette';

/**
 * @param {Array<any>} list
 * @param {function(any): Boolean} includeItemFunc
 * @return {Array<any>}
 */
export function filter(list, includeItemFunc) {
  return list.filter(includeItemFunc);
}

/**
 * @param {function(any): Boolean} includeItemFunc
 * @return {function(Array<any>): Array<any>}
 */
export function getMapperFilter(includeItemFunc) {
  return (list) => list.filter(includeItemFunc);
}


/* GROUP BY */


/**
 * Group an array by the keyGetter function
 * @param {Array<any>} list
 * @param {function(any): String} keyGetter
 * @return {Object<Array<any>>}
 */
export function groupBy(list, keyGetter) {
  const map = {};
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map[key];
    if (!collection) {
      map[key] = [item];
    } else {
      collection.push(item);
    }
  });
  return map;
}

/**
 * Returns a function that groups an array by the specified map function.
 * @param {function(any): String} keyGetter
 * @return {function(Array<any>): Object<Array<any>>}
 */
export function getMapperGroupBy(keyGetter) {
  return (results) => groupBy(results, keyGetter);
}

/**
 * Returns a function that groups an array of objects by
 * the value of the specified field on each object.
 * @param {String} field
 * @return {function(Array<Object>): Object<Array<any>>}
 */
export function getMapperGroupByField(field) {
  return (results) => groupBy(results, (item) => item[field]);
}


/* LIST OF OBJECTS TO OBJECT OF LABELS, VALUES LIST */


/**
 * Converts a list of objects, to an object with two fields "labels" and "values"
 * with arrays whose indices corresponding to entries in the original list.
 * @param {Array<Object>} list
 * @param {String} labelField
 * @param {String} valueField
 * @return {{labels: Array, values: Array}}
 */
export function listToLabelsValues(list, labelField, valueField) {
  if (!labelField || !valueField) {
    throw new Error(`labelField (${labelField}) or valueField (${valueField}) are invalid`);
  }

  if (Array.isArray(list) && list.length < 1) {
    console.warn(`Results list is empty, expected to obtain fields: labels (${labelField}) and values (${valueField})`);
  }

  if (list.length > 0 && !(Object.prototype.hasOwnProperty.call(list[0], labelField) && Object.prototype.hasOwnProperty.call(list[0], valueField))) {
    console.warn(
      `WARNING: label (${labelField}) or value (${valueField}) attributes missing from results. `
      + `Options are: [${Object.keys(list[0]).join(', ')}]`,
    );
  }

  return {
    labels: list.map((item) => item[labelField]),
    values: list.map((item) => item[valueField]),
  };
}

/**
 * Returns a function that does exactly what is specified for "listToLabelsValues"
 * @param {String} labelField
 * @param {String} valueField
 * @return {function(Array<Object>): {labels: Array, values: Array}}
 */
export function getMapperListToLabelsValues(labelField, valueField) {
  return (list) => listToLabelsValues(list, labelField, valueField);
}


/* LIST OF LABELS VALUES OBJECTS TO OBJECT OF LABELS, VALUES LIST */


export function labelsValuesListToChartData(list) {
  const labelsMap = new Map();

  list.forEach(({ labels, values }, index) => {
    if (labels.length !== values.length) {
      throw Error('length of labels != length of values');
    }
    labels.forEach((label, i) => {
      if (!labelsMap.has(label)) {
        labelsMap.set(label, new Array(list.length));
      }
      labelsMap.get(label)[index] = values[i];
    });
  });

  const labels = [...labelsMap.keys()];
  const datasets = list.map((_, index) => ({
    data: labels.map((label) => labelsMap.get(label)[index]),
  }));

  return {
    labels,
    datasets,
  };
}

export function getMapperLabelsValuesListToChartData() {
  return labelsValuesListToChartData;
}


/* COLORIZE CHART LABELS */


/**
 * Colorize the labels of all the datasets.
 * http://google.github.io/palette.js/
 *
 * @param {{ labels: Array, datasets: Array }} data
 * @param {String} colorPalette - any length: ['tol-dv', 'tol-rainbow', 'tol-sq'], length <= 12: ['tol'], length <= 11: ['cb-BrBG', 'cb-PRGn', 'cb-RdYlBu', ...]
 * @return {{ labels: Array, datasets: Array }}
 */
export function colorizeChartLabels(data, colorPalette = 'tol-dv') {
  const colors = palette(colorPalette, data.labels.length).map((color) => `#${color}`);

  if (data.labels.length !== colors.length) {
    throw Error('length of labels != length of colors, use a different color scheme.');
  }

  data.datasets.forEach((dataset, i) => {
    if (data.labels.length !== dataset.data.length) {
      throw Error('length of labels != length of dataset.data (and thus also not equal to the colors length)');
    }
    dataset.backgroundColor = colors;
  });

  return data;
}

export function getMapperColorizeChartLabels(colorPalette = 'tol-dv') {
  return (data) => colorizeChartLabels(data, colorPalette);
}

/* COLORIZE CHART DATASETS */

/**
 * Colorize the individual datasets.
 * http://google.github.io/palette.js/
 *
 * @param {{ labels: Array, datasets: Array }} data
 * @param {String} colorPalette - any length: ['tol-dv', 'tol-rainbow', 'tol-sq'], length <= 12: ['tol'], length <= 11: ['cb-BrBG', 'cb-PRGn', 'cb-RdYlBu', ...]
 * @return {{ labels: Array, datasets: Array }}
 */
export function colorizeChartDatasets(data, colorPalette = 'tol-dv') {
  const colors = palette(colorPalette, data.datasets.length).map((color) => `#${color}`);

  if (data.datasets.length !== colors.length) {
    throw Error('length of datasets != length of colors, use a different color scheme.');
  }

  data.datasets.forEach((dataset, i) => {
    dataset.backgroundColor = colors[i];
  });

  return data;
}

export function getMapperColorizeChartDatasets(colorPalette = 'tol-dv') {
  return (data) => colorizeChartDatasets(data, colorPalette);
}


/* LIST OF OBJECTS TO OBJECT OF COLUMN LISTS */


/**
 * Converts a list of objects, to an object with fields of the contained objects
 * being arrays whose indices corresponding to entries in the original list.
 *
 * All objects in the list must have the same schema/fields.
 *
 * If no fields are specified, uses the first object in the list to get the fields.
 *
 * @param {Array<Object>} list
 * @param {String} fields
 * @return {{...fields}}
 */
export function listToColumns(list, ...fields) {
  if (!Array.isArray(list) || list.length < 1) {
    return {};
  }
  const keys = fields.length < 1 ? Object.keys(list[0]) : fields;
  return keys.reduce((obj, key) => {
    obj[key] = list.map((item) => item[key]);
    return obj;
  }, {});
}

/**
 * Returns a function that does exaclty what is specified for "listToColumns"
 * @param {String} fields
 * @return {function(Array<Object>): {...fields}}
 */
export function getMapperListToColumns(...fields) {
  return (list) => listToColumns(list, ...fields);
}


/* GROUP BY + TO COLUMNS */


/**
 * performs a "groupBy" operation, and then for each group a "listToColumns" oepration.
 * @param {Array<any>} list
 * @param {function(any): String} keyGetter
 * @param {String} fields
 * @return {Object} Groups of columns
 */
export function groupByToColumns(list, keyGetter, ...fields) {
  return Object.entries(groupBy(list, keyGetter)).reduce((obj, [group, items]) => {
    obj[group] = listToColumns(items, ...fields);
    return obj;
  }, {});
}

/**
 * Returns a function that does groupByToColumns on a list.
 * @param {Array<Object>} list
 * @param {String} field - field to group by
 * @param {String} fields - fields to return in the groups, if null then everthing.
 */
export function groupByFieldToColumns(list, field, ...fields) {
  return groupByToColumns(list, (item) => item[field], ...fields);
}

/**
 * Returns a function that does groupByToColumns on a list.
 * @param {function(any): String} keyGetter
 * @param {String} fields - fields to return in the groups.
 * @return {function(Array<any>): Object}
 */
export function getMapperGroupByToColumns(keyGetter, ...fields) {
  return (list) => groupByToColumns(list, keyGetter, ...fields);
}

/**
 * Returns a function that does groupByFieldToColumns on a list.
 * @param {String} field - Field to group by
 * @param {String} fields - Fields to return in the groups.
 * @return {function(Array<Object>): Object}
 */
export function getMapperGroupByFieldToColumns(field, ...fields) {
  return (list) => groupByFieldToColumns(list, field, ...fields);
}


/* OBJECT WITH LABELS, VALUES to DEFAULT CHART OBJ */


export function labelsValuesToChart({ labels, values, type }) {
  const data = {
    type: type || 'line',
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: '#3e95cd',
        fill: false,
      }],
    },
    options: {
      animation: {
        duration: 0, // general animation time
      },
    },
  };
  return data;
}

export function getMapperLabelsValuesToChart(type = 'line') {
  return ({ labels, values }) => labelsValuesToChart({ labels, values, type });
}


/* GROUPS WITH COLS to STACKED CHART OBJ */


export function groupsColumnsToStackedChart(groups, labelField, dataField, type) {
  const labels = Object.values(groups)[0][labelField];

  const labelsVaild = Object.values(groups).reduce((flag, group) => {
    return group[labelField].length === labels.length && flag;
  }, true);

  if (!labelsVaild) {
    throw Error('groups are not the same size.');
  }

  const datasets = Object.entries(groups).reduce((list, [key, group]) => {
    list.push({
      label: key,
      data: group[dataField],
      fill: false,
    });
    return list;
  }, []);

  return {
    type: type || 'line',
    data: {
      labels,
      datasets,
    },
    options: {},
  };
}

export function getMapperGroupsColumnsToStackedChart(labelField, dataField, type) {
  return (groups) => groupsColumnsToStackedChart(groups, labelField, dataField, type);
}
