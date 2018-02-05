const state = {}

const mutations = {
  SAVE_WEATHER (state, data) {
    if (data.hasOwnProperty('key')) {
      state[data.key] = data
    }
  }
}

const getters = {
  getWeather: (state) => (key) => {
    return (state.hasOwnProperty(key)) ? state[key] : null
  }
}

const actions = {
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
