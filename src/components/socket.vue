<template>
  <div>
    <v-btn @click="clickButton">Test websocket</v-btn>
    <v-btn @click="appointmentDialog = true">Add Appointment</v-btn>
    <!-- <v-btn @click="logout">Logout</v-btn> -->

    <v-row justify="center">
      <v-dialog v-model="appointmentDialog" max-width="420">
        <v-card>
          <v-card-title class="text-h5"> Add Appointment </v-card-title>

          <v-text-field v-model="appointmentForm.firstName" label="First Name" required></v-text-field>
          <v-text-field v-model="appointmentForm.lastName" label="Last Name" required></v-text-field>
          <v-text-field v-model="appointmentForm.email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-date-picker v-model="appointmentForm.date" label="Date" :min="new Date().toISOString().substr(0, 10)" color="primary" required> </v-date-picker>
          <v-text-field v-model="appointmentForm.hours" label="Hour" required></v-text-field>
          <v-text-field v-model="appointmentForm.minutes" label="Minute" required></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="this.appointmentDialog = false"> Close </v-btn>
            <v-btn @click="createAppointment">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
import Vue from "vue";
import VueNativeSock from "vue-native-websocket";

export default {
  props: ["tenantSlug", "experienceSlug", "structureSlug"],
  data() {
    return {
      appointmentDialog: false,
      appointmentForm: {},
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"]
    };
  },
  mounted: function () {
    console.log(this.$route.query);
    if (this.$route.query.vuniteToken != null) {
      Vue.use(VueNativeSock, "ws://localhost:8900/v-unite/system/public/channel/notification?vuniteToken=" + this.$route.query.vuniteToken, { store: this.$store, format: "json" });
    }

    // if (!this.$store.state.principal.id) {
    //   this.$router.push("/login");
    // } else {
    //   console.log(this.$store.state.principal);
    // }
  },
  methods: {
    clickButton: function () {
      //console.log(this.$socket);
      this.$socket.send("{message: 'This is example of proposed message'}");
    },
    createAppointment: function () {
      var date = new Date(this.appointmentForm.date + "T" + this.appointmentForm.hours + ":" + this.appointmentForm.minutes + ":00");
      axios
        .post("/system/public/aesthetic/record/add", {
          firstName: this.appointmentForm.firstName,
          lastName: this.appointmentForm.lastName,
          email: this.appointmentForm.email,
          structureId: 295015,
          appointmentDate: date.toISOString()
        })
        .then((response) => {
          this.appointmentForm = {};
          this.appointmentDialog = false;
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
