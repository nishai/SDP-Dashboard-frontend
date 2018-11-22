

<!--
Wits filter set that manages by default:
  - years
  - faculties
  - schools
  - courses

TODO: description.

dynamically updates relationships between filtering items,
has one event @change that returns a list of the currently data items,
mapped to a field name. <<< TODO, this should be the obj name instead.

TODO: investigate performance issues with many items.
-->

<!-- TODO: SELECTION NEEDS TO BE STORED SEPARATELY -->

<!--

<template>
  <section class="columns is-multiline">
    <b-field class="column" v-for="(filterable, i) in filterables" :label="filterable.label" :key="'filterable_'+i">
      <OpinionatedFilterLabels
        :placeholder="'All '+filterable.name"
        :items="filterable.items"
        :selected="filterable.selection"
        @change="(selected) => updateFilter(filterable.field, selected)"
      />
    </b-field>
  </section>
</template>

<script>
import Vue from 'vue';
import { getDefaultFilterables } from '../../assets/js/defaults';
import OpinionatedFilterLabels from '../opinionated/OpinionatedFilterLabels.vue';

/* ========================================================================== */
/* HELPER FUNCTIONS                                                           */
/* ========================================================================== */

// TODO: similar thing could come in handly elsewhere.
function makeFilterableLoadItemPromise(filterables) {
  // promise array
  const allPromises = new Array(filterables.length);
  // get data
  filterables.forEach((filterable, i) => {
    let promise;
    if (filterable.itemsPromise && !filterable.items) {
      // set items from the promise on the filterable if they dont exist.
      promise = filterable.itemsPromise.then((results) => {
        Vue.set(filterable, 'items', results);
        return filterable;
      });
    } else if (!filterable.itemsPromise && filterable.items) {
      // if values in the list of promises are not a promise, they are still returned.
      promise = filterable;
    } else {
      throw new Error('Cannot have filterable and promise both defined or undefined');
    }
    allPromises[i] = promise;
  });
  return Promise.all(allPromises); // promise that only returns when all the sub-promises are done.
}

// TODO: similar thing could come in handly elsewhere.
/* map of fields to filterables */
function makeFilterableMap(filterables) {
  return filterables.reduce((obj, filterable) => {
    obj[filterable.field] = filterable;
    return obj; // reduce is like the += operator.
  }, {} /* the starting obj */);
}
// TODO: similar thing could come in handly elsewhere.
/* map of fields to filterables */
function makeSelectionMap(filterables) {
  return filterables.reduce((obj, filterable) => {
    obj[filterable.field] = [];
    return obj; // reduce is like the += operator.
  }, {} /* the starting obj */);
}

// TODO: similar thing could come in handly elsewhere.
/* map of fields to filterables that need to be updates if their property changes */
function makeFilterableUpdateMap(filterables) {
  return filterables.reduce((obj, filterable) => {
    if (!filterable.dependsOn || filterable.dependsOn.length < 1) {
      return obj;
    }
    filterable.dependsOn.forEach((dependantField) => {
      if (!obj[dependantField]) {
        obj[dependantField] = [];
      }
      obj[dependantField].push(filterable);
    });
    return obj; // reduce is like the += operator.
  }, {} /* the starting obj */);
}

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default {
  name: 'DashboardCommonFiltersForm',
  components: { OpinionatedFilterLabels },
  props: {
    filterables: {
      type: Array,
      default: getDefaultFilterables,
    },
  },
  data() {
    return {
      loading: true,
      fieldToFilterable: null,
      filterablesUpdateMap: null,
      fieldToSelection: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const itemLoadPromise = makeFilterableLoadItemPromise(this.filterables);
      /* remove the load screen */
      itemLoadPromise.then((filterables) => {
        this.filterables.forEach((filterable) => {
          filterable.items.forEach((item) => {
            item.label = `${item[filterable.field]}`;
          });
        });

        this.loading = false;

        /* initialise */
        this.fieldToSelection = makeSelectionMap(this.filterables);
        this.fieldToFilterable = makeFilterableMap(this.filterables);
        this.filterablesUpdateMap = makeFilterableUpdateMap(this.filterables);
      });
    });
  },
  methods: {
    updateFilter(field, selected) {
      this.fieldToSelection[field] = selected;
      this.$emit('change', this.fieldToSelection, field);

      // remove selected that are invalid;
      if (this.filterablesUpdateMap[field]) {
        const validLabelsSet = new Set(selected.map((item) => item.label));
        this.filterablesUpdateMap[field].forEach((invalidFilterable) => {
          const newSelection = this.fieldToSelection[invalidFilterable.field].filter(
            (item) => validLabelsSet.has(item[field]),
          );
          this.fieldToSelection[invalidFilterable.field] = newSelection;
          this.$set(this.filterables, 'selection', newSelection); // TODO, working but doesnt update selected of children.
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>

-->



<!--
Wits filter set that manages:
  - years
  - faculties
  - schools
  - courses
-->

<!-- TODO: sync is not fricking working... only events -->

<template>
  <div class="columns is-multiline">
    <b-field class="column is-half" label="Years">
      <OpinionatedFilterLabels
        placeholder="All Years"
        :items="data.years"
        :selected.sync="internalSelection.years"
        field="label"
        ref="filterLabelsYears"
        @input="_onInput"
      />
    </b-field>

    <b-field class="column is-half" label="Faculties">
      <OpinionatedFilterLabels
        placeholder="All Faculties"
        :items="data.faculties"
        :selected.sync="internalSelection.faculties"
        field="label"
        ref="filterLabelsFaculties"
        @input="_onInput"
      />
    </b-field>

    <b-field class="column is-half" label="Schools">
      <OpinionatedFilterLabels
        placeholder="All Schools"
        :items="data.schools"
        :selected.sync="internalSelection.schools"
        field="label"
        ref="filterLabelsSchools"
        @input="_onInput"
      />
    </b-field>
    <b-field class="column is-half" label="Courses">
      <OpinionatedFilterLabels
        placeholder="All Courses"
        :items="data.courses"
        :selected.sync="internalSelection.courses"
        field="label"
        ref="filterLabelsCourses"
        @input="_onInput"
      />
    </b-field>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash.clonedeep';
import OpinionatedFilterLabels from '../opinionated/OpinionatedFilterLabels.vue';


export default {
  name: 'DashboardCommonFiltersFormNew',
  components: { OpinionatedFilterLabels },
  props: {
    selection: { type: Object, default() { return {}; } },
  },

  data() {
    return {
      data: this._fillDefaults(),
      internalSelection: this._fillDefaults(this.selection),
    };
  },

  watch: {
    selection() {
      this.internalSelection = this._fillDefaults(this.selection);
    },
  },

  methods: {
    _fillDefaults(selection) {
      return Object.assign(
        { years: [], faculties: [], schools: [], courses: [] },
        selection || {},
      );
    },
    _onInput(prop, items) {
      this.$emit('update:selection', this.internalSelection);
    },
  },

  mounted() {
    const queryForData = (field, model, ...fields) => {
      model.query.values(...fields).distinct().orderBy(...fields)
        .thenStripPrefixes((results) => {
          results.forEach((item) => { item.label = `${item[fields[0]]}`; });
          this.$set(this.data, field, results);
        });
    };

    queryForData(
      'years', this.$wits.EnrolledYear,
      this.$wits.EnrolledYear.calendar_instance_year,
    );

    queryForData(
      'faculties', this.$wits.Faculty,
      this.$wits.Faculty.faculty_title,
    );

    queryForData(
      'schools', this.$wits.School,
      this.$wits.School.school_title,
      this.$wits.School.faculty_id.faculty_title,
    );

    queryForData(
      'courses', this.$wits.Course,
      this.$wits.Course.course_code,
      this.$wits.Course.school_id.school_title,
      this.$wits.Course.school_id.faculty_id.faculty_title,
    );
  },
};
</script>

<style scoped lang="scss">
</style>
