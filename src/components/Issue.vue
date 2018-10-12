<template>
  <div
    class="badge"
    :style="{'background': toColor(num)}">
    <span>{{ left }}</span>
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'Issue',
  props: ['name', 'left'],
  computed: {
    num: function () {
      let x = Math.sin(+this.name.match(/\d+/)[0]++) * 10000
      return Math.floor(x)
    }
  },
  methods: {
    toColor: function (num) {
      num >>>= 0
      let b = num & 0xFF
      let g = (num & 0xFF00) >>> 8
      let r = (num & 0xFF0000) >>> 16
      let a = 0.8
      return 'rgba(' + [r, g, b, a].join(',') + ')'
    }
  }
}
</script>

<style scoped>
  .badge {
    background-color: rgba(256, 256, 256, 0.9);
    border-radius: 10%;
    box-shadow: gray 3px 3px 5px;

    margin: 6px;
    padding: 6px;
    color: white;
  }
</style>
