<template>
  <transition name="fade" mode="out-in">
    <div class="loading-screen">
      <div class="loading" v-if="!hasError">
        <h1>{{ $t('ui.loading') }}</h1>
        <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
          <circle id="loading-inner" cx="75" cy="75" r="60"/>
        </svg>
      </div>

      <div class="reload" v-if="hasError">
        <i class="fal fa-exclamation-triangle"></i>
        <p>{{ $t('ui.errorText') }}</p>
        <a @click.prevent="quit()">{{ $t('ui.errorButtonQuit') }}</a>
        <a @click.prevent="reload()" class="white">{{ $t('ui.errorButtonReload') }}</a>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.loading-screen {
  background: url('~@/assets/images/menu-bg.jpg') center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
}

.loading {
  width: 100%;
  height: 100%;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  padding-top: calc(100% - 120px);

  > h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 300;
    color: #FFF;
    text-transform: uppercase;
  }
}

#load {
	width: 150px;
  animation: loading 3s linear infinite;
  #loading-inner {
	  stroke: {
      dashoffset: 0;
      dasharray: 300;
      width: 2;
      miterlimit: 2;
      linecap: round;
    }
    animation: loading-circle 2s linear infinite;
    stroke: #FFFFFF;
    fill: transparent;
  }
}

.reload {
  text-align: center;
  margin-top: 130px;

  i.fal {
    display: block;
    font-size: 60px;
    margin-bottom: 20px;
  }

  p {
    line-height: 28px;
    padding: 15px 30px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  a {
    border: 1px solid #FFF;
    padding: 8px 16px;
    border-radius: 4px;
    text-transform: uppercase;
    display: inline-block;
    width: 100px;
    margin: 0 auto;
    cursor: pointer;

    &.white {
      background: #FFF;
      color: #333;
    }
  }
}

@keyframes loading {
		0% {
      transform: rotate(0);
    }
		100% {
      transform: rotate(360deg);
    }
}
@keyframes loading-circle {
		0% {
      stroke-dashoffset: 0
    }
		100% {
      stroke-dashoffset: -600;
    }
}
</style>

<script>
  export default {
    name: 'loading',
    props: {
      hasError: Boolean
    },
    methods: {
      reload () {
        window.location.reload()
      },
      quit () {
        this.$electron.ipcRenderer.send('close')
      }
    }
  }
</script>
