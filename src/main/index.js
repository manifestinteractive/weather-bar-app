'use strict'

import menubar from 'menubar'
import path from 'path'
import { machineIdSync } from 'node-machine-id'

import { app, globalShortcut, ipcMain, shell, Menu, dialog } from 'electron'

import autoUpdater from './auto-update'
import util from './util'
import { version as currentVersion } from '../../package.json'

import { i18n as $t } from '../translations/i18n'

const machineId = machineIdSync({ original: true })

let appSettings = {}

// Set `__static` path to static files in production
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// Force close multiple instances
const shouldExit = app.makeSingleInstance(() => {
  process.nextTick(() => app.exit(0))
})

if (shouldExit) {
  app.exit(1)
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

// Secure Application for Unknown Network Requests
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false
    webPreferences.contextIsolation = true

    // Prevent Requests to Unknown Hosts
    if (!params.src.startsWith('http://127.0.0.1/') || !params.src.startsWith('https://api.weatherbarapp.com/') || !params.src.startsWith('https://ip.weatherbarapp.com/')) {
      event.preventDefault()
    }
  })
})

// Setup Context Menu
let contextMenu = null

// Setup Main Weather Bar App
const mb = menubar({
  index: (process.env.NODE_ENV === 'development') ? 'http://localhost:9080' : `file://${__dirname}/index.html`,
  icon: util.getAppIcon(),
  width: 280,
  height: 480,
  alwaysOnTop: true,
  title: $t(appSettings.app_language, 'app.title'),
  preloadWindow: true,
  resizable: false,
  backgroundColor: '#2a3641'
})

const makeMenu = () => {
  return Menu.buildFromTemplate([
    {
      label: $t(appSettings.app_language, 'context.menu.about'),
      click () {
        dialog.showMessageBox(null, {
          type: 'none',
          icon: path.join(__static, '/logo.png'),
          message: `Weather Bar v${currentVersion}`,
          detail: $t(appSettings.app_language, 'context.menu.dialog.detail'),
          buttons: [
            $t(appSettings.app_language, 'context.menu.dialog.close'),
            $t(appSettings.app_language, 'context.menu.dialog.website')
          ],
          defaultId: 0,
          noLink: true
        }, (selected) => {
          if (selected === 1) {
            shell.openExternal('https://weatherbarapp.com')
          }
        })
      }
    },
    {
      label: $t(appSettings.app_language, 'context.menu.version', { version: currentVersion }),
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: $t(appSettings.app_language, 'context.menu.website'),
      click () {
        shell.openExternal('https://weatherbarapp.com')
      }
    },
    {
      label: $t(appSettings.app_language, 'context.menu.license'),
      click () {
        shell.openExternal('https://github.com/manifestinteractive/weather-bar-app/blob/master/LICENSE')
      }
    },
    {
      label: $t(appSettings.app_language, 'context.menu.support'),
      click () {
        shell.openExternal('https://github.com/manifestinteractive/weather-bar-app/issues')
      }
    },
    {
      type: 'separator'
    },
    {
      label: $t(appSettings.app_language, 'app.menu.primaryLocation'),
      click () {
        mb.window.send('go-to-local-weather')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      label: $t(appSettings.app_language, 'app.menu.savedLocations'),
      click () {
        mb.window.send('go-to-saved-locations')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      label: $t(appSettings.app_language, 'app.menu.newLocation'),
      click () {
        mb.window.send('go-to-new-location')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      label: $t(appSettings.app_language, 'app.menu.preferences'),
      click () {
        mb.window.send('go-to-preferences')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: $t(appSettings.app_language, 'context.menu.quit'),
      click () {
        mb.app.quit()
      }
    }
  ])
}

mb.on('ready', function ready () {
  autoUpdater()

  mb.setOption('title', $t(appSettings.app_language, 'app.title'))

  mb.window.on('focus', () => {
    if (process.platform === 'darwin') {
      mb.tray.setHighlightMode('always')
    }
  })

  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (mb.window.isVisible()) {
      mb.window.hide()
    } else {
      mb.window.show()
    }
  })

  ipcMain.on('app-error', (event) => {
    if (process.platform === 'darwin') {
      mb.tray.setTitle('')
      mb.tray.setImage(path.join(__static, '/mac/errorTemplate.png'))
    } else if (process.platform === 'win32') {
      mb.tray.setImage(path.join(__static, '/win/error.ico'))
    } else {
      mb.tray.setImage(path.join(__static, '/linux/error.png'))
    }
  })

  ipcMain.on('save-settings', (event, settings) => {
    if (settings.app_launch_at_startup) {
      util.enableAutoLaunch(app)
    } else if (!settings.app_launch_at_startup) {
      util.disableAutoLaunch(app)
    }

    appSettings = settings
    contextMenu = makeMenu()
  })

  ipcMain.on('save-setting', (event, key, value) => {
    appSettings[key] = value
    contextMenu = makeMenu()
  })

  ipcMain.on('get-uuid', (event) => {
    mb.window.send('set-uuid', machineId)
  })

  ipcMain.on('set-weather', (event, weather, settings) => {
    util.setWeather(mb, weather, settings)
  })

  ipcMain.on('set-always-on-top', (event, preference) => {
    mb.setOption('alwaysOnTop', preference)
    appSettings.app_always_on_top = preference
  })

  ipcMain.on('close', (event, args) => {
    app.quit()
  })

  ipcMain.on('will-navigate', (event, args) => {
    const url = args.url
    shell.openExternal(url)
  })
})

mb.on('focus-lost', () => {
  if (!appSettings.app_always_on_top) {
    if (mb.window.isVisible()) {
      mb.window.hide()
      if (process.platform === 'darwin') {
        mb.tray.setHighlightMode('never')
      }
    }
  }
})

// Add Context Menu to Weather Bar App
mb.on('after-create-window', () => {
  contextMenu = makeMenu()

  if (process.platform !== 'linux') {
    mb.tray.on('right-click', () => {
      mb.tray.popUpContextMenu(contextMenu)
    })
  } else {
    mb.tray.setToolTip($t(appSettings.app_language, 'context.menu.toggle'))
  }

  mb.tray.on('click', () => {
    if (mb.window.isVisible()) {
      mb.window.send('app-opened')
      mb.window.show()
    } else {
      mb.window.send('app-closed')
      mb.window.hide()
    }
  })
})
