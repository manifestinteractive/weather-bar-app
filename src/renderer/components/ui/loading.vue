<template>
  <transition name="fade" mode="out-in">
    <div class="loading">
      <h1>Loading</h1>
      <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
        <circle id="loading-inner" cx="75" cy="75" r="60"/>
      </svg>
    </div>
  </transition>
</template>

<style lang="scss">
.loading {
  width: 100%;
  height: 100%;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0);
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
