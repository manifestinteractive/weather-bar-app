<template>
  <div>
    <h1 class="title">{{ $t("app.title") }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'index-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>

</style>
