import Vue from 'vue'
import App from './App.vue'

import myplugin from '../src/plugin/index'
Vue.use(myplugin)

new Vue({
  el: '#app',
  render: h => h(App)
})
