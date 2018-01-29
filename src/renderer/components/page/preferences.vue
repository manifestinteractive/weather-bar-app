<template>
  <transition name="fade" mode="out-in">
    <div class="router-view preferences-page">
      <div class="page-content">
        <page-header v-bind:title="$t('app.menu.preferences')" />

        <div class="tab-set">
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

        <div class="tab-panels">

          <!-- APP TAB -->
          <div class="tab-panel" v-if="tab === 'app'">

            <h1 class="group-header first">Settings</h1>

            <!-- Language -->
            <div class="select-wrapper">
              <label for="app_language">{{ $t('app.language') }}</label>
              <select id="app_language" v-model="settings.app_language" @change="changeLanguage">
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
              <label for="app_always_on_top">Always on Top</label>
              <toggle-switch id="app_always_on_top"
                v-model="settings.app_always_on_top"
                :enabled.sync="settings.app_always_on_top"
                @togglePreference="togglePreference"
              />
            </div>

            <!-- Launch at Startup -->
            <div class="toggle-wrapper">
              <label for="app_launch_at_startup">Launch at Startup</label>
              <toggle-switch id="app_launch_at_startup"
                v-model="settings.app_launch_at_startup"
                :enabled.sync="settings.app_launch_at_startup"
                @togglePreference="togglePreference"
              />
            </div>

            <h1 class="group-header">Launch Icon</h1>

            <div class="toggle-wrapper" v-if="platform === 'darwin'">
              <label for="both">Condition &amp; Temperature</label>
              <radio-button id="both" name="app_launch_icon" option="both"
                v-model="settings.app_launch_icon"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="condition">Condition</label>
              <radio-button id="condition" name="app_launch_icon" option="condition"
                v-model="settings.app_launch_icon"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
              />
            </div>

            <div class="toggle-wrapper">
              <label for="temperature">Temperature</label>
              <radio-button id="temperature" name="app_launch_icon" option="temperature"
                v-model="settings.app_launch_icon"
                :enabled.sync="settings.app_launch_icon"
                @selectPreference="selectPreference"
              />
            </div>
          </div>

          <!-- LAYOUT TAB -->
          <div class="tab-panel" v-if="tab === 'layout'">
            <h1 class="group-header">Current Temperature</h1>

            <div class="toggle-wrapper">
              <label for="actual">Actual</label>
              <radio-button id="actual" name="layout_current_temp" option="actual"
                v-model="settings.layout_current_temp"
                :enabled.sync="settings.layout_current_temp"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="feels_like">Feels Like</label>
              <radio-button id="feels_like" name="layout_current_temp" option="feels_like"
                v-model="settings.layout_current_temp"
                :enabled.sync="settings.layout_current_temp"
                @selectPreference="selectPreference"
                />
            </div>

            <h1 class="group-header">Weather Map</h1>

            <div class="toggle-wrapper">
              <label for="standard">Standard</label>
              <radio-button id="standard" name="layout_weather_map" option="standard"
                v-model="settings.layout_weather_map"
                :enabled.sync="settings.layout_weather_map"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="satellite">Satellite</label>
              <radio-button id="satellite" name="layout_weather_map" option="satellite"
                v-model="settings.layout_weather_map"
                :enabled.sync="settings.layout_weather_map"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="hybrid">Hybrid</label>
              <radio-button id="hybrid" name="layout_weather_map" option="hybrid"
                v-model="settings.layout_weather_map"
                :enabled.sync="settings.layout_weather_map"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="black">Black</label>
              <radio-button id="black" name="layout_weather_map" option="black"
                v-model="settings.layout_weather_map"
                :enabled.sync="settings.layout_weather_map"
                @selectPreference="selectPreference"
                />
            </div>
          </div>

          <!-- UNITS TAB -->
          <div class="tab-panel" v-if="tab === 'units'">
            <h1 class="group-header">Temperature</h1>

            <div class="toggle-wrapper">
              <label for="fahrenheit">Fahrenheit</label>
              <radio-button id="fahrenheit" name="units_temperature" option="fahrenheit"
                v-model="settings.units_temperature"
                :enabled.sync="settings.units_temperature"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="celcius">Celcius</label>
              <radio-button id="celcius" name="units_temperature" option="celcius"
                v-model="settings.units_temperature"
                :enabled.sync="settings.units_temperature"
                @selectPreference="selectPreference"
                />
            </div>

            <h1 class="group-header">Time</h1>

            <div class="toggle-wrapper">
              <label for="12-hour">12 Hour</label>
              <radio-button id="12-hour" name="units_time" option="12-hour"
                v-model="settings.units_time"
                :enabled.sync="settings.units_time"
                @selectPreference="selectPreference"
                />
            </div>

            <div class="toggle-wrapper">
              <label for="24-hour">24 Hour</label>
              <radio-button id="24-hour" name="units_time" option="24-hour"
                v-model="settings.units_time"
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
.preferences-page {
  .page-content {
    z-index: 500;
    position: relative;
  }

  .scene {
    position: initial;
  }

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

<script>
  import Scene from '../ui/scene'
  import PageHeader from '../ui/page-header'
  import ToggleSwitch from '../ui/toggle-switch'
  import RadioButton from '../ui/radio-button'

  import api from '../../services/api'

  export default {
    name: 'preferences-page',
    data () {
      return {
        tab: 'app',
        platform: process.platform,
        settings: this.$store.getters.getSettings,
        random: (Math.floor(Math.random() * 10) + 1)
      }
    },
    methods: {
      changeLanguage () {
        this.$i18n.locale = this.settings.app_language
        this.$store.dispatch('updateSetting', {
          key: 'app_language',
          value: this.settings.app_language
        })
      },
      togglePreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.enabled !== 'undefined') {
          const data = {
            uuid: this.settings.uuid,
            key: preference.id,
            value: preference.enabled
          }

          api.updateUserSettings(data, (response) => {
            if (response.data) {
              this.$store.dispatch('updateSetting', {
                key: preference.id,
                value: preference.enabled
              })

              if (preference.id === 'app_always_on_top') {
                this.$electron.ipcRenderer.send('set-always-on-top', preference.enabled)
              }
            }
          })
        }
      },
      selectPreference (preference) {
        if (typeof preference.id !== 'undefined' && typeof preference.selected !== 'undefined') {
          this.$store.dispatch('updateSetting', {
            key: preference.id,
            value: preference.selected
          })
        }
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
