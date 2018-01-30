<template>
  <div id="app">
    <app-menu />
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url('~@/assets/css/app.css');
@import url('~@/assets/css/fontawesome-all.css');
@import url('~@/assets/css/weather-icons.css');
@import url('~@/assets/css/animate.css');
</style>

<script>
  import appMenu from './components/ui/app-menu'
  import api from './services/api'
  import util from './util'

  const TIMER_CURRENT_WEATHER = 60000 // 1 Minute
  const TIMER_FORECAST_WEATHER = 3600000 // 1 Hour

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
      this.getLocation()
    },
    methods: {
      bindElectronEvents () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.removeAllListeners('app-opened')
          this.$electron.ipcRenderer.on('app-opened', () => {
            console.log('App Opened')
          })

          this.$electron.ipcRenderer.removeAllListeners('app-closed')
          this.$electron.ipcRenderer.on('app-closed', () => {
            this.$router.push({ name: 'index-page' })
          })

          this.$electron.ipcRenderer.removeAllListeners('set-uuid')
          this.$electron.ipcRenderer.on('set-uuid', (evt, uuid) => {
            this.getUserSettings(uuid)
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-preferences')
          this.$electron.ipcRenderer.on('go-to-preferences', (evt) => {
            this.$router.push({ name: 'preferences-page' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-local-weather')
          this.$electron.ipcRenderer.on('go-to-local-weather', (evt) => {
            this.$router.push({ name: 'index-page' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-saved-locations')
          this.$electron.ipcRenderer.on('go-to-saved-locations', (evt) => {
            this.$router.push({ name: 'index-page' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-new-location')
          this.$electron.ipcRenderer.on('go-to-new-location', (evt) => {
            this.$router.push({ name: 'select-page' })
          })
        }
      },
      getUUID () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.send('get-uuid')
        }
      },
      getLocation () {
        api.getIpAddress((response) => {
          api.getLocationByIp(response.ip, (location) => {
            if (typeof location.data !== 'undefined') {
              const uuid = this.$store.state.settings.uuid
              const loc = location.data

              api.updateUserSettings({ uuid: uuid, key: 'current_city', value: loc.city })
              api.updateUserSettings({ uuid: uuid, key: 'current_country', value: loc.country })
              api.updateUserSettings({ uuid: uuid, key: 'current_ip_address', value: loc.ip_address })
              api.updateUserSettings({ uuid: uuid, key: 'current_latitude', value: loc.latitude })
              api.updateUserSettings({ uuid: uuid, key: 'current_longitude', value: loc.longitude })
              api.updateUserSettings({ uuid: uuid, key: 'current_postalcode', value: loc.postalcode })
              api.updateUserSettings({ uuid: uuid, key: 'current_region', value: loc.region })
              api.updateUserSettings({ uuid: uuid, key: 'current_time_zone', value: loc.time_zone })

              this.$store.dispatch('setCurrentLocation', location.data)

              this.getCurrentWeather()
              this.getForecastWeather()
            }
          })
        })
      },
      getCurrentWeather () {
        clearTimeout(this.timers.current)
        this.timers.current = setTimeout(this.getCurrentWeather, TIMER_CURRENT_WEATHER)

        const location = this.$store.getters.getCurrentLocation

        api.getCurrentWeatherByGeo(location, (weather) => {
          if (typeof weather.data !== 'undefined' && typeof weather.data.weather !== 'undefined') {
            const weatherBarData = util.prepMenubarWeather(weather.data, this.$store.state.settings)
            const weatherData = util.parseWeather(weather.data, this.$store.state.settings)

            console.log('weatherData', weatherData)

            this.$electron.ipcRenderer.send('set-weather', weatherBarData)
          }
        })
      },
      getForecastWeather () {
        clearTimeout(this.timers.forecast)
        this.timers.forecast = setTimeout(this.getForecastWeather, TIMER_FORECAST_WEATHER)
      },
      getUserSettings (uuid) {
        api.getUserSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('loadSettings', response.data)
            this.$electron.ipcRenderer.send('save-settings', response.data)
          } else {
            this.initSettings(uuid)
          }
        })
      },
      initSettings (uuid) {
        api.initSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('initSettings', response.data)
            this.$electron.ipcRenderer.send('save-settings', response.data)
          }
        })
      }
    },
    components: {
      appMenu
    }
  }
</script>
