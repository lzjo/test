<template>
  <div id="vue-app">
    <component-a />
    <component-b />
  </div>
</template>

<script>
import ComponentA from './a'
import ComponentB from './b'
export default {
  name: 'App',
  components: {
    ComponentA,
    ComponentB
  }
}
</script>

<style>

</style>