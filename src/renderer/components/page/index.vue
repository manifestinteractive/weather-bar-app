<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page" v-if="weather && forecast">
      <scene :data='weather'>
        <weather-data slot="weather-data" :data='weather' :forecast='forecast' />
      </scene>
    </div>
  </transition>
</template>

<script>
  import Scene from '../ui/scene'
  import WeatherData from '../ui/weather-data'

  import { EventBus } from '../../event-bus'

  const TIMER_CURRENT_WEATHER = 60000

  export default {
    name: 'index',
    data () {
      return {
        timer: null,
        weather: null,
        forecast: null,
        primary: null,
        locations: this.$store.getters.getSavedLocations
      }
    },
    created () {
      EventBus.$off('appReady')
      EventBus.$on('appReady', this.fetchWeather)
    },
    mounted () {
      this.fetchWeather()
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      getPrimary () {
        for (let loc in this.locations) {
          if (!this.locations.hasOwnProperty(loc)) continue
          if (this.locations[loc].primary) {
            return loc
          }
        }

        return 'current'
      },
      fetchWeather () {
        clearTimeout(this.timer)

        this.primary = this.getPrimary()
        this.weather = this.$store.getters.getWeather(this.primary)
        this.forecast = this.$store.getters.getForecast(this.primary)

        this.timer = setTimeout(this.fetchWeather, TIMER_CURRENT_WEATHER)
      }
    },
    components: {
      Scene,
      WeatherData
    }
  }
</script>
