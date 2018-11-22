

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
  <LoadOrError
    :active="isLoading"
    :is-error="isError"
    class="columns is-multiline"
  >

    <b-field class="column is-half" label="Years">
      <OpinionatedFilterLabels
        placeholder="All Years"
        :items="data.years"
        :selected.sync="selected.years"
        ref="tagInputYears"
      />
    </b-field>

    <b-field class="column is-half" label="Faculties">
      <OpinionatedFilterLabels
        placeholder="All Faculties"
        :items="data.faculties"
        :selected.sync="selected.faculties"
        ref="tagInputFaculties"
      />
    </b-field>

    <b-field class="column is-half" label="Schools">
      <OpinionatedFilterLabels
        placeholder="All Schools"
        :items="data.schools"
        :selected.sync="selected.schools"
        :filter="schoolFilter"
        ref="tagInputSchools"
      />
    </b-field>
    <b-field class="column is-half" label="Courses">
      <OpinionatedFilterLabels
        placeholder="All Courses"
        :items="data.courses"
        :selected.sync="selected.courses"
        :filter="courseFilter"
        ref="tagInputCourses"
      />
    </b-field>

  </LoadOrError>
</template>

<script>
import { cloneDeep } from 'lodash.clonedeep';
import LoadOrError from '../LoadOrError.vue';
import OpinionatedFilterLabels from '../opinionated/OpinionatedFilterLabels.vue';

const fields = ['years', 'faculties', 'schools', 'courses'];
const def = () => fields.reduce((o, f) => Object.assign(o, { [f]: [] }), {});

export default {
  name: 'DashboardCommonFiltersForm',
  components: { LoadOrError, OpinionatedFilterLabels },

  props: {
    selected: {
      type: Object,
      default: def,
      validator: (value) => fields.every((field) => Object.prototype.hasOwnProperty.call(value, field)),
    },
  },

  data() {
    return {
      resultMaps: {}, // all items
      data: def(), // all items (processed results) arrays of labels

      isError: false,
      isLoading: true,
    };
  },

  mounted() {
    /**
     * @param f - field to set on this.data
     * @param model - model to begin query
     * @param fs - fields to retrieive, uses the first field in the list as the label value.
     * @return {Promise}
     */
    const queryForData = (f, model, ...fs) => {
      return model.query.values(...fs).distinct().orderBy(...fs)
        .thenStripPrefixes((results) => {
          this.$set(this.resultMaps, f, new Map(results.map((item) => [`${item[fs[0]]}`.toLowerCase(), item])));
          this.$set(this.data, f, results.map((item) => `${item[fs[0]]}`.toLowerCase()));
        });
    };

    const promises = [];

    promises.push(queryForData(
      'years', this.$wits.EnrolledYear,
      this.$wits.EnrolledYear.calendar_instance_year,
    ));

    promises.push(queryForData(
      'faculties', this.$wits.Faculty,
      this.$wits.Faculty.faculty_title,
    ));

    promises.push(queryForData(
      'schools', this.$wits.School,
      this.$wits.School.school_title,
      this.$wits.School.faculty_id.faculty_title,
    ));

    promises.push(queryForData(
      'courses', this.$wits.Course,
      this.$wits.Course.course_code,
      this.$wits.Course.school_id.school_title,
      this.$wits.Course.school_id.faculty_id.faculty_title,
    ));

    Promise.all(promises)
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.isError = true;
        console.error('Failed to load CommonFiltersFormData:', error);
      });
  },

  computed: {
    facultiesSet() {
      return new Set(this.selected.faculties);
    },
    schoolsSet() {
      return new Set(this.selected.schools);
    },
  },

  watch: {
    facultiesSet() {
      this.$refs.tagInputSchools.updateFilteredTags();
      this.$refs.tagInputCourses.updateFilteredTags();
    },
    schoolsSet() {
      this.$refs.tagInputCourses.updateFilteredTags();
    },
  },

  methods: {
    schoolFilter(value) {
      return (this.facultiesSet.size < 1 || this.facultiesSet.has(this.resultMaps.schools.get(value).faculty_title));
    },
    courseFilter(value) {
      return (this.facultiesSet.size < 1 || this.facultiesSet.has(this.resultMaps.courses.get(value).faculty_title))
        && (this.schoolsSet.size < 1 || this.schoolsSet.has(this.resultMaps.courses.get(value).school_title));
    },
  },
};
</script>

<style scoped lang="scss">
</style>
