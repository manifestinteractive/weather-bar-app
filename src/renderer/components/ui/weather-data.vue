<template>
  <div class="weather-data">
    <div class="main-weather">
      <div class="left wow fadeIn">
				<div class="current-temp wow fadeIn">
					67<span class="degree">&deg;</span>
				</div>
				<div class="feels-like-temp">
					Feels Like 71<span class="degree">&deg;</span>
				</div>
			</div>

      <div class="right">
				<div class="current-measure wow fadeIn" data-wow-delay="0.1s">
					<i class="wi wi-raindrops"></i> 10%
				</div>

				<div class="current-measure wow fadeIn" data-wow-delay="0.2s">
					<i class="wi wi-strong-wind"></i> 5 mph
					<span class="direction">NNE</span>
				</div>

				<div class="current-measure wow fadeIn" data-wow-delay="0.3s">
					<i class="wi wi-sunrise"></i> 7:03 am
				</div>
			</div>
		</div>

    <div class="current-conditions wow fadeIn" data-wow-delay="0.7s">
      <div class="left">
        <i class="wi wi-day-showers"></i>
			</div>

      <div class="right">
        <h1>Rain</h1>
        <h3>St. Petersburg, FL</h3>
			</div>
    </div>

		<div class="weather-overview wow fadeInUp" data-wow-delay="1s">

			<div class="forecast">
				<div class="forecast-day wow fadeInUp" data-wow-delay="1.1s">
					<div class="date">
						Today
					</div>
					<div class="icon">
						<i class="wi wi-day-cloudy"></i>
					</div>
					<div class="high-low">
						82&deg;<span>|</span>65&deg;
					</div>
				</div>

				<div class="forecast-day wow fadeInUp" data-wow-delay="1.2s">
					<div class="date">
						Fri <span>28</span>
					</div>
					<div class="icon">
						<i class="wi wi-day-sunny"></i>
					</div>
					<div class="high-low">
						78&deg;<span>|</span>64&deg;
					</div>
				</div>

				<div class="forecast-day wow fadeInUp" data-wow-delay="1.3s">
					<div class="date">
						Sat <span>29</span>
					</div>
					<div class="icon">
						<i class="wi wi-day-storm-showers"></i>
					</div>
					<div class="high-low">
						77&deg;<span>|</span>66&deg;
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<style lang="scss">
// @import '~@/assets/scss/mixins';
// @import '~@/assets/scss/variables';
// @import '~@/assets/scss/animations';
// @import '~@/assets/scss/scene';
// @import '~@/assets/scss/time';
// @import '~@/assets/scss/weather';
@import '~@/assets/scss/weather-data';
</style>

<script>
  export default {
    name: 'weather-data',
    props: {
      weather: {
        type: Object,
        default () {
          return {
            snow: false,
            stars: true,
            sun: true,
            thunderstorm: false,
            trees: true
          }
        }
      }
    }
  }
</script>
