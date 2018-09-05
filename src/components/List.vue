<template>
  <div id="List">
    <select v-model="selectedColumn">
      <option v-for="item in items" :key="item">{{item}}</option>
    </select>
    <h2>{{selectedColumn}}</h2>
    <!--TODO-->
    <!--Rather than studentNo I want to loop through the selectedColumn-->
    <!--Issue is that that is a string and I'm not sure how to replace it with the relevant array-->
    <li v-for="item in studentNo" :key="item">
      {{item}}
    </li>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      studentNo: ['0021D31BE03E4AB097DCF9C0C89B13BA', '002420AA1391E39E6D8FE424D96BCB51', '0033DA3F89CE5F5306C06E04A808E9C3', '004D87C05B047CBA6C54582FAAB34ED3'],
      school: ['Forte Secondary School', 'Mcauley House School', 'Khumbula Secondary School', 'Altmont Technical High School'],
      averageMark: ['60.75', '72.33', '39.3', '53.25'],
      items: ['StudentNo', 'School', 'AverageMark'],
      selectedColumn: '',
    };
  },
};

</script>

<style scoped>
  div {
    width: 200px;
  }

  h2 {
    font: 400 30px/1.5 Helvetica, Verdana, sans-serif;
    margin: 0;
    padding: 0;
  }

  li {
    font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    border: none;
  }

  li a {
    text-decoration: none;
    color: #000;
    display: block;
    width: 200px;

    -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
    -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
    -o-transition: font-size 0.3s ease, background-color 0.3s ease;
    -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
    transition: font-size 0.3s ease, background-color 0.3s ease;
  }
</style>
