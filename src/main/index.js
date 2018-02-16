'use strict'

import menubar from 'menubar'
import path from 'path'
import { machineIdSync } from 'node-machine-id'

import { app, globalShortcut, ipcMain, shell, Menu, dialog } from 'electron'

import autoUpdater from './auto-update'
import util from './util'
import { version as currentVersion } from '../../package.json'

const machineId = machineIdSync({ original: true })

let appSettings = {}

// Set `__static` path to static files in production
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

// Setup Main Weather Bar App
const mb = menubar({
  index: (process.env.NODE_ENV === 'development') ? 'http://localhost:9080' : `file://${__dirname}/index.html`,
  icon: path.join(__static, '/iconTemplate.png'),
  width: 280,
  height: 480,
  alwaysOnTop: true,
  title: 'Menu Bar',
  preloadWindow: true,
  resizable: false
})

mb.on('ready', function ready () {
  autoUpdater()

  mb.setOption('title', 'Weather Bar')

  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (mb.window.isVisible()) {
      mb.window.hide()
    } else {
      mb.window.show()
    }
  })

  ipcMain.on('save-settings', (event, settings) => {
    appSettings = settings
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

  ipcMain.on('set-launch-at-startup', (event, preference) => {
    console.log('set-launch-at-startup', preference)
  })

  ipcMain.on('set-icon-preference', (event, preference) => {
    console.log('set-icon-preference', preference)
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
    }
  }
})

// Add Context Menu to Weather Bar App
mb.on('after-create-window', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'About Weather Bar',
      click () {
        dialog.showMessageBox(null, {
          type: 'none',
          icon: path.join(__static, '/logo.png'),
          message: `Weather Bar v${currentVersion}`,
          detail: 'Weather Bar is an Open Source Application created by Peter Schmalfeldt.',
          buttons: ['Close', 'Website'],
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
      label: `Version ${currentVersion}`,
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: 'Preferences...',
      accelerator: 'Cmd+,',
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
      label: 'Weather Bar Website',
      click () {
        shell.openExternal('https://weatherbarapp.com')
      }
    },
    {
      label: 'License Agreement',
      click () {
        shell.openExternal('https://github.com/manifestinteractive/weather-bar-app/blob/master/LICENSE')
      }
    },
    {
      label: 'Contact Support',
      click () {
        shell.openExternal('https://github.com/manifestinteractive/weather-bar-app/issues')
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Local Weather',
      accelerator: 'Cmd+L',
      click () {
        mb.window.send('go-to-local-weather')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      label: 'Saved Locations',
      accelerator: 'Cmd+S',
      click () {
        mb.window.send('go-to-saved-locations')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      label: 'New Location',
      accelerator: 'Cmd+N',
      click () {
        mb.window.send('go-to-new-location')
        if (!mb.window.isVisible()) {
          mb.showWindow()
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Developer Tools',
      accelerator: 'Cmd+Alt+I',
      click () {
        mb.window.webContents.openDevTools()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit Weather Bar',
      accelerator: 'Cmd+Q',
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
