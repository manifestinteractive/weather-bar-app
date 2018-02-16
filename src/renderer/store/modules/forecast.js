const state = {}

const mutations = {
  DELETE_WEATHER (state, data) {
    if (data.hasOwnProperty('hash_key')) {
      delete state[data.hash_key]
    }
  },
  SAVE_FORECAST (state, data) {
    if (data.hasOwnProperty('hash_key')) {
      state[data.hash_key] = data.forecast
    }
  }
}

const getters = {
  getForecast: (state) => (hashKey) => {
    return (state.hasOwnProperty(hashKey)) ? state[hashKey] : null
  }
}

const actions = {
  deleteForecast ({ commit }, data) {
    commit('DELETE_FORECAST', data)
  },
  saveForecast ({ commit }, data) {
    commit('SAVE_FORECAST', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
