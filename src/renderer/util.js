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

export default {
  celsiusToFahrenheit,
  celsiusToKelvin,
  fahrenheitToCelcius,
  fahrenheitToKelvin,
  kelvinToCelcius,
  kelvinToFahrenheit,
  titleCase
}
