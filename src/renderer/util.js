import { scaleQuantize } from 'd3-scale'
import { getMoonIllumination } from 'suncalc'

const offsetToTimeZone = (offset) => {
  const zones = {
    '-12:00': 'Etc/GMT+12',
    '-11:00': 'Pacific/Midway',
    '-10:00': 'Pacific/Honolulu',
    '-09:30': 'Pacific/Marquesas',
    '-09:00': 'America/Anchorage',
    '-08:00': 'America/Los_Angeles',
    '-07:00': 'America/Phoenix',
    '-06:00': 'America/Chicago',
    '-05:00': 'America/New_York',
    '-04:00': 'America/Barbados',
    '-03:30': 'America/St_Johns',
    '-03:00': 'America/Cayenne',
    '-02:00': 'America/Noronha',
    '-01:00': 'America/Scoresbysund',
    '+00:00': 'Africa/Casablanca',
    '+01:00': 'Europe/Berlin',
    '+02:00': 'Europe/Bucharest',
    '+03:00': 'Europe/Moscow',
    '+04:00': 'Europe/Saratov',
    '+04:30': 'Asia/Kabul',
    '+05:00': 'Asia/Tashkent',
    '+05:30': 'Asia/Calcutta',
    '+05:45': 'Asia/Katmandu',
    '+06:00': 'Asia/Dhaka',
    '+06:30': 'Asia/Rangoon',
    '+07:00': 'Asia/Bangkok',
    '+08:00': 'Asia/Shanghai',
    '+08:30': 'Asia/Pyongyang',
    '+08:45': 'Australia/Eucla',
    '+09:00': 'Asia/Tokyo',
    '+09:30': 'Australia/Adelaide',
    '+10:00': 'Australia/Brisbane',
    '+10:30': 'Australia/Lord_Howe',
    '+11:00': 'Pacific/Bougainville',
    '+12:00': 'Pacific/Auckland',
    '+12:45': 'Pacific/Chatham',
    '+13:00': 'Pacific/Enderbury',
    '+14:00': 'Pacific/Kiritimati'
  }

  return (typeof zones[offset] !== 'undefined') ? zones[offset] : ''
}

const celsiusToFahrenheit = (temp) => {
  return Math.round((temp * 1.8) + 32)
}

const celsiusToKelvin = (temp) => {
  return Math.round(temp + 273.15)
}

const fahrenheitToCelcius = (temp) => {
  return Math.round((temp - 32) / 1.8)
}

const fahrenheitToKelvin = (temp) => {
  return Math.round(((temp - 32) / 1.8) + 273.15)
}

const kelvinToCelcius = (temp) => {
  return Math.round(temp - 273.15)
}

const kelvinToFahrenheit = (temp) => {
  return Math.round(((temp - 273.15) * 1.8) + 32)
}

const titleCase = (str) => {
  if (!str) {
    return ''
  }

  return str.trim().replace(/-/g, ' ').replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

const prepMenubarWeather = (data, settings) => {
  const measure = settings.units_temperature.charAt(0).toUpperCase()
  const description = titleCase(data.weather[0].description)

  // Convert Temperature based on Preferences
  const temperature = (settings.units_temperature === 'fahrenheit')
    ? kelvinToFahrenheit(data.main.temp)
    : kelvinToCelcius(data.main.temp)

  let folder = (data.weather[0].icon.slice(-1) === 'd') ? 'day' : 'night'
  let image = data.weather[0].id || 800

  // Show Moon Phase if Night & Clear Sky
  if (folder === 'night' && image === 800) {
    folder = 'moon'
    image = getMoonPhase()
  }

  return {
    image: image,
    title: temperature,
    tooltip: `${temperature} °${measure} - ${description}`,
    folder: folder,
    setting: settings.app_launch_icon
  }
}

const getMoonPhase = () => {
  const moon = getMoonIllumination(new Date())
  const scale = scaleQuantize()
    .domain([0, 1])
    .range([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])

  let phase = scale(moon.phase)

  if (phase === 100) {
    phase = 0
  }

  return phase
}

const degreesToDirection = (degrees) => {
  if (degrees < 0 || degrees > 360) {
    degrees = 0
  }

  if (degrees >= 0 && degrees <= 11.25) {
    return 'N'
  } else if (degrees > 348.75 && degrees <= 360) {
    return 'N'
  } else if (degrees > 11.25 && degrees <= 33.75) {
    return 'NNE'
  } else if (degrees > 33.75 && degrees <= 56.25) {
    return 'NE'
  } else if (degrees > 56.25 && degrees <= 78.75) {
    return 'ENE'
  } else if (degrees > 78.75 && degrees <= 101.25) {
    return 'E'
  } else if (degrees > 101.25 && degrees <= 123.75) {
    return 'ESE'
  } else if (degrees > 123.75 && degrees <= 146.25) {
    return 'SE'
  } else if (degrees > 146.25 && degrees <= 168.75) {
    return 'SSE'
  } else if (degrees > 168.75 && degrees <= 191.25) {
    return 'S'
  } else if (degrees > 191.25 && degrees <= 213.75) {
    return 'SSW'
  } else if (degrees > 213.75 && degrees <= 236.25) {
    return 'SW'
  } else if (degrees > 236.25 && degrees <= 258.75) {
    return 'WSW'
  } else if (degrees > 258.75 && degrees <= 281.25) {
    return 'W'
  } else if (degrees > 281.25 && degrees <= 303.75) {
    return 'WNW'
  } else if (degrees > 303.75 && degrees <= 326.25) {
    return 'NW'
  } else if (degrees > 326.25 && degrees <= 348.75) {
    return 'NNW'
  }
}

const getWeatherIcon = (code, time) => {
  const icons = {
    day: {
      code_200: 'wi-day-storm-showers',
      code_201: 'wi-day-thunderstorm',
      code_202: 'wi-day-thunderstorm',
      code_210: 'wi-day-storm-showers',
      code_211: 'wi-day-storm-showers',
      code_212: 'wi-day-thunderstorm',
      code_221: 'wi-day-storm-showers',
      code_230: 'wi-day-storm-showers',
      code_231: 'wi-day-storm-showers',
      code_232: 'wi-day-storm-showers',
      code_300: 'wi-day-showers',
      code_301: 'wi-day-showers',
      code_302: 'wi-day-showers',
      code_310: 'wi-day-showers',
      code_311: 'wi-day-showers',
      code_312: 'wi-day-rain-wind',
      code_313: 'wi-day-rain-wind',
      code_314: 'wi-day-rain-wind',
      code_321: 'wi-day-rain-wind',
      code_500: 'wi-day-sprinkle',
      code_501: 'wi-day-sprinkle',
      code_502: 'wi-day-rain',
      code_503: 'wi-rain',
      code_504: 'wi-rain',
      code_511: 'wi-day-rain-mix',
      code_520: 'wi-day-rain-wind',
      code_521: 'wi-day-rain',
      code_522: 'wi-rain',
      code_531: 'wi-day-sprinkle',
      code_600: 'wi-day-snow',
      code_601: 'wi-day-snow',
      code_602: 'wi-day-snow-wind',
      code_611: 'wi-day-rain-mix',
      code_612: 'wi-day-hail',
      code_615: 'wi-day-rain-mix',
      code_616: 'wi-day-rain-mix',
      code_620: 'wi-day-snow-thunderstorm',
      code_621: 'wi-day-sleet-storm',
      code_622: 'wi-snow-wind',
      code_701: 'wi-cloudy-windy',
      code_711: 'wi-smoke',
      code_721: 'wi-day-haze',
      code_731: 'wi-sandstorm',
      code_741: 'wi-day-fog',
      code_751: 'wi-dust',
      code_761: 'wi-dust',
      code_762: 'wi-volcano',
      code_771: 'wi-strong-wind',
      code_781: 'wi-tornado',
      code_800: 'wi-day-sunny',
      code_801: 'wi-day-sunny-overcast',
      code_802: 'wi-day-cloudy',
      code_803: 'wi-day-cloudy',
      code_804: 'wi-cloudy',
      code_900: 'wi-tornado',
      code_901: 'wi-lightning',
      code_902: 'wi-hurricane',
      code_903: 'wi-snowflake-cold',
      code_904: 'wi-hot',
      code_905: 'wi-windy',
      code_906: 'wi-hail',
      code_951: 'wi-day-sunny',
      code_952: 'wi-day-light-wind',
      code_953: 'wi-day-light-wind',
      code_954: 'wi-day-cloudy-gusts',
      code_955: 'wi-day-cloudy-gusts',
      code_956: 'wi-day-cloudy-gusts',
      code_957: 'wi-windy',
      code_958: 'wi-windy',
      code_959: 'wi-windy',
      code_960: 'wi-lightning',
      code_961: 'wi-lightning',
      code_962: 'wi-hurricane'
    },
    night: {
      code_200: 'wi-night-alt-storm-showers',
      code_201: 'wi-night-alt-thunderstorm',
      code_202: 'wi-night-alt-thunderstorm',
      code_210: 'wi-night-alt-storm-showers',
      code_211: 'wi-night-alt-storm-showers',
      code_212: 'wi-night-alt-thunderstorm',
      code_221: 'wi-night-alt-storm-showers',
      code_230: 'wi-night-alt-storm-showers',
      code_231: 'wi-night-alt-storm-showers',
      code_232: 'wi-night-alt-storm-showers',
      code_300: 'wi-night-alt-showers',
      code_301: 'wi-night-alt-showers',
      code_302: 'wi-night-alt-showers',
      code_310: 'wi-night-alt-showers',
      code_311: 'wi-night-alt-showers',
      code_312: 'wi-night-alt-rain-wind',
      code_313: 'wi-night-alt-rain-wind',
      code_314: 'wi-night-alt-rain-wind',
      code_321: 'wi-night-alt-rain-wind',
      code_500: 'wi-night-alt-sprinkle',
      code_501: 'wi-night-alt-sprinkle',
      code_502: 'wi-night-alt-rain',
      code_503: 'wi-rain',
      code_504: 'wi-rain',
      code_511: 'wi-night-alt-rain-mix',
      code_520: 'wi-night-alt-rain-wind',
      code_521: 'wi-night-alt-rain',
      code_522: 'wi-rain',
      code_531: 'wi-night-alt-sprinkle',
      code_600: 'wi-night-alt-snow',
      code_601: 'wi-night-alt-snow',
      code_602: 'wi-night-alt-snow-wind',
      code_611: 'wi-night-alt-rain-mix',
      code_612: 'wi-night-alt-hail',
      code_615: 'wi-night-alt-rain-mix',
      code_616: 'wi-night-alt-rain-mix',
      code_620: 'wi-night-alt-snow-thunderstorm',
      code_621: 'wi-night-alt-sleet-storm',
      code_622: 'wi-snow-wind',
      code_701: 'wi-cloudy-windy',
      code_711: 'wi-smoke',
      code_721: 'wi-fog',
      code_731: 'wi-sandstorm',
      code_741: 'wi-fog',
      code_751: 'wi-dust',
      code_761: 'wi-dust',
      code_762: 'wi-volcano',
      code_771: 'wi-strong-wind',
      code_781: 'wi-tornado',
      code_800: 'wi-night-clear',
      code_801: 'wi-night-alt-partly-cloudy',
      code_802: 'wi-night-alt-cloudy',
      code_803: 'wi-night-alt-cloudy',
      code_804: 'wi-cloudy',
      code_900: 'wi-tornado',
      code_901: 'wi-lightning',
      code_902: 'wi-hurricane',
      code_903: 'wi-snowflake-cold',
      code_904: 'wi-hot',
      code_905: 'wi-windy',
      code_906: 'wi-hail',
      code_951: 'wi-night-clear',
      code_952: 'wi-night-alt-cloudy-windy',
      code_953: 'wi-night-alt-cloudy-windy',
      code_954: 'wi-night-alt-cloudy-gusts',
      code_955: 'wi-night-alt-cloudy-gusts',
      code_956: 'wi-night-alt-cloudy-gusts',
      code_957: 'wi-windy',
      code_958: 'wi-windy',
      code_959: 'wi-windy',
      code_960: 'wi-lightning',
      code_961: 'wi-lightning',
      code_962: 'wi-hurricane'
    }
  }

  if (typeof icons[time] !== 'undefined' && typeof icons[time][`code_${code}`] !== 'undefined') {
    return icons[time][`code_${code}`]
  }
}

const parseWeather = (data, settings) => {
  let weather = {
    id: null,
    city: null,
    temp: {
      actual: 0,
      feelsLike: 0
    },
    wind: {
      speed: 0,
      direction: null
    },
    condition: {
      icon: null,
      label: null
    },
    sun: {
      rise: null,
      set: null
    }
  }

  return weather
}

export default {
  celsiusToFahrenheit,
  celsiusToKelvin,
  degreesToDirection,
  fahrenheitToCelcius,
  fahrenheitToKelvin,
  getMoonPhase,
  kelvinToCelcius,
  kelvinToFahrenheit,
  offsetToTimeZone,
  parseWeather,
  prepMenubarWeather,
  titleCase,
  getWeatherIcon
}
