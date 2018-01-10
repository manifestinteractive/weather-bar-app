import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

/**
 * Persistent Storage for App Settings
 *
 * @example { cityId: Number, cityName: String, weather: Object, lastUpdated: Date }
 * @type {Datastore}
 */
const cities = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/weather-bar-cities.db')
})

/**
 * Persistent Storage for App Settings
 *
 * @example { setting: String, value: String }
 * @type {Datastore}
 */
const settings = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/weather-bar-settings.db')
})

export default {
  cities,
  settings
}
