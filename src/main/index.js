'use strict'

import menubar from 'menubar'
import path from 'path'

import { app, globalShortcut, ipcMain, shell, Menu } from 'electron'

import autoUpdater from './auto-update'
// import { i18n as $t } from '../translations/i18n'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Unregister all shortcuts.
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Setup Main Weather Bar App
const mb = menubar({
  index: (process.env.NODE_ENV === 'development') ? 'http://localhost:9080' : `file://${__dirname}/index.html`,
  icon: path.join(__static, '/iconTemplate.png'),
  width: 280,
  height: 480,
  resizable: false,
  showDockIcon: false,
  preloadWindow: true,
  alwaysOnTop: true,
  backgroundColor: '#3a3f43'
})

mb.on('ready', function ready () {
  autoUpdater()

  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (mb.window.isVisible()) {
      mb.window.hide()
    } else {
      mb.window.show()
    }
  })

  const temp = 72

  if (process.platform === 'darwin') {
    mb.tray.setTitle(`${temp}°`)
    mb.tray.setImage(path.join(__static, '/weather-icons', 'wi-day-cloudy-highTemplate@2x.png'))
  } else {
    mb.tray.setImage(path.join(__static, '/weather-temps', `${temp}.png`))
  }

  ipcMain.on('set-weather', (event, args) => {
    const temperature = Math.round(args.temperature) + '°'

    mb.tray.setToolTip(args.location + ' / ' + temperature)
    mb.tray.setTitle(temperature)

    if (process.platform === 'darwin') {
      mb.tray.setImage(path.join(__static, '/weather-icons', args.icon + 'Template.png'))
    } else {
      mb.tray.setImage(path.join(__static, '/weather-icons', args.icon + 'W.png'))
    }
  })

  ipcMain.on('set-always-on-top', (event, args) => {
    console.log('set-always-on-top', args)
    mb.setOption('alwaysOnTop', args.enabled)
  })

  ipcMain.on('set-launch-at-startup', (event, args) => {
    console.log('set-launch-at-startup', args)
  })

  ipcMain.on('set-icon-preference', (event, args) => {
    console.log('set-icon-preference', args)

    if (args.preference === 'condition') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, '/weather-icons', 'wi-day-cloudy-highTemplate@2x.png'))
    } else if (args.preference === 'temperature') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, '/weather-temps', `${temp}.png`))
    } else if (args.preference === 'both') {
      if (process.platform === 'darwin') {
        mb.tray.setTitle(`${temp}°`)
        mb.tray.setImage(path.join(__static, '/weather-icons', 'wi-day-cloudy-highTemplate@2x.png'))
      } else {
        mb.tray.setImage(path.join(__static, '/weather-temps', `${temp}.png`))
      }
    }
  })

  ipcMain.on('close', (event, args) => {
    app.quit()
  })

  ipcMain.on('will-navigate', (event, args) => {
    const url = args.url
    shell.openExternal(url)
  })
})

// Add Context Menu to Weather Bar App
mb.on('after-create-window', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Reload Weather',
      click () {
        mb.window.send('reload-weather')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    }, {
      label: 'Settings',
      click () {
        mb.window.send('toggle-settings')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      click () {
        mb.app.quit()
      }
    }
  ])

  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu)
  })

  mb.tray.on('click', () => {
    if (mb.window.isVisible()) {
      mb.window.send('app-opened')
    } else {
      mb.window.send('app-closed')
    }
  })
})
