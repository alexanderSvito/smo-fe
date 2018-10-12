<template>
  <div style="display: flex;">
    <header>
      <div @click="start" class="button" v-if="!started">
        START
      </div>
      <div @click="stop" class="button" v-else>
        STOP
      </div>
      <div>{{ timer }}</div>
    </header>
    <div style="width: 40%; margin: 2em;" v-if="ready" >
      <div class="panel" style="width: 100%">
        <div>
          <div class="factory">
            <img src="../assets/3d-printer.png" width="120px">
            <div class="timer">
              <img src="../assets/gear.gif" width="40px" v-if="started">
              <img src="../assets/gear.png" width="40px" v-else>
              <div class="counter">{{ next_in }}</div>
            </div>

          </div>
        </div>

        <div class="queue">
          <img src="../assets/conveyor.png" height="120px">
          <list name="Queue" :issues="reversed(queue)" />
        </div>
        <div class="workers">
          <div class="worker" :key="worker" v-for="(issue, worker) in current_state.state.workers" >
            <div>{{ worker }}</div>
            <img src="../assets/worker.png" width="120px">
            <div class="issue" v-if="issue != 'None'">
              <issue :name="issue"></issue>
              <img src="../assets/manometer.png" width="50px">
            </div>
            </div>

        </div>
      </div>
      <div class="panel bottom" style="width: 100%">
        <list name="Rejected" :issues="rejected" />
        <list name="Finished" :issues="finished" />
        <list name="Expired" :issues="expired" />
      </div>
    </div>
    <div style="width: 40%; margin: 2em;" v-if="ready">
      <div class="panel" style="width: 40%">
        <chart name="busy_chart" :options="workers_options" :values="workers_busy"></chart>
      </div>
      <div class="panel bottom" style="width: 40%">
        <chart name="queue_chart" :options="queue_options" :values="queue_busy"></chart>
      </div>
    </div>
    <div v-if="!ready">
      <loader />
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Issue from '@/components/Issue'
import Chart from '@/components/Chart'
import List from '@/components/List'
import Loader from '@/components/Loader'

export default {
  name: 'SMO',
  computed: {
    current_state: function () {
      return this.states[this.current_iteration]
    },
    next_state: function () {
      return this.states[this.current_iteration + 1]
    },
    rejected: function () {
      return this.current_state.state.rejected
    },
    finished: function () {
      return this.current_state.state.finished
    },
    expired: function () {
      return this.current_state.state.expired
    },
    queue: function () {
      return this.current_state.state.queue
    },
    busy: function () {
      return this.current_state.state.workers_busy
    },
    workers_options: function () {
      return Object.keys(this.current_state.state.time_dist)
    },
    workers_busy: function () {
      return Object.values(this.current_state.state.time_dist)
    },
    queue_options: function () {
      return Object.keys(this.current_state.state.queue_dist)
    },
    queue_busy: function () {
      return Object.values(this.current_state.state.queue_dist)
    }
  },
  data () {
    return {
      ready: false,
      states: [],
      current_iteration: 0,
      next_in: 1000.0,
      step: 1000.0,
      timer: 0.0,
      started: false,
      cycle: 0,
      issue_map: []
    }
  },
  mounted () {
    axios.get('http://127.0.0.1:5000/run').then(response => {
      this.states = response.data
      this.ready = true
    })
  },
  methods: {
    stop: function () {
      clearInterval(this.cycle)
      this.started = false
    },
    start: function () {
      let that = this
      this.cycle = setInterval(function () {
        that.step = (that.step - 0.01).toFixed(2)
        that.timer = (+that.timer + 0.01).toFixed(2)
        that.next_in = (that.next_in - 0.01).toFixed(2)
        if (that.step <= 0) {
          that.current_iteration += 1
          that.next_in = that.current_state.state.next_in.toFixed(2)
          that.step = that.current_state.state.step.toFixed(2)
        }
      }, 200)
      this.started = true
    },
    reversed: function (value) {
      return value.slice().reverse()
    }
  },
  watch: {
    ready: function (n) {
      this.next_in = this.current_state.state.next_in.toFixed(2)
      this.step = this.current_state.state.step.toFixed(2)
    }
  },
  components: {
    Loader,
    List,
    Issue,
    Chart
  }
}
</script>

<style scoped>
  img {
    display: flex;
    margin: 1em auto;
  }
  .panel {
    display: flex;
    padding: 1em;
    flex-direction: column;

    min-width: 500px;
    margin: 5em 1em 2em 1em;

    position: relative;

    background-color: rgba(256, 256, 256, 0.9);
    border-radius: 3%;
    box-shadow: gray 4px 4px 15px;
  }
  .counter {
    background-color: rgba(5, 117, 230, 0.5);
    display: block;
    border-radius: 100%;
    border: white 1px solid;
    height: 30px;
    width: 30px;
    padding: 7px;
    box-shadow: lightgrey 4px 6px 11px;
    margin: 6px;
    color: white;
  }
  .factory {
    justify-content: center;
    position: relative;
    width: 100%;
  }
  .queue {
    width: 100%;
    display: flex;
  }
  .queue img {
    margin: 1em auto;
  }
  .workers {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .worker {
    position: relative;
    text-align: center;
  }
  .issue {
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
  .timer {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 60px;
    height: 60px;
    bottom: 30px;
    right: 30%;
    border-radius: 100% !important;
    font-size: 1em;
  }
  .timer div{
    margin: auto;
  }
  .bottom {
    display: flex;
    margin: 1em;
    flex-direction: row;

    justify-content: space-around;
  }
  header {
    display: flex;
    background: white;
    padding: 1em;
    border-bottom: #0575E6 5px solid;
    box-shadow: gray 4px 4px 15px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    justify-content: space-around;
  }
  .button {
    font-family: 'Gochi Hand', cursive;
    font-size: 24px;

    transition: all 0.2s ease-in-out;
  }
  .button:hover {
    cursor: pointer;

    text-shadow: lightgrey 1px 1px 2px;
    transform: translateY(-1px);
  }
</style>
