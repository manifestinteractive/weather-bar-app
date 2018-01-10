<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page">
      <h1 class="title">Test Routes</h1>
      <ul>
        <li><router-link to="/splash">Splash Page</router-link></li>
      </ul>

      <div>{{ $t('splash.versionNumber', { version: '0.5.0' }) }}</div>

      <br />

      <label>{{ $t('app.language') }}:&nbsp;
        <select v-model="locale" @change="change">
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
      </label>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'index-page',
    data () {
      return {
        locale: this.$i18n.locale
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      change () {
        this.$i18n.locale = this.locale
        console.log('CHANGE', this.locale)

        this.$db.settings.update({ setting: 'locale' }, { setting: 'locale', value: this.locale }, { upsert: true }, (err, replaced, upsert) => {
          if (err) {
            console.error('Unable to Update Locale', err)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.home-page {
  padding: 28px;
  background-color: $muted-dark-blue;

  h1 {
    font-size: 24px;
    font-weight: 300;
  }

  ul {
    list-style: circle;
    margin: 20px;

    a {
      color: #FFF;
      text-decoration: none;
    }
  }
}
</style>
