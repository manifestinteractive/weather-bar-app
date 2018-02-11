<template>
  <transition name="fade" mode="out-in">
    <div class="random-wrapper">
      <div class="bird" v-if="showBird()"></div>
      <div class="bat" v-if="showBat()"></div>
      <div class="hot-air-balloon" v-if="showHotAirBalloon()"></div>
      <div class="girl-balloon" v-if="showGirlBalloon()"></div>
      <div class="tardis" v-if="showTardis()"></div>
    </div>
  </transition>
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
        timer: null,
        random: 0
      }
    },
    mounted () {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.randomBackground, (Math.floor(Math.random() * 10000) + 15000))
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
        return (this.random === 1 && this.isDay())
      },
      showBat () {
        return (this.random === 2 && this.isNight())
      },
      showHotAirBalloon () {
        return (this.random === 3)
      },
      showGirlBalloon () {
        return (this.random === 4)
      },
      showTardis () {
        return (this.random === 5 && this.time === 'midnight')
      },
      randomBackground () {
        // Set animation to have have a 1-in-10 change of firing, otherwise we'd have an animation every time this is called
        this.random = Math.floor(Math.random() * 50) + 1

        if (this.random <= 5) {
          console.log('fired animation', this.random)
        }

        clearTimeout(this.timer)
        this.timer = setTimeout(this.randomBackground, (Math.floor(Math.random() * 10000) + 15000))
      }
    }
  }
</script>
