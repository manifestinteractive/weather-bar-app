import path from 'path'
import { AutoLaunch } from 'auto-launch'

const setWeather = (mb, data, settings) => {
  if (process.platform === 'darwin') {
    if (data.setting === 'condition') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, `/mac/weather-icons/${data.folder}`, `${data.image}Template.png`))
    } else if (data.setting === 'temperature') {
      mb.tray.setTitle(`${data.title}°`)
      mb.tray.setImage(path.join(__static, '/mac/transparent.png'))
    } else {
      mb.tray.setTitle(`${data.title}°`)
      mb.tray.setImage(path.join(__static, `/mac/weather-icons/${data.folder}`, `${data.image}Template.png`))
    }
  } else if (process.platform === 'win32') {
    if (data.setting === 'condition') {
      mb.tray.setImage(path.join(__static, `/win/weather-icons/${data.folder}`, `${data.image}.ico`))
    } else {
      mb.tray.setImage(path.join(__static, '/win/weather-temps', `${data.title}.ico`))
    }
  } else {
    if (data.setting === 'condition') {
      mb.tray.setImage(path.join(__static, `/linux/weather-icons/${data.folder}`, `${data.image}.png`))
    } else {
      mb.tray.setImage(path.join(__static, '/linux/weather-temps', `${data.title}.png`))
    }
  }

  if (process.platform !== 'linux' && data.tooltip) {
    mb.tray.setToolTip(data.tooltip)
  }
}

const getAppIcon = () => {
  if (process.platform === 'darwin') {
    return path.join(__static, '/mac/iconTemplate.png')
  } else if (process.platform === 'win32') {
    return path.join(__static, '/win/icon.ico')
  } else {
    return path.join(__static, '/linux/icon.png')
  }
}

const enableAutoLaunch = (app) => {
  if (process.platform !== 'linux') {
    app.setLoginItemSettings({
      openAtLogin: true
    })
  } else {
    const autoLauncher = new AutoLaunch({
      name: 'Weather Bar',
      path: process.execPath,
      isHidden: true
    })

    autoLauncher.isEnabled().then((enabled) => {
      if (enabled) {
        return
      }
      return autoLauncher.enable()
    }).then((err) => {
      console.log(err)
    })

    autoLauncher.enable()
  }
}

const disableAutoLaunch = (app) => {
  if (process.platform !== 'linux') {
    app.setLoginItemSettings({
      openAtLogin: false
    })
  } else {
    const autoLauncher = new AutoLaunch({
      name: 'Weather Bar',
      path: process.execPath,
      isHidden: true
    })

    autoLauncher.isEnabled().then((enabled) => {
      if (!enabled) {
        return
      }
      return autoLauncher.disable()
    }).then((err) => {
      console.log(err)
    })

    autoLauncher.disable()
  }
}

export default {
  setWeather,
  getAppIcon,
  enableAutoLaunch,
  disableAutoLaunch
}
