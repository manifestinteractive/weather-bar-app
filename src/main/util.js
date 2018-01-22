import path from 'path'

const setWeather = (mb, data, settings) => {
  if (process.platform === 'darwin') {
    if (settings.app_launch_icon === 'condition') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.id}Template.png`))
    } else if (settings.app_launch_icon === 'temperature') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.temperature}Template.png`))
    } else {
      mb.tray.setTitle(`${data.temperature}°`)
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.id}Template.png`))
    }
  } else if (process.platform === 'win32') {
    if (settings.app_launch_icon === 'condition') {
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.id}.ico`))
    } else {
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.temperature}.png`))
    }
  } else {
    if (settings.app_launch_icon === 'condition') {
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.id}.png`))
    } else {
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.temperature}.png`))
    }
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
