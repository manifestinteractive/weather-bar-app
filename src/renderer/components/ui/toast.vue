<template>
  <transition name="fade" mode="out-in">
    <div class="toast">
      <div class="message" :class="toastMessage.type">
        <a role="button" v-if="toastMessage.close" @click.prevent="closeToast()">
          <i class="fas fa-times"></i>
        </a>
        {{ toastMessage.message }}
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.toast {
  z-index: 10000;
  width: 280px;
  min-height: 50px;
  position: fixed;
  padding: 10px;
  margin: 0 auto;

  .message {
    padding: 14px 20px 14px 14px;
    width: 260px;
    color: #FFF;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    border-radius: 8px;

    &.error {
      background: #e20303;
    }

    &.info {
      background: #4d9ee8;
    }

    &.default {
      background: #000000;
    }

    a {
      position: absolute;
      top: 0;
      right: 0;
      color: #FFF;
      text-decoration: none;
      padding: 8px 10px;
      cursor: pointer;
    }
  }
}
</style>

<script>
  import { EventBus } from '../../event-bus'

  export default {
    name: 'toast',
    props: {
      toastMessage: Object,
      default () {
        return {
          type: 'default',
          close: false,
          message: null
        }
      }
    },
    methods: {
      closeToast () {
        EventBus.$emit('closeToast')
      }
    }
  }
</script>
