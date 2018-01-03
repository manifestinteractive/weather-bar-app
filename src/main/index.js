'use strict'

import menubar from 'menubar'
// import AutoLaunch from 'auto-launch'

import { app, globalShortcut, Menu, ipcMain, shell } from 'electron'

// import autoUpdater from './auto-update'
import appMenu from './menu'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// let autoLaunch = true

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
  alwaysOnTop: true
})

mb.on('ready', function ready () {
  // autoUpdater()
  Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu))

  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (mb.window.isVisible()) {
      mb.window.hide()
    } else {
      mb.window.show()
    }
  })

  ipcMain.on('no-title', (event, args) => {
    mb.tray.setToolTip('Weather Bar')
    mb.tray.setTitle('')
  })

  ipcMain.on('set-title', (event, args) => {
    const temperature = Math.round(args.temperature) + '°'

    mb.tray.setToolTip(args.location + ' / ' + temperature)
    mb.tray.setTitle(temperature)

    if (process.platform === 'darwin') {
      mb.tray.setImage(path.join(__static, '/icons', args.icon + 'Template.png'))
    } else {
      mb.tray.setImage(path.join(__static, '/icons', args.icon + 'W.png'))
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
})
