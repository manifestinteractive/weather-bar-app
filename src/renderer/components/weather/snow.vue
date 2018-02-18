<template>
<transition name="fade" mode="out-in">
  <div class="snow-wrapper">
    <div class="snowflake">
      ❄
    </div>
    <div class="snowflake">
      ❅
    </div>
    <div class="snowflake">
      ❆
    </div>
    <div class="snowflake">
      ❄
    </div>
    <div class="snowflake">
      ❅
    </div>
    <div class="snowflake">
      ❆
    </div>
    <div class="snowflake">
      ❄
    </div>
    <div class="snowflake">
      ❅
    </div>
    <div class="snowflake">
      ❆
    </div>
    <div class="snowflake">
      ❄
    </div>
  </div>
</transition>
</template>

<style lang="scss">
.snowflake {
  color: #fff;
  font-size: 8px;
  font-family: Arial;
  opacity: 0.85;
}

@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes snowflakes-shake {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(40px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.snowflake {
  position: absolute;
  top: -10%;
  z-index: 15;
  user-select: none;
  cursor: default;
  animation-name: snowflakes-fall,snowflakes-shake;
  animation-duration: 10s,3s;
  animation-timing-function: linear,ease-in-out;
  animation-iteration-count: infinite,infinite;
  animation-play-state: running,running;
}
.snowflake:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s,0s;
  animation-delay: 0s,0s;
}
.snowflake:nth-of-type(1) {
  left: 10%;
  animation-delay: 1s,1s;
}
.snowflake:nth-of-type(2) {
  left: 20%;
  animation-delay: 6s,.5s;
}
.snowflake:nth-of-type(3) {
  left: 30%;
  animation-delay: 4s,2s;
}
.snowflake:nth-of-type(4) {
  left: 40%;
  animation-delay: 2s,2s;
}
.snowflake:nth-of-type(5) {
  left: 50%;
  animation-delay: 8s,3s;
}
.snowflake:nth-of-type(6) {
  left: 60%;
  animation-delay: 6s,2s;
}
.snowflake:nth-of-type(7) {
  left: 70%;
  animation-delay: 2.5s,1s;
}
.snowflake:nth-of-type(8) {
  left: 80%;
  animation-delay: 1s,0s;
}
.snowflake:nth-of-type(9) {
  left: 90%;
  animation-delay: 3s,1.5s;
}
</style>
