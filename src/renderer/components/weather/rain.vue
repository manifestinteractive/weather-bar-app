<template>
  <transition name="fade" mode="out-in">
    <div class="rain-wrapper">
      <div class="rain front-row">
        <div class="drop" v-for="drop in rain" :style="rainDrop('front', drop)" :key="drop">
          <div class="stem" :style="rainDropStem"></div>
        </div>
      </div>
      <div class="rain back-row">
        <div class="drop" v-for="drop in rain" :style="rainDrop('back', drop)" :key="drop">
          <div class="stem" :style="rainDropStem"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'rain',
    props: {
      rain: {
        type: Number,
        default: 0
      }
    },
    methods: {
      rainDrop (location, drop) {
        const randomHundred = Math.floor(Math.random() * 100)
        const randomFive = Math.floor(Math.random() * 5)

        const position = (Math.round((drop / this.rain) * 100) + randomFive)
        const bottom = (randomFive + randomFive - 1 + 100)
        const delay = randomHundred
        const duration = randomHundred

        let dropStyle = {
          bottom: `${bottom}%`,
          animationDelay: `0.${delay}s`,
          animationDuration: `0.5${duration}s`
        }

        if (location === 'front') {
          dropStyle.left = `${position}%`
        } else if (location === 'back') {
          dropStyle.right = `${position}%`
        }

        return dropStyle
      },
      rainDropStem () {
        const random = Math.floor(Math.random() * 100)

        return {
          animationDelay: `0.${random}s`,
          animationDuration: `0.5${random}s`
        }
      }
    }
  }
</script>
