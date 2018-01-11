<template>
  <div id="app">
    <app-menu />
    <router-view></router-view>
  </div>
</template>

<script>
  import appMenu from './components/ui/app-menu'

  export default {
    name: 'weather-bar-app',
    components: {
      appMenu
    }
  }
</script>

<style lang="scss">
  /* CSS */
</style>
