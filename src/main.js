import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from 'routes/index'
import store from 'store/index'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
