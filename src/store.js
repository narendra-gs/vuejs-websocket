import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

if (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal")).token) {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("principal")).token;
}
console.log('axios authorization: ' + axios.defaults.headers.common['Authorization']);

export default new Vuex.Store({
  state: {
    principal: (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal"))) || {},
    socketNotification:{
      show: false,
      message: ''
    },
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    login(state, principal) {
			console.log('mutation: login before state: ' + JSON.stringify(state) + " principal: " + JSON.stringify(principal));
			state.principal = principal;
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + principal.token;
			localStorage.setItem("principal", JSON.stringify(principal));
			console.log('mutation: login after state: ' + JSON.stringify(state, null, 4));
		},
		logout(state) {
			console.log('mutation: logout before state: ' + JSON.stringify(state));
			state.principal = {};
			delete axios.defaults.headers.common['Authorization'];
			localStorage.removeItem("principal");
			console.log('mutation: logout after state: ' + JSON.stringify(state));
		},
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      console.log("Incoming message");
      state.socket.message = message;
      console.log(state.socket.message);

      if(message.message){
        state.socketNotification.show = true;
        state.socketNotification.message = message.message;
        console.log(state.socketNotification.message);
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    closeSocketNotification (state) {
      state.socketNotification.show = false;
    }
  },
  actions: {
		login({ commit }, principal) {
			console.log('action: login');
			return new Promise((resolve, reject) => {
				axios.post(
					"/system/authentication/login",
					{
						tenantPlanId: principal.tenantPlanId,
						type: principal.type,
						email: principal.email,
						password: principal.password,
						tenantSlug: principal.tenantSlug,
						experienceSlug: principal.experienceSlug,
						tenantId: principal.tenantId
					}
				).then(response => {
					let principal = response.data;
					principal.image = principal.image + (principal.image ? '?' + new Date().getSeconds() : '');
					if (principal && principal.token) {
						commit('login', principal);
						resolve({response:response, principal:principal});
					}
				}).catch(error => reject(error));
			});
		},
		logout({ commit }) {
			console.log('action: logout');
			return new Promise((resolve, reject) => {
				axios.post(
					"/system/authentication/logout",
					{}
				).then(response => { 
					commit('logout');
					resolve(response);
				}).catch(error => reject(error));
			});
		},
		debug({ commit }) {
			console.log('action: debug');
			commit('debug');
		},
    sendMessage: function (context, message) {
      Vue.prototype.$socket.send(message);
    }
	},
	getters: {
		isLoggedIn: state => (state.principal && state.principal.token)
	},
})