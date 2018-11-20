
import { Q } from './api/queryset';
import { querysetCommon, querysetCommonGroupByCount } from './api/wits-api';
import { Student, Faculty, EnrolledYear, EnrolledCourse } from './api/wits-models';


export function getDefaultTemplateCategories() {
  const itemsDemographics = [
    {
      desc: 'Race',
      type: 'doughnut',
      src: '/img/charts/doughnut.png',
      filterOptions: {
        chartTypeOptions: ['doughnut'],
        getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.race_description, { years, faculties, schools, courses }),
        labelField: Student.race_description,
        dataField: 'count',
      },
    },
    {
      desc: 'Gender',
      type: 'doughnut',
      src: '/img/charts/pie2.png',
      filterOptions: {
        chartTypeOptions: ['pie'],
        getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.gender, { years, faculties, schools, courses }),
        labelField: Student.gender,
        dataField: 'count',
      },
    },
    {
      desc: 'Nationality',
      type: 'doughnut',
      src: '/img/charts/pie1.png',
      filterOptions: {
        chartTypeOptions: ['pie'],
        getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.nationality_short_name, { years, faculties, schools, courses }),
        labelField: Student.nationality_short_name,
        dataField: 'count',
      },
    },
    {
      desc: 'Home Language',
      type: 'doughnut',
      src: '/img/charts/pie3.png',
      filterOptions: {
        chartTypeOptions: ['pie'],
        getQueryset: ({ years, faculties, schools, courses }) => querysetCommonGroupByCount(Student, Student.home_language_description, { years, faculties, schools, courses }),
        labelField: Student.home_language_description,
        dataField: 'count',
      },
    },
    {
      desc: 'Demographics vs Marks',
      type: 'bar',
      src: '/img/charts/line2.png',
      filterOptions: {
        numForms: 2,
        chartTypeOptions: ['line'],
      },
    },
  ];

  const itemsMarks = [
    {
      desc: 'Pass rates by year',
      type: 'bar',
      src: '/img/charts/bar1.png',
      filterOptions: { chartTypeOptions: ['bar'] },
    },
    {
      desc: 'Pass rates by faculty/course',
      type: 'bar',
      src: '/img/charts/bar3.png',
      filterOptions: { chartTypeOptions: ['bar'] },
    },
    {
      desc: 'Bell curve',
      type: 'line',
      src: '/img/charts/bell-curve.png',
      filterOptions: { chartTypeOptions: ['line'] },
    },
    {
      desc: 'Progress Outcome by faculty/course',
      type: 'bar',
      src: '/img/charts/bar2.png',
      filterOptions: { chartTypeOptions: ['bar'] },
    },
  ];

  const itemsClasses = [
    {
      desc: 'Class size vs pass rate',
      type: 'line',
      src: '/img/charts/line1.png',
      filterOptions: { chartTypeOptions: ['line'], numForms: 2 },
    },
    {
      desc: 'Average class size by faculty/course',
      type: 'bar',
      src: '/img/charts/bar1.png',
      filterOptions: { chartTypeOptions: ['bar'] },
    }, // click='two'
  ];

  return [
    {
      title: 'Demographics',
      items: itemsDemographics,
    },
    {
      title: 'Marks',
      items: itemsMarks,
    },
    {
      title: 'Class Sizes',
      items: itemsClasses,
    },
  ];
}
