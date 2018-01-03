import superagent from 'superagent'
import { dialog } from 'electron'

const autoUpdater = function() {
  superagent.get('https://raw.githubusercontent.com/manifestinteractive/weather-bar-app/master/package.json').end(function(err, res) {
    if (err || !res.ok) {
      console.log(err)
    } else {
      try {
        const newVersion = JSON.parse(res.text).version
        const oldVersion = config.version
        if (semver.gt(newVersion, oldVersion)) {
          const confirm = dialog.showMessageBox({
            type: 'info',
            message: 'A new version ' + newVersion + ' of Weather Bar is available.',
            detail: 'Do you want to download it now?',
            buttons: ['Yes', 'No']
          })
          if (confirm === 0) {
            shell.openExternal('https://weatherbarapp.com/#download')
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  })
}
