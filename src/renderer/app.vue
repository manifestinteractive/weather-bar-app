<template>
  <div id="app" :class="classNames" v-if="appOpened">
    <toast v-if="toastMessage" :toastMessage="toastMessage" />
    <loading v-if="!appReady || hasError" :hasError="hasError" />
    <app-menu v-if="appReady && !hasError" :class="classNames" />
    <router-view v-if="appReady" />
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
  import loading from './components/ui/loading'
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
        appReady: false,
        classNames: '',
        toastMessage: null,
        hasError: false,
        appOpened: false,
        status: {
          currentLocation: false,
          savedLocations: false,
          settings: false,
          uuid: false,
          weather: false,
          forecast: false
        },
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
      this.getUUID()
      this.bindVueEvents()
      this.bindElectronEvents()
    },
    methods: {
      bindVueEvents () {
        EventBus.$off('closeToast')
        EventBus.$on('closeToast', () => {
          this.toastMessage = null
        })

        EventBus.$off('showToast')
        EventBus.$on('showToast', (message) => {
          this.$electron.ipcRenderer.send('app-error')
          this.toastMessage = message
          this.hasError = true
        })

        EventBus.$off('setClassNames')
        EventBus.$on('setClassNames', (classNames) => {
          this.classNames = classNames
        })

        EventBus.$off('updatedSettings')
        EventBus.$on('updatedSettings', () => {
          this.getWeather()
          this.getForecast()
        })
      },
      bindElectronEvents () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          // User clicked Menu Bar Icon to Open App
          this.$electron.ipcRenderer.removeAllListeners('app-opened')
          this.$electron.ipcRenderer.on('app-opened', () => {
            EventBus.$emit('appOpened')
            this.appOpened = true
          })

          // User clicked Menu Bar Icon to Close App
          this.$electron.ipcRenderer.removeAllListeners('app-closed')
          this.$electron.ipcRenderer.on('app-closed', () => {
            EventBus.$emit('appClosed')
            this.appOpened = false
            this.$router.push({ name: 'index' })
          })

          // Electron is giving us the users Unique User ID for their Hardware
          this.$electron.ipcRenderer.removeAllListeners('set-uuid')
          this.$electron.ipcRenderer.on('set-uuid', (evt, uuid) => {
            if (uuid && uuid.length !== 0) {
              this.getUserSettings(uuid)
              this.getSavedLocations(uuid)
              this.updateStatus('uuid')
            } else {
              this.toastMessage = 'Error Initializing App. Try Restarting Weather Bar.'
            }
          })

          // User selected Preferences the Context Menu
          this.$electron.ipcRenderer.removeAllListeners('go-to-preferences')
          this.$electron.ipcRenderer.on('go-to-preferences', (evt) => {
            this.$router.push({ name: 'preferences' })
          })

          // User selected Local Weather the Context Menu
          this.$electron.ipcRenderer.removeAllListeners('go-to-local-weather')
          this.$electron.ipcRenderer.on('go-to-local-weather', (evt) => {
            this.$router.push({ name: 'index' })
          })

          // User selected Saved Locations the Context Menu
          this.$electron.ipcRenderer.removeAllListeners('go-to-saved-locations')
          this.$electron.ipcRenderer.on('go-to-saved-locations', (evt) => {
            this.$router.push({ name: 'saved-locations' })
          })

          // User selected New Location the Context Menu
          this.$electron.ipcRenderer.removeAllListeners('go-to-new-location')
          this.$electron.ipcRenderer.on('go-to-new-location', (evt) => {
            this.$router.push({ name: 'new-location' })
          })
        }
      },
      getLocation () {
        api.getIpAddress((response) => {
          api.getLocationByIp(response.ip, (location) => {
            if (typeof location.data !== 'undefined') {
              const uuid = this.$store.getters.getSetting('uuid')
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
                this.updateStatus('currentLocation')
              })
            }
          })
        })
      },
      getSavedLocations (uuid) {
        api.getSavedLocations(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('updateSavedLocations', response.data)
            EventBus.$emit('updateSavedLocations', response.data)

            this.getLocation()

            this.updateStatus('savedLocations')
          }
        })
      },
      getUserSettings (uuid) {
        api.getUserSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('loadSettings', response.data)
            this.$electron.ipcRenderer.send('save-settings', response.data)
            this.$i18n.locale = response.data.app_language

            this.updateStatus('settings')
          } else {
            this.initSettings(uuid)
          }
        })
      },
      getUUID () {
        if (typeof this.$electron !== 'undefined' && typeof this.$electron.ipcRenderer !== 'undefined') {
          this.$electron.ipcRenderer.send('get-uuid')
        }
      },
      getWeather () {
        const savedLocations = Object.assign({}, this.$store.getters.getSavedLocations)
        const total = Object.keys(savedLocations).length
        let current = 0

        for (let key in savedLocations) {
          if (!savedLocations.hasOwnProperty(key)) {
            continue
          }

          const location = savedLocations[key]

          api.getCurrentWeatherByGeo(location, (weather) => {
            if (typeof weather.data !== 'undefined' && typeof weather.data.weather !== 'undefined') {
              if (location.hash_key === 'current') {
                this.$electron.ipcRenderer.send('set-weather', util.prepMenubarWeather(weather.data, this.$store.state.settings))
              }

              let saveWeather = util.parseWeather(location.hash_key, weather.data, this.$store.state.settings)

              this.$store.dispatch('saveWeather', saveWeather)

              EventBus.$emit('weatherUpdated', { hash_key: location.hash_key, weather: saveWeather })

              current++

              if (current === total) {
                this.updateStatus('weather')
              }
            }
          })
        }

        clearTimeout(this.timers.current)
        this.timers.current = setTimeout(this.getWeather, TIMER_CURRENT_WEATHER)
      },
      getForecast () {
        const savedLocations = Object.assign({}, this.$store.getters.getSavedLocations)
        const total = Object.keys(savedLocations).length
        let current = 0

        for (let key in savedLocations) {
          if (!savedLocations.hasOwnProperty(key)) {
            continue
          }

          const location = savedLocations[key]

          api.getWeatherForecastByGeo(location, (forecast) => {
            if (typeof forecast.data !== 'undefined' && typeof forecast.data.list !== 'undefined') {
              let saveForecast = util.parseWeatherForecast(location.hash_key, forecast.data, this.$store.state.settings, this.$i18n.t('ui.today'))

              this.$store.dispatch('saveForecast', saveForecast)

              EventBus.$emit('weatherForecastUpdated', { hash_key: location.hash_key, forecast: saveForecast })

              current++

              if (current === total) {
                this.updateStatus('forecast')
              }
            }
          })
        }

        clearTimeout(this.timers.forecast)
        this.timers.forecast = setTimeout(this.getForecast, TIMER_FORECAST_WEATHER)
      },
      initSettings (uuid) {
        api.initSettings(uuid, (response) => {
          if (response.data) {
            this.$store.dispatch('initSettings', response.data)
            this.$electron.ipcRenderer.send('save-settings', response.data)

            this.updateStatus('settings')
          }
        })
      },
      updateStatus (checked) {
        this.toastMessage = null
        this.hasError = false

        if (!this.appReady) {
          this.status[checked] = true

          if (this.status.currentLocation && this.status.savedLocations && this.status.settings && this.status.uuid && this.status.weather && this.status.forecast) {
            this.appReady = true
            EventBus.$emit('appReady')
            EventBus.$emit('weatherReady')
          } else if (this.status.currentLocation && this.status.savedLocations && this.status.settings && this.status.uuid && !this.status.weather && !this.status.forecast) {
            this.getWeather()
          } else if (this.status.currentLocation && this.status.savedLocations && this.status.settings && this.status.uuid && this.status.weather && !this.status.forecast) {
            this.getForecast()
          }
        }
      }
    },
    components: {
      appMenu,
      loading,
      toast
    }
  }
</script>
