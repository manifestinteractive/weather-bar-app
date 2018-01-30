const state = {}

const mutations = {
  SET_WEATHER (state, data) {
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
  setWeather ({ commit }, data) {
    commit('SET_WEATHER', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
