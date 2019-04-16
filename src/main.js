import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';

import myplugin from '../src/plugin/index'

import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)

Vue.use(Vant);

Vue.use(myplugin)

new Vue({
  el: '#app',
  render: h => h(App)
})
