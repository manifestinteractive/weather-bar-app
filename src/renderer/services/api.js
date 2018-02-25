import Vue from 'vue'
import axios from 'axios'

import { EventBus } from '../event-bus'
import bugsnag from '../bugsnag'

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

const handleError = (error, callback) => {
  bugsnag.notify(error, JSON.parse(JSON.stringify(error)))

  EventBus.$emit('showToast', {
    message: error.message,
    type: 'error',
    close: true
  })

  return (callback) ? callback(error) : false
}

export default {
  getIpAddress (success, error) {
    Vue.http.get('https://ip.weatherbarapp.com', null, { headers: null }).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getLocationByIp (ipAddress, success, error) {
    api.get(`/v1/geolocation/ip/${ipAddress}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getUserSettings (uuid, success, error) {
    api.get(`/v1/settings/uuid/${uuid}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  initSettings (uuid, success, error) {
    api.post(`/v1/settings/uuid/${uuid}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  searchCities (keyword, success, error) {
    api.get(`/v1/owm_city_list?keyword=${keyword}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getCurrentWeatherById (id, success, error) {
    api.get(`/v1/weather/current/id/${id}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getCurrentWeatherByGeo (location, success, error) {
    api.get(`/v1/weather/current/geo/${location.latitude}/${location.longitude}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getWeatherForecastById (id, success, error) {
    api.get(`/v1/weather/forecast/id/${id}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getWeatherForecastByGeo (location, success, error) {
    api.get(`/v1/weather/forecast/geo/${location.latitude}/${location.longitude}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  updateUserSettings (data, success, error) {
    api.post(`/v1/settings/update/${data.uuid}/${data.key}/${data.value}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  saveLocation (data, success, error) {
    api.post(`/v1/saved_locations/new/`, data).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  getSavedLocations (uuid, success, error) {
    api.get(`/v1/saved_locations/uuid/${uuid}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  deleteSavedLocations (data, success, error) {
    api.delete(`/v1/saved_locations/uuid/${data.uuid}/${data.hash_key}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  },
  makeLocationPrimary (data, success, error) {
    api.post(`/v1/saved_locations/primary/${data.uuid}/${data.hash_key}`).then(
      (response) => success && success(response.data),
      (response) => handleError(response, error)
    )
  }
}
