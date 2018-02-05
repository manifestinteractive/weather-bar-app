<template>
  <div class="moon-wrapper">
    <div class="moon" :class="phase"></div>
    <div class="moon-glow" :class="phase"></div>
  </div>
</template>

<script>
  export default {
    name: 'moon',
    props: {
      phase: {
        type: String,
        default: 'moon-full-moon'
      }
    }
  }
</script>
