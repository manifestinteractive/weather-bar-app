<template>
  <div class="moon-wrapper" :style="getPosition">
    <div class="moon" :style="getOuterStyle()">
      <div class="inner" :style="getInnerStyle()"></div>
    </div>
  </div>
</template>

<script>
  const MOON_COLOR_LIGHT = 'rgba(255, 255, 255, 0.75)'
  const MOON_COLOR_DARK = 'rgba(0, 0, 0, 0.85)'

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
        console.log('inner phase', phase)

        if (phase > 1) {
          phase = 2 - phase
          console.log('inner new phase', phase)
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

        // transform: rotate(12deg);

        const inner = calcInner(100, phase * 2)

        console.log('inner', inner)

        return {
          position: 'absolute',
          backgroundColor: innerColour,
          borderRadius: (inner.diameter / 2) + 'px',
          height: inner.diameter + 'px',
          width: inner.diameter + 'px',
          left: inner.offset + 'px',
          top: ((100 - inner.diameter) / 2) + 'px',
          opacity: '0.9'
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

        return {
          position: 'absolute',
          height: '100px',
          width: '100px',
          backgroundColor: outerColour,
          borderRadius: '50%',
          overflow: 'hidden'
        }
      }
    }
  }
</script>
