import electron from 'electron'
import deepmerge from 'deepmerge'

// Load shared Electron / Vue i18n languages
import enLocale from './en.js'

// Define Supported Languages for Electron
const supportedLanguges = ['en']

// Merge all the language files
const messages = deepmerge.all([enLocale])

// Figure out which language for Electron to use
const app = electron.app ? electron.app : electron.remote.app
const locale = app.getLocale().substring(0, 2)

// Fallback on English if we don't support users language
if (supportedLanguges.indexOf(locale) === -1) {
  locale = 'en'
}

// Setup Electron Translation Key Fetching
const getKey = (key) => {
  let translation = key.split('.').reduce((o, i) => o[i], messages[locale])
  if (translation === undefined) {
    translation = key
  }
  return translation
}

export default {
  get: getKey
}
