import path from 'path'

const setWeather = (mb, data) => {
  if (process.platform === 'darwin') {
    if (data.setting === 'condition') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.image}Template.png`))
    } else if (data.setting === 'temperature') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.title}Template.png`))
    } else {
      mb.tray.setTitle(`${data.title}°`)
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.image}Template.png`))
    }
  } else if (process.platform === 'win32') {
    if (data.setting === 'condition') {
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.image}.ico`))
    } else {
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.title}.png`))
    }
  } else {
    if (data.setting === 'condition') {
      mb.tray.setImage(path.join(__static, `/weather-icons/${data.folder}`, `${data.image}.png`))
    } else {
      mb.tray.setImage(path.join(__static, '/weather-temps', `${data.title}.png`))
    }
  }

  if (process.platform !== 'linux') {
    if (data.tooltip) {
      mb.tray.setToolTip(data.tooltip)
    } else {
      mb.tray.setToolTip(`${data.title}°`)
    }
  }
}

const getAppIcon = () => {
  if (process.platform === 'darwin') {
    return path.join(__static, 'iconTemplate.png')
  } else if (process.platform === 'win32') {
    return path.join(__static, 'icon.ico')
  } else {
    return mb.tray.setImage(path.join(__static, 'icon.png')
  }
}

export default {
  setWeather,
  getAppIcon
}
