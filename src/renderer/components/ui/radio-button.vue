<template>
  <div class="radio-button">
    <input type="radio" role="checkbox" :aria-checked="current ? 'true' : 'false'"
      v-model="selection"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:value="option"
      @change="selectPreference"
    />
    <label v-bind:for="id"></label>
  </div>
</template>

<style lang="scss">
.radio-button {
  width: 20px;
  height: 20px;
  display: inline-block;
  line-height: 0;
  padding: 0;
  margin: 0;
  position: relative;

  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.75);
  }

  [type="radio"]:checked + label:before {
    background: $logo-blue;
  }

  [type="radio"]:not(:checked) + label:before {
    background: #666666;
  }

  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  [type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
    background: #FFF;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.95);
  }
}
</style>

<script>
  export default {
    name: 'radio-button',
    props: {
      id: String,
      name: String,
      option: String,
      enabled: String,
      current: Boolean
    },
    data () {
      return {
        selection: false
      }
    },
    mounted: function () {
      this.selection = this.enabled
    },
    methods: {
      selectPreference () {
        this.$emit('selectPreference', { id: this.name, selected: this.id })
      }
    }
  }
</script>
