<template>
	<div
		class="d-flex flex-column justify-center align-center"
		style="background-color:#d2d6de;background-size:cover;background-attachment:fixed;min-height:100vh;display:flex;flex-direction:column;"
	>
		<v-form ref="form" v-model="valid" @submit.prevent="login">
			<v-card width="360">
				<v-card-title
					class="title d-flex justify-center align-center mb-4"
					style="background-color:#003366;color:white;"
				>
					<!-- <v-img max-width="150" :src="baseLocation + '/resource/image/v-unite-logo.png'"></v-img> -->
					Administrator
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
					<v-text-field
						v-model="password"
						:rules="passwordRules"
						:type="passwordFieldType"
						:append-icon="passwordFieldType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="switchVisibility"
						label="Password"
						required
						@keyup.enter="login"
					></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions class="py-4">
					<router-link class="v-unite-primary" :to="'/administrator/forgotpassword' " color="primary darken-1"
						style="margin-left:10px;color:#001e4e !important;font-size:12px"
					>Forgot Password</router-link>
					<v-spacer></v-spacer>
					<v-btn :disabled="!valid" type="submit" color="primary darken-1" depressed tile>Login</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			valid: true,
			email: null,
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+\..+/.test(v) || "E-mail must be valid"
			],
			password: null,
			passwordRules: [v => !!v || "Please specify password"],
			passwordFieldType: "password",
			baseLocation: axios.defaults.baseURL
		};
	},
	methods: {
		login() {
			this.$store
				.dispatch("login", {
					type: "Administrator",
					email: this.email,
					password: this.password
				})
				.then(() => this.$router.push("/"))
				.catch(() => {});
		},
		switchVisibility() {
			this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
		},
	}
};
</script>