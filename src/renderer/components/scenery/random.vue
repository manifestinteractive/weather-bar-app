<template>
  <div class="random-wrapper">
    <div class="bird" v-if="showBird()"></div>
    <div class="bat" v-if="showBat()"></div>
    <div class="hot-air-balloon" v-if="showHotAirBalloon()" :class="{ night: isNight() }"></div>
    <div class="girl-balloon" v-if="showGirlBalloon()"></div>
    <div class="tardis" v-if="showTardis()"></div>
  </div>
</template>

<style lang="scss">
@import '~@/assets/scss/random';
</style>

<script>
  export default {
    name: 'random',
    props: {
      time: {
        type: String
      },
      clouds: {
        type: Number
      },
      thunderstorm: {
        type: Boolean
      }
    },
    data () {
      return {
        runs: 0,
        timer: null,
        random: 4
      }
    },
    mounted () {
      this.randomBackground()
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      clearSkies () {
        return (this.clouds < 50 && !this.thunderstorm)
      },
      isDay () {
        return (this.time === 'morning' || this.time === 'mid-morning' || this.time === 'noon' || this.time === 'afternoon' || this.time === 'evening' || this.time === 'dusk')
      },
      isNight () {
        return (this.time === 'dawn' || this.time === 'early-morning' || this.time === 'night' || this.time === 'midnight')
      },
      showBird () {
        return (this.random % 10 === 0 && this.isDay())
      },
      showBat () {
        return (this.random % 10 === 0 && this.isNight())
      },
      showHotAirBalloon () {
        return (this.random === 3)
      },
      showGirlBalloon () {
        return (this.random === 4 && this.isNight())
      },
      showTardis () {
        return (this.random === 5 && this.runs > 10)
      },
      randomBackground () {
        // Set animation to have have a 1-in-10 change of firing, otherwise we'd have an animation every time this is called
        this.random = Math.floor(Math.random() * 50) + 1
        this.runs++

        clearTimeout(this.timer)
        this.timer = setTimeout(this.randomBackground, (Math.floor(Math.random() * 300000) + 300000))
      }
    }
  }
</script>
