<template>
  <transition name="slide-left" mode="out-in">
    <div class="router-view saved-locations-page">
      <div class="page-content">
        <page-header v-bind:title="$t('app.menu.savedLocations')" />

        <div class="scrollable">
          <div class="tiles">
            <location :current='true' :info="current" @clicked="clicked" />
            <location v-for="location in locations" :info="location" :key="location.id" @clicked="clicked" />
            <location :add='true' @clicked="addLocation" />
          </div>
        </div>
      </div>

      <scene :stars='true' :clouds='true' :version='random' />
    </div>
  </transition>
</template>

<style lang="scss">
.saved-locations-page {
  .page-content {
    z-index: 500;
    position: relative;
    height: 100%;
  }

  .scene {
    position: initial;
  }

  .scrollable {
    overflow-y: auto;
    height: calc(100% - 54px);
  }
  .tiles {
    padding: 8px 4px;
    height: calc(100% - 4px);
  }

  .scrollable::-webkit-scrollbar-track {
  	background-color: transparent;
  }

  .scrollable::-webkit-scrollbar {
  	width: 2px;
  	background-color: transparent;
  }

  .scrollable::-webkit-scrollbar-thumb {
  	background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>

<script>
  import Scene from '../ui/scene'
  import Location from '../ui/location'
  import PageHeader from '../ui/page-header'

  import util from '../../util'

  export default {
    name: 'saved-locations-page',
    data () {
      return {
        random: (Math.floor(Math.random() * 10) + 1),
        current: {
          id: 1,
          name: 'Local Weather',
          temp: '70',
          icon: 'wi-night-clear',
          time_zone: util.offsetToTimeZone('-05:00'),
          condition: 'Clear',
          primary: true
        },
        locations: [
          {
            id: 2,
            name: 'Saint Petersburg',
            temp: '72',
            icon: 'wi-night-alt-rain',
            time_zone: util.offsetToTimeZone('-05:00'),
            condition: 'Rainy',
            primary: false
          },
          {
            id: 3,
            name: 'St. Louis',
            temp: '59',
            icon: 'wi-night-alt-cloudy',
            time_zone: util.offsetToTimeZone('-06:00'),
            condition: 'Cloudy',
            primary: false
          },
          {
            id: 4,
            name: 'Portland',
            temp: '45',
            icon: 'wi-night-alt-snow-wind',
            time_zone: util.offsetToTimeZone('-08:00'),
            condition: 'Hail',
            primary: false
          },
          {
            id: 5,
            name: 'Saint Petersburg',
            temp: '72',
            icon: 'wi-night-alt-rain',
            time_zone: util.offsetToTimeZone('-05:00'),
            condition: 'Clear',
            primary: false
          },
          {
            id: 6,
            name: 'St. Louis',
            temp: '59',
            icon: 'wi-night-alt-cloudy',
            time_zone: util.offsetToTimeZone('-05:00'),
            condition: 'Clear',
            primary: false
          },
          {
            id: 7,
            name: 'Portland',
            temp: '45',
            icon: 'wi-night-alt-snow-wind',
            time_zone: util.offsetToTimeZone('-05:00'),
            condition: 'Clear',
            primary: false
          }
        ]
      }
    },
    methods: {
      clicked (info) {
        console.log('clicked', info)
      },
      addLocation (info) {
        this.$router.push({ name: 'new-location' })
      }
    },
    components: {
      Scene,
      Location,
      PageHeader
    }
  }
</script>
