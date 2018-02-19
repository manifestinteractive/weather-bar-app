<template>
  <div class="scene" v-if="data" :class="makeClasses()">
    <slot name="weather-data"></slot>

    <div class="overlay" v-if="overlay"></div>

    <!-- WEATHER -->
    <lightning v-if="data.scene_lightning" />
		<thunderstorm v-if="data.scene_thunderstorm" />
		<rain v-if="data.scene_rain > 0" :rain="data.scene_rain" />
		<snow v-if="data.scene_snow" />
		<clouds v-if="data.scene_clouds" :percent="data.scene_cloud_percent" :speed="data.scene_wind_speed" :direction="data.scene_wind_direction" />
		<fog v-if="data.scene_fog" />

    <!-- SCENERY -->
		<moon v-if="data.scene_moon"
      :angle="data.moon_angle"
      :fraction="data.moon_fraction"
      :phase="data.moon_phase"
      :position="data.moon_position"
    />
		<sun v-if="data.scene_sun" :position="data.sun_position" />
    <random :time="data.scene_time" :clouds="data.scene_cloud_percent" :thunderstorm="data.scene_thunderstorm" />

    <mountains />
		<trees />
    <stars v-if="data.scene_stars" />
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
  import { EventBus } from '../../event-bus'

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
  import random from '../scenery/random'

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
            key: null,
            moon_angle: null,
            moon_fraction: null,
            moon_phase: null,
            moon_position: null,
            scene_cloud_percent: null,
            scene_clouds: false,
            scene_fog: false,
            scene_lightning: false,
            scene_moon: false,
            scene_rain: false,
            scene_snow: false,
            scene_stars: false,
            scene_sun: false,
            scene_thunderstorm: false,
            scene_time: 'midnight',
            scene_wind_direction: null,
            scene_wind_speed: null,
            sun_next: null,
            sun_position: null,
            sunrise: null,
            sunset: null,
            temp_actual: null,
            temp_feels_like: null,
            temp_max: null,
            temp_min: null,
            time_zone: null,
            wind_direction: null,
            wind_speed: null
          }
        }
      }
    },
    methods: {
      makeClasses () {
        let classes = []

        classes.push('time-' + this.data.scene_time)
        classes.push('scene-' + this.version)

        if (this.data.thunderstorm) {
          classes.push('thunderstorm')
        }

        const classNames = classes.join(' ')

        EventBus.$emit('setClassNames', classNames)

        return classNames
      }
    },
    components: {
      clouds,
      fog,
      lightning,
      moon,
      mountains,
      rain,
      random,
      sky,
      snow,
      stars,
      sun,
      thunderstorm,
      trees
    }
  }
</script>
