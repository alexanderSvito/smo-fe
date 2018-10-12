<template>
  <canvas :id="name" width="400" ref="chart" height="240"></canvas>
</template>

<script>
import Chart from 'chart.js'

const COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
]

export default {
  props: ['name', 'options', 'values'],
  name: 'Chart',
  methods: {
    getColors: function (n) {
      let arr = []
      while (arr.length < n) {
        let r = Math.floor(Math.random() * 100) + 1
        if (arr.indexOf(r) > -1) continue
        arr[arr.length] = r
      }
      let colors = []
      for (let i = 0; i < n; i++) {
        colors[colors.length] = COLORS[i % 6]
      }
      return colors
    }
  },
  mounted: function () {
    let n = this.options.length
    let colors = this.getColors(n)
    /* eslint-disable no-new */
    new Chart(this.$refs.chart, {
      type: 'bar',
      data: {
        labels: this.options,
        datasets: [{
          label: '# Busy',
          data: this.values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      },
      options: {
        animation: null,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
    )
  },
  watch: {
    values: function (newVal) {
      let n = this.options.length
      let colors = this.getColors(n)
      /* eslint-disable no-new */
      new Chart(this.$refs.chart, {
        type: 'bar',
        data: {
          labels: this.options,
          datasets: [{
            label: '# Busy',
            data: newVal,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          animation: null,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
      )
    }
  }
}
</script>
