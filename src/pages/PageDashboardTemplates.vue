
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

    <!--<OpinionatedModal :active.sync="modalActive" @accept="onModalAccept" @cancel="onModalCancel">-->
      <!--<SlideoutChartOptions :template="selectedTemplate" :subsets="selectedSubsets"/>-->
    <!--</OpinionatedModal>-->


    <!--<VuePanel-->
      <!--v-model="modalActive"-->
      <!--:widths="['400px']"-->
      <!--@close="modalActive=false"-->
    <!--&gt;-->
<!---->
    <!--</VuePanel>-->


    <v-slideout
      :active.sync="modalActive"
      :active-extra.sync="modalActiveExtra"
      width="600px" width-pane="200px" width-pane-extra="400px"
      parents-disabled
    >
      <DashboardTemplateList
        v-if="reportValid"
        :categories="templateCategories"
        @input="(item) => { selectedTemplate=item; modalActiveExtra=true; }"
        singles
      />

      <div slot="extra" class="content has-padding-md">
        <SlideoutChartOptions :template="selectedTemplate" :subsets="selectedSubsets"/>
        <b-level>
          <b-field slot="right" grouped>
            <p class="control button is-danger is-outlined" @click="modalActiveExtra=false"> Back </p>
            <p class="control button is-success" @click="onModalAccept"> Create </p>
          </b-field>
        </b-level>
      </div>

    </v-slideout>

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
import OpinionatedSteps from '../components/opinionated/OpinionatedSteps.vue';
import OpinionatedTabs from '../components/opinionated/OpinionatedTabsAddable.vue';
import SlideoutChartOptions from '../components/slideout/SlideoutChartOptions.vue';
import StandardPageTitle from '../components/StandardPageTitle.vue';

export default {
  name: 'PageDashboardTemplates',
  components: {
    SlideoutChartOptions,
    OpinionatedSteps,
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
      selectedTemplate: {},
      selectedSubsets: [],

      modalActive: false,
      modalActiveExtra: false,

      panel: undefined,
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

    showModal(templateItem) {
      this.selectedTemplate = templateItem;
      this.selectedSubsets = [];

      this.modalActiveExtra = false;
      this.modalActive = true;
    },

    onModalAccept() {
      if (this.isFilterDataValid()) {
        this.modalActive = false;
        this.modalActiveExtra = false;

        // chart format
        const chart = {
          reportId: this.reportId,
          name: this.selectedTemplate.desc,
          meta: {
            template: this.selectedTemplate,
            subsets: this.selectedSubsets,
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
      console.log('VALIDATING: ', this.selectedSubsets);

      if (!this.selectedTemplate.type) {
        return false;
      }
      if (!Array.isArray(this.selectedSubsets) || this.selectedSubsets.length < 1) {
        return false;
      }
      let valid = true;
      this.selectedSubsets.forEach((item, i) => {
        valid = valid && item.label
          && item.selected.years && item.selected.courses
          && item.selected.schools && item.selected.faculties;
      });

      /* { desc, src, type } */
      console.log(this.selectedTemplate);
      /* { label, selected: [{courses:[], faculties:[], schools:[], years:[]}] } */
      console.log(this.selectedSubsets);

      return valid;
    },
  },
};
</script>
