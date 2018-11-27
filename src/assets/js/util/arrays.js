import palette from 'google-palette';
import Color from 'color';

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


export function labelsValuesListToChartData(list, datasetLabels, labelSorter = null) {
  const labelsMap = new Map();

  if (datasetLabels && list.length !== datasetLabels.length) {
    throw new Error(`length of labelsValuesList: ${list} is not equal to the length of the dataset labels: ${datasetLabels}`);
  }

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

  let labels = [...labelsMap.keys()];

  if (labelSorter) {
    labels = labels.sort(labelSorter);
  }

  const datasets = list.map((_, index) => ({
    data: labels.map((label) => labelsMap.get(label)[index]),
    label: datasetLabels ? datasetLabels[index] : undefined,
  }));

  return {
    labels,
    datasets,
  };
}

export function getMapperLabelsValuesListToChartData(datasetLabels, labelSorter = null) {
  return (list) =>  labelsValuesListToChartData(list, datasetLabels, labelSorter);
}

/* COLORIZE CHART DATASETS */

/**
 * Colorize a chart data object.
 *
 * http://google.github.io/palette.js/
 *
 * @param {{ labels: Array, datasets: Array }} data
 * @param {String} colorPalette - any length: ['tol-dv', 'tol-rainbow', 'tol-sq'], length <= 12: ['tol'], length <= 11: ['cb-BrBG', 'cb-PRGn', 'cb-RdYlBu', ...]
 * @param {Boolean} datasetNotLabels - if the datasets themselves should be individually coloured rather than their labels.
 * @return {{ labels: Array, datasets: Array }}
 */
export function colorizeChartData(data, { colorPalette = 'tol-rainbow', datasetNotLabels = false, shade = true, borders = false }) {
  const length = datasetNotLabels ? data.datasets.length : data.labels.length;
  const colors = palette(colorPalette, length).map((c) => Color(`#${c}`));

  if (length !== colors.length) {
    throw Error('length mismatch, probably not enough colors, try use a different color scheme.');
  }

  data.datasets.forEach((dataset, i) => {
    if (!datasetNotLabels && data.labels.length !== dataset.data.length) {
      throw Error('length of labels != length of dataset.data (and thus also not equal to the colors length)');
    }

    const l = data.datasets.length - 1;
    const lightenRatio = (l > 0 && shade) ? i * (0.5 / l) : 0;

    if (datasetNotLabels) {
      const c = colors[i].lighten(lightenRatio);
      dataset.backgroundColor = borders ? c.alpha(0.1).string() : c.string();
      if (borders) {
        dataset.borderColor = c.string();
      }
    } else {
      const cs = colors.map((c) => c.lighten(lightenRatio));
      dataset.backgroundColor = borders ? cs.map((c) => c.alpha(0.1).string()) : cs.map((c) => c.string());
      if (borders) {
        dataset.borderColor = cs.map((c) => c.string());
      }
    }
  });

  return data;
}

export function getMapperColorizeChartData({ colorPalette = 'tol-rainbow', datasetNotLabels = false, shade = true, borders = false }) {
  return (data) => colorizeChartData(data, { colorPalette, datasetNotLabels, shade, borders });
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


export function groupsColumnsToStackedData(groups, labelField, dataField, type) {
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
    labels,
    datasets,
  };
}

export function getMapperGroupsColumnsToStackedChart(labelField, dataField, type) {
  return (groups) => groupsColumnsToStackedData(groups, labelField, dataField, type);
}












export function stripPrefixes(results) {
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
  return items;
}

export function getMapperStripPrefixes() {
  return stripPrefixes;
}
