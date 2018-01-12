<template>
  <transition name="fade" mode="out-in">
    <div class="router-view preferences-page">
      <page-header v-bind:title="$t('app.menu.preferences')" />

      <div class="tab-set" v-if="fetched">
        <a class="tab" :class="{ active: tab === 'app' }" @click.prevent="tab = 'app'">
          App
        </a>
        <a class="tab" :class="{ active: tab === 'layout' }" @click.prevent="tab = 'layout'">
          Layout
        </a>
        <a class="tab" :class="{ active: tab === 'units' }" @click.prevent="tab = 'units'">
          Units
        </a>
      </div>

      <div class="tab-panels" v-if="fetched">

        <!-- APP TAB -->
        <div class="tab-panel" v-if="tab === 'app'">

          <h1 class="group-header first">Settings</h1>

          <!-- Language -->
          <div class="select-wrapper">
            <label for="locale">{{ $t('app.language') }}</label>
            <select id="locale" v-model="settings.locale" @change="changeLanguage">
              <option value="ar">العربية</option> <!-- Arabic -->
              <option value="de">Deutsch</option> <!-- German -->
              <option value="en">English</option> <!-- English -->
              <option value="es">Español</option> <!-- Spanish -->
              <option value="fr">Français</option> <!-- French -->
              <option value="ja">日本語&nbsp;(にほんご)</option> <!-- Japanese -->
              <option value="ms">Bahasa Melayu</option> <!-- Malay -->
              <option value="pt">Português</option> <!-- Portuguese -->
              <option value="ru">русский язык</option> <!-- Russian -->
              <option value="zh">中文 (Zhōngwén)</option> <!-- Chinese -->
            </select>
          </div>

          <!-- Always on Top -->
          <div class="toggle-wrapper">
            <label for="alwaysOnTop">Always on Top</label>
            <toggle-switch id="alwaysOnTop" v-model="settings.alwaysOnTop" :enabled.sync="settings.alwaysOnTop" @togglePreference="togglePreference" />
          </div>

          <!-- Launch at Startup -->
          <div class="toggle-wrapper">
            <label for="launchAtStartup">Launch at Startup</label>
            <toggle-switch id="launchAtStartup"
              v-model="settings.launchAtStartup"
              :enabled.sync="settings.launchAtStartup"
              @togglePreference="togglePreference"
            />
          </div>

          <h1 class="group-header">Launch Icon</h1>

          <div class="toggle-wrapper" v-if="platform === 'darwin'">
            <label for="both">Condition &amp; Temperature</label>
            <radio-button id="both" name="launchIcon" option="both"
              v-model="settings.launchIcon"
              :enabled.sync="settings.launchIcon"
              @selectPreference="selectPreference"
              />
          </div>

          <div class="toggle-wrapper">
            <label for="condition">Condition</label>
            <radio-button id="condition" name="launchIcon" option="condition"
              v-model="settings.launchIcon"
              :enabled.sync="settings.launchIcon"
              @selectPreference="selectPreference"
            />
          </div>

          <div class="toggle-wrapper">
            <label for="temperature">Temperature</label>
            <radio-button id="temperature" name="launchIcon" option="temperature"
              v-model="settings.launchIcon"
              :enabled.sync="settings.launchIcon"
              @selectPreference="selectPreference"
            />
          </div>
        </div>

        <!-- LAYOUT TAB -->
        <div class="tab-panel" v-if="tab === 'layout'">

        </div>

        <!-- UNITS TAB -->
        <div class="tab-panel" v-if="tab === 'units'">

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import PageHeader from '../ui/page-header'
  import ToggleSwitch from '../ui/toggle-switch'
  import RadioButton from '../ui/radio-button'

  export default {
    name: 'preferences-page',
    data () {
      return {
        tab: 'app',
        fetched: false,
        platform: process.platform,
        settings: {
          launchAtStartup: false,
          alwaysOnTop: false,
          locale: this.$i18n.locale,
          launchIcon: (process.platform === 'darwin') ? 'both' : 'temperature'
        }
      }
    },
    mounted () {
      this.fetchSettings()
    },
    methods: {
      fetchSettings () {
        this.$db.settings.find({}, (err, settings) => {
          if (!err) {
            settings.forEach((item) => {
              this.settings[item.setting] = item.value
            })
            this.fetched = true
          }
        })
      },
      changeLanguage () {
        this.$i18n.locale = this.settings.locale

        this.$db.settings.update({ setting: 'locale' }, { setting: 'locale', value: this.settings.locale }, { upsert: true }, (err, replaced, upsert) => {
          if (err) {
            console.error('Unable to Save Locale', err)
          }
        })
      },
      togglePreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.enabled !== 'undefined') {
          this.settings[preference.id] = preference.enabled

          this.$db.settings.update({ setting: preference.id }, { setting: preference.id, value: preference.enabled }, { upsert: true }, (err, replaced, upsert) => {
            if (err) {
              console.error('Unable to Save Preference', err)
            }

            if (preference.id === 'alwaysOnTop') {
              this.$electron.ipcRenderer.send('set-always-on-top', {
                enabled: preference.enabled
              })
            }

            if (preference.id === 'launchAtStartup') {
              this.$electron.ipcRenderer.send('set-launch-at-startup', {
                enabled: preference.enabled
              })
            }
          })
        }
      },
      selectPreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.selected !== 'undefined') {
          this.settings[preference.id] = preference.selected

          this.$db.settings.update({ setting: preference.id }, { setting: preference.id, value: preference.selected }, { upsert: true }, (err, replaced, upsert) => {
            if (err) {
              console.error('Unable to Save Preference', err)
            }

            if (preference.id === 'launchIcon') {
              this.$electron.ipcRenderer.send('set-icon-preference', {
                preference: preference.selected
              })
            }
          })
        }
      }
    },
    components: {
      PageHeader,
      ToggleSwitch,
      RadioButton
    }
  }
</script>

<style lang="scss">
.preferences-page {
  background: url(../../../../static/images/preferences-bg.jpg) center center;
  background-size: cover;

  .group-header {
    text-transform: uppercase;
    font-size: 14px;
    margin: 30px 0 10px 0;
    font-weight: 300;
    color: $logo-blue;

    &.first {
      margin-top: 15px;
    }
  }

  .tab-set {
    height: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    text-transform: uppercase;

    .tab {
      border-bottom: 3px solid transparent;
      width: 32%;
      text-align: center;
      display: inline-block;
      line-height: 36px;
      transition: all 0.25s ease-in-out;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 300;
      font-size: 14px;

      &.active {
        border-bottom: 3px solid $logo-blue;
        color: rgba(255, 255, 255, 1);
        font-weight: 400;
      }
    }
  }

  .tab-panels {
    padding: 10px 20px 0 20px;

    .toggle-wrapper, .select-wrapper {
      position: relative;
      line-height: 36px;
      font-size: 14px;
      height: 36px;

      label {
        cursor: pointer;
      }

      select, .toggle-switch, .radio-button {
        float: right;
        margin-top: 10px;
      }
    }
  }
}
</style>
