const state = {
  app_always_on_top: false,
  app_language: 'en',
  app_launch_at_startup: true,
  app_launch_icon: 'both',
  created_date: null,
  layout_current_temp: 'actual',
  layout_weather_map: 'standard',
  modified_date: null,
  units_accumulation: 'inches',
  units_pressure: 'inhb',
  units_temperature: 'fahrenheit',
  units_time: '12-hour',
  units_wind_speed: 'mph',
  uuid: null
}

const mutations = {
  INIT_SETTINGS (state, settings) {
    for (var key in settings) {
      if (state.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
        state[key] = settings[key]
      }
    }
  },
  LOAD_SETTINGS (state, settings) {
    for (var key in settings) {
      if (state.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
        state[key] = settings[key]
      }
    }
  },
  UPDATE_SETTING (state, setting) {
    if (state.hasOwnProperty(setting.key)) {
      state[setting.key] = setting.value
    }
  }
}

const getters = {
  getSetting: (state) => (key) => {
    return (state.hasOwnProperty(key)) ? state[key] : null
  },
  getSettings: state => {
    return state
  }
}

const actions = {
  initSettings ({ commit }, settings) {
    commit('INIT_SETTINGS', settings)
  },
  loadSettings ({ commit }, settings) {
    commit('LOAD_SETTINGS', settings)
  },
  updateSetting ({ commit }, setting) {
    commit('UPDATE_SETTING', setting)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
