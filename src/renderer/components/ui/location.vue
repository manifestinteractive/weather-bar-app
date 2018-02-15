<template>
  <div class="location" @click="handleClick" v-if="!isDeleted">

    <div class="overlay" v-if="showModal" @click.prevent="preventClick">
      <a class="close-button" @click.prevent="closeModal">
        <i class="far fa-times"></i>
      </a>

      <div class="confirm-delete" v-if="confirmDelete">
        <p>Are you sure you want to delete this location?</p>
        <button @click.prevent="confirmedDelete">Delete</button>
      </div>
    </div>

    <div v-if="add" class="add-icon">
      <div class="weather-icon">
        <i class="fal fa-plus"></i>
      </div>

      <div class="condition">
        Add Location
      </div>
    </div>

    <div v-if="info && weather">
      <a href="#" v-if="!add" class="action delete-button" @click="deleteLocation">
        <i class="far fa-fw fa-trash default"></i>
        <i class="fas fa-fw fa-trash hover"></i>
      </a>

      <div class="weather-temp">
        {{ this.weather.temp_actual }}&deg;
      </div>

      <div class="weather-icon">
        <i class="wi" :class="this.weather.condition_icon"></i>
      </div>

      <div class="name">
        {{ this.weather.city }}
      </div>

      <div class="condition">
        {{ this.weather.condition_label }}
      </div>

      <div class="time" v-if="info.time_zone">
        {{ currentTime | moment('timezone', info.time_zone, 'h:mm A') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.location {
  display: inline-block;
  width: calc(50% - 4px);
  margin-bottom: 4px;
  margin-left: 2px;
  margin-right: 2px;
  background: rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 8px;
  font-size: 12px;
  height: 50%;
  position: relative;
  z-index: 5;
  cursor: pointer;
  transition: all 0.25s;
  float: left;

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
    color: #FFF;
    padding: 10px;
  }

  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFF;
    padding: 10px;
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
    color: #FFF;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);

    .time {
      display: none;
    }

    .action {
      opacity: 0.75;

      &:hover i.default {
        display: none;
      }

      &:hover i.hover {
        display: inline-block;
      }

      &:hover i.fa-trash {
        color: #FFF;
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
    color: #FFF;
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
        weather: null
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.timer = setInterval(this.updateTime, 1000)
      this.getWeather()
    },
    methods: {
      getTemp (temp) {
        return (temp) ? `${temp}&deg;` : '--'
      },
      getCondition (condition) {
        return condition || 'Unknown'
      },
      getIcon (icon) {
        return icon || 'wi-na'
      },
      getName (name) {
        const parts = (name) ? name.split(', ') : null
        return (name) ? parts[0].replace(/\(([^)]+)\)/, '').trim() : ''
      },
      getWeather () {
        if (!this.add) {
          this.weather = this.$store.getters.getWeather(this.info.hash_key)
        }
      },
      updateTime () {
        this.currentTime = new Date()
      },
      preventClick (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      deleteLocation (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.showModal = true
        this.confirmDelete = true
      },
      confirmedDelete () {
        this.isDeleted = true
        this.$emit('deleted', this.info)
      },
      closeModal (event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.showModal = false
        this.confirmDelete = false
        this.confirmPrimary = false
      },
      handleClick () {
        this.$emit('clicked', this.info)
      }
    }
  }
</script>
