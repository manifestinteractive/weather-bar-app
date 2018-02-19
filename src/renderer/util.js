import Feels from 'feels'
import moment from 'moment-timezone'

import { scaleQuantize } from 'd3-scale'
import { getTimes, getPosition, getMoonPosition, getMoonIllumination } from 'suncalc'
import * as tzlookup from 'tz-lookup'

const celsiusToFahrenheit = (temp) => {
  return Math.round((temp * 1.8) + 32)
}

const celsiusToKelvin = (temp) => {
  return Math.round(temp + 273.15)
}

const fahrenheitToCelsius = (temp) => {
  return Math.round((temp - 32) / 1.8)
}

const fahrenheitToKelvin = (temp) => {
  return Math.round(((temp - 32) / 1.8) + 273.15)
}

const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15)
}

const kelvinToFahrenheit = (temp) => {
  return Math.round(((temp - 273.15) * 1.8) + 32)
}

const mmToInches = (volume) => {
  return +(volume / 25.4).toFixed(2)
}

const mpsToMph = (speed) => {
  return Math.round((speed * 3600 / 1610.3 * 1000) / 1000)
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

  // Convert Temperature to Feels Like
  const feelsLikeKelvin = new Feels({
    temp: data.main.temp,
    humidity: data.main.humidity,
    speed: data.wind.speed,
    units: {
      temp: 'k',
      speed: 'mps'
    }
  }).like()

  // Convert Temperature based on Preferences
  const actual = (settings.units_temperature === 'fahrenheit')
    ? kelvinToFahrenheit(data.main.temp)
    : kelvinToCelsius(data.main.temp)

  const feelsLike = (settings.units_temperature === 'fahrenheit')
    ? kelvinToFahrenheit(feelsLikeKelvin)
    : kelvinToCelsius(feelsLikeKelvin)

  const temperature = (settings.layout_current_temp === 'actual') ? actual : feelsLike

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

const getMoonPhaseScene = (latitude, longitude) => {
  const illumination = getMoonIllumination(new Date())
  const position = getMoonPosition(new Date())

  const scale = scaleQuantize()
    .domain([0, 1])
    .range([
      'moon-new-moon',
      'moon-waxing-crescent',
      'moon-first-quarter',
      'moon-waxing-gibbous',
      'moon-full-moon',
      'moon-waning-gibbous',
      'moon-last-quarter',
      'moon-waning-crescent'
    ])

  return {
    name: scale(illumination.phase),
    fraction: illumination.fraction,
    phase: illumination.phase,
    angle: illumination.angle,
    altitude: (isNaN(position.altitude)) ? 0 : position.altitude,
    azimuth: (isNaN(position.azimuth)) ? 0 : position.azimuth,
    distance: (isNaN(position.distance)) ? 0 : position.distance,
    parallacticAngle: (isNaN(position.parallacticAngle)) ? 0 : position.parallacticAngle
  }
}

const getMoonPhaseIcon = () => {
  const moon = getMoonIllumination(new Date())
  const scale = scaleQuantize()
    .domain([0, 1])
    .range([
      'wi-moon-new',
      'wi-moon-waxing-crescent-1',
      'wi-moon-waxing-crescent-2',
      'wi-moon-waxing-crescent-4',
      'wi-moon-waxing-crescent-6',
      'wi-moon-first-quarter',
      'wi-moon-waxing-gibbous-1',
      'wi-moon-waxing-gibbous-2',
      'wi-moon-waxing-gibbous-4',
      'wi-moon-waxing-gibbous-6',
      'wi-moon-full',
      'wi-moon-waning-gibbous-1',
      'wi-moon-waning-gibbous-2',
      'wi-moon-waning-gibbous-4',
      'wi-moon-waning-gibbous-6',
      'wi-moon-third-quarter',
      'wi-moon-waning-crescent-1',
      'wi-moon-waning-crescent-2',
      'wi-moon-waning-crescent-4',
      'wi-moon-waning-crescent-6',
      'wi-moon-new'
    ])

  return scale(moon.phase)
}

const degreesToDirection = (degrees) => {
  if (degrees < 0 || degrees > 360) {
    degrees = 0
  }

  if (degrees >= 0 && degrees <= 11.25) {
    return 'NORTH'
  } else if (degrees > 348.75 && degrees <= 360) {
    return 'NORTH'
  } else if (degrees > 11.25 && degrees <= 33.75) {
    return 'NNE'
  } else if (degrees > 33.75 && degrees <= 56.25) {
    return 'NE'
  } else if (degrees > 56.25 && degrees <= 78.75) {
    return 'ENE'
  } else if (degrees > 78.75 && degrees <= 101.25) {
    return 'EAST'
  } else if (degrees > 101.25 && degrees <= 123.75) {
    return 'ESE'
  } else if (degrees > 123.75 && degrees <= 146.25) {
    return 'SE'
  } else if (degrees > 146.25 && degrees <= 168.75) {
    return 'SSE'
  } else if (degrees > 168.75 && degrees <= 191.25) {
    return 'SOUTH'
  } else if (degrees > 191.25 && degrees <= 213.75) {
    return 'SSW'
  } else if (degrees > 213.75 && degrees <= 236.25) {
    return 'SW'
  } else if (degrees > 236.25 && degrees <= 258.75) {
    return 'WSW'
  } else if (degrees > 258.75 && degrees <= 281.25) {
    return 'WEST'
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

const getRainPercent = (code) => {
  if (code === 202 || code === 212 || code === 502 || code === 503 || code === 504 || code === 522 || code === 202 || code === 202) {
    return 100
  } else if (code >= 200 && code <= 232) {
    return 75
  } else if (code >= 500 && code <= 531) {
    return 50
  } else if (code >= 300 && code <= 321) {
    return 25
  }

  return 0
}

const getCloudPercent = (code) => {
  if (code === 202 || code === 212 || code === 502 || code === 503 || code === 504 || code === 522 || code === 202 || code === 202) {
    return 100
  } else if (code >= 200 && code <= 232) {
    return 80
  } else if (code >= 500 && code <= 531) {
    return 60
  } else if (code >= 300 && code <= 321) {
    return 40
  } else if (code >= 801 && code <= 804) {
    return 20
  }

  return 0
}

const getSceneTime = (latitude, longitude, timeZone) => {
  const now = parseInt(moment.tz(timeZone).format('x'))
  const sunTimes = getTimes(moment.tz(timeZone), latitude, longitude)

  // Match up the calculated sun times for this timezone against CSS class names we have designs for
  const dawn = parseInt(moment.tz(sunTimes.dawn, timeZone).format('x'))
  const earlyMorning = parseInt(moment.tz(sunTimes.sunrise, timeZone).format('x'))
  const morning = parseInt(moment.tz(sunTimes.sunriseEnd, timeZone).format('x'))
  const midMorning = parseInt(moment.tz(sunTimes.goldenHourEnd, timeZone).format('x'))
  const noon = parseInt(moment.tz(sunTimes.solarNoon, timeZone).format('x'))
  const afternoon = parseInt(moment.tz(sunTimes.goldenHour, timeZone).format('x'))
  const evening = parseInt(moment.tz(sunTimes.sunsetStart, timeZone).format('x'))
  const dusk = parseInt(moment.tz(sunTimes.sunset, timeZone).format('x'))
  const night = parseInt(moment.tz(sunTimes.dusk, timeZone).format('x'))
  const midnight = parseInt(moment.tz(sunTimes.nightEnd, timeZone).format('x'))

  if (now >= dawn && now < earlyMorning) {
    return 'dawn'
  } else if (now >= earlyMorning && now < morning) {
    return 'early-morning'
  } else if (now >= morning && now < midMorning) {
    return 'morning'
  } else if (now >= midMorning && now < noon) {
    return 'mid-morning'
  } else if (now >= noon && now < afternoon) {
    return 'noon'
  } else if (now >= afternoon && now < evening) {
    return 'afternoon'
  } else if (now >= evening && now < dusk) {
    return 'evening'
  } else if (now >= dusk && now < night) {
    return 'dusk'
  } else if (now >= night && now < midnight) {
    return 'night'
  } else {
    return 'midnight'
  }
}

const getSunsPosition = (latitude, longitude, timeZone) => {
  const position = getPosition(moment.tz(timeZone), latitude, longitude)

  return (position.altitude / (Math.PI / 2))
}

const getMoonsPosition = (latitude, longitude, timeZone) => {
  const position = getMoonPosition(moment.tz(timeZone), latitude, longitude)

  return (position.altitude / (Math.PI / 2))
}

const parseWeather = (key, data, settings) => {
  moment.locale(settings.app_language)

  const timeZone = tzlookup(data.coord.lat, data.coord.lon)
  const time = (data.weather[0].icon.slice(-1) === 'd') ? 'day' : 'night'
  const code = data.weather[0].id
  const moon = getMoonPhaseScene(data.coord.lat, data.coord.lon)

  // Convert Temperature to Feels Like
  const feelsLikeKelvin = new Feels({
    temp: data.main.temp,
    humidity: data.main.humidity,
    speed: data.wind.speed,
    units: {
      temp: 'k',
      speed: 'mps'
    }
  }).like()

  const sunrise = parseInt(moment.tz(data.sys.sunrise * 1000, timeZone).format('x'))
  const sunset = parseInt(moment.tz(data.sys.sunset * 1000, timeZone).format('x'))
  const now = parseInt(moment.tz(timeZone).format('x'))
  const sunNext = (now > sunrise && now <= sunset) ? 'sunset' : 'sunrise'
  const sunPosition = getSunsPosition(data.coord.lat, data.coord.lon, timeZone)
  const moonPosition = getMoonsPosition(data.coord.lat, data.coord.lon, timeZone)
  const thunderstorm = (code >= 200 && code <= 232)

  const rainPrecipitation = (data.rain && data.rain['3h']) ? data.rain['3h'] : 0
  const snowPrecipitation = (data.snow && data.snow['3h']) ? data.snow['3h'] : 0
  const precipitation = mmToInches(rainPrecipitation + snowPrecipitation) + ' IN'

  let weather = {
    city: data.name,
    condition_icon: (time === 'night' && (code === 800 || code === 951)) ? getMoonPhaseIcon() : getWeatherIcon(code, time),
    condition_label: titleCase(data.weather[0].description),
    id: data.id,
    hash_key: key,
    moon_angle: moon.angle,
    moon_fraction: moon.fraction,
    moon_name: moon.name,
    moon_phase: (moon.phase === 1) ? 0 : moon.phase,
    moon_position: moonPosition,
    precipitation: precipitation,
    scene_clouds: (getCloudPercent(code) > 0),
    scene_cloud_percent: getCloudPercent(code),
    scene_fog: (code === 741),
    scene_lightning: (code >= 200 && code <= 232),
    scene_moon: (sunPosition <= 0 && moonPosition >= -0.05),
    scene_rain: getRainPercent(code),
    scene_snow: (code >= 600 && code <= 622),
    scene_stars: (sunPosition <= -0.05 && !thunderstorm),
    scene_sun: (sunPosition >= -0.05),
    scene_thunderstorm: thunderstorm,
    scene_time: getSceneTime(data.coord.lat, data.coord.lon, timeZone),
    scene_wind_direction: data.wind.deg,
    scene_wind_speed: mpsToMph(data.wind.speed),
    sun_next: sunNext,
    sun_position: sunPosition,
    sunrise: moment.tz(data.sys.sunrise * 1000, timeZone).format('h:mm A'),
    sunset: moment.tz(data.sys.sunset * 1000, timeZone).format('h:mm A'),
    temp_actual: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(data.main.temp) : kelvinToCelsius(data.main.temp),
    temp_feels_like: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(feelsLikeKelvin) : kelvinToCelsius(feelsLikeKelvin),
    temp_max: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(data.main.temp_max) : kelvinToCelsius(data.main.temp_max),
    temp_min: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(data.main.temp_min) : kelvinToCelsius(data.main.temp_min),
    time_zone: timeZone,
    wind_direction: degreesToDirection(data.wind.deg),
    wind_speed: (settings.units_wind_speed === 'mph') ? mpsToMph(data.wind.speed) + ' MPH' : Math.round(data.wind.speed) + ' MPS'
  }

  return weather
}

const parseWeatherForecast = (key, data, settings, todayLabelTranslated) => {
  if (!data || !data.list || data.list.length === 0) {
    return []
  }

  moment.locale(settings.app_language)

  const timeZone = tzlookup(data.city.coord.lat, data.city.coord.lon)
  const forecast = []

  const todayLabel = moment.tz(timeZone).format('ddd')
  const todayNumber = moment.tz(timeZone).format('D')
  const firstDayLabel = moment.tz(data.list[0].dt * 1000, timeZone).format('ddd')
  const firstDayNumber = moment.tz(data.list[0].dt * 1000, timeZone).format('D')

  // Since the data is cached for an hour, it's possible that the first day might be yesterday
  const firstDayIsToday = (firstDayLabel === todayLabel && firstDayNumber === todayNumber)

  for (let i = 0; i < data.list.length; i++) {
    const code = data.list[i].weather[0].id
    const time = (data.list[i].weather[0].icon.slice(-1) === 'd') ? 'day' : 'night'

    if ((i === 0 && !firstDayIsToday) || (i === (data.list.length - 1) && firstDayIsToday)) {
      continue
    }

    forecast.push({
      day_label: (i === 0 || (!firstDayIsToday && i === 1)) ? todayLabelTranslated : moment.tz(data.list[i].dt * 1000, timeZone).format('ddd'),
      day_number: (i === 0 || (!firstDayIsToday && i === 1)) ? null : moment.tz(data.list[i].dt * 1000, timeZone).format('D'),
      condition_icon: (time === 'night' && (code === 800 || code === 951)) ? getMoonPhaseIcon() : getWeatherIcon(code, time),
      temp_max: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(data.list[i].temp.max) : kelvinToCelsius(data.list[i].temp.max),
      temp_min: (settings.units_temperature === 'fahrenheit') ? kelvinToFahrenheit(data.list[i].temp.min) : kelvinToCelsius(data.list[i].temp.min)
    })
  }

  return {
    hash_key: key,
    forecast: forecast
  }
}

export default {
  celsiusToFahrenheit,
  celsiusToKelvin,
  degreesToDirection,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  getMoonPhase,
  kelvinToCelsius,
  kelvinToFahrenheit,
  parseWeather,
  parseWeatherForecast,
  prepMenubarWeather,
  titleCase,
  getWeatherIcon,
  mpsToMph,
  getSceneTime
}
