import Datastore from 'nedb'

const cities = new Datastore({
  autoload: true,
  filename: 'static/db/weather-bar-cities.db'
})

const settings = new Datastore({
  autoload: true,
  filename: 'static/db/weather-bar-settings.db'
})

export default {
  cities,
  settings
}
