<template>
  <div id="app" data-app>
    <img alt="Vue logo" src="./assets/logo.png" />
    <v-btn @click="clickButton">Test websocket</v-btn>

    <v-row justify="center">

      <v-dialog v-model="$store.state.socketNotification.show" max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Socket Notification </v-card-title>

          <v-card-text> {{ $store.state.socketNotification.message }} </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="$root.closeSocketDialog()"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted: function () {
    //this.$options.sockets.onmessage = (data) => console.log(data);
  },
  methods: {
    clickButton: function () {
      //console.log(this.$socket);
      this.$socket.send("{message: 'test'}");

      console.log(this.dialog);
    }
  }
};
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
