<template>
  <div id="app">
    <app-menu />
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url('~@/assets/css/app.css');
@import url('~@/assets/css/fontawesome-all.css');
</style>

<script>
  import appMenu from './components/ui/app-menu'
  import api from './services/api'

  const TIMER_CURRENT_WEATHER = 900000 // 15 Minutes
  const TIMER_FORECAST_WEATHER = 10800000 // 3 Hours

  export default {
    name: 'weather-bar-app',
    data () {
      return {
        timers: {
          current: null,
          forecast: null
        }
      }
    },
    beforeDestroy () {
      clearTimeout(this.timers.current)
      clearTimeout(this.timers.forecast)
    },
    created () {
      this.bindElectronEvents()
      this.getUUID()
    },
    mounted () {
      this.getCurrentWeather()
      this.getForecastWeather()
    },
    methods: {
      bindElectronEvents () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.removeAllListeners('reload-weather')
          this.$electron.ipcRenderer.on('reload-weather', () => {
            console.log('Reload Weather')
          })

          this.$electron.ipcRenderer.removeAllListeners('app-opened')
          this.$electron.ipcRenderer.on('app-opened', () => {
            console.log('App Opened')
          })

          this.$electron.ipcRenderer.removeAllListeners('app-closed')
          this.$electron.ipcRenderer.on('app-closed', () => {
            console.log('App Closed')
          })

          this.$electron.ipcRenderer.removeAllListeners('set-uuid')
          this.$electron.ipcRenderer.on('set-uuid', (evt, uuid) => {
            this.getUserSettings(uuid)
          })
        }
      },
      getUUID () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.send('get-uuid')
        }
      },
      getCurrentWeather () {
        clearTimeout(this.timers.current)
        this.timers.current = setTimeout(this.getCurrentWeather, TIMER_CURRENT_WEATHER)
        console.log('getCurrentWeather')
      },
      getForecastWeather () {
        clearTimeout(this.timers.forecast)
        this.timers.forecast = setTimeout(this.getForecastWeather, TIMER_FORECAST_WEATHER)
        console.log('getForecastWeather')
      },
      getUserSettings (uuid) {
        api.getUserSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('loadSettings', response.data)
          } else {
            this.initSettings(uuid)
          }
        })
      },
      initSettings (uuid) {
        api.initSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('initSettings', response.data)
          }
        })
      }
    },
    components: {
      appMenu
    }
  }
</script>
