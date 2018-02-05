<template>
  <div class="scene" v-if="data" :class="makeClasses()">
    <slot name="weather-data"></slot>

    <div class="overlay" v-if="overlay"></div>

    <!-- WEATHER -->
    <lightning v-if="data.scene_lightning" />
		<thunderstorm v-if="data.scene_thunderstorm" />
		<rain v-if="data.scene_rain > 0" :rain="data.scene_rain" />
		<snow v-if="data.scene_snow" />
		<clouds v-if="data.scene_clouds" />
		<fog v-if="data.scene_fog" />

    <!-- SCENERY -->
		<moon v-if="data.scene_moon" :phase="data.moon_name" />
		<sun v-if="data.scene_sun" />
    <stars v-if="data.scene_stars" />

    <mountains />
		<trees />
		<sky />
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
      overlay: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default () {
          return {
            city: null,
            condition_icon: 'wi-na',
            condition_label: 'Unknown',
            id: null,
            key: 'current',
            scene_clouds: false,
            scene_fog: false,
            scene_lightning: false,
            scene_moon: false,
            scene_rain: 0,
            scene_snow: false,
            scene_stars: false,
            scene_sun: false,
            scene_thunderstorm: false,
            scene_time: 'midnight',
            sunrise: null,
            sunset: null,
            sun_next: null,
            temp_actual: 0,
            temp_feels_like: 0,
            temp_max: 0,
            temp_min: 0,
            time_zone: null,
            wind_direction: 'N',
            wind_speed: 0,
            moon_name: null,
            moon_fraction: null,
            moon_phase: null,
            moon_angle: null,
            moon_altitude: null,
            moon_azimuth: null,
            moon_distance: null,
            moon_parallactic_angle: null
          }
        }
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

        classes.push('time-' + this.data.scene_time)
        classes.push('scene-' + this.version)

        if (this.data.thunderstorm) {
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
