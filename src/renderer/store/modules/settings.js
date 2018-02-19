import * as tzlookup from 'tz-lookup'

const state = {
  app_always_on_top: false,
  app_language: 'en',
  app_launch_at_startup: true,
  app_launch_icon: 'both',
  created_date: null,
  current_city: null,
  current_country: null,
  current_ip_address: null,
  current_latitude: null,
  current_longitude: null,
  current_postalcode: null,
  current_region: null,
  current_time_zone: null,
  layout_current_temp: 'actual',
  layout_weather_map: 'standard',
  modified_date: null,
  units_accumulation: 'inches',
  units_pressure: 'inhb',
  units_temperature: 'fahrenheit',
  units_time: 'twelve_hour',
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
  },
  SET_CURRENT_LOCATION (state, location) {
    if (location.hasOwnProperty('ip_address') && location.hasOwnProperty('latitude') && location.hasOwnProperty('longitude')) {
      const timeZone = tzlookup(location.latitude, location.longitude)

      state.current_city = location.city
      state.current_country = location.country
      state.current_ip_address = location.ip_address
      state.current_latitude = location.latitude
      state.current_longitude = location.longitude
      state.current_postalcode = location.postalcode
      state.current_region = location.region
      state.current_time_zone = timeZone
    }
  }
}

const getters = {
  getSetting: (state) => (key) => {
    return (state.hasOwnProperty(key)) ? state[key] : null
  },
  getSettings: state => {
    return state
  },
  getCurrentLocation: (state) => {
    return {
      latitude: state.current_latitude,
      longitude: state.current_longitude
    }
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
  },
  setCurrentLocation ({ commit }, location) {
    commit('SET_CURRENT_LOCATION', location)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
