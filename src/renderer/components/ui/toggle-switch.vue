<template>
  <div class="toggle-switch">
    <input v-model="toggle" type="checkbox" v-bind:id="id" @change="togglePreference" />
    <label v-bind:for="id"></label>
  </div>
</template>

<style lang="scss">
.toggle-switch {
  width: 36px;
  height: 20px;
  display: inline-block;
  line-height: 0;
  padding: 0;
  margin: 0;
  position: relative;

  input[type=checkbox]{
  	height: 0;
  	width: 0;
  	visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  label {
  	cursor: pointer;
  	text-indent: -9999px;
  	width: 36px;
  	height: 20px;
  	background: #666666;
  	display: block;
  	border-radius: 20px;
  	position: relative;
    transition: background-color 0.25s ease-in-out;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.75);
  }

  label:after {
  	content: '';
  	position: absolute;
  	top: 2px;
  	left: 2px;
  	width: 16px;
  	height: 16px;
  	background: #fff;
  	border-radius: 16px;
  	transition: 0.3s;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  input:checked + label {
  	background: $logo-blue;
  }

  input:checked + label:after {
  	left: calc(100% - 2px);
  	transform: translateX(-100%);
  }

  label:active:after {
  	width: 20px;
  }
}
</style>

<script>
  export default {
    name: 'toggle-switch',
    props: {
      id: String,
      label: String,
      enabled: Boolean
    },
    data () {
      return {
        toggle: false
      }
    },
    mounted: function () {
      this.toggle = this.enabled
    },
    methods: {
      togglePreference () {
        this.$emit('togglePreference', { id: this.id, enabled: this.toggle })
      }
    }
  }
</script>
