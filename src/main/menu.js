import { app } from 'electron'

// Menu template and shortcuts
const appMenu = [
  {
    label: 'Weather Bar',
    submenu: [
      {
        label: 'About Weather Bar',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
          app.quit()
        }
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload()
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (process.platform === 'darwin') ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      }
    ]
  }, {
    label: 'Actions',
    submenu: [
      {
        label: 'Settings',
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('toggle-settings')
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Reload Data',
        accelerator: 'CmdOrCtrl+E',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('reload-data')
          }
        }
      }
    ]
  }
]

export default appMenu
