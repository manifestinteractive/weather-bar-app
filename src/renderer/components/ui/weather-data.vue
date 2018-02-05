<template>
  <div class="weather-data">
    <div class="main-weather">
      <div class="left">
				<div class="current-temp">
					{{ data.temp_actual }}<span class="degree">&deg;</span>
				</div>
				<div class="feels-like-temp">
					Feels Like {{ data.temp_feels_like }}<span class="degree">&deg;</span>
				</div>
			</div>

      <div class="right">
				<div class="current-measure">
					<i class="wi wi-raindrops"></i> 10%
				</div>

        <div class="current-measure" v-if="data.sun_next == 'sunset'">
					<i class="wi wi-sunset"></i> {{ data.sunset }}
				</div>

				<div class="current-measure" v-if="data.sun_next == 'sunrise'">
					<i class="wi wi-sunrise"></i> {{ data.sunrise }}
				</div>

        <div class="current-measure">
					<i class="wi wi-strong-wind"></i> {{ data.wind_speed }}
					<span class="direction">{{ data.wind_direction }}</span>
				</div>
			</div>
		</div>

    <div class="current-conditions">
      <div class="left">
        <i class="wi" :class="data.condition_icon"></i>
			</div>

      <div class="right">
        <h1>{{ data.condition_label }}</h1>
        <h3>{{ data.city }}</h3>
			</div>
    </div>

		<div class="weather-overview">

			<div class="forecast">
				<div class="forecast-day">
					<div class="date">
						Today
					</div>
					<div class="icon">
						<i class="wi" :class="data.condition_icon"></i>
					</div>
					<div class="high-low">
						{{ data.temp_max }}&deg;<span>|</span>{{ data.temp_min }}&deg;
					</div>
				</div>

				<div class="forecast-day">
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

				<div class="forecast-day">
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
@import '~@/assets/scss/weather-data';
</style>

<script>
  export default {
    name: 'weather-data',
    props: {
      data: {
        type: Object,
        default () {
          return {
            city: null,
            condition_icon: 'wi-na',
            condition_label: 'Unknown',
            id: null,
            key: 'current',
            scene_clouds: false,
            scene_fog: false,
            scene_lightning: false,
            scene_moon: false,
            scene_rain: 0,
            scene_snow: false,
            scene_stars: false,
            scene_sun: false,
            scene_thunderstorm: false,
            scene_time: 'midnight',
            sunrise: null,
            sunset: null,
            sun_next: null,
            temp_actual: 0,
            temp_feels_like: 0,
            temp_max: 0,
            temp_min: 0,
            time_zone: null,
            wind_direction: 'N',
            wind_speed: 0,
            moon_name: null,
            moon_fraction: null,
            moon_phase: null,
            moon_angle: null,
            moon_altitude: null,
            moon_azimuth: null,
            moon_distance: null,
            moon_parallactic_angle: null
          }
        }
      }
    }
  }
</script>
