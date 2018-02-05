const state = {}

const mutations = {
  SAVE_LOCATION (state, data) {
    state[data.hash_key] = data
  },
  UPDATE_SAVED_LOCATIONS (state, data) {
    for (let i = 0; i < data.length; i++) {
      state[data[i].hash_key] = data[i]
    }
  }
}

const getters = {
  getLocationByKey: (state) => (key) => {
    return (state.hasOwnProperty(key)) ? state[key] : null
  },
  getSavedLocations: state => {
    return state
  }
}

const actions = {
  updateSavedLocations ({ commit }, data) {
    commit('UPDATE_SAVED_LOCATIONS', data)
  },
  saveLocation ({ commit }, data) {
    commit('SAVE_LOCATION', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
