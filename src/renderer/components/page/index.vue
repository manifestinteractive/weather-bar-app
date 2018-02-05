<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page">
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
    name: 'index',
    data () {
      return {
        key: this.$route.params.key || 'current',
        weather: null
      }
    },
    created () {
      this.weather = this.$store.getters.getWeather(this.key)

      EventBus.$off('weatherUpdated')
      EventBus.$on('weatherUpdated', () => {
        this.weather = this.$store.getters.getWeather(this.key)
      })
    },
    components: {
      Scene,
      WeatherData
    }
  }
</script>
