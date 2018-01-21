import Vue from 'vue'

export default {
  getUserSettings (uuid, succes, error) {
    Vue.http.get(`/v1/settings/uuid/${uuid}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  initSettings (uuid, succes, error) {
    Vue.http.post(`/v1/settings/uuid/${uuid}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchCities (keyword, succes, error) {
    Vue.http.get(`/v1/owm_city_list?keyword=${keyword}`).then(
      (response) => {
        succes(response.data)
      },
      (response) => {
        error(response)
      }
    )
  }
}
