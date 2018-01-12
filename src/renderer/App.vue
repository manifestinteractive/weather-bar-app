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
    mounted () {
      this.$electron.ipcRenderer.on('reload-weather', () => {
        console.log('Reload Weather')
      })

      this.$electron.ipcRenderer.on('app-opened', () => {
        console.log('App Opened')
      })

      this.$electron.ipcRenderer.on('app-closed', () => {
        console.log('App Closed')
      })

      // @TODO: Load Settings and hand them off the Electron at Launch
    },
    components: {
      appMenu
    }
  }
</script>

<style lang="scss">
  /* CSS */
</style>
