
/* ========================================================================== */
/* Used to store the names of state transitions for the global vuex state.    */
/*                                                                            */
/* - It is a commonly seen pattern to use constants for mutation types in     */
/*   various Flux implementations. This allows the code to take advantage of  */
/*   tooling like linters, and putting all constants in a single file allows  */
/*   your collaborators to get an at-a-glance view of what mutations are      */
/*   possible in the entire application:                                      */
/* ========================================================================== */

export default {
  TOGGLE_OPTSBAR: 'TOGGLE_OPTSBAR',
  SET_OPTSBAR_COMPONENT: 'SET_OPTSBAR_COMPONENT',

  CREATE_REPORT: 'CREATE_REPORT',
  CREATE_REPORT_CHART: 'CREATE_REPORT_CHART',
  DELETE_REPORT_CHART: 'DELETE_REPORT_CHART',

  API_POLLING_SET_CONNECTED: 'API_POLLING_SET_CONNECTED',
  API_POLLING_SET_ENABLED: 'API_POLLING_SET_ENABLED',
  AUTH_SET_JWT_TOKEN: 'AUTH_SET_JWT_TOKEN',
};
