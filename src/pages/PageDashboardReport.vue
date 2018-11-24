
<template>
  <div>

    <!-- HEADING + BUTTONS -->
    <b-level ref="printMe">
      <!-- LEFT - HEADING -->
      <template slot="left">
        <StandardPageTitle title="Report" :subtitle="name">
          <b-tooltip
            v-if="defaultReport"
            label="This is your default/active report. This can be changed under the reports page."
            position="is-bottom"
            type="is-light"
          >
            <b-icon class="has-padding-left-md" icon="star" type="is-warning" size="is-small"/>
          </b-tooltip>
        </StandardPageTitle>
      </template>
      <!-- RIGHT - BUTTONS-->
      <template slot="right">
        <b-field grouped group-multiline>
          <p class="control"><button class="button is-success" @click="createChart">
            <span> Create </span> <b-icon icon="chart-bar" size="is-small"/>
          </button></p>
          <p class="control"><button class="button is-bulma is-outlined" @click="resetGrid" :disabled="!layout || this.layout.length < 1">
            <span> Tidy </span> <b-icon icon="th" size="is-small"/>
          </button></p>
          <p class="control"><button class="button is-info is-outlined" @click="convertToPdf" :disabled="!layout || this.layout.length < 1">
            <span> PDF </span> <b-icon icon="file-download" size="is-small"/>
          </button></p>
          <p class="control">
            <button class="button is-danger is-outlined" @click="deleteReport">
              <span> Delete </span> <b-icon icon="trash-alt" size="is-small"/>
            </button>
          </p>
        </b-field>
      </template>
    </b-level>

    <!-- GIRD LAYOUT -->
    <section class="section">
      <!-- IF THERE ARE CHARTS -->
      <OpinionatedGridLayout
        v-if="layout && layout.length > 0"
        :layout.sync="layout"
        ref="gridLayout"
      >
        <template slot-scope="props">
          <DashboardChart
            :report-id="reportId"
            :chart-id="props.meta.i"
            :ref="'chart-'+props.meta.i"
            style="height: 100%"
            @edit="editChart"
          />
        </template>
      </OpinionatedGridLayout>
      <!-- IF THERE ARE NO CHARTS -->
      <div v-else class="content has-text-grey has-text-centered">
        <p><b-icon icon="chart-bar" size="is-large"/></p>
        <p> There are currently no charts. Please create one! </p>
      </div>
    </section>

    <!-- USED FOR SAVING -->
    <b-loading :active="isSaving" :can-cancel="false"/>

    <!-- SLIDEOUT FOR EDITING CHARTS, provides a method that returns a promise -->
    <SlideoutChartOptions ref="slideout"/>

  </div>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { mapGetters } from 'vuex';
import VueGridLayout from 'vue-grid-layout';
import DashboardChart from '../components/dashboard/DashboardChart.vue';
import OpinionatedGridLayout from '../components/opinionated/OpinionatedGridLayout.vue';
import SlideoutChartOptions from '../components/slideout/SlideoutChartOptions.vue';
import StandardPageTitle from '../components/StandardPageTitle.vue';


export default {
  name: 'PageDashboardReport',

  components: {
    SlideoutChartOptions,
    DashboardChart,
    StandardPageTitle,
    OpinionatedGridLayout,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },

  data() {
    return {
      isSaving: false,
      /* editing */
      editReportId: undefined,
      editChartId: undefined,
    };
  },

  computed: {
    ...mapGetters(['hasReport', 'getReport', 'isDefaultReport']),

    reportId() {
      return this.$route.params.reportId;
    },
    /**
     * If this report exists in the vuex store.
     * id is based off the url parameters.
     */
    reportExists() {
      return this.reportId && this.hasReport(this.reportId);
    },
    defaultReport() {
      return this.reportExists && this.isDefaultReport(this.reportId);
    },
    report() {
      return this.getReport(this.reportId);
    },
    name() {
      return this.reportExists ? this.report.name : 'Report does not Exist';
    },
    layout: {
      get() {
        return this.reportExists ? this.report.layout : undefined;
      },
      set(value) {
        console.log('layout:', this.layout);
        this.$store.dispatch('updateReportLayout', { reportId: this.reportId, layout: value });
      },
    },
  },

  /**
   * Redirects if this report is not found.
   * TODO: convert to beforeRouteEnter()
   */
  beforeMount() {
    if (!this.reportExists) {
      this.$toast.open({
        duration: 3000,
        message: 'Report does not exist',
        type: 'is-danger',
      });
      this.$router.push({ name: 'reports' });
    }
  },

  methods: {
    /**
     * Reset chart sizes to 1x1 and remove gaps between charts.
     */
    resetGrid() {
      this.$refs.gridLayout.recalculateGrid();
    },

    /**
     * Creates a chart for this report in the vuex store.
     */
    createChart() {
      this.$refs.slideout.open().then(({ name, meta }) => {
        console.log('SLIDEOUT PROMISE CREATE', name, meta);
        this.$store.dispatch('createReportChart', { reportId: this.reportId, name, meta })
          .then((chartId) => {
            this.$toast.open({
              duration: 3000,
              type: 'is-success',
              message: 'Please edit your new chart.',
            });
          })
          .catch((error) => {
            this.$toast.open({
              duration: 3000,
              type: 'is-danger',
              message: 'There was an error creating the chart.',
            });
          });
      });
    },

    /**
     * Show the editor slideout to edit the specified chart.
     * And then commit mutations based on the promise it returns.
     */
    editChart(reportId, chartId) {
      this.$refs.slideout.open(reportId, chartId).then(({ name, meta }) => {
        console.log('SLIDEOUT PROMISE EDIT', name, meta);
        this.$store.dispatch('updateReportChart', { reportId, chartId, name, meta })
          .then(() => {
            this.$toast.open({
              duration: 3000,
              type: 'is-success',
              message: 'Successfully modified your chart.',
            });
          })
          .catch(() => {
            this.$toast.open({
              duration: 3000,
              message: 'Failed to edit your chart.',
              type: 'is-danger',
            });
          });
      });
    },

    /**
     * Delete this report from the vuex store.
     * Prompts the user first for confirmation.
     */
    deleteReport() {
      this.$dialog.confirm({
        title: 'Deleting Report',
        message: 'Are you sure you want to <b>delete</b> this report? This action cannot be undone.',
        confirmText: 'Delete Report',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteReport', { reportId: this.reportId });
          this.$router.push({ name: 'reports' });
          this.$toast.open('Report deleted!');
        },
      });
    },

    /**
     * Converts all the charts to a pdf report,
     * displaying a loading screen while in progress.
     */
    convertToPdf() {
      if (this.isSaving) {
        this.$toast.open({ duration: 3000, type: 'is-danger', message: 'PDF conversion already in progress' });
        return;
      }
      if (this.layout.length < 1) {
        this.$toast.open({ duration: 3000, type: 'is-danger', message: 'There is no content to save.' });
        return;
      }

      this.isSaving = true;

      /* pdf generator instance */
      const doc = jsPDF({         // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
        orientation: 'portrait',  // portrait, landscape
        unit: 'pt',               // pt (points), mm, cm, in, px
        format: 'a4',             // a0 to a10, and lots more | a4: 595.28pt 841.89pt
      });

      /* document padding and stuffs */
      const w = { size: 595.28, margin: 595.28 * 0.1, content: 595.28 * 0.8, gap: 595.28 * 0.05, num: 3, cell: (595.28 * (0.8 - 0.05 * 2)) / 3 };
      const h = { size: 841.89, margin: 841.89 * 0.1, content: 841.89 * 0.8, gap: 841.89 * 0.05, num: 5, cell: (841.89 * (0.8 - 0.05 * 5)) / 5 }; // padding under heading

      doc.text(`Report: ${this.name}`, w.margin, h.margin); // text, x, y

      /* generate content */
      const promises = this.layout.map((meta, i) => {
        const el = this.$refs[`chart-${meta.i}`].$el;
        return html2canvas(el, { allowTaint: true })
          .then((canvas) => {
            const width = meta.w * w.cell;
            const height = meta.h * (canvas.height / canvas.width) * width;
            const x = w.margin + meta.x * (w.cell + w.gap);
            const y = h.margin + h.gap + meta.y * (h.cell + h.gap);
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
            // TODO: extra pdf pages.
            doc.addImage(canvas.toDataURL(), 'PNG', x, y, width, height, '', 'FAST');
          });
      });

      /* Wait for all promises */
      Promise.all(promises).then(() => {
        doc.save('report.pdf');
        this.isSaving = false;
        this.$toast.open({ duration: 3000, type: 'is-success', message: 'Successfully generated report!' });
      }).catch(() => {
        this.isSaving = false;
        this.$toast.open({ duration: 3000, type: 'is-danger', message: 'Failed to generate report!' });
      });
    },
  }, // end methods
};
</script>

<style scoped>

</style>
