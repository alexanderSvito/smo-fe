<template>
  <div class="scroll">
    <div>{{ name }}</div>
    <div>
      <ul>
        <transition-group name="list" tag="p">
        <li v-for="issue in issues" transition="issue" :key="issue">
          <issue :name="issue"></issue>
        </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import Issue from '@/components/Issue'

export default {
  props: ['name', 'issues'],
  name: 'List',
  components: {
    Issue
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  .scroll::-webkit-scrollbar { width: 0 !important }
  .scroll {
    height: 100px;
    width: 33%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1em;
  }
  .list-move {
    transition: transform .5s cubic-bezier(.55,0,.1,1);
  }
</style>
