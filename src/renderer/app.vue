<template>
  <div id="app">
    <toast v-if="toastMessage" :toastMessage="toastMessage" />
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
  import * as tzlookup from 'tz-lookup'

  import appMenu from './components/ui/app-menu'
  import toast from './components/ui/toast'
  import api from './services/api'
  import util from './util'

  import { EventBus } from './event-bus'

  const TIMER_CURRENT_WEATHER = 60000 // 1 Minute
  const TIMER_FORECAST_WEATHER = 3600000 // 1 Hour

  export default {
    name: 'weather-bar-app',
    data () {
      return {
        toastMessage: null,
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
    mounted () {
      EventBus.$off('closeToast')
      EventBus.$on('closeToast', () => {
        this.toastMessage = null
      })

      EventBus.$off('showToast')
      EventBus.$on('showToast', (message) => {
        this.toastMessage = message
      })
    },
    methods: {
      bindElectronEvents () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.removeAllListeners('app-opened')
          this.$electron.ipcRenderer.on('app-opened', () => {
            this.appOpened()
          })

          this.$electron.ipcRenderer.removeAllListeners('app-closed')
          this.$electron.ipcRenderer.on('app-closed', () => {
            this.$router.push({ name: 'index' })
          })

          this.$electron.ipcRenderer.removeAllListeners('set-uuid')
          this.$electron.ipcRenderer.on('set-uuid', (evt, uuid) => {
            this.getUserSettings(uuid)
            this.getSavedLocations(uuid)
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-preferences')
          this.$electron.ipcRenderer.on('go-to-preferences', (evt) => {
            this.$router.push({ name: 'preferences' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-local-weather')
          this.$electron.ipcRenderer.on('go-to-local-weather', (evt) => {
            this.$router.push({ name: 'index' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-saved-locations')
          this.$electron.ipcRenderer.on('go-to-saved-locations', (evt) => {
            this.$router.push({ name: 'saved-locations' })
          })

          this.$electron.ipcRenderer.removeAllListeners('go-to-new-location')
          this.$electron.ipcRenderer.on('go-to-new-location', (evt) => {
            this.$router.push({ name: 'select-page' })
          })
        }
      },
      appOpened () {
        // @TODO: Here we are going to want to tackle a few things:
        //
        // 1. Fetch Weather Data for Saved Locations so it's ready before the user goes to `saved-locations`
        // 2. Probably a good idea to go ahead and check if our location has changed
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
              const timeZone = tzlookup(loc.latitude, loc.longitude)

              api.updateUserSettings({ uuid: uuid, key: 'current_city', value: loc.city })
              api.updateUserSettings({ uuid: uuid, key: 'current_country', value: loc.country })
              api.updateUserSettings({ uuid: uuid, key: 'current_ip_address', value: loc.ip_address })
              api.updateUserSettings({ uuid: uuid, key: 'current_latitude', value: loc.latitude })
              api.updateUserSettings({ uuid: uuid, key: 'current_longitude', value: loc.longitude })
              api.updateUserSettings({ uuid: uuid, key: 'current_postalcode', value: loc.postalcode })
              api.updateUserSettings({ uuid: uuid, key: 'current_region', value: loc.region })
              api.updateUserSettings({ uuid: uuid, key: 'current_time_zone', value: timeZone.replace('/', '__') })

              this.$store.dispatch('setCurrentLocation', location.data)

              const data = {
                hash_key: 'current',
                uuid: uuid,
                city_name: loc.city,
                region: loc.region,
                country: loc.country,
                owm_city_id: null,
                latitude: loc.latitude,
                longitude: loc.longitude,
                time_zone: timeZone
              }

              api.saveLocation(data, (response) => {
                this.$store.dispatch('saveLocation', data)
              })

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
            const weatherData = util.parseWeather('current', weather.data, this.$store.state.settings)

            this.$store.dispatch('saveWeather', weatherData)
            this.$electron.ipcRenderer.send('set-weather', weatherBarData)

            EventBus.$emit('weatherUpdated')
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
      },
      getSavedLocations (uuid) {
        api.getSavedLocations(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('updateSavedLocations', response.data)
          }
        })
      }
    },
    components: {
      appMenu,
      toast
    }
  }
</script>
