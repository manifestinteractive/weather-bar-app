<template>
  <transition name="slide-left" mode="out-in">
    <div class="router-view saved-locations">
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
.saved-locations {
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

  export default {
    name: 'saved-locations',
    data () {
      return {
        random: (Math.floor(Math.random() * 10) + 1),
        current: {
          city_name: 'Current Location'
        },
        locations: this.$store.getters.getSavedLocations
      }
    },
    mounted () {
      console.log('locations', this.locations)
    },
    methods: {
      clicked (data) {
        this.$router.push({
          name: 'index',
          params: {
            key: data.hash_key
          }
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
