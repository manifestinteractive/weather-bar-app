import path from 'path'

const setWeather = (mb, data, settings) => {
  if (process.platform === 'darwin') {
    mb.tray.setTitle(`${data.temperature}°`)
    mb.tray.setImage(path.join(__static, '/weather-icons', `${data.condition}Template@2x.png`))
  } else {
    mb.tray.setImage(path.join(__static, '/weather-temps', `${data.temperature}.png`))
  }

  if (data.tooltip) {
    mb.tray.setToolTip(data.tooltip)
  } else {
    mb.tray.setToolTip(`${data.temperature}°`)
  }
}

export default {
  setWeather
}
