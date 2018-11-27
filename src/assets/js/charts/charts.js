import Color from 'color';


/* ========================================================================== */
/* CHART TOOLTIPS                                                             */
/* ========================================================================== */


/**
 * Returns new functions to generate the tooltips for charts.
 * Provides various defaults that:
 *  - change Tooltip color to datapoint color.
 *  - add Dataset label
 *  - add the data label
 *  - modify the datapoint label (see: rounding, percent, postfix)
 *
 * @param postfix - Text to be displayed after the datapoint in the tooltip (you should include a space if needed)
 * @param rounding - The number of digits to round the datapoint off to if it is a number (-1 is no rounding)
 * @param percent - If the percentage of the total the datapoint comprises should be calculated if it is a number.
 * @return {{beforeTitle, label, title, labelColor}}
 */
export const getOptionsTooltipsCallbacks = ({ postfix = '', rounding = -1, percent = true }) => ({
  /**
   * Add the label of a dataset before the title of a chart tooltip.
   */
  beforeTitle(tooltipItems, data) {
    const dataset = data.datasets[tooltipItems[0].datasetIndex];
    return dataset.label ? `${dataset.label}` : undefined;
  },
  /**
   * Add to the label of a chart tooltip.
   * - calculate percentage
   */
  label(tooltipItem, data) {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const currentValue = dataset.data[tooltipItem.index];
    /* round off the datapoint */
    let currVal = (rounding >= 0 && typeof currentValue === 'number') ? currentValue.toFixed(rounding) : currentValue;
    /* append the postfix */
    if (postfix) {
      currVal = `${currVal}${postfix}`;
    }
    /* Only calculate percent if the datapoint is a number */
    if (percent && typeof currentValue === 'number') {
      const meta = dataset._meta[Object.keys(dataset._meta)[0]];
      const { total } = meta;
      const percentage = parseFloat(((currentValue / total) * 100).toFixed(2));
      if (percentage) {
        return `${currVal} (${percentage}%)`;
      }
    }
    return currVal;
  },
  /**
   * Get the title for a dataset.
   */
  title(tooltipItem, data) {
    return data.labels[tooltipItem[0].index];
  },
  /**
   * Color the tooltip the same as the dataset
   */
  labelColor(tooltipItem, chart) {
    const cs = chart.data.datasets[tooltipItem.datasetIndex].backgroundColor;
    const c = (Array.isArray(cs)) ? cs[tooltipItem.index] : ((typeof cs === 'string') ? cs : undefined);
    return {
      backgroundColor: Color(c).hex(),
    };
  },
});
