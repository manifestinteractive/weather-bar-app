<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page">
      <scene
        :time='time'
        :version='7'
        :stars='true'
        :moon='true'
        :rain='0'
        :sun='true'
        :lightning='false'
        :thunderstorm='false'
        :clouds='true'>
        <weather-data slot="weather-data" />
      </scene>
    </div>
  </transition>
</template>

<style lang="scss">
.home-page {

}
</style>

<script>
  import Scene from '../ui/scene'
  import WeatherData from '../ui/weather-data'

  export default {
    name: 'index-page',
    data () {
      return {
        timers: {
          time: null
        },
        time: 'midnight'
      }
    },
    mounted () {
      this.getTime()
    },
    beforeDestroy () {
      clearTimeout(this.timers.time)
    },
    methods: {
      getTime () {
        // @TODO: Don't use time of day to figure out sun position, handy as a
        // shortcut, but not even close to being accurate.

        clearTimeout(this.timers.time)

        const date = new Date()
        const hours = date.getHours()

        if ((hours >= 0 && hours < 6) || hours >= 22) {
          this.time = 'midnight'
        } else if (hours === 6) {
          this.time = 'dawn'
        } else if (hours === 7) {
          this.time = 'early-morning'
        } else if (hours === 8) {
          this.time = 'morning'
        } else if (hours >= 9 && hours < 12) {
          this.time = 'mid-morning'
        } else if (hours >= 12 && hours < 14) {
          this.time = 'noon'
        } else if (hours >= 14 && hours < 16) {
          this.time = 'afternoon'
        } else if (hours >= 16 && hours < 18) {
          this.time = 'evening'
        } else if (hours >= 18 && hours < 20) {
          this.time = 'dusk'
        } else if (hours >= 20 && hours < 22) {
          this.time = 'night'
        }

        this.timers.time = setTimeout(this.getTime, 60000)
      }
    },
    components: {
      Scene,
      WeatherData
    }
  }
</script>
