<template>
  <button class="location" @click="handleClick" v-if="!isDeleted">
    <div class="data" :class="className">
      <div class="overlay" v-if="showModal" @click.prevent="preventClick">
        <a class="close-button" @click.prevent="closeModal">
          <i class="far fa-times"></i>
        </a>

        <div class="confirm-delete" v-if="confirmDelete">
          <p>{{ $t('ui.confirmDelete') }}</p>
          <button @click.prevent="confirmedDelete">{{ $t('ui.deleteButton') }}</button>
        </div>

        <div class="confirm-primary" v-if="confirmPrimary">
          <p>{{ $t('ui.confirmPrimary') }}</p>
          <button @click.prevent="confirmedPrimary">{{ $t('ui.confirmedPrimary') }}</button>
        </div>
      </div>

      <div v-if="add" class="add-icon">
        <div class="weather-icon">
          <i class="fal fa-plus"></i>
        </div>

        <div class="condition">
          {{ $t('ui.addLocation') }}
        </div>
      </div>

      <div v-if="info && weather">
        <a v-if="!add && !current" class="action delete-button" @click.prevent="deleteLocation">
          <i class="far fa-fw fa-trash default"></i>
          <i class="fas fa-fw fa-trash hover"></i>
        </a>

        <a v-if="!add && !info.primary" class="action primary-button" @click.prevent="makePrimary">
          <i class="far fa-fw fa-star default"></i>
          <i class="fas fa-fw fa-star hover"></i>
        </a>

        <a v-if="!add && info.primary" class="action primary-button primary" @click.prevent="preventClick">
          <i class="fas fa-fw fa-star"></i>
        </a>

        <div class="weather-temp">
          {{ this.weather.temp_actual }}&deg;
        </div>

        <div class="weather-icon">
          <i class="wi" :class="weather.condition_icon"></i>
        </div>

        <div class="name" v-if="!current">
          {{ this.weather.city }}
        </div>

        <div class="name" v-if="current">
          {{ $t('page.newLocation.currentLocation') }}
        </div>

        <div class="condition">
          {{ this.weather.condition_label }}
        </div>

        <div class="time" v-if="info.time_zone">
          {{ currentTime | moment('timezone', info.time_zone, timeFormat) }}
        </div>
      </div>
    </div>

    <div class="background-overlay" :class="className"></div>
  </button>
</template>

<style lang="scss">
.location {
  display: inline-block;
  width: calc(50% - 4px);
  margin-bottom: 4px;
  margin-left: 2px;
  margin-right: 2px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 8px;
  font-size: 12px;
  height: 203px;
  position: relative;
  z-index: 5;
  cursor: pointer;
  transition: all 0.25s;
  float: left;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25) inset;
  }

  .data {
    z-index: 6;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    color: #FFF;
    transition: all 0.25s;

    a {
      color: #FFF;
    }

    &:hover.time-afternoon, &:hover.time-afternoon a {
      color: #1f3934;
      text-shadow: none;
    }
    &:hover.time-dawn, &:hover.time-dawn a {
      color: #FFF;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
    }
    &:hover.time-dusk, &:hover.time-dusk a {
      color: #3c231e;
      text-shadow: none;
    }
    &:hover.time-early-morning, &:hover.time-early-morning a {
      color: #FFF;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
    }
    &:hover.time-evening, &:hover.time-evening a {
      color: #342b28;
      text-shadow: none;
    }
    &:hover.time-mid-morning, &:hover.time-mid-morning a {
      color: #17363a;
      text-shadow: none;
    }
    &:hover.time-midnight, &:hover.time-midnight a {
      color: #FFF;
      text-shadow: 0 0 8px #03090b;
    }
    &:hover.time-morning, &:hover.time-morning a {
      color: #0b1819;
      text-shadow: none;
    }
    &:hover.time-night, &:hover.time-night a {
      color: #FFF;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
    }
    &:hover.time-noon, &:hover.time-noon a {
      color: #2a5855;
      text-shadow: none;
    }
  }

  .background-overlay {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: opacity 0.25s;
    z-index: 5;

    &.time-afternoon {
      background: linear-gradient(to bottom, #ada587 0%, #FFFFFF 100%);
    }
    &.time-dawn {
      background: linear-gradient(to bottom, #28333e 0%, #6e5b5a 100%);
    }
    &.time-dusk {
      background: linear-gradient(to bottom, #6a4d47 0%, #ffffd6 100%);
    }
    &.time-early-morning {
      background: linear-gradient(to bottom, #7f605b 0%, #ad7e6c 100%);
    }
    &.time-evening {
      background: linear-gradient(to bottom, #9d7c64 0%, #ffffff 100%);
    }
    &.time-mid-morning {
      background: linear-gradient(to bottom, #9fc6d9 0%, #fff5e4 100%);
    }
    &.time-midnight {
      background: linear-gradient(to bottom, #2a3641 0%, #535f6a 100%);
    }
    &.time-morning {
      background: linear-gradient(to bottom, #82959e 0%, #fffcea 100%);
    }
    &.time-night {
      background: linear-gradient(to bottom, #3d3942 0%, #765e5e 100%);
    }
    &.time-noon {
      background: linear-gradient(to bottom, #abcbb7 0%, #f4fbf1 100%);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.35);

    .background-overlay {
      opacity: 1;
    }

    .confirm-delete {
      color: #FFF;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 8px;
    z-index: 10;
    text-align: center;

    p {
      padding: 44px 16px 16px 16px;
      display: block;
      line-height: 20px;
      font-size: 14px;
    }

    button {
      text-transform: uppercase;
      padding: 4px 8px;
      letter-spacing: 0.5px;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFF !important;
    padding: 10px;
  }

  .primary-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color: #FFF;
  }

  .delete-button {
    position: absolute;
    top: 0;
    right: 20px;
    padding: 10px;
    color: #FFF;
  }

  .confirm-delete, .confirm-primary {
    color: #FFF;
  }

  .action {
    opacity: 0;
    transition: all 0.25s;

    i.default {
      display: inline-block;
    }

    i.hover {
      display: none;
    }
  }

  .time {
    text-align: right;
    line-height: 20px;
    opacity: 0.8;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &:hover {
    .time {
      display: none;
    }

    .action {
      opacity: 0.75;

      &.primary {
        opacity: 1;
      }

      &:hover i.default {
        display: none;
      }

      &:hover i.hover {
        display: inline-block;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  .weather-temp {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 16px;
    font-weight: 300;
  }

  .weather-icon {
    margin-top: 60px;
    text-align: center;
    font-size: 50px;
    height: 70px;
  }

  .name {
    text-align: center;
    line-height: 16px;
    opacity: 0.5;
  }

  .condition {
    text-align: center;
    line-height: 28px;
  }
}
</style>

<script>
  export default {
    name: 'location',
    props: {
      info: Object,
      current: Boolean,
      add: Boolean
    },
    data () {
      return {
        isDeleted: false,
        timer: null,
        currentTime: new Date(),
        showModal: false,
        confirmDelete: false,
        confirmPrimary: false,
        weather: null,
        className: '',
        timeFormat: 'h:mm A'
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      const unitsTime = this.$store.getters.getSetting('units_time')

      if (unitsTime === 'twenty_four_hour') {
        this.timeFormat = 'H:mm'
      }

      this.timer = setInterval(this.updateTime, 1000)
      this.getWeather()
    },
    methods: {
      closeModal (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.showModal = false
        this.confirmDelete = false
        this.confirmPrimary = false
      },
      confirmedDelete () {
        this.isDeleted = true
        this.$emit('deleted', this.info)
      },
      confirmedPrimary () {
        this.$emit('makePrimary', this.info)
        this.closeModal()
      },
      deleteLocation (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.showModal = true
        this.confirmDelete = true
      },
      makePrimary (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.showModal = true
        this.confirmPrimary = true
      },
      getWeather () {
        if (!this.add) {
          this.weather = this.$store.getters.getWeather(this.info.hash_key)
          this.className = `time-${this.weather.scene_time}`
        }
      },
      handleClick () {
        this.$emit('clicked', this.info)
      },
      preventClick (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      updateTime () {
        this.currentTime = new Date()
      }
    }
  }
</script>
