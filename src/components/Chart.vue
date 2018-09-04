<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: ['Black', 'White', 'Indian', 'Coloured', 'Other'],
        datasets: [{
          data: [60, 13, 12, 10, 5],
          backgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 2,
        }],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Course Demographics: Race',
        },
      },
    );
  },
};
</script>
