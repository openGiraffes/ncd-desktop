<template>
  <Sidebar></Sidebar>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Sidebar
  }
}
</script>

<style>
#app {
  height: 790px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
