/*import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
*/

/*
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);*/
/*
import Vue from 'vue'
Vue.prototype.$fire = '';
import App from './App.vue'

import {firebase} from './firestore'
import  router  from './router'
//import {store} from './store/store'   // <-- add this line ---------
//import vuetify from './plugins/vuetify';

//console.log(store);
Vue.use(firebase);
Vue.config.productionTip = false


let app = '';


firebase.auth().onAuthStateChanged(user => { //console.log('****00: ',user);
if(!app){
    console.log(user);
    app = new Vue({
      router,
      //1==3?router:router,
      //store,
      render: h =>h(App)// h(dashboard)
    }).$mount('#app')
  }
});

*/
/*
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {firebase} from './firestore'
//import './../node_modules/bulma/css/bulma.css'
//createApp.use(firebase);
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://httpbin.org/";
//https://masteringjs.io/tutorials/axios/interceptors
axios.interceptors.response.use(
async (config) => {
  //let token = await firebase.auth().currentUser.getIdToken(true);console.log(token);
  //config.headers.Authorization = `Bearer ${token}`;
  config.headers.Authorization = 'my secret token';
  return config;
}
	, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});
let app = '';
firebase.auth().onAuthStateChanged(user => { 
	console.log(user);
if(!app){app=createApp(App).use(store).use(router).mount('#app');
}
});
