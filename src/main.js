import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import './plugins/bootstrap-vue'
import './plugins/vee-validate'


Vue.config.productionTip = false

// Vue.config.errorHandler = function (err, vm, info) {
//   // console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }

// Vue.config.warnHandler = function (msg, vm, trace) {
//   // console.log(`Warn: ${msg}\nTrace: ${trace}`);
// }

axios.defaults.timeout = 5000;
axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    const vm = new Vue()
    vm.$bvToast.toast(JSON.parse(error.response.request.response)[0].msg, {
      title: `Thông báo lỗi!`,
      variant: 'danger',
    })
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

    // // Logout user if token refresh didn't work or user is disabled
    // if (error.config.url == '/api/token/refresh' || error.response.message == 'Account is disabled.') {
    
    //   TokenStorage.clear();
    //   router.push({ name: 'root' });

    //   return new Promise((resolve, reject) => {
    //     reject(error);
    //   });
    // }
  
    await this.$store.dispatch("auth/reNewToken");
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config.headers['x-access-token'] = store.dispatch("auth/reNewToken");
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

Vue.config.errorHandler = function (err, vm) {
  vm.$bvToast.toast('Đã có lỗi xảy ra!', {
    title: `Thông báo lỗi!`,
    variant: 'danger',
  });

  // return [err, vm, info]
  // console.log(err)
  // console.log('---------------------')
  // console.log(err, vm, info);
  return Promise.reject(err);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')