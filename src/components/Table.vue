<template>
  <table id="table">
    <thead>
    <tr>
      <th v-for="col in columns" :key="col">{{col}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in rows" :key="row">
      <td v-for="col in columns" :key="col">{{row[col]}}</td>
    </tr>
    </tbody>
  </table>


</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      rows: [
        {
          id: 1, studentNo: '0021D31BE03E4AB097DCF9C0C89B13BA', school: 'Forte Secondary School', averageMark: '60.75',
        },
        {
          id: 2, studentNo: '002420AA1391E39E6D8FE424D96BCB51', school: 'Mcauley House School', averageMark: '72.33',
        },
        {
          id: 3, studentNo: '0033DA3F89CE5F5306C06E04A808E9C3', school: 'Khumbula Secondary School', averageMark: '39.3',
        },
        {
          id: 4, studentNo: '004D87C05B047CBA6C54582FAAB34ED3', school: 'Altmont Technical High School', averageMark: '53.25',
        },
        {
          id: 5, studentNo: '004F3079DFD6018586D2D2BC04713484', school: 'Mbilwi Snr Sec School', averageMark: '65',
        },
        {
          id: 6, studentNo: '0087A333DD09D21A1492FFBD6F6D1ED2', school: 'Boksburg High School', averageMark: '47.5',
        },
      ],
    };
  },
  computed: {
    columns: function columns() {
      if (this.rows.length === 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
  },

};
</script>

<style scoped>
  #table {
    font-family: 'Open Sans', sans-serif;
    width: 750px;
    border-collapse: collapse;
    border: 3px solid #44475C;
    margin-left:auto;
    margin-right:auto;
  }

  table th {
    text-transform: uppercase;
    text-align: left;
    background: #44475C;
    color: #FFF;
    padding: 8px;
    min-width: 30px;
  }

  table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid #7D82A8;
  }
  table td:last-child {
    border-right: none;
  }
  table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
  }
</style>
