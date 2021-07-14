import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import vuetify from './plugins/vuetify'

//Vue.use(VueNativeSock, 'ws://localhost:9090');
//Vue.use(VueNativeSock, 'wss://echo.websocket.org', { format: 'json' });
Vue.use(VueNativeSock, 'ws://localhost:8900/v-unite/system/public/channel/conversation/list', { store: store, format: 'json' });

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  methods: {
    closeSocketDialog() {
      store.commit('closeSocketNotification');
    }
  },
  render: h => h(App)
}).$mount('#app')
