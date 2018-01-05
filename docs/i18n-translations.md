**[↤ Developer Overview](../README.md#developer-overview)**

i18n Translations
===

Electon.js and Vue.js are setup to pull the i18n language translations from `./src/translations`.

Updating Translations
---

Each translation file is setup using the lowercase two letter `ISO 639-1 Code` for each supported language.  You can use mustache syntax within a message to create template keys to pass data into, just be sure not to translate the english template keys as they will need to remain the same across all language files.  In the examples below, `{temp}` is setup to pass the current temperature in.

English (EN):`./src/translations/en.js`

```js
export default {
  en: {
    weather: {
      current: 'Currently {temp}°'
    }
  }
}
```

Japanese (JA): `./src/translations/ja.js`

```js
export default {
  ja: {
    weather: {
      current: '現在 {temp}°'
    }
  }
}
```

Using translations
---

Both Electron and Vue use the same method `$t('key')` to load a template file.  Use `dot syntax` to reference nested translations.  This allows you to group similar parts of the application within its own grouping.  Using the examples above, if you wanted to use the `current` property of `weather`, you would just use `$t('weather.current')`.

You can also pass in custom template parameters via an object with key value pairs.  See the examples below:

#### Electron's `main` & `renderer` files

```js
$t('weather.current', { temp: 39 })
```

#### Component.vue files

```
<p>{{ $t('weather.current', { temp: 39 }) }}</p>
```
