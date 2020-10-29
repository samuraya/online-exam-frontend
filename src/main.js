import Vue from 'vue';

import './../node_modules/bulma/css/bulma.css';
import 'bulma-pageloader';

import ApiService from "./services/api.service";
ApiService.init();

import axios from 'axios';
//import Form from './assets/js/core/Form.js';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';



import serviceContainer from './service-container.js';

window.axios = axios;

Vue.prototype.$eventBus = new Vue();


new Vue({
  provide: serviceContainer,
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
})
