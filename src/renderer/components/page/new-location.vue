<template>
  <transition name="slide-left" mode="out-in">
    <div class="router-view new-location">
      <div class="page-content">
        <page-header v-bind:title="$t('app.menu.newLocation')" />

        <div class="logo">
          <svg viewBox="0 0 737.74 561.05"><path d="M446.09,631.26H296.52A112.26,112.26,0,0,1,251.92,416L555.73,719.78a52.1,52.1,0,1,0,30.12-28L263.34,369.27A153.59,153.59,0,0,0,143.13,519c0,84.58,68.81,153.38,153.39,153.38H487.18m116.07,91.53a23.26,23.26,0,1,1,23.26-23.27A23.27,23.27,0,0,1,603.25,763.89Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M677.15,264.94a202.45,202.45,0,0,0-66.42,11.14A174.66,174.66,0,0,0,494,231.48c-72.72,0-135.19,44.47-161.79,107.6l32.21,32.22c15.68-56.84,67.81-98.73,129.58-98.73a133.61,133.61,0,0,1,75.47,23.26,135.72,135.72,0,0,1,31.12,29.43A161.65,161.65,0,0,1,677.15,306c89.67,0,162.62,73,162.62,162.62S766.82,631.26,677.15,631.26h-73.9L299.7,327.7a51.76,51.76,0,1,0-28.54,29.6L586.22,672.36h90.93c112.33,0,203.72-91.39,203.72-203.71S789.48,264.94,677.15,264.94Zm-426,67.71a23.26,23.26,0,1,1,23.26-23.26A23.26,23.26,0,0,1,251.17,332.65Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M795.21,473.38a7.11,7.11,0,0,1-7.12-7.11A109.92,109.92,0,0,0,666.89,356.9a7.12,7.12,0,0,1-1.44-14.17c4.2-.41,8.46-.63,12.69-.63A124.32,124.32,0,0,1,802.32,466.27,7.11,7.11,0,0,1,795.21,473.38Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M227.67,775.65h-13.3l-9.44-51.28h-.19l-9.45,51.28H182l-13-68.24h11.76l8.77,53h.38l9.16-53h12.14l9.45,53h.19l8.77-53h11.18Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M248.88,775.65V707.41h30.55v10.21H260v18.12h18v9.45H260v20.14h20.43v10.32Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M320.49,775.65l-3.38-14.46H299.19l-3.47,14.46H284.15l17-68.24h14.75l16.67,68.24ZM308.44,718.3h-.39l-7.42,33.83h15Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M355,717.24v58.41H343.62V717.24H330.8v-9.83h37v9.83Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M406.46,775.65V745.38H386v30.27H374.55V707.41H386v27.66h20.44V707.41h11.46v68.24Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M431.8,775.65V707.41h30.55v10.21H442.89v18.12h18v9.45h-18v20.14h20.43v10.32Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M502.06,775.65l-10.6-29.11H485v29.11H473.82V707.41h19.47a26.18,26.18,0,0,1,7.81,1.11,15.47,15.47,0,0,1,6.12,3.52,16.62,16.62,0,0,1,4,6.07,23.94,23.94,0,0,1,1.44,8.77,22,22,0,0,1-1,7A18.9,18.9,0,0,1,509.1,739a14.22,14.22,0,0,1-3.42,3.42,11.89,11.89,0,0,1-3.71,1.79l12.24,31.42Zm-.77-48.19a13,13,0,0,0-.87-5.11,8.16,8.16,0,0,0-2.26-3.18,8.41,8.41,0,0,0-3.13-1.64,13,13,0,0,0-3.47-.48H485v21h6.56a9.67,9.67,0,0,0,7-2.65C500.38,733.64,501.29,731,501.29,727.46Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M730.62,756.56a20.26,20.26,0,0,1-1.78,9,17.57,17.57,0,0,1-4.53,5.88,16.69,16.69,0,0,1-6.17,3.23,24.34,24.34,0,0,1-6.7,1H691.2V707.41h18.12a30.55,30.55,0,0,1,6.36.72,17.52,17.52,0,0,1,6.17,2.6,14.7,14.7,0,0,1,4.63,5.21,17.81,17.81,0,0,1,1.83,8.62q0,6.38-2.7,10a14.77,14.77,0,0,1-6.26,5.11v.19a15,15,0,0,1,3.9,1.64,13,13,0,0,1,3.61,3.23,17.54,17.54,0,0,1,2.7,5A19.88,19.88,0,0,1,730.62,756.56ZM717.9,726.4a10.43,10.43,0,0,0-.82-4.39,8.21,8.21,0,0,0-2.1-2.89,7.76,7.76,0,0,0-3-1.59,13.14,13.14,0,0,0-3.54-.48h-6.33v19h6.52a11,11,0,0,0,3.4-.53,8,8,0,0,0,3-1.68,8.64,8.64,0,0,0,2.1-3A10.75,10.75,0,0,0,717.9,726.4Zm1.64,29.2a12,12,0,0,0-1-5.06,9.55,9.55,0,0,0-5.85-5.25,11.83,11.83,0,0,0-3.64-.58h-7V766h7.29a12,12,0,0,0,3.93-.63,8.92,8.92,0,0,0,3.21-1.93,9.12,9.12,0,0,0,2.2-3.23A11.67,11.67,0,0,0,719.54,755.6Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M770.81,775.65l-3.37-14.46H749.51L746,775.65H734.48l17-68.24h14.75l16.67,68.24Zm-12-57.35h-.38L751,752.13h15Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M818.23,775.65l-10.6-29.11h-6.46v29.11H790V707.41h19.47a26.18,26.18,0,0,1,7.81,1.11,15.54,15.54,0,0,1,6.12,3.52,16.62,16.62,0,0,1,4,6.07,23.94,23.94,0,0,1,1.44,8.77,22.28,22.28,0,0,1-1,7,18.9,18.9,0,0,1-2.55,5.15,14.08,14.08,0,0,1-3.43,3.42,11.79,11.79,0,0,1-3.71,1.79l12.24,31.42Zm-.77-48.19a13,13,0,0,0-.87-5.11,8.26,8.26,0,0,0-2.26-3.18,8.45,8.45,0,0,0-3.14-1.64,12.91,12.91,0,0,0-3.47-.48h-6.55v21h6.55a9.68,9.68,0,0,0,7-2.65Q817.46,732.76,817.46,727.46Z" transform="translate(-143.13 -231.48)" fill="#fff"/></svg>
        </div>

        <div class="form">
          <div class="search">
            <input type="search" v-model="keyword" tabindex="1" placeholder="Search Cities">
            <i class="fal fa-search" v-if="keyword === ''"></i>
          </div>

          <div class="autocomplete" v-if="cities.length > 0 && !selectedCity">
            <ul>
              <li v-for="(city, index) in cities">
                <a @click="selectCity(city)" :tabindex="index + 2">
                  <i class="fas fa-map-marker"></i>
                  {{ city.display_name_short }}
                </a>
              </li>
            </ul>
          </div>

          <button v-if="keyword.length > 0 && selectedCity" @click="letsGo">
            <i class="fas fa-angle-right"></i>
            Let's Go
          </button>

          <button v-if="keyword.length === 0" @click="getCurrentLocation">
            <i class="fas fa-location-arrow"></i>
            Current Location
          </button>

          <div class="no-results" v-if="noResults && !selectedCity">
            <i class="fas fa-exclamation-triangle"></i>
            No Matching Cities
          </div>
        </div>
      </div>

      <scene :stars='true' :clouds='true' :version='random' />
    </div>
  </transition>
</template>

<style lang="scss">
.new-location {
  .page-content {
    z-index: 500;
    position: relative;
    height: 100%;
  }

  .scene {
    position: initial;
  }

  .logo {
    margin: 0 auto;
    width: 120px;
    height: 95px;
    margin-top: 30px;
  }

  .form {
    position: relative;
    margin: 0 auto;
    width: 240px;
    margin-top: 20px;

    button {
      -webkit-appearance: none;
      border: none;
      width: 100%;
      font-size: 16px;
      margin-top: 15px;
      background-color: #3a778b;
      color: #FFFFFF;
      height: 34px;
      border-radius: 4px;
      font-weight: 300;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      position: relative;

      i {
        position: absolute;
        right: 12px;
        top: 12px;
        font-size: 12px;

        &.fa-angle-right {
          right: 12px;
          top: 8px;
          font-size: 18px;
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: #245c6f;
      }
    }

    .autocomplete {
      position: absolute;
      top: 50px;
      background: #FFF;
      z-index: 100;
      width: 100%;
      max-height: 210px;
      overflow: auto;

      ul {
        overflow: hidden;
        width: 100%;

        li {
          overflow: hidden;
          width: 100%;

          &:nth-child(even) {
            background-color: #f7f7f7;
          }

          a {
            overflow: hidden;
            width: 100%;
            display: block;
            color: #000;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 6px;
            font-size: 12px;
            height: 26px;
            line-height: 26px;
            margin: 0;
            cursor: pointer;

            i {
              color: #35c5f2;
              padding-right: 4px;
            }

            &:hover {
              background-color: #173342;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }

  .search {
    background: #FFF;
    border: none;
    border-radius: 4px;
    width: 100%;
    position: relative;

    i {
      color: #333;
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 12px;
    }

    input {
      width: 100%;
      background: transparent;
      border: none;
      padding: 0 8px;
      height: 34px;
      line-height: 34px;
      font-size: 16px;

      &::placeholder {
        text-align: center;
        font-weight: 300;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 20px;
    font-size: 14px;
    line-height: 14px;

    i {
      font-size: 12px;
      line-height: 14px;
      padding-right: 4px;
    }
  }
}
</style>

<script>
  import _ from 'lodash'
  import * as tzlookup from 'tz-lookup'
  import * as md5 from 'md5'

  import Scene from '../ui/scene'
  import PageHeader from '../ui/page-header'
  import api from '../../services/api'

  import util from '../../util'

  export default {
    name: 'new-location',
    data () {
      return {
        random: (Math.floor(Math.random() * 10) + 1),
        keyword: '',
        selectedCity: null,
        noResults: false,
        cities: [],
        settings: this.$store.getters.getSettings
      }
    },
    watch: {
      keyword: _.debounce(function () {
        this.search()
      }, 250)
    },
    methods: {
      search () {
        if (this.keyword && this.keyword.length > 0) {
          if (this.selectedCity && this.keyword !== this.selectedCity.display_name_short) {
            this.selectedCity = null
          }

          api.searchCities(this.keyword, (response) => {
            if (response.data) {
              this.cities = _.sortBy(response.data, 'display_name_short')
            }

            this.noResults = (response.data.length === 0)
          })
        } else {
          this.cities = []
          this.noResults = false
        }
      },
      selectCity (city) {
        this.keyword = city.display_name_short
        this.selectedCity = city
        this.noResults = false
      },
      getCurrentLocation () {
        api.getIpAddress((response) => {
          api.getLocationByIp(response.ip, (location) => {
            if (typeof location.data !== 'undefined') {
              const loc = location.data
              const timeZone = tzlookup(loc.latitude, loc.longitude)
              const data = {
                uuid: this.settings.uuid,
                city_name: loc.city,
                region: loc.region,
                country: loc.country,
                owm_city_id: null,
                latitude: loc.latitude,
                longitude: loc.longitude,
                time_zone: timeZone
              }

              this.saveLocation(data)
            }
          })
        })
      },
      letsGo () {
        const timeZone = tzlookup(this.selectedCity.location.lat, this.selectedCity.location.lon)
        const data = {
          uuid: this.settings.uuid,
          city_name: this.selectedCity.owm_city_name,
          region: this.selectedCity.admin_level_1_short,
          country: this.selectedCity.country_short,
          owm_city_id: this.selectedCity.owm_city_id,
          latitude: this.selectedCity.location.lat,
          longitude: this.selectedCity.location.lon,
          time_zone: timeZone
        }

        this.saveLocation(data)
      },
      saveLocation (data) {
        data.hash_key = 'hash_' + md5(JSON.stringify(data))
        api.saveLocation(data, (response) => {
          this.$store.dispatch('saveLocation', data)

          api.getCurrentWeatherByGeo(data, (weather) => {
            if (typeof weather.data !== 'undefined' && typeof weather.data.weather !== 'undefined') {
              let saveWeather = util.parseWeather(data.hash_key, weather.data, this.$store.state.settings)

              saveWeather.hash_key = data.hash_key

              this.$store.dispatch('saveWeather', saveWeather)

              this.$router.push({
                name: 'saved-location',
                params: {
                  key: data.hash_key
                }
              })
            }
          })
        })
      }
    },
    components: {
      Scene,
      PageHeader
    }
  }
</script>
