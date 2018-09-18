<template>
  <div id="List">
    <select v-model="selectedColumn">
      <!--option v-for="student in students" :key="student.id">{{Object.keys(student)}}</option-->
      <option v-for="item in itemID" :key="item">{{item}}</option>
    </select>
    <h2>{{selectedColumn}}</h2>
    <li v-if="selectedColumn==='studentNo'" v-for="student in students" :key="student.id">
      {{student.studentNo}}
    </li>
    <li v-if="selectedColumn==='school'" v-for="student in students" :key="student.id">
      {{student.school}}
    </li>
    <li v-if="selectedColumn==='averageMark'" v-for="student in students" :key="student.id">
      {{student.averageMark}}
    </li>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      students: [
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
      ],
      selectedColumn: '',
      value: [],
      itemID: ['studentNo', 'school', 'averageMark'],
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
