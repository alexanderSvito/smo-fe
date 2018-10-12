<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gochi+Hand" rel="stylesheet">

    <router-view/>
    <span style="text-align: center">Alexander Svito 2018</span>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html {
    display: flex;
    font-family: 'Open Sans', sans-serif;
  }
  body {
    background: linear-gradient(top left, #a8ff78, #78ffd6);
    height: 900px;
    width: 100%;
  }
  #app {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
