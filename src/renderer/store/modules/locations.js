const state = {}

const mutations = {
  SET_LOCATION (state, data) {
    if (data.hasOwnProperty('key')) {
      state[data.key] = data
    }
  }
}

const getters = {
  getLocation: (state) => (key) => {
    return (state.hasOwnProperty(key)) ? state[key] : null
  }
}

const actions = {
  setLocation ({ commit }, data) {
    commit('SET_LOCATION', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
