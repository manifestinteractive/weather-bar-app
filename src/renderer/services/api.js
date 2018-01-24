import Vue from 'vue'

export default {
  getUserSettings (uuid, succes, error) {
    Vue.http.get(`/v1/settings/uuid/${uuid}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  },
  initSettings (uuid, succes, error) {
    Vue.http.post(`/v1/settings/uuid/${uuid}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  },
  searchCities (keyword, succes, error) {
    Vue.http.get(`/v1/owm_city_list?keyword=${keyword}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  },
  getCurrentWeatherById (id, succes, error) {
    Vue.http.get(`/v1/weather/current/id/${id}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  },
  getCurrentWeatherByGeo (location, succes, error) {
    Vue.http.get(`/v1/weather/current/geo/${location.latitude}/${location.longitude}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  },
  updateUserSettings (data, succes, error) {
    Vue.http.post(`/v1/settings/update/${data.uuid}/${data.key}/${data.value}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        if (typeof error === 'function') {
          error(response)
        }
      }
    )
  }
}
