<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="clickButton"> Test websocket </button>
  </div>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

//Vue.use(VueNativeSock, 'ws://localhost:9090');
//Vue.use(VueNativeSock, 'wss://echo.websocket.org', { format: 'json' });
Vue.use(VueNativeSock, 'ws://localhost:8900/v-unite/system/public/channel/conversation/list', { format: 'json' });



export default {
  name: 'App',
  mounted: function() {
    this.$options.sockets.onmessage = (data) => console.log(data);
  },
  methods: {
    clickButton: function() {
        // with {format: 'json'} enabled
        //console.log(this.$socket);
        this.$socket.send("{awesome: 'data'}");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
