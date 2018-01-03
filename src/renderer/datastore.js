import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const cities = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/weather-bar-cities.db')
})

const settings = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/weather-bar-settings.db')
})

export default {
  cities,
  settings
}
