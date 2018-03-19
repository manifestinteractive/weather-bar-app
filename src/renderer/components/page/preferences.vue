<template>
  <transition name="fade" mode="out-in">
    <div class="router-view preference">
      <div class="page-content">
        <page-header v-bind:title="$t('app.menu.preferences')" />

        <div class="tab-set" role="tablist">
          <button id="tab-app" class="tab" :class="{ active: tab === 'app' }" @click="changeTab('app')" role="tab" aria-controls="tab-app-panel" :aria-selected="tab === 'app' ? 'true' : 'false'" tabindex="6">
            {{ $t('page.preferences.app') }}
          </button>
          <button id="tab-layout" class="tab" :class="{ active: tab === 'layout' }" @click="changeTab('layout')" role="tab" aria-controls="tab-layout-panel" :aria-selected="tab === 'layout' ? 'true' : 'false'" tabindex="7">
            {{ $t('page.preferences.layout') }}
          </button>
          <button id="tab-units" class="tab" :class="{ active: tab === 'units' }" @click="changeTab('units')" role="tab" aria-controls="tab-units-panel" :aria-selected="tab === 'units' ? 'true' : 'false'" tabindex="8">
            {{ $t('page.preferences.units') }}
          </button>
        </div>

        <div class="tab-panels">

          <!-- APP TAB -->
          <div id="tab-app-panel" role="tabpanel" class="tab-panel" v-show="tab === 'app'" aria-labelledby="tab-app" :aria-hidden="tab === 'app' ? 'true' : 'false'">

            <h1 class="group-header first">{{ $t('page.preferences.settings') }}</h1>

            <!-- Language -->
            <div class="select-wrapper">
              <label for="app_language">{{ $t('page.preferences.language') }}</label>
              <select id="app_language" v-model="settings.app_language" @change="changeLanguage" tabindex="9">
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
              <label for="app_always_on_top">{{ $t('page.preferences.alwaysOnTop') }}</label>
              <toggle-switch id="app_always_on_top" tabindex="10"
                v-model="settings.app_always_on_top"
                :enabled.sync="settings.app_always_on_top"
                @togglePreference="togglePreference"
              />
            </div>

            <!-- Launch at Startup -->
            <div class="toggle-wrapper">
              <label for="app_launch_at_startup">{{ $t('page.preferences.launchAtStartup') }}</label>
              <toggle-switch id="app_launch_at_startup" tabindex="11"
                v-model="settings.app_launch_at_startup"
                :enabled.sync="settings.app_launch_at_startup"
                @togglePreference="togglePreference"
              />
            </div>

            <h1 class="group-header margin-top">{{ $t('page.preferences.launchIcon') }}</h1>

            <div class="toggle-wrapper" v-if="platform === 'darwin'">
              <label for="both">{{ $t('page.preferences.both') }}</label>
              <radio-button id="both" name="app_launch_icon" option="both" tabindex="12"
                v-model="settings.app_launch_icon"
                :current="options.app_launch_icon === 'both'"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="temperature">{{ $t('page.preferences.temperature') }}</label>
              <radio-button id="temperature" name="app_launch_icon" option="temperature" tabindex="13"
                v-model="settings.app_launch_icon"
                :current="options.app_launch_icon === 'temperature'"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
              />
            </div>

            <div class="toggle-wrapper">
              <label for="condition">{{ $t('page.preferences.condition') }}</label>
              <radio-button id="condition" name="app_launch_icon" option="condition" tabindex="14"
                v-model="settings.app_launch_icon"
                :current="options.app_launch_icon === 'condition'"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
              />
            </div>
          </div>

          <!-- LAYOUT TAB -->
          <div id="tab-layout-panel" role="tabpanel" class="tab-panel" v-show="tab === 'layout'" aria-labelledby="tab-layout" :aria-hidden="tab === 'layout' ? 'true' : 'false'">
            <h1 class="group-header">{{ $t('page.preferences.currentTemp') }}</h1>

            <div class="toggle-wrapper">
              <label for="actual">{{ $t('page.preferences.actual') }}</label>
              <radio-button id="actual" name="layout_current_temp" option="actual" tabindex="9"
                v-model="settings.layout_current_temp"
                :current="options.layout_current_temp === 'actual'"
                :enabled.sync="settings.layout_current_temp"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="feels_like">{{ $t('page.preferences.feelsLike') }}</label>
              <radio-button id="feels_like" name="layout_current_temp" option="feels_like" tabindex="10"
                v-model="settings.layout_current_temp"
                :current="options.layout_current_temp === 'feels_like'"
                :enabled.sync="settings.layout_current_temp"
                @selectPreference="selectPreference"
                />
            </div>

          </div>

          <!-- UNITS TAB -->
          <div id="tab-units-panel" role="tabpanel" class="tab-panel" v-show="tab === 'units'" aria-labelledby="tab-units" :aria-hidden="tab === 'units' ? 'true' : 'false'">
            <h1 class="group-header">{{ $t('page.preferences.temperature') }}</h1>

            <div class="toggle-wrapper">
              <label for="fahrenheit">{{ $t('page.preferences.fahrenheit') }}</label>
              <radio-button id="fahrenheit" name="units_temperature" option="fahrenheit" tabindex="9"
                v-model="settings.units_temperature"
                :current="options.units_time === 'fahrenheit'"
                :enabled.sync="settings.units_temperature"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="celsius">{{ $t('page.preferences.celsius') }}</label>
              <radio-button id="celsius" name="units_temperature" option="celsius" tabindex="10"
                v-model="settings.units_temperature"
                :current="options.units_time === 'celsius'"
                :enabled.sync="settings.units_temperature"
                @selectPreference="selectPreference"
                />
            </div>

            <h1 class="group-header margin-top">{{ $t('page.preferences.time') }}</h1>

            <div class="toggle-wrapper">
              <label for="twelve_hour">{{ $t('page.preferences.twelveHour') }}</label>
              <radio-button id="twelve_hour" name="units_time" option="twelve_hour" tabindex="11"
                v-model="settings.units_time"
                :current="options.units_time === 'twelve_hour'"
                :enabled.sync="settings.units_time"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="twenty_four_hour">{{ $t('page.preferences.twentyFourHour') }}</label>
              <radio-button id="twenty_four_hour" name="units_time" option="twenty_four_hour" tabindex="12"
                v-model="settings.units_time"
                :current="options.units_time === 'twenty_four_hour'"
                :enabled.sync="settings.units_time"
                @selectPreference="selectPreference"
                />
            </div>
          </div>
        </div>
      </div>

      <scene :stars='true' :clouds='true' :version='random' />
    </div>
  </transition>
</template>

<style lang="scss">
.preference {
  .page-content {
    z-index: 500;
    position: absolute;
    height: 480px;
    width: 280px;
  }

  .scene {
    position: initial;
  }

  .group-header {
    text-transform: uppercase;
    font-size: 14px;
    margin: 15px 0 10px 0;
    font-weight: 300;
    color: $logo-blue;

    &.margin-top {
      margin-top: 30px;
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
      transition: border 0.25s ease-in-out, color 0.25s ease-in-out;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 300;
      font-size: 14px;
      background: transparent;
      border: none;
      -webkit-appearance: none;

      &.active {
        border-bottom: 3px solid $logo-blue;
        color: rgba(255, 255, 255, 1);
        font-weight: 400;
      }

      &:focus {
        outline: 1px solid rgba(255, 255, 255, 0.25);
        outline-offset: -1px;
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

<script>
  import Scene from '../ui/scene'
  import PageHeader from '../ui/page-header'
  import ToggleSwitch from '../ui/toggle-switch'
  import RadioButton from '../ui/radio-button'

  import api from '../../services/api'

  import { EventBus } from '../../event-bus'

  export default {
    name: 'preference',
    data () {
      return {
        tab: 'app',
        platform: process.platform,
        settings: Object.assign({}, this.$store.getters.getSettings),
        options: {},
        random: (Math.floor(Math.random() * 10) + 1)
      }
    },
    mounted () {
      this.options = Object.assign({}, this.$store.getters.getSettings)
    },
    methods: {
      changeLanguage () {
        this.$i18n.locale = this.settings.app_language
        this.savePreference('app_language', this.settings.app_language)
      },
      changeTab (tab) {
        this.tab = tab
      },
      togglePreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.enabled !== 'undefined') {
          this.savePreference(preference.id, preference.enabled)
        }
      },
      selectPreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.selected !== 'undefined') {
          this.savePreference(preference.id, preference.selected)
        }
      },
      savePreference (key, value) {
        const data = {
          uuid: this.settings.uuid,
          key: key,
          value: value
        }

        api.updateUserSettings(data, (response) => {
          if (response.data) {
            this.$store.dispatch('updateSetting', { key: key, value: value })
            this.$electron.ipcRenderer.send('save-setting', key, value)
            this.options[key] = value

            EventBus.$emit('updatedSettings')

            if (key === 'app_always_on_top') {
              this.$electron.ipcRenderer.send('set-always-on-top', value)
            }
          }
        })
      }
    },
    components: {
      Scene,
      PageHeader,
      ToggleSwitch,
      RadioButton
    }
  }
</script>
