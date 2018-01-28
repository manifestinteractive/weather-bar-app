<template>
  <transition name="fade" mode="out-in">
    <div class="router-view home-page">
      <scene />
    </div>
  </transition>
</template>

<style lang="scss">
.home-page {

}
</style>

<script>
  import Scene from '../ui/scene'

  export default {
    name: 'index-page',
    data () {
      return {}
    },
    mounted () {},
    methods: {},
    components: {
      Scene
    }
  }
</script>
