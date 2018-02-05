<template>
  <transition name="fade" mode="out-in">
    <div class="lightning-wrapper" id="lightning-wrapper">
      <div class="lightning">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="scatter" width="2" height="2" y="-.5" x="-.5" color-interpolation-filters="sRGB">
              <feGaussianBlur stdDeviation="0.6" result="result1"/>
              <feBlend in2="result1" result="fbSourceGraphic" mode="multiply"/>
              <feTurbulence baseFrequency=".015" type="fractalNoise" numOctaves="6" result="result3"/>
              <feDisplacementMap in="fbSourceGraphic" xChannelSelector="R" yChannelSelector="G" scale="60" result="result2" in2="result3"/>
              <feMorphology radius="0" operator="dilate" result="result4"/>
              <feBlend mode="screen" in2="result2"/>
            </filter>

            <filter id="glow" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0.5" flood-color="rgb(200,255,255)" result="flood"/>
              <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite1"/>
              <feGaussianBlur in="composite1" stdDeviation="3" result="blur"/>
              <feOffset dx="0" dy="0" result="offset"/>
              <feComposite in="SourceGraphic" in2="offset" result="composite2"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div class="lightning" id="lightning-flash" :style="lightningFlash(flash)">
        <div class="lightning" id="lightning-strike">
          <svg v-if="strike === 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="visibility:visible;-webkit-filter: drop-shadow( 0 0 1px rgb(255,255,255) );">
            <g id="mainBolt" filter="url(#scatter)">
              <path d="M 201,0 ,191,91 ,204,215 ,206,241 ,212,317 ,215,449 ,228,529 " fill="none" stroke="#fff" stroke-width="1" filter="url(#glow)"></path>
            </g>
          </svg>
          <svg v-if="strike === 2" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="visibility:visible;-webkit-filter: drop-shadow( 0 0 1px rgb(255,255,255) );">
            <g id="mainBolt" filter="url(#scatter)">
              <path d="M 47,0 ,31,119 ,48,153 ,38,281 ,38,307 ,40,436 ,46,544 " fill="none" stroke="#fff" stroke-width="1" filter="url(#glow)"></path>
            </g>
          </svg>
          <svg v-if="strike === 3" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="visibility:visible;-webkit-filter: drop-shadow( 0 0 1px rgb(255,255,255) );">
            <g id="mainBolt" filter="url(#scatter)">
              <path d="M 158,0 ,141,90 ,130,194 ,133,222 ,132,356 ,137,447 ,147,494 " fill="none" stroke="#fff" stroke-width="1" filter="url(#glow)"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'lightning',
    data () {
      return {
        flash: null,
        strike: null,
        timer: null
      }
    },
    mounted () {
      this.makeLightening()
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      makeLightening () {
        clearTimeout(this.timer)

        const random = (Math.floor(Math.random() * 3) + 1)

        this.flash = random

        setTimeout(() => { this.strike = random }, 50)
        setTimeout(() => { this.flash = 0 }, 100)
        setTimeout(() => { this.flash = random }, 150)
        setTimeout(() => { this.flash = 0 }, 200)
        setTimeout(() => { this.flash = random }, 250)
        setTimeout(() => { this.flash = 0 }, 300)
        setTimeout(() => { this.strike = 0 }, 400)
        setTimeout(() => { this.flash = 0 }, 500)

        const timout = (this.thunderstorm) ? 10000 : 30000

        this.timer = setTimeout(this.makeLightening, timout)
      },
      lightningFlash (flash) {
        const flashes = [
          {
            backgroundImage: 'none'
          },
          {
            backgroundImage: 'radial-gradient(at 201px top, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.6) 16%, rgba(255, 255, 255, 0.1) 100%)'
          },
          {
            backgroundImage: 'radial-gradient(at 0px top, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.6) 16%, rgba(255, 255, 255, 0.1) 100%)'
          },
          {
            backgroundImage: 'radial-gradient(at 229px top, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.6) 16%, rgba(255, 255, 255, 0.1) 100%)'
          }
        ]

        return flashes[flash]
      }
    }
  }
</script>
