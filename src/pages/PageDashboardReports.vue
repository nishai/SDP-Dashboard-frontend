
<!--

List of all reports

-->

<template>
  <div>
    <StandardPageTitle title="Reports" subtitle="All Your Reports"/>

    <section>
      <b-table
        :data="reports"
        :mobile-cards="false"
        @click="onReportClicked"
        hoverable
      >
        <!-- If table is empty -->
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p><b-icon icon="sad-tear" pack="far" size="is-large"/></p>
              <p> No Reports Exist. </p>
            </div>
          </section>
        </template>

        <!-- template for table entries -->
        <template slot-scope="props">
          <b-table-column field="active" label="Active" width="50" centered>
            <div @click="(event) => setDefaultReport(event, props.row.id)">
              <b-icon
                icon="star"
                type="is-warning"
                :pack="isDefaultReport(props.row.id) ? 'fas' : 'far'"
              />
            </div>
          </b-table-column>
          <b-table-column field="name" label="Name" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="count" label="Charts" width="50" sortable numeric>
            {{ Object.keys(props.row.charts).length }}
          </b-table-column>
          <b-table-column field="created" label="Created" sortable centered>
            {{ props.row.created ? props.row.created : '-' }}
          </b-table-column>
          <b-table-column field="modified" label="Modified" sortable centered>
            {{ props.row.modified ? props.row.modified : '-' }}
          </b-table-column>
        </template>

        <!-- Add new report in table footer -->
        <template slot="footer">
          <div class="has-text-right">
            <button class="button is-success" @click="modalActive=true"> New Report </button>
          </div>
        </template>

      </b-table>
    </section>

    <!-- modal to create a new report -->
    <OpinionatedModal
      title="Create New Report"
      :active.sync="modalActive"
      :accept-disabled="!modalCanAccept"
      @cancel="modalActive=false"
      @accept="onModalAccept"
    >
      <b-field label="Name">
        <b-input v-model="modalName" maxlength="30"></b-input>
        {{ modalName }}
      </b-field>
    </OpinionatedModal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OpinionatedModal from '../components/opinionated/OpinionatedModal.vue';
import StandardPageTitle from '../components/StandardPageTitle.vue';

export default {
  name: 'PageDashboardReports',
  components: {
    OpinionatedModal,
    StandardPageTitle,
  },
  data() {
    return {
      modalCanAccept: true,
      modalActive: false,
      modalName: '',
    };
  },

  computed: {
    ...mapGetters(['getReports', 'isDefaultReport', 'hasReport']),
    reports() {
      return Object.values(this.getReports);
    },
  },

  methods: {
    ...mapActions(['createReport']),

    onReportClicked(row) {
      this.$router.push({ name: 'report', params: { reportId: row.id } });
    },

    setDefaultReport(event, reportId) {
      // stop parent from receiving click event - ie. dont call onReportClicked.
      event.stopPropagation();

      if (!reportId || !this.hasReport(reportId)) {
        throw new Error(`The specified report does not exist: ${reportId}`);
      }
      this.$store.dispatch('setDefaultReport', { reportId });
    },

    onModalAccept() {
      if (!this.modalCanAccept) {
        return;
      }

      let errorToShow;

      if (this.modalName.length < 1) {
        errorToShow = 'The given name is too short!';
      }
      if (Object.values(this.getReports).some((report) => report.name.toLowerCase() === this.modalName.toLowerCase())) {
        errorToShow = 'The given name is already taken!';
      }

      if (errorToShow) {
        this.$toast.open({
          duration: 3000,
          message: errorToShow,
          type: 'is-danger',
        });
        this.modalCanAccept = false;
        setTimeout(() => {
          this.modalCanAccept = true;
        }, 3000);
        return;
      }

      this.createReport({ name: this.modalName })
        .then((reportId) => {
          this.modalActive = false;
          this.$router.push({ name: 'report', params: { reportId } });
        });
    },
  },
};
</script>

<style scoped>
</style>

