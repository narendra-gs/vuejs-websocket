<template>
  <div>
    <v-btn @click="clickButton">Test websocket</v-btn>
    <v-btn @click="setReminder">Set Reminder</v-btn>
    <v-btn @click="logout">Logout</v-btn>

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
import axios from "axios";

export default {
  mounted: function () {
    //this.$options.sockets.onmessage = (data) => console.log(data); //already installed in main.js
    if(!this.$store.state.principal.id){
      this.$router.push("/login");
    } else {
      console.log(this.$store.state.principal);
    }
  },
  methods: {
    clickButton: function () {
      //console.log(this.$socket);
      this.$socket.send("{message: 'This is example of proposed message'}");
    },
    setReminder: function () {
      axios
        .post("/system/websocketchat/add", {})
        .then((response) => {
          alert(response.data);
        })
        .catch(() => {});
    },
    logout: function () {
      this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			});
    }
  }
};
</script>
