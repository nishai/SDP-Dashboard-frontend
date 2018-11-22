
<!--

links to the report specified in the url query:     ?reportId='.........'
otherwise links to the default report,

TODO: I did this page retardedly

-->

<template>
  <div>
    <StandardPageTitle title="Templates" subtitle="Create a New Chart"/>

    <!-- I was wanting to change this from a page to a modal... so made things easier as a component... -->
    <DashboardTemplateList
      v-if="reportValid"
      :categories="templateCategories"
      @input="showModal"
    />

    <!-- IF NO LINKED REPORT -->
    <section v-else class="section">
      <div class="content has-text-grey has-text-centered">
        <p><b-icon icon="sad-tear" pack="far" size="is-large"/></p>
        <p> Default report does not exist - Select a default or create a new one. </p>
        <p> <router-link :to="{ name: 'reports' }"> <a class="button is-success"> Go To Reports </a> </router-link> </p>
      </div>
    </section>

    <OpinionatedModal :active.sync="modalActive" @accept="onModalAccept" @cancel="onModalCancel">
      <div style="min-height: 1000px">
        <p class="title">{{ selectedItem.desc }}</p>
        <!-- CHART TYPE SELECTOR -->
        <DashboardChartTypeSelector
          @input="(type)=>selectedItem.type=type"
          :types-enabled="selectedItem.chartTypes"
        />

        <!-- TABBED FILTERS -->
        <OpinionatedTabs :items="selectedFilters" @add="onTabAdded" @delete="onTabDelete">
          <template slot-scope="props">
            <b-field label="Dataset Label">
              <b-input v-model="props.item.label"></b-input>
            </b-field>
            <DashboardCommonFiltersForm :selected.sync="props.item.selected"/>
          </template>
        </OpinionatedTabs>
      </div>
    </OpinionatedModal>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getDefaultTemplateListItems } from '../assets/js/defaults';
import DashboardChartTypeSelector from '../components/dashboard/DashboardChartTypeSelector.vue';
import DashboardCommonFiltersForm from '../components/dashboard/DashboardCommonFiltersForm.vue';
import DashboardTemplateList from '../components/dashboard/DashboardTemplateList.vue';
import OpinionatedModal from '../components/opinionated/OpinionatedModal.vue';
import OpinionatedFilterLabels from '../components/opinionated/OpinionatedFilterLabels.vue';
import OpinionatedTabs from '../components/opinionated/OpinionatedTabsAddable.vue';
import StandardPageTitle from '../components/StandardPageTitle.vue';

export default {
  name: 'PageDashboardHome',
  components: {
    OpinionatedTabs,
    DashboardCommonFiltersForm,
    StandardPageTitle,
    DashboardTemplateList,
    DashboardChartTypeSelector,
    OpinionatedModal,
    OpinionatedFilterLabels,
  },

  data() {
    return {
      templateCategories: getDefaultTemplateListItems(),
      modalActive: false,
      selectedItem: {},
      selectedFilters: [],
    };
  },

  computed: {
    ...mapGetters(['getDefaultReport', 'hasDefaultReport', 'hasReport']),

    reportId() {
      return this.$route.query.reportId || (this.hasDefaultReport() ? this.getDefaultReport().id : undefined);
    },

    reportValid() {
      return this.hasReport(this.reportId);
    },
  },

  methods: {
    onTabAdded(index) {
      this.selectedFilters.push({ label: 'Unknown', selected: { years: [], faculties: [], schools: [], courses: [] } });
    },

    onTabDelete(index) {
      this.selectedFilters.splice(index, 1);
    },

    showModal(templateItem) {
      this.selectedItem = templateItem;
      this.selectedFilters = [];
      this.onTabAdded();
      this.modalActive = true;
    },

    onModalAccept() {
      if (this.isFilterDataValid()) {
        this.modalActive = false;

        // chart format
        const chart = {
          reportId: this.reportId,
          name: this.selectedItem.desc,
          meta: {
            chartType: this.selectedItem.type,
            filters: this.selectedFilters,
            data: this.selectedItem.data,
          },
        };

        // create chart.
        this.$store.dispatch('createReportChart', chart);

        console.log('Dispatched chart data:', chart);

        this.$router.push({ name: 'report', params: { reportId: this.reportId } });
      } else {
        this.$toast.open({
          duration: 3000,
          message: 'Unable to continue - Check that your data is valid.',
          position: 'is-bottom',
          type: 'is-danger',
        });
      }
    },

    onModalCancel() {
      this.modalActive = false;
    },

    isFilterDataValid() {
      console.log('VALIDATING: ', this.selectedFilters);

      if (!this.selectedItem.type) {
        return false;
      }
      if (!Array.isArray(this.selectedFilters) || this.selectedFilters.length < 1) {
        return false;
      }
      let valid = true;
      this.selectedFilters.forEach((item, i) => {
        valid = valid && item.label
          && item.selected.years && item.selected.courses
          && item.selected.schools && item.selected.faculties;
      });

      /* { desc, src, type } */
      console.log(this.selectedItem);
      /* { label, selected: [{courses:[], faculties:[], schools:[], years:[]}] } */
      console.log(this.selectedFilters);

      return valid;
    },
  },
};
</script>
