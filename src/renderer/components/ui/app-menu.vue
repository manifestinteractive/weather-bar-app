<template>
  <div class="app-menu" :class="{ open: open }">
    <div class="menu-button" @click="toggle">
      <div class="bar" :class="{ open: open }"></div>
    </div>

    <div class="quit-app" @click.prevent="quitApp" v-if="platform === 'linux'">
      <i class="fas fa-fw fa-window-close"></i>&nbsp; Quit
    </div>

    <div class="menu-wrapper" :class="{ open: open }">
      <div class="header">
        <div class="logo">
          <svg viewBox="0 0 737.74 561.05"><path d="M446.09,631.26H296.52A112.26,112.26,0,0,1,251.92,416L555.73,719.78a52.1,52.1,0,1,0,30.12-28L263.34,369.27A153.59,153.59,0,0,0,143.13,519c0,84.58,68.81,153.38,153.39,153.38H487.18m116.07,91.53a23.26,23.26,0,1,1,23.26-23.27A23.27,23.27,0,0,1,603.25,763.89Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M677.15,264.94a202.45,202.45,0,0,0-66.42,11.14A174.66,174.66,0,0,0,494,231.48c-72.72,0-135.19,44.47-161.79,107.6l32.21,32.22c15.68-56.84,67.81-98.73,129.58-98.73a133.61,133.61,0,0,1,75.47,23.26,135.72,135.72,0,0,1,31.12,29.43A161.65,161.65,0,0,1,677.15,306c89.67,0,162.62,73,162.62,162.62S766.82,631.26,677.15,631.26h-73.9L299.7,327.7a51.76,51.76,0,1,0-28.54,29.6L586.22,672.36h90.93c112.33,0,203.72-91.39,203.72-203.71S789.48,264.94,677.15,264.94Zm-426,67.71a23.26,23.26,0,1,1,23.26-23.26A23.26,23.26,0,0,1,251.17,332.65Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M795.21,473.38a7.11,7.11,0,0,1-7.12-7.11A109.92,109.92,0,0,0,666.89,356.9a7.12,7.12,0,0,1-1.44-14.17c4.2-.41,8.46-.63,12.69-.63A124.32,124.32,0,0,1,802.32,466.27,7.11,7.11,0,0,1,795.21,473.38Z" transform="translate(-143.13 -231.48)" fill="#35c5f2"/><path d="M227.67,775.65h-13.3l-9.44-51.28h-.19l-9.45,51.28H182l-13-68.24h11.76l8.77,53h.38l9.16-53h12.14l9.45,53h.19l8.77-53h11.18Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M248.88,775.65V707.41h30.55v10.21H260v18.12h18v9.45H260v20.14h20.43v10.32Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M320.49,775.65l-3.38-14.46H299.19l-3.47,14.46H284.15l17-68.24h14.75l16.67,68.24ZM308.44,718.3h-.39l-7.42,33.83h15Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M355,717.24v58.41H343.62V717.24H330.8v-9.83h37v9.83Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M406.46,775.65V745.38H386v30.27H374.55V707.41H386v27.66h20.44V707.41h11.46v68.24Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M431.8,775.65V707.41h30.55v10.21H442.89v18.12h18v9.45h-18v20.14h20.43v10.32Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M502.06,775.65l-10.6-29.11H485v29.11H473.82V707.41h19.47a26.18,26.18,0,0,1,7.81,1.11,15.47,15.47,0,0,1,6.12,3.52,16.62,16.62,0,0,1,4,6.07,23.94,23.94,0,0,1,1.44,8.77,22,22,0,0,1-1,7A18.9,18.9,0,0,1,509.1,739a14.22,14.22,0,0,1-3.42,3.42,11.89,11.89,0,0,1-3.71,1.79l12.24,31.42Zm-.77-48.19a13,13,0,0,0-.87-5.11,8.16,8.16,0,0,0-2.26-3.18,8.41,8.41,0,0,0-3.13-1.64,13,13,0,0,0-3.47-.48H485v21h6.56a9.67,9.67,0,0,0,7-2.65C500.38,733.64,501.29,731,501.29,727.46Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M730.62,756.56a20.26,20.26,0,0,1-1.78,9,17.57,17.57,0,0,1-4.53,5.88,16.69,16.69,0,0,1-6.17,3.23,24.34,24.34,0,0,1-6.7,1H691.2V707.41h18.12a30.55,30.55,0,0,1,6.36.72,17.52,17.52,0,0,1,6.17,2.6,14.7,14.7,0,0,1,4.63,5.21,17.81,17.81,0,0,1,1.83,8.62q0,6.38-2.7,10a14.77,14.77,0,0,1-6.26,5.11v.19a15,15,0,0,1,3.9,1.64,13,13,0,0,1,3.61,3.23,17.54,17.54,0,0,1,2.7,5A19.88,19.88,0,0,1,730.62,756.56ZM717.9,726.4a10.43,10.43,0,0,0-.82-4.39,8.21,8.21,0,0,0-2.1-2.89,7.76,7.76,0,0,0-3-1.59,13.14,13.14,0,0,0-3.54-.48h-6.33v19h6.52a11,11,0,0,0,3.4-.53,8,8,0,0,0,3-1.68,8.64,8.64,0,0,0,2.1-3A10.75,10.75,0,0,0,717.9,726.4Zm1.64,29.2a12,12,0,0,0-1-5.06,9.55,9.55,0,0,0-5.85-5.25,11.83,11.83,0,0,0-3.64-.58h-7V766h7.29a12,12,0,0,0,3.93-.63,8.92,8.92,0,0,0,3.21-1.93,9.12,9.12,0,0,0,2.2-3.23A11.67,11.67,0,0,0,719.54,755.6Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M770.81,775.65l-3.37-14.46H749.51L746,775.65H734.48l17-68.24h14.75l16.67,68.24Zm-12-57.35h-.38L751,752.13h15Z" transform="translate(-143.13 -231.48)" fill="#fff"/><path d="M818.23,775.65l-10.6-29.11h-6.46v29.11H790V707.41h19.47a26.18,26.18,0,0,1,7.81,1.11,15.54,15.54,0,0,1,6.12,3.52,16.62,16.62,0,0,1,4,6.07,23.94,23.94,0,0,1,1.44,8.77,22.28,22.28,0,0,1-1,7,18.9,18.9,0,0,1-2.55,5.15,14.08,14.08,0,0,1-3.43,3.42,11.79,11.79,0,0,1-3.71,1.79l12.24,31.42Zm-.77-48.19a13,13,0,0,0-.87-5.11,8.26,8.26,0,0,0-2.26-3.18,8.45,8.45,0,0,0-3.14-1.64,12.91,12.91,0,0,0-3.47-.48h-6.55v21h6.55a9.68,9.68,0,0,0,7-2.65Q817.46,732.76,817.46,727.46Z" transform="translate(-143.13 -231.48)" fill="#fff"/></svg>
        </div>

        <div class="version-number">
          {{ $t('app.menu.versionNumber', { version: version }) }}
        </div>
      </div>

      <ul>
        <li>
          <router-link :to="{ name: 'index' }" exact @click.native="hide">
            <i class="fas fa-fw fa-umbrella"></i> {{ $t('app.menu.localWeather') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'saved-locations' }" @click.native="hide">
            <i class="fas fa-fw fa-bookmark"></i> {{ $t('app.menu.savedLocations') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'new-location' }" @click.native="hide">
            <i class="fas fa-fw fa-plus-square"></i> {{ $t('app.menu.newLocation') }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'preferences' }" @click.native="hide">
            <i class="fas fa-fw fa-cog"></i> {{ $t('app.menu.preferences') }}
          </router-link>
        </li>
      </ul>

      <div class="open-weather-map">
        {{ $t('app.menu.providedBy') }}

        <button @click="openLink('https://openweathermap.org/?utm_source=weather-bar-app&utm_medium=in-app&utm_campaign=owm-weather-bar')" class="owm-logo">
          <svg viewBox="-146 -462 4363.4 419.8"><path d="m503.5-116.4c-47.3 0-85.1-14.9-113.5-44.6s-42.5-69.4-42.5-118.9c0-50.1 14.2-89.9 42.7-119.4s66.9-44.2 115.4-44.2c48.1 0 86.5 14.7 115.1 44.2s42.8 69 42.8 118.7c0 50.8-14.3 90.9-42.8 120.2-28.6 29.3-67.7 44-117.2 44m0.8-43c27.8 0 49.8-10.9 66-32.7s24.3-51.4 24.3-88.7c0-36.2-8.1-65.3-24.4-87.2s-37.8-32.8-64.6-32.8c-27.1 0-48.7 10.9-64.9 32.8s-24.3 51.2-24.3 87.8c0 36.3 8.1 65.6 24.2 87.7s37.3 33.1 63.7 33.1m217.5 118.3v-314.3h62.3v43.6c16-32.6 41.2-48.8 75.6-48.8 27.8 0 49.6 10.2 65.6 30.5 15.9 20.4 23.9 48.4 23.9 84 0 38.7-9 69.6-26.9 92.6-18 23-42 34.5-72.2 34.5-24.3 0-46.2-9.5-65.9-28.6v106.5h-62.4m62.3-143.5c15.2 16.8 31.3 25.3 48.4 25.3 15.3 0 27.5-7.4 36.6-22.2s13.7-34.6 13.7-59.3c0-47.3-15.2-70.9-45.7-70.9-18.4 0-36.1 11.9-53.1 35.6v91.5m411.6 52.6c-29.6 8.7-57.7 13.1-84.2 13.1-38.6 0-69-10.9-91.4-32.8-22.3-21.9-33.5-51.8-33.5-89.7 0-35.8 10.2-64.6 30.6-86.4s47.4-32.7 81-32.7c33.8 0 58.5 10.7 74.1 32s23.4 55.1 23.4 101.3h-143.4c4.2 44.1 28.4 66.1 72.6 66.1 20.9 0 44.5-4.8 70.7-14.5v43.6m-144.2-130.5h83c0-39.4-12.7-59.2-38.1-59.2-25.8 0-40.8 19.7-44.9 59.2m208.7 138.3v-231.2h62.3v43.6c20.3-32.6 46.6-48.8 78.7-48.8 20.6 0 36.9 6.5 48.8 19.6s17.9 30.9 17.9 53.5v163.4h-62.3v-148c0-26.2-8.7-39.4-26.1-39.4-19.8 0-38.8 14-57 41.9v145.5h-62.3m326.3-0.1l-77.7-311.6h61.3l56.8 228 53.7-228h54.1l50.9 226.7 59.8-226.7h44.8l-81.7 311.6h-61.9l-48-213.7-50.3 213.7h-61.8m534.6-7.8c-29.6 8.7-57.7 13.1-84.2 13.1-38.6 0-69-10.9-91.4-32.8-22.3-21.9-33.5-51.8-33.5-89.7 0-35.8 10.2-64.6 30.6-86.4s47.4-32.7 80.9-32.7c33.8 0 58.5 10.7 74.1 32s23.4 55.1 23.4 101.3h-143.4c4.2 44.1 28.4 66.1 72.6 66.1 20.9 0 44.5-4.8 70.7-14.5v43.6m-144-130.5h82.9c0-39.4-12.7-59.2-38.1-59.2-25.7 0-40.7 19.7-44.8 59.2m321.9 113.4c-20.8 20.1-43 30.1-66.7 30.1-20.2 0-36.6-6.2-49.3-18.5-12.6-12.4-18.9-28.4-18.9-48 0-25.5 10.2-45.2 30.6-59.1 20.4-13.8 49.6-20.7 87.7-20.7h16.6v-21.1c0-24-13.7-36-41.1-36-24.3 0-48.8 6.9-73.7 20.6v-42.9c28.2-10.7 56.1-16 83.8-16 60.5 0 90.7 24.1 90.7 72.2v102.3c0 18.1 5.8 27.2 17.5 27.2 2.1 0 4.8-0.3 8.2-0.8l1.5 34.9c-13.2 3.9-24.8 5.9-34.9 5.9-25.5 0-42-10-49.3-30.1h-2.7m0-33.4v-46.9h-14.7c-40.3 0-60.4 12.6-60.4 37.9 0 8.6 2.9 15.8 8.7 21.6s13 8.7 21.6 8.7c14.6-0.1 29.5-7.2 44.8-21.3m259.4 57c-14.9 4.4-26.6 6.5-35.2 6.5-54 0-81.1-25.3-81.1-75.8v-121.7h-25.9v-38.9h25.9v-38.9l62.3-7.2v46.1h49.5v38.9h-49.5v113.5c0 28.4 11.6 42.5 34.7 42.5 5.3 0 11.7-1 19.2-2.9v37.9m55.5 1.3v-332.4h62.3v144.8c20.4-32.6 46.6-48.8 78.7-48.8 20.6 0 36.9 6.5 48.8 19.6s17.9 30.9 17.9 53.5v163.4h-62.3v-148c0-26.2-8.7-39.4-26.1-39.4-19.8 0-38.8 14-57.1 41.9v145.5h-62.2m471.4-7.9c-29.6 8.7-57.7 13.1-84.2 13.1-38.6 0-69-10.9-91.4-32.8-22.3-21.9-33.5-51.8-33.5-89.7 0-35.8 10.2-64.6 30.6-86.4s47.4-32.7 80.9-32.7c33.8 0 58.5 10.7 74.1 32s23.4 55.1 23.4 101.3h-143.4c4.2 44.1 28.4 66.1 72.6 66.1 20.9 0 44.5-4.8 70.7-14.5v43.6m-144-130.5h83c0-39.4-12.7-59.2-38.1-59.2-25.9 0-40.8 19.7-44.9 59.2m208.6 138.3v-231.2h62.3v43.6c16.1-32.6 40.7-48.8 73.7-48.8 3.9 0 7.8 0.4 11.6 1.3v55.6c-8.8-3.2-17.1-4.8-24.6-4.8-24.8 0-45 12.6-60.6 37.7v146.7h-62.4m196-0.1v-311.6h85.9l74.9 219.1 77.3-219.1h75.4v311.6h-59.8v-235.2l-76 214.3h-52.2l-74.5-217.5v238.3h-51m504.6-24.8c-20.8 20.1-43 30.1-66.7 30.1-20.2 0-36.6-6.2-49.3-18.5-12.6-12.4-18.9-28.4-18.9-48 0-25.5 10.2-45.2 30.6-59.1 20.4-13.8 49.6-20.7 87.7-20.7h16.6v-21.1c0-24-13.7-36-41.1-36-24.3 0-48.8 6.9-73.7 20.6v-42.9c28.2-10.7 56.1-16 83.8-16 60.5 0 90.7 24.1 90.7 72.2v102.3c0 18.1 5.8 27.2 17.5 27.2 2.1 0 4.8-0.3 8.2-0.8l1.5 34.9c-13.2 3.9-24.8 5.9-34.9 5.9-25.5 0-42-10-49.3-30.1h-2.7m0-33.4v-46.9h-14.7c-40.3 0-60.4 12.6-60.4 37.9 0 8.6 2.9 15.8 8.7 21.6s13 8.7 21.6 8.7c14.6-0.1 29.5-7.2 44.8-21.3m140.2 141.4v-314.3h62.3v43.6c16-32.6 41.2-48.8 75.6-48.8 27.8 0 49.7 10.2 65.6 30.5 15.9 20.4 23.9 48.4 23.9 84 0 38.7-9 69.6-26.9 92.6-18 23-42 34.5-72.2 34.5-24.3 0-46.2-9.5-65.9-28.6v106.5h-62.4m62.3-143.5c15.2 16.8 31.3 25.3 48.4 25.3 15.3 0 27.5-7.4 36.6-22.2s13.7-34.6 13.7-59.3c0-47.3-15.2-70.9-45.7-70.9-18.4 0-36.1 11.9-53.1 35.6v91.5z"/><rect fill="none" x="-135" y="-439.2" width="390.7" height="383"/><defs><rect id="b" x="-146" y="-462" width="419.8" height="419.8"/></defs><clipPath id="a"><use xlink:href="#b"/></clipPath><path clip-path="url(#a)" d="m-146-462.2h420v420h-420v-420zm248.3 314.5c-11.9 4.4-24.8 6.8-38.3 6.8s-26.4-2.4-38.3-6.8l38.3 77.6 38.3-77.6zm-139.2-57.7l-27.8 82 82-27.8c-23.9-11.1-43.2-30.4-54.2-54.2zm201.8 0c-11.1 23.9-30.3 43.1-54.2 54.2l82 27.8-27.8-82zm-100.9-130.7c-48.7 0-88.1 37.6-88.1 83.9s39.4 83.9 88.1 83.9c48.6 0 88.1-37.6 88.1-83.9s-39.5-83.9-88.1-83.9zm-104.5 45.6l-77.6 38.3 77.6 38.3c-4.4-11.9-6.8-24.8-6.8-38.3 0-13.4 2.4-26.3 6.8-38.3zm209 0c4.4 11.9 6.8 24.8 6.8 38.3s-2.4 26.4-6.8 38.3l77.6-38.3-77.6-38.3zm-233.3-90.5l27.8 82c11.1-23.8 30.3-43.1 54.2-54.2l-82-27.8zm257.6 0l-82 27.8c23.9 11.1 43.1 30.3 54.2 54.2l27.8-82zm-128.8-53.3l-38.3 77.6c11.9-4.4 24.8-6.8 38.3-6.8s26.4 2.4 38.3 6.8l-38.3-77.6z"/></svg>
        </button>
      </div>
    </div>

    <div class="page-overlay" @click="hide"></div>
  </div>
</template>

<style lang="scss">
.app-menu {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 40px);
  height: 100%;
  background: #2c2f32;
  box-shadow: none;
  transition: all 300ms cubic-bezier(.55, 0, .1, 1);
  transform: translate(-100%, 0);
  z-index: 5000;

  .quit-app {
    color: #FFF;
    position: absolute;
    top: 24px;
    left: 20px;
    z-index: 500;
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0.35;
    transition: all 0.25s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .menu-button {
    position: absolute;
    top: 12px;
    right: -40px;
    z-index: 52;
    width: 30px;
    height: 30px;
    cursor: pointer;

    .bar,
    .bar:after,
    .bar:before {
      width: 20px;
      height: 2px;
      margin: 0 auto;
    }

    .bar {
      position: relative;
      transform: translateY(13px);
      background: rgba(255, 255, 255, 1);
      transition: transform 0 300ms;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 5px;
        background: rgba(255, 255, 255, 1);
        transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
      }

      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 5px;
        background: rgba(255, 255, 255, 1);
        transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
      }

      &.open {
        background: rgba(255, 255, 255, 0);
      }

      &.open:after {
        top: 0;
        transform: rotate(45deg);
        transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
      }

      &.open:before {
        bottom: 0;
        transform: rotate(-45deg);
        transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
      }
    }

    &:focus {
      outline: none;
    }
  }

  .page-overlay {
    position: absolute;
    top: 0;
    right: -40px;
    background: rgba(0,0,0,0);
    width: 0;
    height: 100%;
    z-index: 51;
    transition: background-color 0.25s ease-in-out;
    transition-delay: 150ms;
  }

  &.open {
    box-shadow: 0 0 30px rgba(0,0,0,0.75);
    transform: translate(0, 0);

    .page-overlay {
      width: 40px;
      background: rgba(0,0,0,0.85);
    }

    .menu-button {
      right: -35px;
    }
  }

  .menu-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 51;
    background: url(~@/assets/images/menu-bg.jpg) center center;
    background-size: cover;

    .header {
      padding: 50px 0 40px 0;

      .logo {
        margin: 0 auto;
        width: 100px;
        height: 80px;
      }
      .version-number {
        text-align: center;
        text-transform: uppercase;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
        letter-spacing: 0.5px;
        padding: 5px;
      }
    }

    ul {
      li {
        width: 100%;

        a {
          border-left: 4px solid transparent;
          display: block;
          width: 100%;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-weight: 300;
          height: 40px;
          line-height: 40px;
          transition: all 0.25s ease-in-out;

          i {
            display: inline-block;
            width: 50px;
            text-align: center;
            font-size: 20px;
            position: relative;
            top: 2px;
            color: rgba(255, 255, 255, 0.25);
            transition: color 0.25s ease-in-out;
          }

          &:hover {
            border-left: 4px solid rgba(255, 255, 255, 0.25);
            color: rgba(255, 255, 255, 1);

            i {
              color: rgba(255, 255, 255, 0.5);
            }
          }

          &.router-link-active,
          &.router-link-exact-active {
            border-left: 4px solid #35c5f2;
            color: rgba(255, 255, 255, 1);
            cursor: default;

            i {
              color: rgba(255, 255, 255, 0.75);
            }
          }
        }
      }
    }
  }

  .open-weather-map {
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    position: absolute;
    bottom: 10px;
    line-height: 26px;

    button {
      appearance: none;
      background: none;
      border: none;
      width: 160px;
      height: 15px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.25s ease;

      path {
        fill: #FFFFFF;
      }
    }

    &:hover {
      button {
        opacity: 1;

        path {
          fill: #FF8C18;
        }
      }
    }
  }
}
</style>

<script>
  import { version } from '../../../../package.json'

  export default {
    name: 'app-menu',
    data () {
      return {
        platform: process.platform,
        open: false,
        version: version
      }
    },
    methods: {
      quitApp () {
        this.$electron.ipcRenderer.send('close')
      },
      show () {
        this.open = true
      },
      hide () {
        this.open = false
      },
      toggle () {
        this.open = !this.open
      },
      isOpen () {
        return (this.open)
      },
      openLink (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>
