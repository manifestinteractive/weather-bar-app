<template>
  <div>
    <h1 class="title">WEATHER BAR</h1>
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
