<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page" v-if="weather">
      <scene :data='weather'>
        <weather-data slot="weather-data" :data='weather' />
      </scene>
    </div>
  </transition>
</template>

<script>
  import Scene from '../ui/scene'
  import WeatherData from '../ui/weather-data'

  import { EventBus } from '../../event-bus'

  export default {
    name: 'saved-location',
    data () {
      return {
        key: this.$route.params.key,
        weather: null
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.key = to.params.key
      this.fetchWeather()
      next()
    },
    mounted () {
      this.fetchWeather()

      EventBus.$off('appReady')
      EventBus.$on('appReady', this.fetchWeather)
    },
    methods: {
      fetchWeather () {
        this.weather = this.$store.getters.getWeather(this.key)
      }
    },
    components: {
      Scene,
      WeatherData
    }
  }
</script>
