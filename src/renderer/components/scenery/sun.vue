<template>
  <div class="sun-wrapper" :style="getPosition">
    <div class="sun"></div>
    <div class="sun-glow"></div>
  </div>
</template>

<script>
  export default {
    name: 'sun',
    props: {
      position: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getPosition () {
        return {
          bottom: ((this.position * 480) + 40) + 'px'
        }
      }
    }
  }
</script>
