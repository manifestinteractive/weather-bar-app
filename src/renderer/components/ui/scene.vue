<template>
  <div class="scene" :class="makeClasses()">
    <slot name="weather-data"></slot>

    <div class="overlay" v-if="overlay"></div>

    <!-- WEATHER -->
    <lightning v-if="lightning" />
		<thunderstorm v-if="thunderstorm" />
		<rain v-if="rain > 0" />
		<snow v-if="snow" />
		<clouds v-if="clouds" />
		<fog v-if="fog" />

    <!-- SCENERY -->
		<moon v-if="moon" />
		<sun v-if="sun" />
    <stars v-if="stars" />
    <mountains v-if="mountains" />
		<trees v-if="trees" />
		<sky v-if="sky" />
  </div>
</template>

<style lang="scss">
@import '~@/assets/scss/mixins';
@import '~@/assets/scss/variables';
@import '~@/assets/scss/animations';
@import '~@/assets/scss/scene';
@import '~@/assets/scss/time';
@import '~@/assets/scss/weather';

.scene {
  height: 100%;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    z-index: 30;
  }
}
</style>

<script>
  import clouds from '../weather/clouds'
  import fog from '../weather/fog'
  import lightning from '../weather/lightning'
  import rain from '../weather/rain'
  import snow from '../weather/snow'
  import thunderstorm from '../weather/thunderstorm'

  import moon from '../scenery/moon'
  import mountains from '../scenery/mountains'
  import sky from '../scenery/sky'
  import stars from '../scenery/stars'
  import sun from '../scenery/sun'
  import trees from '../scenery/trees'

  export default {
    name: 'scene',
    props: {
      version: {
        type: Number,
        default: 1
      },
      time: {
        type: String,
        default: 'midnight'
      },
      clouds: {
        type: Boolean,
        default: false
      },
      fog: {
        type: Boolean,
        default: false
      },
      lightning: {
        type: Boolean,
        default: false
      },
      moon: {
        type: Boolean,
        default: false
      },
      mountains: {
        type: Boolean,
        default: true
      },
      overlay: {
        type: Boolean,
        default: false
      },
      rain: {
        type: Number,
        default: 0
      },
      sky: {
        type: Boolean,
        default: true
      },
      snow: {
        type: Boolean,
        default: false
      },
      stars: {
        type: Boolean,
        default: false
      },
      sun: {
        type: Boolean,
        default: false
      },
      thunderstorm: {
        type: Boolean,
        default: false
      },
      trees: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {}
    },
    mounted () {},
    beforeDestroy () {},
    methods: {
      makeClasses () {
        let classes = []

        classes.push('time-' + this.time)
        classes.push('scene-' + this.version)

        if (this.thunderstorm) {
          classes.push('thunderstorm')
        }

        return classes.join(' ')
      }
    },
    components: {
      clouds,
      fog,
      lightning,
      moon,
      mountains,
      rain,
      sky,
      snow,
      stars,
      sun,
      thunderstorm,
      trees
    }
  }
</script>
