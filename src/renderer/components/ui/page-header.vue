<template>
  <div class="page-title" role="heading">
    {{ title }}
  </div>
</template>

<style lang="scss">
.page-title {
  text-align: center;
  height: 52px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 300;
  line-height: 50px;
  color: #FFF;
}
</style>

<script>
  export default {
    name: 'app-menu',
    props: {
      title: String
    }
  }
</script>
