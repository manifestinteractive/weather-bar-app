import Vue from 'vue'
import axios from 'axios'

// Setup HTTP
Vue.http = Vue.prototype.$http = axios

// Setup API Defaults
const api = Vue.http.create({
  baseURL: process.env.WEATHERBAR_API_DOMAIN,
  headers: {
    common: {
      'API-Key': process.env.WEATHERBAR_API_KEY
    }
  }
})

export default {
  getIpAddress (success, error) {
    Vue.http.get('https://ip.weatherbarapp.com', null, { headers: null }).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  getLocationByIp (ipAddress, success, error) {
    api.get(`/v1/geolocation/ip/${ipAddress}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  getUserSettings (uuid, success, error) {
    api.get(`/v1/settings/uuid/${uuid}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  initSettings (uuid, success, error) {
    api.post(`/v1/settings/uuid/${uuid}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  searchCities (keyword, success, error) {
    api.get(`/v1/owm_city_list?keyword=${keyword}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  getCurrentWeatherById (id, success, error) {
    api.get(`/v1/weather/current/id/${id}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  getCurrentWeatherByGeo (location, success, error) {
    api.get(`/v1/weather/current/geo/${location.latitude}/${location.longitude}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  },
  updateUserSettings (data, success, error) {
    api.post(`/v1/settings/update/${data.uuid}/${data.key}/${data.value}`).then(
      (response) => success && success(response.data),
      (response) => error && error(response)
    )
  }
}
