import path from 'path'
import semver from 'semver'
import superagent from 'superagent'

import { dialog, shell } from 'electron'
import { version as currentVersion } from '../../package.json'
import { i18n as $t } from '../translations/i18n'

export default function autoUpdater () {
  superagent.get('https://raw.githubusercontent.com/manifestinteractive/weather-bar-app/master/package.json').end((err, res) => {
    if (!err && res && res.ok) {
      try {
        const newVersion = JSON.parse(res.text).version
        if (semver.gt(newVersion, currentVersion)) {
          const confirm = dialog.showMessageBox({
            type: 'info',
            message: $t('autoUpdate.message'),
            detail: $t('autoUpdate.detail', { version: newVersion }),
            icon: path.join(__static, '/logo.png'),
            buttons: [
              $t('autoUpdate.buttons.yes'),
              $t('autoUpdate.buttons.no')
            ]
          })
          if (confirm === 0) {
            shell.openExternal('https://weatherbarapp.com/#download')
          }
        }
      } catch (error) {}
    }
  })
}
