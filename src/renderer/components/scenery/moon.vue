<template>
  <div class="moon-wrapper" :style="getPosition">
    <div class="moon" :style="getOuterStyle()">
      <div class="inner" :style="getInnerStyle()"></div>
    </div>
  </div>
</template>

<script>
  const MOON_COLOR_LIGHT = 'rgba(255, 255, 255, 0.85)'
  const MOON_COLOR_DARK = 'rgba(0, 0, 0, 0.75)'

  export default {
    name: 'moon',
    props: {
      angle: {
        type: Number,
        default: 0
      },
      phase: {
        type: Number,
        default: 1
      },
      fraction: {
        type: Number,
        default: 0
      },
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
    },
    methods: {
      getInnerStyle () {
        const calcInner = (outerDiameter, semiPhase) => {
          let innerRadius
          let absPhase = Math.abs(semiPhase)
          let n = ((1 - absPhase) * outerDiameter / 2) || 0.01

          innerRadius = n / 2 + outerDiameter * outerDiameter / (8 * n)

          return {
            diameter: innerRadius * 2,
            offset: semiPhase > 0 ? (outerDiameter / 2 - n) : (-2 * innerRadius + outerDiameter / 2 + n)
          }
        }

        let phase = (this.phase * 2)

        if (phase > 1) {
          phase = 2 - phase
        }

        let innerColour = ''
        const isWaxing = (this.phase > 0 && this.phase < 0.5)

        if (phase < 0.5) {
          innerColour = MOON_COLOR_DARK
          if (isWaxing) {
            phase *= -1
          }
        } else {
          innerColour = MOON_COLOR_LIGHT
          phase = 1 - phase
          if (!isWaxing) {
            phase *= -1
          }
        }

        const inner = calcInner(100, phase * 2)

        return {
          position: 'absolute',
          backgroundColor: innerColour,
          borderRadius: (inner.diameter / 2) + 'px',
          height: inner.diameter + 'px',
          width: inner.diameter + 'px',
          left: inner.offset + 'px',
          top: ((100 - inner.diameter) / 2) + 'px',
          opacity: '0.9',
          filter: 'blur(5px)'
        }
      },
      getOuterStyle () {
        let phase = (this.phase * 2)

        if (phase > 1) {
          phase = 2 - phase
        }

        let outerColour = ''

        if (phase < 0.5) {
          outerColour = MOON_COLOR_LIGHT
        } else {
          outerColour = MOON_COLOR_DARK
        }

        const glow = (0.25 + this.phase)

        return {
          position: 'absolute',
          height: '100px',
          width: '100px',
          backgroundColor: outerColour,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: `0 0 50px rgba(255,255,255,${glow})`
        }
      }
    }
  }
</script>
