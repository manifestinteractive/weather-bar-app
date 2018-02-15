const state = {}

const mutations = {
  DELETE_WEATHER (state, data) {
    if (data.hasOwnProperty('hash_key')) {
      delete state[data.hash_key]
    }
  },
  SAVE_WEATHER (state, data) {
    if (data.hasOwnProperty('hash_key')) {
      state[data.hash_key] = data
    }
  }
}

const getters = {
  getWeather: (state) => (hashKey) => {
    return (state.hasOwnProperty(hashKey)) ? state[hashKey] : null
  }
}

const actions = {
  deleteWeather ({ commit }, data) {
    commit('DELETE_WEATHER', data)
  },
  saveWeather ({ commit }, data) {
    commit('SAVE_WEATHER', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
