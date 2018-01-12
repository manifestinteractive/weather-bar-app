<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page">

    </div>
  </transition>
</template>

<script>
  export default {
    name: 'index-page',
    data () {
      return {}
    },
    mounted () {
      // this.getWeather()
      // this.updateWeather() // this tests updating the menu bar icon & text
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      change () {
        this.$i18n.locale = this.locale

        this.$db.settings.update({ setting: 'locale' }, { setting: 'locale', value: this.locale }, { upsert: true }, (err, replaced, upsert) => {
          if (err) {
            console.error('Unable to Update Locale', err)
          }
        })
      },
      updateWeather () {
        let icon = 'wi-day-cloudy-gusts'

        if (this.temperature > 65 && this.temperature <= 70) {
          icon = 'wi-cloudy'
        }

        if (this.temperature > 70) {
          icon = 'wi-cloudy-windy'
        }

        if (this.temperature > 100) {
          this.temperature = 60
        }

        // Send Weather Data to Electron
        this.$electron.ipcRenderer.send('set-weather', {
          temperature: this.temperature,
          location: 'some city',
          icon: icon
        })

        this.temperature++

        // clearTimeout(timeout)
        // timeout = setTimeout(this.updateWeather, 5000)
      },
      getWeather () {
        // const date = new Date()
        const locationId = '2172797'
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${locationId}&appid=${process.env.OPW_API_KEY}`

        // 1.  Check for weather from last 15 minutes ( weather only updates every 15 minutes )

        // 2.  If Cached Weather exists for this city ID, return it

        // 3.  Otherwise, hit the OWM API and cache the data

        // This is just a test that we can hit the API on mouting the component
        this.$http.get(weatherUrl).then(response => {
          console.log('response', response)
          this.results = response.data
        })
      }
    }
  }
</script>

<style lang="scss">
.home-page {

}
</style>
