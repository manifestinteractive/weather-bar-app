<template>
  <transition name="fade" mode="out-in">
    <div class="router-view preferences-page">
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

        </div>

        <!-- UNITS TAB -->
        <div class="tab-panel" v-if="tab === 'units'">

        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.preferences-page {
  background: url(~@/assets/images/preferences-bg.jpg) center center;
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

<script>
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
        settings: this.$store.getters.getSettings
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
      PageHeader,
      ToggleSwitch,
      RadioButton
    }
  }
</script>
