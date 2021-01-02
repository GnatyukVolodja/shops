import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'lightslider/dist/img/controls.png'
import 'lightslider/dist/css/lightslider.min.css'
import 'ion-rangeslider/css/ion.rangeSlider.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'lightslider/dist/js/lightslider.min'
import 'ion-rangeslider/js/ion.rangeSlider.min'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.min'

createApp(App).use(store).use(VueAxios, axios).use(router).mount('#app')
