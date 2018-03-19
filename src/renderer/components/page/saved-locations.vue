<template>
  <transition name="slide-left" mode="out-in">
    <div class="router-view saved-locations">
      <div class="page-content">
        <page-header v-bind:title="$t('app.menu.savedLocations')" />

        <div class="scrollable">
          <div class="tiles">
            <location
              v-if="orderedLocations && location.hash_key === 'current'"
              v-for="(location, index) in orderedLocations"
              :current='true'
              :primary="location.primary"
              :info="location"
              :key="location.id"
              tabindex="7"
              @clicked="clicked"
              @makePrimary="makePrimary"
            />
            <location
              v-if="orderedLocations && location.hash_key !== 'current'"
              v-for="(location, index) in orderedLocations"
              :current='false'
              :primary="location.primary"
              :info="location"
              :key="location.id"
              :tabindex="8 + index"
              @clicked="clicked"
              @deleted="deleted"
              @makePrimary="makePrimary"
            />
            <location :add='true' @clicked="addLocation" />
          </div>
        </div>
      </div>

      <scene :data="{ scene_stars: true, scene_time: 'midnight', scene_clouds: true, scene_cloud_percent: 60, scene_wind_speed: 2 }" :version='random' />
    </div>
  </transition>
</template>

<style lang="scss">
.saved-locations {
  transform: translateZ(0);

  .page-content {
    z-index: 500;
    position: absolute;
    height: 480px;
    width: 280px;
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
  import _ from 'lodash'

  import Scene from '../ui/scene'
  import Location from '../ui/location'
  import PageHeader from '../ui/page-header'

  import api from '../../services/api'

  import { EventBus } from '../../event-bus'

  export default {
    name: 'saved-locations',
    data () {
      return {
        random: (Math.floor(Math.random() * 10) + 1),
        locations: null
      }
    },
    mounted () {
      this.fetchData()

      EventBus.$off('updateSavedLocations')
      EventBus.$on('updateSavedLocations', this.fetchData)
    },
    computed: {
      orderedLocations () {
        return _.orderBy(this.locations, 'city_name')
      }
    },
    methods: {
      fetchData () {
        this.locations = Object.assign({}, this.$store.getters.getSavedLocations)
      },
      clicked (data) {
        this.$router.push({
          name: 'saved-location',
          params: {
            key: data.hash_key
          }
        })
      },
      deleted (data) {
        const params = {
          uuid: data.uuid,
          hash_key: data.hash_key
        }

        api.deleteSavedLocations(params, (response) => {
          this.$store.dispatch('deleteLocation', data)
          this.$store.dispatch('deleteWeather', data)
          this.$store.dispatch('deleteForecast', data)
        })
      },
      makePrimary (data) {
        const params = {
          uuid: data.uuid,
          hash_key: data.hash_key
        }

        api.makeLocationPrimary(params, (response) => {
          this.$store.dispatch('makePrimary', data)
          EventBus.$emit('updatedSettings')
        })
      },
      addLocation () {
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
