<template>
  <div id="queryFilter">
    <!-- input group, looks all joined together -->
    <b-input-group size="sm">
      <!-- exclude -->
      <b-input-group-prepend>
        <b-btn :variant="data.exclude ? 'outline-warning' : 'outline-success'" @click="data.exclude=!data.exclude">
          {{ data.exclude ? 'exclude' : 'include' }}
        </b-btn>
      </b-input-group-prepend>
      <!-- field -->
      <b-input-group-prepend>
        <b-dropdown :text="data.field" variant="outline-secondary" slot="append" size="sm">
          <b-dropdown-item v-for="field in fields" :key="field" @click="data.field=field">
            {{ field }}
          </b-dropdown-item>
        </b-dropdown>
      </b-input-group-prepend>
      <!-- operator -->
      <b-input-group-prepend>
        <b-dropdown :text="data.operator" variant="outline-secondary" slot="append" size="sm">
          <b-dropdown-item v-for="operator in operators" :key="operator" @click="data.operator=operator">
            {{ operator }}
          </b-dropdown-item>
        </b-dropdown>
      </b-input-group-prepend>
      <!-- value -->
      <b-form-input type="text" size="sm"></b-form-input>
      <!-- delete button, only shows if deletable is set -->
      <b-input-group-append v-if="deletable">
        <b-btn variant="danger">X</b-btn>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'QueryFilter',
  props: {
    data: {
      type: Object,
      default: () => ({
        exclude: false,
        field: 'encrypted_student_no',
        operator: 'startswith',
        value: '',
      }),
    },
    deletable: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    // avail options
    // todo, get from backend
    fields: [
      'encrypted_student_no',
      'year_of_study',
      'race',
      'age',
      'gender',
    ],
    operators: [
      'gte',
      'gt',
      'lte',
      'lt',
      'eq',
      'startswith',
    ],
  }),
};
</script>

<style>
</style>
