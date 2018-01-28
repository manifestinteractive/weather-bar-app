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

/**
 * Convert String to Title Case
 * @param  {String} str String to Convert
 * @return {String}
 */
const titleCase = (str) => {
  if (!str) {
    return ''
  }

  return str.trim().replace(/-/g, ' ').replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

/**
 * Prepare Menu Bar Weather
 * @param {Object} data Open Weather Map Response
 * @param {Object} settings App Settings
 * @return {Object}
 */
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

/**
 * User Current Data to Determine Current Moon Phase Icon
 * @return {Number}
 */
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

export default {
  offsetToTimeZone,
  celsiusToFahrenheit,
  celsiusToKelvin,
  fahrenheitToCelcius,
  fahrenheitToKelvin,
  kelvinToCelcius,
  kelvinToFahrenheit,
  titleCase,
  prepMenubarWeather,
  getMoonPhase
}
