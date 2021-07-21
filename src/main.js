import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.use(VueRouter)

Vue.prototype.$http = axios;
axios.defaults.baseURL = '';

if (window.location.origin.includes("localhost")) {
	axios.defaults.withCredentials = true;
	axios.defaults.baseURL = 'http://localhost:8900/v-unite';
}


//Vue.use(VueNativeSock, 'ws://localhost:9090');
//Vue.use(VueNativeSock, 'wss://echo.websocket.org', { format: 'json' });
Vue.use(VueNativeSock, 'ws://localhost:8900/v-unite/system/channel/conversation/list', { store: store, format: 'json' });

Vue.config.productionTip = false

import login from './components/login'
import socket from './components/socket'

const router = new VueRouter({
	routes: [
    { path: '/login', component: login, props: true },
    { path: '/', component: socket, props: true }
  ]
});

new Vue({
  router,
  store,
  vuetify,
  methods: {
    closeSocketDialog() {
      store.commit('closeSocketNotification');
    }
  },
  render: h => h(App)
}).$mount('#app')
