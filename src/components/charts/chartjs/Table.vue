<template>
  <div id="Table">
    <b-form-select v-model="selected" :options="fields" class="mb-3" />
    <Button id="Add" v-on:click="add(selected)">Add</Button>
    <div>Selected: <strong>{{ selected }}</strong></div>
    <b-table id="table" striped hover :items="rows" :fields="displayedFields"></b-table>
  </div>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      selected: null,
      fields: [
        {
          value: 'id',
          text: 'id',
        },
        {
          value: 'studentNo',
          text: 'Student Number',
        },
        {
          value: 'school',
          text: 'School',
        },
        {
          value: 'averageMark',
          text: 'Average Mark',
        },
      ],
      displayedFields: [
        {
          key: 'studentNo',
          sortable: true,
        },
        {
          key: 'averageMark',
          sortable: true,
        },

      ],
      rows: [
        {
          id: 1,
          studentNo: '0021D31BE03E4AB097DCF9C0C89B13BA',
          school: 'Forte Secondary School',
          averageMark: '60.75',
        },
        {
          id: 2,
          studentNo: '002420AA1391E39E6D8FE424D96BCB51',
          school: 'Mcauley House School',
          averageMark: '72.33',
        },
        {
          id: 3,
          studentNo: '0033DA3F89CE5F5306C06E04A808E9C3',
          school: 'Khumbula Secondary School',
          averageMark: '39.3',
        },
        {
          id: 4,
          studentNo: '004D87C05B047CBA6C54582FAAB34ED3',
          school: 'Altmont Technical High School',
          averageMark: '53.25',
        },
        {
          id: 5,
          studentNo: '004F3079DFD6018586D2D2BC04713484',
          school: 'Mbilwi Snr Sec School',
          averageMark: '65',
        },
      ],
    };
  },
  methods: {
    add(item) {
      this.displayedFields.push({ key: item, sortable: true });
    },
  },
};
</script>

<style>
</style>
