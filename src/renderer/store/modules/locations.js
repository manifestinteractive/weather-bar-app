const state = {}

const mutations = {
  SAVE_LOCATION (state, data) {
    state[data.hash_key] = data

    let primaryExists = false

    for (let loc in state) {
      if (!state.hasOwnProperty(loc)) continue
      if (state[loc].primary) {
        primaryExists = true
      }
    }

    if (!primaryExists) {
      state['current'].primary = true
    }
  },
  UPDATE_SAVED_LOCATIONS (state, data) {
    for (let i = 0; i < data.length; i++) {
      state[data[i].hash_key] = data[i]
    }
  },
  DELETE_LOCATION (state, data) {
    delete state[data.hash_key]

    let primaryExists = false

    for (let loc in state) {
      if (!state.hasOwnProperty(loc)) continue
      if (state[loc].primary) {
        primaryExists = true
      }
    }

    if (!primaryExists) {
      state['current'].primary = true
    }
  },
  MAKE_PRIMARY (state, data) {
    for (let loc in state) {
      if (!state.hasOwnProperty(loc)) continue
      state[loc].primary = false
    }

    state[data.hash_key].primary = true
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
  },
  deleteLocation ({ commit }, data) {
    commit('DELETE_LOCATION', data)
  },
  makePrimary ({ commit }, data) {
    commit('MAKE_PRIMARY', data)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
